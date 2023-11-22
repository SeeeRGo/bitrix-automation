import type { Metadata } from 'next'
import './globals.css'
import ThemeRegistry from './ThemeRegistry'

export const metadata: Metadata = {
  title: 'Предлагайте ваших специалистов',
  description: 'Форма предложения кандидата для CosySoft',
}

export default function RootLayout({
  children,
}: {
  children: JSX.Element
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
