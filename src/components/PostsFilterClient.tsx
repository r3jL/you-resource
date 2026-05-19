'use client';

import { useState, useMemo } from 'react';
import PostCard from './PostCard';

interface Post {
  id: string; title: string; description: string; subject: string;
  topics: string; authorName: string; createdAt: string;
  _count: { resources: number };
}

export default function PostsFilterClient({ posts, subjects }: { posts: Post[]; subjects: string[] }) {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const allSubjects = useMemo(() => ['All', ...subjects], [subjects]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const okSubj = selectedSubject === 'All' || p.subject === selectedSubject;
      const q = search.trim().toLowerCase();
      const okSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.topics.toLowerCase().includes(q);
      return okSubj && okSearch;
    });
  }, [posts, selectedSubject, search]);

  return (
    <div>
      {/* Search input */}
      <div style={{ marginBottom: 22 }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'stretch',
          background: 'var(--input-bg)', border: '1px solid var(--border)',
          borderRadius: 12, padding: 5, marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', color: 'var(--muted)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
            </svg>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, description, or tags..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: 'var(--fg)',
              padding: '9px 0',
            }}
          />
        </div>

        {/* Subject filter chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {allSubjects.map((s) => {
            const active = selectedSubject === s;
            return (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                style={{
                  padding: '6px 13px', borderRadius: 999,
                  background: active ? 'rgba(193,127,58,0.16)' : 'rgba(255,255,255,0.018)',
                  border: active ? '1px solid rgba(193,127,58,0.40)' : '1px solid var(--border-soft)',
                  color: active ? 'var(--amber)' : 'var(--fg-soft)',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5, fontWeight: 500,
                  cursor: 'pointer', letterSpacing: '.02em', transition: 'all .15s',
                }}
              >{s}</button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{
          padding: '56px 28px', textAlign: 'center', borderRadius: 16,
          background: 'var(--card-bg)', border: '1px dashed var(--border)',
        }}>
          <div style={{ color: 'var(--muted)', marginBottom: 16 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
              <circle cx="12" cy="12" r="9"/>
              <path d="M9 10h.01M15 10h.01"/><path d="M8.5 16c1-1.2 2.2-1.8 3.5-1.8s2.5.6 3.5 1.8"/>
            </svg>
          </div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 19, color: 'var(--fg)', margin: '0 0 6px 0' }}>No posts match these filters</h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: 'var(--muted)', margin: '0 auto 18px', maxWidth: 360 }}>
            Try clearing the search or selecting a different subject.
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
          {filtered.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              subject={post.subject}
              topics={post.topics}
              authorName={post.authorName}
              createdAt={post.createdAt}
              resourceCount={post._count.resources}
            />
          ))}
        </div>
      )}
    </div>
  );
}
