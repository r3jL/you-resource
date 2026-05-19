import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { adminSupabase } from '@/lib/supabase/admin';
import PostCard from '@/components/PostCard';

export const dynamic = 'force-dynamic';

export default async function MyRequestsPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const { data: rawPosts } = await adminSupabase
    .from('posts')
    .select('*, resources(count)')
    .eq('author_id', userId)
    .order('created_at', { ascending: false });

  const posts = (rawPosts || []).map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    subject: post.subject,
    topics: post.topics,
    authorName: post.author_name,
    createdAt: post.created_at,
    resourceCount: post.resources?.[0]?.count ?? 0,
  }));

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 30, color: 'var(--fg)',
            margin: '0 0 6px 0', letterSpacing: '-0.01em',
          }}>My Requests</h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: 'var(--muted)', margin: 0 }}>
            {posts.length} {posts.length === 1 ? 'request' : 'requests'} you&apos;ve posted
          </p>
        </div>
        <a href="/request" className="btn-amber" style={{
          padding: '10px 18px', borderRadius: 10, fontSize: 14,
          display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600,
          textDecoration: 'none', flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          New Request
        </a>
      </header>

      {posts.length === 0 ? (
        <div style={{
          padding: '56px 28px', textAlign: 'center', borderRadius: 16,
          background: 'var(--card-bg)', border: '1px dashed var(--border)',
        }}>
          <div style={{ color: 'var(--muted)', marginBottom: 16 }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
              <rect x="7" y="4" width="10" height="4" rx="1"/>
              <path d="M7 6H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2"/>
            </svg>
          </div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 19, color: 'var(--fg)', margin: '0 0 6px 0' }}>No requests yet</h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: 'var(--muted)', margin: '0 auto 18px', maxWidth: 360 }}>
            When you post a resource request, it&apos;ll show up here.
          </p>
          <a href="/request" className="btn-amber" style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, textDecoration: 'none' }}>
            Request Resources
          </a>
        </div>
      ) : (
        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        }}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              subject={post.subject}
              topics={post.topics}
              authorName={post.authorName}
              createdAt={post.createdAt}
              resourceCount={post.resourceCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
