import '@fontsource-variable/figtree';
import './globals.css';

export const metadata = {
  title: 'ByteFX — Trade with a global broker',
  description:
    'Access 150+ tradable instruments across Forex, Indices, Crypto, Commodities and Shares with ByteFX. Tight spreads, fast execution and support that answers.',
  metadataBase: new URL('https://bytefx.com'),
  openGraph: {
    title: 'ByteFX — Trade with a global broker',
    description:
      'Access 150+ tradable instruments across Forex, Indices, Crypto, Commodities and Shares.',
    siteName: 'ByteFX',
    type: 'website',
  },
  icons: { icon: '/assets/logo/bytefx.png' },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
    { media: '(prefers-color-scheme: light)', color: '#f7f8f3' },
  ],
};

/* Dark is the design's default — the artwork was rendered for it. Light is an
   explicit opt-in, remembered per browser. Runs before first paint, so the page
   never flashes the wrong theme. */
const themeBoot = `(function(){try{var s=localStorage.getItem('bytefx-theme');document.documentElement.dataset.theme=(s==='light'||s==='dark')?s:'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
