export default function Loading() {
  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '32px 24px 80px' }}>
      {/* Breadcrumb */}
      <div className="skeleton" style={{ width: 200, height: 14, marginBottom: 18 }} />

      {/* Post header card */}
      <div style={{
        borderRadius: 14, border: '1px solid var(--border)',
        background: 'var(--card-bg)', padding: 28, marginBottom: 28,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <div className="skeleton" style={{ width: 90, height: 22, borderRadius: 999 }} />
          <div className="skeleton" style={{ width: 70, height: 18 }} />
        </div>
        <div className="skeleton" style={{ width: '85%', height: 28, marginBottom: 10 }} />
        <div className="skeleton" style={{ width: '60%', height: 28, marginBottom: 16 }} />
        <div className="skeleton" style={{ width: '100%', height: 16, marginBottom: 6 }} />
        <div className="skeleton" style={{ width: '90%', height: 16, marginBottom: 6 }} />
        <div className="skeleton" style={{ width: '75%', height: 16, marginBottom: 18 }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[60, 80, 70].map((w, i) => (
            <div key={i} className="skeleton" style={{ width: w, height: 22, borderRadius: 999 }} />
          ))}
        </div>
      </div>

      {/* Answers skeleton */}
      <div className="skeleton" style={{ width: 120, height: 22, marginBottom: 18 }} />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} style={{
          borderRadius: 14, border: '1px solid var(--border)',
          background: 'var(--card-bg)', padding: 20, marginBottom: 12,
          display: 'flex', gap: 16,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div className="skeleton" style={{ width: 28, height: 28, borderRadius: 6 }} />
            <div className="skeleton" style={{ width: 20, height: 14 }} />
            <div className="skeleton" style={{ width: 28, height: 28, borderRadius: 6 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 10, marginBottom: 12 }} />
            <div className="skeleton" style={{ width: '70%', height: 16, marginBottom: 8 }} />
            <div className="skeleton" style={{ width: '100%', height: 14, marginBottom: 6 }} />
            <div className="skeleton" style={{ width: '85%', height: 14 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
