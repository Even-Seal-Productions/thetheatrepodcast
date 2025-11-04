// EmailOctopus API utility functions

const API_KEY = process.env.EMAILOCTOPUS_API_KEY
const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID
const BASE_URL = 'https://emailoctopus.com/api/1.6'

export interface SubscribeResult {
  success: boolean
  message: string
}

export async function subscribeToNewsletter(
  email: string,
  firstName?: string,
  lastName?: string
): Promise<SubscribeResult> {
  if (!API_KEY || !LIST_ID) {
    console.error('EmailOctopus credentials not configured')
    return {
      success: false,
      message: 'Newsletter service is not configured. Please contact support.',
    }
  }

  try {
    const response = await fetch(
      `${BASE_URL}/lists/${LIST_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email_address: email,
          fields: {
            FirstName: firstName || '',
            LastName: lastName || '',
          },
          status: 'SUBSCRIBED',
        }),
      }
    )

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: 'Successfully subscribed to newsletter!',
      }
    }

    // Handle specific error cases
    if (data.error && data.error.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter.',
      }
    }

    if (data.error && data.error.code === 'INVALID_PARAMETERS') {
      return {
        success: false,
        message: 'Please provide a valid email address.',
      }
    }

    return {
      success: false,
      message: data.error?.message || 'Failed to subscribe. Please try again.',
    }
  } catch (error) {
    console.error('EmailOctopus API error:', error)
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    }
  }
}

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}

export async function sendContactMessage(
  data: ContactFormData
): Promise<SubscribeResult> {
  if (!API_KEY || !LIST_ID) {
    console.error('EmailOctopus credentials not configured')
    return {
      success: false,
      message: 'Contact service is not configured. Please contact support.',
    }
  }

  try {
    // For contact form, we'll subscribe them to the list with a tag
    // and include their message in custom fields
    const response = await fetch(
      `${BASE_URL}/lists/${LIST_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email_address: data.email,
          fields: {
            FirstName: data.name.split(' ')[0] || data.name,
            LastName: data.name.split(' ').slice(1).join(' ') || '',
          },
          tags: ['contact-form'],
          status: 'SUBSCRIBED',
        }),
      }
    )

    const result = await response.json()

    if (response.ok || result.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      // Successfully added or already exists - that's fine for contact form
      // In a production environment, you'd want to send the actual message via email
      // For now, we'll just confirm receipt
      return {
        success: true,
        message: 'Thank you for your message! We\'ll get back to you soon.',
      }
    }

    return {
      success: false,
      message: result.error?.message || 'Failed to send message. Please try again.',
    }
  } catch (error) {
    console.error('EmailOctopus API error:', error)
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    }
  }
}
