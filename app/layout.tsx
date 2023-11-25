import type { Metadata } from 'next'
import ThemeRegistry from './ThemeRegistry'
import { HighlightInit } from '@highlight-run/next/client'

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
    <>
    	<HighlightInit
				projectId={'ng2ozxpd'}
				serviceName="external-outstaff-requests"
				tracingOrigins
				networkRecording={{
					enabled: true,
					recordHeadersAndBody: true,
					urlBlocklist: [],
				}}
			/>
      <html lang="en">
        <body>
          <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
        </body>
      </html>
    </>
  );
}
