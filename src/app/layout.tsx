import type { Metadata } from 'next';
import { DM_Sans, Syne, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';
import Navbar from '@/components/Navbar';
import LeftSidebar from '@/components/LeftSidebar';
import { ThemeProvider } from '@/context/ThemeContext';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', weight: ['400', '500', '600', '700'] });
const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400', '600', '700', '800'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', weight: ['400', '500'] });

export const metadata: Metadata = {
  title: 'StudyHub — Community Study Resources',
  description: 'Find and share study resources for any subject. AI-powered classification.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#C17F3A',
          colorBackground: '#1f0f08',
          colorInputBackground: 'rgba(255,255,255,0.07)',
          colorInputText: '#E8D5C0',
          colorText: '#E8D5C0',
          colorTextSecondary: '#9A7A62',
          colorNeutral: '#E8D5C0',
          borderRadius: '0.75rem',
        },
        elements: {
          card: {
            backgroundColor: '#1f0f08',
            border: '1px solid rgba(180,90,40,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          },
          headerTitle: { color: '#C8956A' },
          headerSubtitle: { color: '#9A7A62' },
          socialButtonsBlockButton: {
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(180,90,40,0.25)',
            color: '#E8D5C0',
          },
          socialButtonsBlockButtonText: { color: '#E8D5C0' },
          dividerLine: { backgroundColor: 'rgba(180,90,40,0.2)' },
          dividerText: { color: '#5a3828' },
          formFieldLabel: { color: '#9A7A62' },
          formFieldInput: {
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(180,90,40,0.2)',
            color: '#E8D5C0',
          },
          formButtonPrimary: {
            backgroundColor: '#C17F3A',
          },
          footerActionLink: { color: '#C8956A' },
          footerActionText: { color: '#9A7A62' },
          identityPreviewEditButton: { color: '#C8956A' },
          formFieldAction: { color: '#C8956A' },
          alternativeMethodsBlockButton: {
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(180,90,40,0.2)',
            color: '#E8D5C0',
          },
          otpCodeFieldInput: {
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(180,90,40,0.2)',
            color: '#E8D5C0',
          },
        },
      }}
    >
      <html lang="en" className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
        <head>
          <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
        </head>
        <body style={{ minHeight: '100vh' }}>
          <ThemeProvider>
            <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>
              <Navbar />
              <LeftSidebar />
              <main style={{ paddingLeft: 56, minHeight: '100vh' }}>{children}</main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
