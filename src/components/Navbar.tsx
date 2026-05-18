'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const { theme, toggleTheme } = useTheme();

  const displayName = user?.username || user?.firstName || 'User';

  const navLink = (href: string, label: string) => {
    const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
    return (
      <Link
        href={href}
        className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap"
        style={active
          ? { background: 'rgba(193,127,58,0.12)', color: 'var(--color-heading)' }
          : { color: 'var(--color-muted)' }
        }
      >
        {label}
      </Link>
    );
  };

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'var(--bg-nav)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid var(--border-nav)',
        boxShadow: 'var(--shadow-nav)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3">

          {/* Logo — always anchored left, never shrinks */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4923F, #C17F3A)', boxShadow: '0 2px 12px rgba(193,127,58,0.4)' }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-lg font-bold whitespace-nowrap" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-heading)' }}>
              <span style={{ color: '#C17F3A', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85em', marginRight: '2px' }}>✦</span>StudyHub
            </span>
          </Link>

          {/* Nav links — centre, invisible on small screens, don't push sides */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLink('/', 'Home')}
            {navLink('/posts', 'Browse')}
          </div>

          {/* Right actions — always anchored right, never shrinks */}
          <div className="flex items-center gap-3 shrink-0 ml-auto md:ml-0">
            {isSignedIn && (
              <Link href="/request" className="btn-primary text-sm whitespace-nowrap">
                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Request
              </Link>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0"
              style={{ color: 'var(--color-muted)', background: 'var(--bg-badge)', border: '1px solid var(--border-card)' }}
            >
              {theme === 'dark' ? (
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {isSignedIn ? (
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:block text-sm font-medium whitespace-nowrap" style={{ color: 'var(--color-muted)' }}>{displayName}</span>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: { width: '32px', height: '32px' },
                    },
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <SignInButton mode="redirect">
                  <button className="text-sm font-medium transition-colors duration-150 px-3 py-1.5 whitespace-nowrap" style={{ color: 'var(--color-muted)' }}>
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="redirect">
                  <button
                    className="text-sm font-semibold px-3 py-1.5 rounded-xl transition-all duration-150 whitespace-nowrap"
                    style={{ background: 'var(--bg-badge)', color: 'var(--color-heading)', border: '1px solid var(--border-card)' }}
                  >
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
