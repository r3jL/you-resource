import RequestForm from '@/components/RequestForm';

export default function RequestPage() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px 80px' }}>
      <div style={{ marginBottom: 22, textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 30, color: 'var(--fg)',
          margin: '0 0 6px 0', letterSpacing: '-0.01em',
        }}>Request a resource</h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'var(--muted)', margin: 0 }}>
          Describe what you&apos;re looking for. The community — and our AI — will help route it.
        </p>
      </div>
      <RequestForm />
    </div>
  );
}
