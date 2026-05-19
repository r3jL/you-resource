import Link from 'next/link';
import { getSubjectColors } from '@/lib/subjectColors';

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  subject: string;
  topics: string;
  authorName: string;
  createdAt: Date | string;
  resourceCount?: number;
}

export default function PostCard({
  id, title, description, subject, topics, authorName, createdAt, resourceCount = 0,
}: PostCardProps) {
  const colors = getSubjectColors(subject);
  let parsedTopics: string[] = [];
  try { parsedTopics = JSON.parse(topics); } catch { parsedTopics = []; }

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  const visibleTopics = parsedTopics.slice(0, 4);
  const overflow = parsedTopics.length - visibleTopics.length;

  return (
    <Link href={`/posts/${id}`} className="block group">
      <div className="post-card">
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 9px', borderRadius: 999,
            ...colors.style,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 500,
            letterSpacing: '.02em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.style.color, opacity: 0.9, flexShrink: 0 }} />
            {subject}
          </span>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--muted)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/>
              <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/>
            </svg>
            {resourceCount} {resourceCount === 1 ? 'resource' : 'resources'}
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 17, lineHeight: 1.3,
          color: 'var(--fg)', margin: '0 0 8px 0',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{title}</h3>

        {/* Description */}
        <p style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, lineHeight: 1.5,
          color: 'var(--muted)', margin: '0 0 14px 0',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{description}</p>

        {/* Topics */}
        {visibleTopics.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {visibleTopics.map((t) => (
              <span key={t} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '3px 9px', borderRadius: 999,
                background: 'rgba(200,149,106,0.07)',
                border: '1px solid rgba(200,149,106,0.20)',
                color: 'var(--amber)',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 11.5,
              }}>{t}</span>
            ))}
            {overflow > 0 && (
              <span style={{
                padding: '3px 9px', borderRadius: 999,
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(200,149,106,0.20)',
                color: 'var(--muted)',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: 11.5,
              }}>+{overflow} more</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{
          paddingTop: 12, borderTop: '1px solid var(--border-soft)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--dim)',
        }}>
          <span>by <span style={{ color: 'var(--muted)' }}>{authorName}</span></span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
