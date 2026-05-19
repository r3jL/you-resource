'use client';

import { useState, useCallback } from 'react';
import AnswerCard from './AnswerCard';
import AddAnswerForm from './AddAnswerForm';

interface Resource {
  id: string; url: string; description: string;
  language: string; price: string; type: string; submittedBy: string;
  votes: number; createdAt: string;
}

export default function RealtimePost({ postId, initialResources }: {
  postId: string; initialResources: Resource[];
}) {
  const [resources, setResources] = useState<Resource[]>(initialResources);

  const fetchResources = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts/${postId}`);
      if (res.ok) {
        const post = await res.json();
        setResources((post.resources || []).map((r: Record<string, unknown>) => ({
          id: r.id as string, url: r.url as string, description: r.description as string,
          language: r.language as string, price: r.price as string, type: r.type as string,
          submittedBy: r.submitted_by as string, votes: r.votes as number, createdAt: r.created_at as string,
        })));
      }
    } catch { /* ignore */ }
  }, [postId]);

  const sorted = [...resources].sort((a, b) => b.votes - a.votes);

  return (
    <>
      <h2 style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22,
        color: 'var(--fg)', margin: '0 0 16px 0', letterSpacing: '-0.01em',
      }}>
        {resources.length} {resources.length === 1 ? 'Answer' : 'Answers'}
      </h2>

      {resources.length === 0 ? (
        <div style={{
          padding: '56px 28px', textAlign: 'center', borderRadius: 16,
          background: 'var(--card-bg)', border: '1px dashed var(--border)',
          marginBottom: 24,
        }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14.5, color: 'var(--muted)', margin: 0 }}>
            No answers yet. Be the first to share a resource!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {sorted.map(resource => (
            <AnswerCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      <AddAnswerForm postId={postId} onResourceAdded={fetchResources} />
    </>
  );
}
