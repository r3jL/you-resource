'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface AnswerProps {
  resource: {
    id: string;
    url: string;
    description: string;
    language: string;
    price: string;
    type: string;
    submittedBy: string;
    votes: number;
    createdAt: string;
  };
}

const THUMB_PALETTE: Record<string, [string, string]> = {
  course:  ['#C17F3A', '#8A4F1F'],
  pdf:     ['#5B8DEF', '#3B5CB8'],
  video:   ['#F472B6', '#A8366E'],
  book:    ['#34D399', '#0F8466'],
  paper:   ['#A78BFA', '#6E5BC8'],
  code:    ['#4ECDC4', '#1F8A82'],
};

function typeToThumb(type: string): string {
  const t = type?.toLowerCase();
  if (t === 'video') return 'video';
  if (t === 'pdf') return 'pdf';
  if (t === 'book') return 'book';
  if (t === 'article') return 'paper';
  if (t === 'course') return 'course';
  return 'code';
}

function ThumbPlaceholder({ kind }: { kind: string }) {
  const [a, b] = THUMB_PALETTE[kind] || THUMB_PALETTE.course;
  return (
    <div style={{
      width: '100%', aspectRatio: '16/9', borderRadius: 10,
      background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
      position: 'relative', overflow: 'hidden',
      border: '1px solid var(--border-soft)',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 18px)',
      }} />
      <div style={{
        position: 'absolute', top: 9, left: 11,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5,
        color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '.06em',
      }}>{kind}</div>
    </div>
  );
}

function TypeBadge({ children, kind = 'type' }: { children: React.ReactNode; kind?: string }) {
  const variants: Record<string, { c: string; bg: string; bd: string }> = {
    type:     { c: '#C8956A', bg: 'rgba(200,149,106,0.10)', bd: 'rgba(200,149,106,0.28)' },
    free:     { c: '#34D399', bg: 'rgba(52,211,153,0.10)',  bd: 'rgba(52,211,153,0.28)' },
    paid:     { c: '#F87171', bg: 'rgba(248,113,113,0.10)', bd: 'rgba(248,113,113,0.28)' },
    language: { c: '#9A7A62', bg: 'rgba(154,122,98,0.10)',  bd: 'rgba(154,122,98,0.28)' },
  };
  const v = variants[kind] || variants.type;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 9px', borderRadius: 6,
      background: v.bg, border: `1px solid ${v.bd}`, color: v.c,
      fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 500,
      letterSpacing: '.02em',
    }}>{children}</span>
  );
}

export default function AnswerCard({ resource }: AnswerProps) {
  const { isSignedIn } = useUser();
  const [votes, setVotes] = useState(resource.votes);
  const [userVote, setUserVote] = useState<1 | -1 | 0>(0);
  const [voting, setVoting] = useState(false);

  const handleVote = async (dir: 1 | -1) => {
    if (voting || !isSignedIn) return;
    setVoting(true);
    try {
      const direction = dir === 1 ? 'up' : 'down';
      const res = await fetch(`/api/resources/${resource.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction }),
      });
      if (res.ok) {
        const data = await res.json();
        setVotes(data.votes);
        setUserVote(data.userVote === 'up' ? 1 : data.userVote === 'down' ? -1 : 0);
      }
    } finally {
      setVoting(false);
    }
  };

  const kind = typeToThumb(resource.type);
  const urlDisplay = resource.url.replace(/^https?:\/\//, '').slice(0, 64);
  const formattedDate = new Date(resource.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const voteBtn = (dir: 1 | -1) => ({
    width: 30, height: 30, borderRadius: 8,
    display: 'grid' as const, placeItems: 'center' as const,
    background: userVote === dir ? 'rgba(193,127,58,0.16)' : 'transparent',
    border: userVote === dir ? '1px solid rgba(193,127,58,0.35)' : '1px solid var(--border-soft)',
    color: userVote === dir ? 'var(--amber)' : 'var(--muted)',
    cursor: isSignedIn ? 'pointer' : 'default',
    transition: 'all .15s',
    opacity: voting ? 0.5 : 1,
  } as React.CSSProperties);

  return (
    <div className="answer-card">
      {/* Vote column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <button style={voteBtn(1)} onClick={() => handleVote(1)} disabled={voting || !isSignedIn} aria-label="Upvote">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5l7 8H5z"/>
          </svg>
        </button>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 13,
          color: userVote !== 0 ? 'var(--amber)' : 'var(--fg)',
        }}>{votes}</span>
        <button style={voteBtn(-1)} onClick={() => handleVote(-1)} disabled={voting || !isSignedIn} aria-label="Downvote">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19l-7-8h14z"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Link preview card */}
        <div style={{
          display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14,
          padding: 12, borderRadius: 10,
          background: 'rgba(255,255,255,0.018)',
          border: '1px solid var(--border-soft)',
          marginBottom: 12,
        }}>
          <ThumbPlaceholder kind={kind} />
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14.5,
              color: 'var(--fg)', marginBottom: 4, lineHeight: 1.35,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            } as React.CSSProperties}>
              {resource.type} resource
            </div>
            {resource.description && (
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 12.5, color: 'var(--muted)',
                lineHeight: 1.45, marginBottom: 8,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              } as React.CSSProperties}>{resource.description}</div>
            )}
            <a href={resource.url} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5,
              color: 'var(--amber)', textDecoration: 'none',
            }}>
              {urlDisplay}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 5h5v5"/><path d="M19 5 10 14"/><path d="M19 13v6H5V5h6"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          <TypeBadge kind="type">{resource.type || 'Link'}</TypeBadge>
          <TypeBadge kind={resource.price?.toLowerCase() === 'free' ? 'free' : 'paid'}>{resource.price}</TypeBadge>
          {resource.language && <TypeBadge kind="language">{resource.language}</TypeBadge>}
        </div>

        {/* Footer */}
        <div style={{
          paddingTop: 10, borderTop: '1px solid var(--border-soft)',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--dim)',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>Submitted by <span style={{ color: 'var(--muted)' }}>{resource.submittedBy}</span></span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
