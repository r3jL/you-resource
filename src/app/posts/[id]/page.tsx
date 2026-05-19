import { notFound } from 'next/navigation';
import { getSubjectColors } from '@/lib/subjectColors';
import { adminSupabase } from '@/lib/supabase/admin';
import RealtimePost from '@/components/RealtimePost';

export const revalidate = 30;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;

  const [{ data: post, error }, { data: resources }] = await Promise.all([
    adminSupabase.from('posts').select('*').eq('id', id).single(),
    adminSupabase.from('resources').select('*').eq('post_id', id).order('votes', { ascending: false }),
  ]);

  if (error || !post) notFound();

  const colors = getSubjectColors(post.subject);
  let topics: string[] = [];
  try { topics = JSON.parse(post.topics); } catch { topics = []; }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const serializedResources = (resources || []).map((r) => ({
    id: r.id, url: r.url, description: r.description,
    language: r.language, price: r.price, type: r.type,
    submittedBy: r.submitted_by, votes: r.votes, createdAt: r.created_at,
  }));

  const crumbStyle: React.CSSProperties = { cursor: 'pointer', color: 'var(--muted)', textDecoration: 'none' };

  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '32px 24px 80px' }}>
      {/* Breadcrumb */}
      <nav style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: 'var(--muted)',
        marginBottom: 18, display: 'flex', gap: 6, alignItems: 'center',
      }}>
        <a href="/" style={crumbStyle}>Home</a>
        <span>/</span>
        <a href="/posts" style={crumbStyle}>Browse</a>
        <span>/</span>
        <span style={{ color: 'var(--fg-soft)', maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</span>
      </nav>

      {/* Post header */}
      <div className="content-card" style={{ padding: 28, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 11px', borderRadius: 999,
            ...colors.style,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500,
            letterSpacing: '.02em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.style.color, opacity: 0.9, flexShrink: 0 }} />
            {post.subject}
          </span>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--muted)',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/>
              <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/>
            </svg>
            {serializedResources.length} {serializedResources.length === 1 ? 'answer' : 'answers'}
          </div>
        </div>

        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 26, lineHeight: 1.25,
          color: 'var(--fg)', margin: '0 0 14px 0', letterSpacing: '-0.01em',
        }}>{post.title}</h1>

        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 14.5, lineHeight: 1.6,
          color: 'var(--fg-soft)', margin: '0 0 18px 0',
        }}>{post.description}</p>

        {topics.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
            {topics.map((t) => (
              <span key={t} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '3px 9px', borderRadius: 999,
                background: 'rgba(200,149,106,0.07)',
                border: '1px solid rgba(200,149,106,0.20)',
                color: 'var(--amber)',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 11.5,
              }}>{t}</span>
            ))}
          </div>
        )}

        <div style={{
          paddingTop: 16, borderTop: '1px solid var(--border-soft)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, color: 'var(--dim)',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
            </svg>
            Requested by <span style={{ color: 'var(--muted)' }}>{post.author_name}</span>
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Answers + form */}
      <RealtimePost postId={post.id} initialResources={serializedResources} />
    </div>
  );
}
