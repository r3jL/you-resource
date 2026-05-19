'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import PostCard from './PostCard';

interface Post {
  id: string;
  title: string;
  description: string;
  subject: string;
  topics: string;
  authorName: string;
  createdAt: string;
  resourceCount: number;
}

interface HomeClientProps {
  recentPosts: Post[];
}

export default function HomeClient({ recentPosts }: HomeClientProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState('');

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSubmitted(query.trim());
    try {
      const res = await fetch(`/api/posts?search=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <>
      {/* Hero */}
      <section style={{
        position: 'relative',
        background: 'var(--hero-bg)',
        border: '1px solid var(--border)',
        borderRadius: 18, padding: '56px 40px 48px',
        overflow: 'hidden', marginBottom: 36,
      }}>
        {/* Dot grid */}
        <div className="hero-grid" style={{
          position: 'absolute', inset: 0, opacity: 0.5,
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
        }} />
        {/* Amber glow */}
        <div style={{
          position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
          width: 720, height: 280,
          background: 'radial-gradient(ellipse at center, rgba(193,127,58,0.30) 0%, rgba(193,127,58,0) 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 12px', borderRadius: 999,
            background: 'rgba(200,149,106,0.10)',
            border: '1px solid rgba(200,149,106,0.25)',
            color: 'var(--amber)',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, fontWeight: 500,
            letterSpacing: '.06em', marginBottom: 22,
          }}>
            ✦ COMMUNITY STUDY PLATFORM
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05,
            letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 18px 0',
          }}>
            Find Study Resources,{' '}
            <span className="gold-text">Faster</span>
          </h1>

          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 17, lineHeight: 1.5,
            color: 'var(--muted)', margin: '0 auto 0', maxWidth: 560,
          }}>
            Search community-curated study resources, or request new ones. Our AI classifies requests so the right people can help.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{
            marginTop: 32, display: 'flex', gap: 10, alignItems: 'stretch',
            background: 'var(--input-bg)',
            border: '1px solid var(--border)',
            borderRadius: 14, padding: 6,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 14px', color: 'var(--muted)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by subject, topic, or keyword..."
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: 'DM Sans, sans-serif', fontSize: 14.5, color: 'var(--fg)',
                padding: '12px 0',
              }}
            />
            <button type="submit" className="btn-amber" style={{ padding: '10px 22px', borderRadius: 10, fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14 }} disabled={loading}>
              {loading ? (
                <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3"/>
                  <path d="M21 12a9 9 0 0 1-9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              ) : 'Search'}
            </button>
          </form>
        </div>
      </section>

      {/* Search results */}
      {results !== null && (
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22, color: 'var(--fg)',
              margin: 0, letterSpacing: '-0.01em',
            }}>Search results</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--muted)' }}>
                {results.length} matching &ldquo;{submitted}&rdquo;
              </span>
              <button
                onClick={() => { setResults(null); setQuery(''); setSubmitted(''); }}
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}
              >Clear</button>
            </div>
          </div>

          {results.length === 0 ? (
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
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 19, color: 'var(--fg)', margin: '0 0 6px 0' }}>No matches found</h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: 'var(--muted)', margin: '0 auto 18px', maxWidth: 360 }}>
                Nothing in the community library yet. Want to ask for it?
              </p>
              <Link href="/request" className="btn-amber" style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, textDecoration: 'none' }}>
                Request Resources
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))' }}>
              {results.map((p) => (
                <PostCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  description={p.description}
                  subject={p.subject}
                  topics={p.topics}
                  authorName={p.authorName}
                  createdAt={p.createdAt}
                  resourceCount={p.resourceCount ?? 0}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Recent Requests */}
      <section>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22, color: 'var(--fg)',
            margin: 0, letterSpacing: '-0.01em',
          }}>Recent Requests</h2>
          <a href="/posts" style={{
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 13.5,
            color: 'var(--amber)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4,
            textDecoration: 'none',
          }}>
            Browse all
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
            </svg>
          </a>
        </div>

        {recentPosts.length === 0 ? (
          <div style={{
            padding: '56px 28px', textAlign: 'center', borderRadius: 16,
            background: 'var(--card-bg)', border: '1px dashed var(--border)',
          }}>
            <div style={{ color: 'var(--muted)', marginBottom: 16 }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z"/>
                <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5H6.5"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 19, color: 'var(--fg)', margin: '0 0 6px 0' }}>No posts yet</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: 'var(--muted)', margin: '0 auto 18px', maxWidth: 360 }}>
              Be the first to ask the community for a study resource.
            </p>
            <Link href="/request" className="btn-amber" style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, textDecoration: 'none' }}>
              Request Resources
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid', gap: 16,
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          }}>
            {recentPosts.map((post) => (
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
      </section>
    </>
  );
}
