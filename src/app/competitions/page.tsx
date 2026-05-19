import { competitionsList } from '@/lib/sidebarData';

export const metadata = { title: 'Competitions — StudyHub' };

const CATEGORY_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  'Algo Trading':        { color: '#34D399', bg: 'rgba(52,211,153,0.10)',  border: 'rgba(52,211,153,0.28)' },
  'ML & Alpha Research': { color: '#818CF8', bg: 'rgba(129,140,248,0.10)', border: 'rgba(129,140,248,0.28)' },
  'ML & Data Science':   { color: '#818CF8', bg: 'rgba(129,140,248,0.10)', border: 'rgba(129,140,248,0.28)' },
  'Quant Research':      { color: '#D4A574', bg: 'rgba(212,165,116,0.12)', border: 'rgba(212,165,116,0.30)' },
  'Trading Simulation':  { color: '#38BDF8', bg: 'rgba(56,189,248,0.10)',  border: 'rgba(56,189,248,0.28)' },
  'Discovery Program':   { color: '#FB923C', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.28)' },
  'SWE / Trading':       { color: '#F472B6', bg: 'rgba(244,114,182,0.10)', border: 'rgba(244,114,182,0.28)' },
};

export default function CompetitionsPage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
      {/* Header */}
      <header style={{ marginBottom: 28 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 12px', borderRadius: 999,
          background: 'rgba(52,211,153,0.10)',
          border: '1px solid rgba(52,211,153,0.25)',
          color: '#34D399',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 500,
          letterSpacing: '.06em', marginBottom: 14,
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>
          </svg>
          COMPETITIONS
        </div>
        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 36, color: 'var(--fg)',
          margin: '0 0 8px 0', letterSpacing: '-0.01em',
        }}>Quant Competitions</h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'var(--muted)', margin: 0, maxWidth: 560 }}>
          Algorithmic trading, quant research, and discovery programs from top firms.
        </p>
      </header>

      {/* Grid */}
      <div style={{
        display: 'grid', gap: 14,
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      }}>
        {competitionsList.map((item) => {
          const cat = CATEGORY_COLORS[item.category] ?? { color: '#C8956A', bg: 'rgba(200,149,106,0.10)', border: 'rgba(200,149,106,0.28)' };
          const isOpen = item.status === 'open';
          return (
            <a key={item.url + item.title} href={item.url} target="_blank" rel="noreferrer" className="resource-card">
              <div className="resource-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 5h5v5"/><path d="M19 5 10 14"/><path d="M19 13v6H5V5h6"/>
                </svg>
              </div>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 15.5, color: 'var(--fg)',
                margin: '0 0 4px 0', lineHeight: 1.3, paddingRight: 22,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{item.title}</h3>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: 'var(--muted)', marginBottom: 10 }}>
                {item.org}
              </div>
              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 12.5, color: 'var(--muted)',
                lineHeight: 1.45, margin: '0 0 12px 0', flex: 1,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              } as React.CSSProperties}>{item.description}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                <span style={{
                  padding: '3px 9px', borderRadius: 6,
                  background: cat.bg, border: `1px solid ${cat.border}`, color: cat.color,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 500,
                }}>{item.category}</span>
                <span style={{
                  padding: '3px 9px', borderRadius: 6,
                  background: isOpen ? 'rgba(52,211,153,0.10)' : 'rgba(255,255,255,0.04)',
                  border: isOpen ? '1px solid rgba(52,211,153,0.28)' : '1px solid var(--border-soft)',
                  color: isOpen ? '#34D399' : 'var(--muted)',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 500,
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}>● {isOpen ? 'Open' : 'TBA'}</span>
              </div>

              <div style={{
                paddingTop: 10, borderTop: '1px solid var(--border-soft)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              }}>
                {item.prize && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--amber)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="8"/>
                      <path d="M12 8v8M9.5 10.5c0-1 1.1-1.5 2.5-1.5s2.5.5 2.5 1.5-1 1.5-2.5 1.5-2.5.5-2.5 1.5 1.1 1.5 2.5 1.5 2.5-.5 2.5-1.5"/>
                    </svg>
                    {item.prize}
                  </span>
                )}
                {item.deadline && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--muted)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>
                    </svg>
                    {item.deadline}
                  </span>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
