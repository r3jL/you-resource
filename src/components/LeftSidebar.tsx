'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const COLLAPSED = 56;
const EXPANDED = 224;

const NAV_ITEMS = [
  {
    href: '/resources',
    label: 'Resources',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z"/>
        <path d="M8 7h8M8 11h6"/>
      </svg>
    ),
  },
  {
    href: '/competitions',
    label: 'Competitions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M6 4h12v4a6 6 0 0 1-12 0V4z"/>
        <path d="M6 5H3v3a3 3 0 0 0 3 3M18 5h3v3a3 3 0 0 1-3 3"/>
        <path d="M10 14h4v3h-4z"/><path d="M9 21h6"/><path d="M12 17v4"/>
      </svg>
    ),
  },
  {
    href: '/my-requests',
    label: 'My Requests',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="7" y="4" width="10" height="4" rx="1"/>
        <path d="M7 6H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2"/>
      </svg>
    ),
  },
];

export default function LeftSidebar() {
  const [expanded, setExpanded] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  const displayName = user?.username || user?.firstName || 'Guest';
  const email = user?.primaryEmailAddress?.emailAddress || '';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: 'fixed', top: 'var(--navbar-h)', left: 0, bottom: 0,
        width: expanded ? `${EXPANDED}px` : `${COLLAPSED}px`,
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--border)',
        backdropFilter: 'blur(14px)',
        transition: 'width .22s cubic-bezier(.4,0,.2,1)',
        zIndex: 60,
        display: 'flex', flexDirection: 'column',
        padding: '16px 8px 12px 8px',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 10,
                color: active ? 'var(--amber)' : 'var(--muted)',
                background: active ? 'rgba(193,127,58,0.12)' : 'transparent',
                border: active ? '1px solid rgba(193,127,58,0.30)' : '1px solid transparent',
                width: '100%', textAlign: 'left',
                fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, fontWeight: 500,
                cursor: 'pointer', textDecoration: 'none',
                transition: 'color .15s, background .15s, border-color .15s',
              }}
            >
              <span style={{ flexShrink: 0, display: 'flex' }}>{item.icon}</span>
              <span style={{
                opacity: expanded ? 1 : 0,
                transform: expanded ? 'translateX(0)' : 'translateX(-6px)',
                transition: 'opacity .18s, transform .22s',
                whiteSpace: 'nowrap',
              }}>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* User info at bottom */}
      <div style={{ marginTop: 'auto' }}>
        {isSignedIn && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 8px',
            borderTop: '1px solid var(--border)',
            overflow: 'hidden',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #C17F3A, rgba(193,127,58,0.6))',
              display: 'grid', placeItems: 'center', color: '#1a0e05', fontWeight: 700, fontSize: 11,
              fontFamily: 'DM Sans, sans-serif',
            }}>{initial}</div>
            <div style={{
              opacity: expanded ? 1 : 0, transition: 'opacity .18s',
              whiteSpace: 'nowrap', overflow: 'hidden',
            }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 12.5, color: 'var(--fg)' }}>{displayName}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: 'var(--muted)' }}>{email}</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
