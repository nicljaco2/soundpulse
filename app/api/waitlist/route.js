import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  const { email } = await request.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    // Add to Resend contacts (your waitlist)
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    }).catch(() => {}) // non-fatal if audience not configured yet

    // Notify you
    await resend.emails.send({
      from: 'SoundPulse <onboarding@resend.dev>',
      to: process.env.WAITLIST_NOTIFY_EMAIL,
      subject: `New waitlist signup: ${email}`,
      html: `<p><strong>${email}</strong> just joined the SoundPulse waitlist.</p>`,
    })

    // Confirm to the user
    await resend.emails.send({
      from: 'SoundPulse <onboarding@resend.dev>',
      to: email,
      subject: "You're on the SoundPulse waitlist",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0A0A0F;color:#E8E6E1;">
          <h1 style="font-size:22px;margin:0 0 8px;color:#A78BFA;">SoundPulse</h1>
          <p style="font-size:15px;line-height:1.6;color:#E8E6E1;">
            You're on the list. We'll reach out as soon as early access opens up.
          </p>
          <p style="font-size:13px;color:#8B8680;margin-top:24px;">
            — The SoundPulse team
          </p>
        </div>
      `,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }
}
