import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/emailoctopus'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    const result = await subscribeToNewsletter(email, firstName, lastName)

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
