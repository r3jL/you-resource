import { adminSupabase } from '@/lib/supabase/admin';
import PostsFilterClient from '@/components/PostsFilterClient';

export const revalidate = 60;

export default async function PostsPage() {
  const { data: rawPosts } = await adminSupabase
    .from('posts')
    .select('*, resources(count)')
    .order('created_at', { ascending: false })
    .limit(100);

  const posts = (rawPosts || []).map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    subject: post.subject,
    topics: post.topics,
    authorName: post.author_name,
    createdAt: post.created_at,
    _count: { resources: post.resources?.[0]?.count ?? 0 },
  }));

  const subjects = Array.from(new Set(posts.map((p) => p.subject))).sort();

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
      <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 26 }}>
        <div>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 32, color: 'var(--fg)',
            margin: '0 0 6px 0', letterSpacing: '-0.01em',
          }}>Browse Resources</h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14.5, color: 'var(--muted)', margin: 0 }}>
            {posts.length} resource request{posts.length !== 1 ? 's' : ''} from the community
          </p>
        </div>
        <a href="/request" className="btn-amber" style={{
          padding: '10px 18px', borderRadius: 10,
          fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14,
          display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none',
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Request Resources
        </a>
      </header>
      <PostsFilterClient posts={posts} subjects={subjects} />
    </div>
  );
}
