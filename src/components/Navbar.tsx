'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '55%', height: '55%' }}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z"/>
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5H6.5"/>
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const displayName = user?.username || user?.firstName || 'User';
  const email = user?.primaryEmailAddress?.emailAddress || '';

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  const linkStyle = (href: string): React.CSSProperties => ({
    fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 14,
    padding: '8px 14px', borderRadius: 8,
    color: isActive(href) ? 'var(--amber)' : 'var(--muted)',
    background: isActive(href) ? 'rgba(193,127,58,0.10)' : 'transparent',
    cursor: 'pointer', transition: 'all .15s ease',
    textDecoration: 'none',
  });

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 70,
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ width: '100%', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 24 }}>

        {/* Wordmark */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg, #E0AC7A 0%, #C17F3A 60%, #8A4F1F 100%)',
            display: 'grid', placeItems: 'center',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 14px -6px rgba(193,127,58,0.55)',
            color: '#2a1408',
            flexShrink: 0,
          }}>
            <BookIcon />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 19, letterSpacing: '-0.01em', color: 'var(--fg)', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--amber)' }}>✦</span> StudyHub
          </span>
        </Link>

        {/* Nav links */}
        <nav className="nav-center" style={{ gap: 4, marginLeft: 16 }}>
          <Link href="/" style={linkStyle('/')}>Home</Link>
          <Link href="/posts" style={linkStyle('/posts')}>Browse</Link>
        </nav>

        {/* Right actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          {isSignedIn && (
            <Link href="/request" className="btn-amber" style={{ padding: '8px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Request
            </Link>
          )}

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
              </svg>
            )}
          </button>

          {/* Auth */}
          {isSignedIn ? (
            <div style={{ position: 'relative' }}>
              <button
                className="btn-ghost"
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px', borderRadius: 999 }}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C17F3A, #C17F3A99)',
                  display: 'grid', placeItems: 'center', color: '#1a0e05', fontWeight: 700, fontSize: 11,
                  fontFamily: 'DM Sans, sans-serif', flexShrink: 0,
                }}>
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 13.5, color: 'var(--fg)', whiteSpace: 'nowrap' }} className="hidden sm:block">
                  {displayName}
                </span>
              </button>

              {userMenuOpen && (
                <div
                  style={{
                    position: 'absolute', top: 42, right: 0, minWidth: 200,
                    background: 'var(--card-solid)', backdropFilter: 'blur(14px)',
                    border: '1px solid var(--border)', borderRadius: 12, padding: 6,
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)', zIndex: 100,
                  }}
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, color: 'var(--fg)', fontSize: 13.5 }}>{displayName}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted)', fontSize: 11 }}>{email}</div>
                  </div>
                  <Link href="/my-requests" className="menu-item" style={{ display: 'block', textDecoration: 'none' }} onClick={() => setUserMenuOpen(false)}>
                    My Requests
                  </Link>
                  <UserButton />
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <SignInButton mode="redirect">
                <button className="btn-ghost" style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13.5 }}>Sign in</button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <button className="btn-amber" style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13.5 }}>Sign up</button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
