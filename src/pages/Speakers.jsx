import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Twitter, Linkedin, Globe, Mic } from 'lucide-react'
import { Link } from 'react-router-dom'

function FadeIn({ children, delay = 0 }) {
    const ref = useRef()
    const inView = useInView(ref, { once: true, margin: '-60px' })
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    )
}

/* Placeholder speakers — replace with real data */
const SPEAKERS = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: 'SPEAKER TBD',
    role: 'Próximamente',
    bio: 'La información sobre este ponente se anunciará en los próximos meses. Seguí nuestras redes para estar al tanto.',
    topic: 'Por confirmar',
    country: 'Uruguay / LATAM',
    twitter: null,
    linkedin: null,
    website: null,
    confirmed: false,
}))

export default function Speakers() {
    return (
        <main style={{ paddingTop: 'var(--nav-h)' }}>
            {/* Header */}
            <section style={{ background: 'var(--black)', padding: '80px 0 60px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(247,147,26,0.07) 0%, transparent 60%)' }} />
                <div className="container" style={{ position: 'relative' }}>
                    <FadeIn>
                        <div className="section-label">Ponentes</div>
                        <h1 className="section-title">SPEAKERS</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 560 }}>
                            Referentes del ecosistema Bitcoin latinoamericano y global. Los confirmaremos a medida que se sumen.
                        </p>
                    </FadeIn>

                    {/* CTA announce */}
                    <FadeIn delay={0.15}>
                        <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                            <div className="tag">
                                <div className="tag-dot" />
                                Anuncios próximamente
                            </div>
                            <Link to="/contacto" className="btn-ghost" style={{ fontSize: 12, padding: '8px 18px' }}>
                                Quiero ser speaker
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Stats bar */}
            <section style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
                        {[
                            { num: '20+', label: 'Speakers esperados' },
                            { num: '5', label: 'Días de evento' },
                            { num: '∞', label: 'Inspiración' },
                        ].map((s, i) => (
                            <div key={i}>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--btc)' }}>{s.num}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Speakers grid */}
            <section className="section" style={{ background: 'var(--black)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
                        {SPEAKERS.map((sp, i) => (
                            <FadeIn key={sp.id} delay={(i % 4) * 0.08}>
                                <SpeakerCard speaker={sp} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to speakers */}
            <section style={{ background: 'var(--surface)', padding: '80px 0', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
                    <FadeIn>
                        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--btc-subtle)', border: '1px solid var(--border-hot)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--btc)', margin: '0 auto 24px' }}>
                            <Mic size={22} />
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 16 }}>
                            ¿QUERÉS SER SPEAKER?
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
                            Si tenés algo valioso que aportar al ecosistema Bitcoin uruguayo y latinoamericano, nos encantaría escucharte.
                        </p>
                        <Link to="/contacto" className="btn-primary">
                            Proponer charla
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </main>
    )
}

function SpeakerCard({ speaker }) {
    return (
        <div
            style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                transition: 'border-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hot)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
            {/* Avatar placeholder */}
            <div style={{
                width: '100%',
                aspectRatio: '1',
                background: 'var(--surface-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid var(--border)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Grid pattern */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }} />
                <div style={{
                    position: 'relative',
                    width: 72, height: 72,
                    borderRadius: '50%',
                    background: 'var(--surface-2)',
                    border: '1px dashed var(--border-hot)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--btc-dim)',
                    fontSize: 28,
                }}>
                    ?
                </div>
                {!speaker.confirmed && (
                    <div style={{
                        position: 'absolute',
                        top: 12, right: 12,
                        background: 'rgba(247,147,26,0.1)',
                        border: '1px solid var(--border-hot)',
                        borderRadius: 999,
                        padding: '3px 10px',
                        fontSize: 10,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--btc)',
                        letterSpacing: '0.1em',
                    }}>
                        TBD
                    </div>
                )}
            </div>

            {/* Info */}
            <div style={{ padding: 24 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.04em', marginBottom: 4 }}>
                    {speaker.name}
                </h3>
                <p style={{ color: 'var(--btc)', fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 8 }}>
                    {speaker.role}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                    {speaker.bio}
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                    {speaker.twitter && (
                        <a href={speaker.twitter} target="_blank" rel="noopener noreferrer"
                            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--btc)'; e.currentTarget.style.color = 'var(--btc)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                        >
                            <Twitter size={13} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}