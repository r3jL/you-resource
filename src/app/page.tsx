import { adminSupabase } from '@/lib/supabase/admin';
import HomeClient from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { data: recentPosts } = await adminSupabase
    .from('posts')
    .select('*, resources(count)')
    .order('created_at', { ascending: false })
    .limit(8);

  const serializedPosts = (recentPosts || []).map((post) => ({
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
      <HomeClient recentPosts={serializedPosts} />
    </div>
  );
}
