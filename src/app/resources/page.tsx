import { quickResources } from '@/lib/sidebarData';

export const metadata = { title: 'Resources — StudyHub' };

export default function ResourcesPage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
      {/* Header */}
      <header style={{ marginBottom: 28 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 12px', borderRadius: 999,
          background: 'rgba(167,139,250,0.10)',
          border: '1px solid rgba(167,139,250,0.25)',
          color: '#A78BFA',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 500,
          letterSpacing: '.06em', marginBottom: 14,
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/>
            <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/>
          </svg>
          STUDY RESOURCES
        </div>
        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 36, color: 'var(--fg)',
          margin: '0 0 8px 0', letterSpacing: '-0.01em',
        }}>Learning Resources</h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'var(--muted)', margin: 0, maxWidth: 560 }}>
          Curated platforms and tools for quantitative finance, mathematics, and computer science.
        </p>
      </header>

      {/* Grid */}
      <div style={{
        display: 'grid', gap: 14,
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      }}>
        {quickResources.map((item) => {
          let host = item.url;
          try { host = new URL(item.url).hostname.replace('www.', ''); } catch { /* ignore */ }
          return (
            <a key={item.url} href={item.url} target="_blank" rel="noreferrer" className="resource-card">
              <div className="resource-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 5h5v5"/><path d="M19 5 10 14"/><path d="M19 13v6H5V5h6"/>
                </svg>
              </div>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 15.5, color: 'var(--fg)',
                margin: '0 0 6px 0', lineHeight: 1.3, paddingRight: 22,
              }}>{item.title}</h3>
              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 12.5, color: 'var(--muted)',
                lineHeight: 1.45, margin: '0 0 14px 0', flex: 1,
              }}>{item.description}</p>
              <div style={{
                paddingTop: 10, borderTop: '1px solid var(--border-soft)',
                display: 'flex', alignItems: 'center', gap: 7,
                fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: 'var(--muted)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A78BFA', flexShrink: 0 }} />
                {host}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
