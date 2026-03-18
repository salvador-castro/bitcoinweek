import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, ExternalLink, Calendar } from 'lucide-react'

function FadeIn({ children, delay = 0 }) {
    const ref = useRef()
    const inView = useInView(ref, { once: true, margin: '-60px' })
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    )
}

/* Placeholder venues — all in Montevideo */
const VENUES = [
    {
        id: 1,
        name: 'Sede Principal',
        area: 'Ciudad Vieja',
        address: 'Por confirmar · Ciudad Vieja, Montevideo',
        desc: 'Sede principal del evento. Aquí se realizarán las keynotes y la ceremonia de apertura y cierre.',
        days: ['Lunes 18', 'Viernes 22'],
        capacity: '200+',
        lat: -34.9059,
        lng: -56.2011,
        color: '#F7931A',
        type: 'Principal',
        mapLink: 'https://maps.google.com/?q=Ciudad+Vieja+Montevideo',
    },
    {
        id: 2,
        name: 'Sede Técnica',
        area: 'Palermo',
        address: 'Por confirmar · Palermo, Montevideo',
        desc: 'Espacio dedicado a talleres técnicos, charlas sobre tecnología Bitcoin y workshops de Lightning Network.',
        days: ['Martes 19'],
        capacity: '80',
        lat: -34.8995,
        lng: -56.1804,
        color: '#3B9EFF',
        type: 'Técnica',
        mapLink: 'https://maps.google.com/?q=Palermo+Montevideo',
    },
    {
        id: 3,
        name: 'Sede Económica',
        area: 'Centro',
        address: 'Por confirmar · Centro, Montevideo',
        desc: 'Paneles y conversaciones sobre economía Bitcoin, regulación y el sistema financiero uruguayo.',
        days: ['Miércoles 20'],
        capacity: '120',
        lat: -34.9061,
        lng: -56.1895,
        color: '#22C55E',
        type: 'Económica',
        mapLink: 'https://maps.google.com/?q=Centro+Montevideo',
    },
    {
        id: 4,
        name: 'Sede Comunitaria',
        area: 'Cordón',
        address: 'Por confirmar · Cordón, Montevideo',
        desc: 'Meetups, encuentros de comunidad y el espacio para el público general.',
        days: ['Jueves 21'],
        capacity: '100',
        lat: -34.9032,
        lng: -56.1848,
        color: '#EC4899',
        type: 'Comunitaria',
        mapLink: 'https://maps.google.com/?q=Cordon+Montevideo',
    },
    {
        id: 5,
        name: 'Bitcoin Pizza Night',
        area: 'A confirmar',
        address: 'Por confirmar · Montevideo',
        desc: 'Celebración especial del Bitcoin Pizza Day. Evento social abierto a toda la comunidad.',
        days: ['Jueves 21 (noche)'],
        capacity: '150',
        lat: -34.9150,
        lng: -56.1650,
        color: '#F97316',
        type: 'Social',
        mapLink: 'https://maps.google.com/?q=Montevideo+Uruguay',
    },
]

export default function Venues() {
    const [active, setActive] = useState(0)

    return (
        <main style={{ paddingTop: 'var(--nav-h)' }}>
            {/* Header */}
            <section style={{ background: 'var(--black)', padding: '80px 0 60px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 30% 100%, rgba(247,147,26,0.06) 0%, transparent 60%)' }} />
                <div className="container" style={{ position: 'relative' }}>
                    <FadeIn>
                        <div className="section-label">Ubicaciones</div>
                        <h1 className="section-title">SEDES</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 560 }}>
                            Bitcoin Week Uruguay se distribuye por distintos puntos de Montevideo. Cada sede tiene su propia personalidad y temática.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Map + list */}
            <section className="section" style={{ background: 'var(--black)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'start' }}>

                        {/* Left: list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {VENUES.map((v, i) => (
                                <FadeIn key={v.id} delay={i * 0.08}>
                                    <div
                                        onClick={() => setActive(i)}
                                        style={{
                                            padding: '24px',
                                            background: active === i ? 'var(--surface)' : 'transparent',
                                            border: `1px solid ${active === i ? v.color + '60' : 'var(--border)'}`,
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s',
                                            borderLeft: active === i ? `3px solid ${v.color}` : `1px solid ${active === i ? v.color + '60' : 'var(--border)'}`,
                                        }}
                                        onMouseEnter={e => { if (active !== i) e.currentTarget.style.borderColor = 'var(--border-hot)' }}
                                        onMouseLeave={e => { if (active !== i) e.currentTarget.style.borderColor = 'var(--border)' }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: v.color, flexShrink: 0 }} />
                                                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: v.color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{v.type}</span>
                                                </div>
                                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.04em', color: active === i ? 'var(--text-primary)' : 'var(--text-primary)', marginBottom: 4 }}>
                                                    {v.name}
                                                </h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 13 }}>
                                                    <MapPin size={11} style={{ color: v.color }} />
                                                    {v.area}
                                                </div>
                                            </div>
                                            {active === i && (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                    <a href={v.mapLink} target="_blank" rel="noopener noreferrer"
                                                        style={{ color: v.color, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
                                                        onClick={e => e.stopPropagation()}
                                                    >
                                                        <ExternalLink size={12} />
                                                    </a>
                                                </motion.div>
                                            )}
                                        </div>

                                        {active === i && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginTop: 12 }}>{v.desc}</p>
                                                <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
                                                    <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <Calendar size={11} /> {v.days.join(', ')}
                                                    </span>
                                                    <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <Clock size={11} /> Capacidad: {v.capacity}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>

                        {/* Right: Map */}
                        <div style={{ position: 'sticky', top: 120 }}>
                            <FadeIn delay={0.2}>
                                <div style={{
                                    borderRadius: 'var(--radius-md)',
                                    overflow: 'hidden',
                                    border: '1px solid var(--border)',
                                    background: 'var(--surface)',
                                }}>
                                    {/* Map header */}
                                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <MapPin size={14} style={{ color: 'var(--btc)' }} />
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                                                Montevideo, Uruguay
                                            </span>
                                        </div>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
                                            {VENUES[active].area}
                                        </span>
                                    </div>

                                    {/* Embedded Google Maps */}
                                    <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--surface-3)' }}>
                                        <iframe
                                            title="Mapa Bitcoin Week Uruguay"
                                            src={`https://maps.google.com/maps?q=Montevideo+Uruguay&z=14&output=embed&t=&ll=-34.9058,-56.1882`}
                                            style={{ width: '100%', height: '100%', border: 'none', filter: 'grayscale(0.8) invert(0.9) hue-rotate(180deg)', opacity: 0.9 }}
                                            loading="lazy"
                                            allowFullScreen={false}
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                        {/* Overlay pins */}
                                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <motion.div
                                                key={active}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 4,
                                                }}
                                            >
                                                <div style={{
                                                    background: VENUES[active].color,
                                                    color: 'black',
                                                    padding: '6px 14px',
                                                    borderRadius: 999,
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    fontFamily: 'var(--font-body)',
                                                    boxShadow: `0 4px 20px ${VENUES[active].color}60`,
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {VENUES[active].name}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Selected venue info */}
                                    <div style={{ padding: '20px 24px' }}>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 4, color: VENUES[active].color }}>
                                            {VENUES[active].name}
                                        </h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>
                                            {VENUES[active].address}
                                        </p>
                                        <a
                                            href={VENUES[active].mapLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-ghost"
                                            style={{ fontSize: 11, padding: '8px 16px', display: 'inline-flex', gap: 6 }}
                                        >
                                            <ExternalLink size={11} /> Ver en Google Maps
                                        </a>
                                    </div>
                                </div>

                                {/* Legend */}
                                <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                    {VENUES.map((v, i) => (
                                        <button key={i} onClick={() => setActive(i)} style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            padding: '6px 12px',
                                            background: active === i ? 'var(--surface)' : 'transparent',
                                            border: `1px solid ${active === i ? v.color + '60' : 'var(--border)'}`,
                                            borderRadius: 999,
                                            color: active === i ? v.color : 'var(--text-muted)',
                                            fontSize: 11,
                                            fontFamily: 'var(--font-mono)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }}>
                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: v.color }} />
                                            {v.area}
                                        </button>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notice */}
            <section style={{ background: 'var(--surface)', padding: '60px 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <div className="container">
                    <FadeIn>
                        <div className="tag" style={{ margin: '0 auto 16px', display: 'inline-flex' }}>
                            <div className="tag-dot" />
                            Sedes en proceso de confirmación
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 8 }}>
                            Las ubicaciones exactas se confirmarán próximamente. Seguinos para no perderte ningún anuncio.
                        </p>
                    </FadeIn>
                </div>
            </section>
        </main>
    )
}