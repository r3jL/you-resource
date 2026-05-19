export default function Loading() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div className="skeleton" style={{ width: 160, height: 30, marginBottom: 10 }} />
          <div className="skeleton" style={{ width: 130, height: 16 }} />
        </div>
        <div className="skeleton" style={{ width: 140, height: 40, borderRadius: 10 }} />
      </div>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            borderRadius: 14, border: '1px solid var(--border)',
            background: 'var(--card-bg)', padding: '20px 20px 16px',
          }}>
            <div className="skeleton" style={{ width: 80, height: 20, borderRadius: 999, marginBottom: 14 }} />
            <div className="skeleton" style={{ width: '90%', height: 18, marginBottom: 8 }} />
            <div className="skeleton" style={{ width: '70%', height: 18, marginBottom: 14 }} />
            <div className="skeleton" style={{ width: '100%', height: 13, marginBottom: 6 }} />
            <div className="skeleton" style={{ width: '80%', height: 13 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
