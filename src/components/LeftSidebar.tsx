'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const COLLAPSED = 56;
const EXPANDED = 224;

const NAV_ITEMS = [
  { href: '/resources', label: 'Resources', paths: ['M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'] },
  { href: '/competitions', label: 'Competitions', paths: ['M13 10V3L4 14h7v7l9-11h-7z'] },
  { href: '/my-requests', label: 'My Requests', paths: ['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'] },
];

export default function LeftSidebar() {
  const [expanded, setExpanded] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  const displayName = user?.username || user?.firstName || 'Guest';
  const email = user?.primaryEmailAddress?.emailAddress || '';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div
      className="fixed left-0 z-40 flex flex-col"
      style={{
        top: 'var(--navbar-h)',
        height: 'calc(100vh - var(--navbar-h))',
        width: expanded ? `${EXPANDED}px` : `${COLLAPSED}px`,
        transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-nav)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        overflow: 'hidden',
        boxShadow: expanded ? 'var(--shadow-sidebar)' : 'none',
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="h-3" />
      <nav className="flex-1 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-colors duration-150"
              style={active ? { background: 'rgba(193,127,58,0.15)', color: 'var(--color-heading)' } : { color: 'var(--color-muted)' }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(193,127,58,0.07)'; e.currentTarget.style.color = 'var(--color-heading)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-muted)'; } }}
            >
              <span className="flex items-center justify-center shrink-0" style={{ width: '20px' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {item.paths.map((d, i) => <path key={i} d={d} />)}
                </svg>
              </span>
              <span className="text-sm font-medium whitespace-nowrap" style={{ opacity: expanded ? 1 : 0, transform: expanded ? 'translateX(0)' : 'translateX(-4px)', transition: 'opacity 0.18s ease, transform 0.18s ease', transitionDelay: expanded ? '0.06s' : '0s' }}>
                {item.label}
              </span>
              {active && <span className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#C17F3A', opacity: expanded ? 1 : 0, transition: 'opacity 0.15s ease' }} />}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-3 flex items-center gap-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase shrink-0"
          style={{
            background: isSignedIn ? 'rgba(193,127,58,0.18)' : 'var(--bg-badge)',
            color: isSignedIn ? 'var(--color-heading)' : 'var(--color-subtle)',
            border: `1px solid ${isSignedIn ? 'rgba(193,127,58,0.28)' : 'var(--border-card)'}`,
            minWidth: '32px',
          }}
        >
          {isSignedIn ? initial : (
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </div>
        <div style={{ opacity: expanded ? 1 : 0, transform: expanded ? 'translateX(0)' : 'translateX(-4px)', transition: 'opacity 0.18s ease, transform 0.18s ease', transitionDelay: expanded ? '0.06s' : '0s', overflow: 'hidden', minWidth: 0 }}>
          {isSignedIn ? (
            <>
              <p className="text-sm font-semibold leading-tight truncate" style={{ color: 'var(--color-heading)', maxWidth: `${EXPANDED - COLLAPSED - 20}px` }}>{displayName}</p>
              <p className="text-xs leading-tight truncate mt-0.5" style={{ color: 'var(--color-subtle)', maxWidth: `${EXPANDED - COLLAPSED - 20}px` }}>{email}</p>
            </>
          ) : (
            <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>Not signed in</p>
          )}
        </div>
      </div>
    </div>
  );
}
