import './globals.css'

export const metadata = {
  title: 'SoundPulse × Rumi Rafael',
  description: 'Personalized trend intelligence and content strategy for Rumi Rafael — groovy, spacey indie pop/rock.',
  openGraph: {
    title: 'SoundPulse × Rumi Rafael',
    description: 'Personalized trend intelligence and content strategy for Rumi Rafael — groovy, spacey indie pop/rock.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0A0A0F" />
      </head>
      <body>{children}</body>
    </html>
  )
}
