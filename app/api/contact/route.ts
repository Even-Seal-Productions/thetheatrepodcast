import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, recaptchaToken } = body

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Message is required' },
        { status: 400 }
      )
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA verification is required' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      }
    )

    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Add contact to EmailOctopus list with 'contact-form' tag
    const emailOctopusApiKey = process.env.EMAILOCTOPUS_API_KEY
    const emailOctopusListId = process.env.EMAILOCTOPUS_LIST_ID

    if (emailOctopusApiKey && emailOctopusListId) {
      try {
        await fetch(
          `https://emailoctopus.com/api/1.6/lists/${emailOctopusListId}/contacts`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_key: emailOctopusApiKey,
              email_address: email.trim(),
              fields: {
                FirstName: name.trim().split(' ')[0] || name.trim(),
                LastName: name.trim().split(' ').slice(1).join(' ') || '',
              },
              tags: ['contact-form'],
              status: 'SUBSCRIBED',
            }),
          }
        )
        // Ignore errors if contact already exists
      } catch (error) {
        console.error('EmailOctopus error:', error)
        // Don't fail the whole request if EmailOctopus fails
      }
    }

    // Send notification email via Resend
    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'booking@thetheatrepodcast.com'

    if (!resendApiKey) {
      console.error('Resend API key not configured')
      return NextResponse.json(
        { success: false, message: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      )
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'The Theatre Podcast <noreply@evensealproductions.com>',
        to: [contactEmail],
        reply_to: email.trim(),
        subject: `Contact Submission - TTP: ${subject?.trim() || 'General Inquiry'}`,
        html: `
          <h2>New Contact Form Submission - The Theatre Podcast</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject.trim()}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message.trim().replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted via thetheatrepodcast.com contact form</small></p>
        `,
      }),
    })

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json()
      console.error('Resend error:', errorData)
      return NextResponse.json(
        { success: false, message: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! We\'ll get back to you soon.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
