export default function Loading() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
      {/* Hero skeleton */}
      <div style={{
        borderRadius: 18, border: '1px solid var(--border)',
        background: 'var(--hero-bg)', padding: '56px 40px 48px',
        marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
      }}>
        <div className="skeleton" style={{ width: 180, height: 22, borderRadius: 999 }} />
        <div className="skeleton" style={{ width: '60%', height: 48 }} />
        <div className="skeleton" style={{ width: '40%', height: 20 }} />
        <div className="skeleton" style={{ width: '100%', maxWidth: 640, height: 52, borderRadius: 14 }} />
      </div>

      {/* Cards skeleton */}
      <div style={{ marginBottom: 16 }}>
        <div className="skeleton" style={{ width: 160, height: 24, marginBottom: 18 }} />
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              borderRadius: 14, border: '1px solid var(--border)',
              background: 'var(--card-bg)', padding: '20px 20px 16px',
            }}>
              <div className="skeleton" style={{ width: 80, height: 20, borderRadius: 999, marginBottom: 14 }} />
              <div className="skeleton" style={{ width: '90%', height: 18, marginBottom: 8 }} />
              <div className="skeleton" style={{ width: '70%', height: 18, marginBottom: 14 }} />
              <div className="skeleton" style={{ width: '100%', height: 14, marginBottom: 6 }} />
              <div className="skeleton" style={{ width: '80%', height: 14 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
