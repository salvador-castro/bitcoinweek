import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, Mic, ChevronDown, ChevronUp } from 'lucide-react'

function FadeIn({ children, delay = 0 }) {
    const ref = useRef()
    const inView = useInView(ref, { once: true, margin: '-60px' })
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    )
}

const DAYS = [
    {
        date: '18 May',
        weekday: 'Lunes',
        theme: 'Apertura',
        color: '#F7931A',
        events: [
            { time: '18:00', title: 'Ceremonia de Apertura', type: 'Keynote', venue: 'Sede principal · TBD', speaker: 'Organizadores Bitcoin Week UY', desc: 'Bienvenida oficial al evento y presentación de la semana.' },
            { time: '19:30', title: 'Panel Inaugural: Bitcoin en Latinoamérica', type: 'Panel', venue: 'Sede principal · TBD', speaker: 'Múltiples ponentes', desc: 'Estado del ecosistema Bitcoin en la región y perspectivas para 2026.' },
        ],
    },
    {
        date: '19 May',
        weekday: 'Martes',
        theme: 'Tecnología',
        color: '#c47314',
        events: [
            { time: '10:00', title: 'Taller: Lightning Network desde cero', type: 'Workshop', venue: 'Sede técnica · TBD', speaker: 'TBD', desc: 'Introducción práctica al protocolo Lightning y cómo correr un nodo.' },
            { time: '14:00', title: 'Charla: Bitcoin y privacidad', type: 'Charla', venue: 'Sede técnica · TBD', speaker: 'TBD', desc: 'Herramientas y buenas prácticas para preservar la privacidad en transacciones.' },
            { time: '17:00', title: 'Mesa redonda: Custodia y self-custody', type: 'Panel', venue: 'Sede técnica · TBD', speaker: 'Múltiples ponentes', desc: 'No tus llaves, no tus bitcoins. Mejores prácticas de custodia.' },
        ],
    },
    {
        date: '20 May',
        weekday: 'Miércoles',
        theme: 'Economía',
        color: '#F7931A',
        events: [
            { time: '10:00', title: 'Bitcoin como reserva de valor', type: 'Charla', venue: 'Sede económica · TBD', speaker: 'TBD', desc: 'Análisis del Bitcoin como activo de largo plazo en un mundo inflacionario.' },
            { time: '13:00', title: 'Bitcoin y el sistema financiero uruguayo', type: 'Panel', venue: 'Sede económica · TBD', speaker: 'Múltiples ponentes', desc: 'Regulación, bancarización y convivencia con el sistema tradicional.' },
            { time: '16:00', title: 'Caso de uso: empresas que aceptan Bitcoin en UY', type: 'Charla', venue: 'Sede económica · TBD', speaker: 'TBD', desc: 'Experiencias reales de negocios uruguayos que adoptaron Bitcoin.' },
        ],
    },
    {
        date: '21 May',
        weekday: 'Jueves',
        theme: 'Comunidad',
        color: '#c47314',
        events: [
            { time: '10:00', title: 'Encuentro de comunidades', type: 'Networking', venue: 'Múltiples sedes', speaker: 'Comunidades Bitcoin UY', desc: 'Espacio libre para que las distintas comunidades del ecosistema se encuentren.' },
            { time: '14:00', title: 'Bitcoin para el público general', type: 'Charla', venue: 'Sede comunitaria · TBD', speaker: 'TBD', desc: 'Introducción accesible a Bitcoin sin tecnicismos.' },
            { time: '18:00', title: 'Social: Bitcoin Pizza Night', type: 'Social', venue: 'TBD', speaker: '', desc: 'Celebración del Bitcoin Pizza Day con pizza y conversación.' },
        ],
    },
    {
        date: '22 May',
        weekday: 'Viernes',
        theme: 'Bitcoin Pizza Day',
        color: '#F7931A',
        events: [
            { time: '10:00', title: 'Historia del Bitcoin Pizza Day', type: 'Keynote', venue: 'Sede principal · TBD', speaker: 'TBD', desc: 'El día que 10.000 BTC valían dos pizzas. Retrospectiva y reflexión.' },
            { time: '12:00', title: 'Panel: El futuro de Bitcoin en Uruguay', type: 'Panel', venue: 'Sede principal · TBD', speaker: 'Múltiples ponentes', desc: 'Qué queremos construir desde Uruguay para los próximos años.' },
            { time: '17:00', title: 'Ceremonia de Cierre', type: 'Cierre', venue: 'Sede principal · TBD', speaker: 'Organizadores', desc: 'Conclusiones, agradecimientos y anuncio de la próxima edición.' },
        ],
    },
]

const TYPE_COLOR = {
    'Keynote': '#F7931A',
    'Panel': '#7B61FF',
    'Workshop': '#22C55E',
    'Charla': '#3B9EFF',
    'Networking': '#F97316',
    'Social': '#EC4899',
    'Cierre': '#F7931A',
}

export default function Agenda() {
    const [activeDay, setActiveDay] = useState(0)
    const [expanded, setExpanded] = useState({})

    const toggleExpand = (key) => setExpanded(p => ({ ...p, [key]: !p[key] }))

    return (
        <main style={{ paddingTop: 'var(--nav-h)' }}>
            {/* Header */}
            <section style={{ background: 'var(--black)', padding: '80px 0 60px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(247,147,26,0.07) 0%, transparent 60%)' }} />
                <div className="container" style={{ position: 'relative' }}>
                    <FadeIn>
                        <div className="section-label">Programa</div>
                        <h1 className="section-title">AGENDA</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 560 }}>
                            Cinco días de charlas, talleres, paneles y encuentros a lo largo de Montevideo. El programa detallado se confirmará próximamente.
                        </p>
                    </FadeIn>
                    {/* Date tag */}
                    <FadeIn delay={0.1}>
                        <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14 }}>
                                <Calendar size={14} style={{ color: 'var(--btc)' }} />
                                18–22 Mayo 2026
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 14 }}>
                                <MapPin size={14} style={{ color: 'var(--btc)' }} />
                                Montevideo, Uruguay
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Day tabs */}
            <section style={{ background: 'var(--surface)', position: 'sticky', top: 'var(--nav-h)', zIndex: 100, borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <div style={{ display: 'flex', overflowX: 'auto', gap: 0 }}>
                        {DAYS.map((day, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveDay(i)}
                                style={{
                                    padding: '20px 28px',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                    whiteSpace: 'nowrap',
                                    color: activeDay === i ? 'var(--btc)' : 'var(--text-secondary)',
                                    borderBottom: activeDay === i ? '2px solid var(--btc)' : '2px solid transparent',
                                    transition: 'all 0.2s',
                                    background: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <span style={{ display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)', opacity: 0.6, marginBottom: 2 }}>{day.weekday}</span>
                                {day.date}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Day content */}
            <section className="section" style={{ background: 'var(--black)' }}>
                <div className="container">
                    <motion.div
                        key={activeDay}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Day header */}
                        <div style={{ marginBottom: 48, display: 'flex', alignItems: 'baseline', gap: 24, borderLeft: `3px solid ${DAYS[activeDay].color}`, paddingLeft: 24 }}>
                            <div>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 64px)', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
                                    {DAYS[activeDay].date} · {DAYS[activeDay].weekday}
                                </h2>
                                <p style={{ color: 'var(--btc)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>
                                    Temática: {DAYS[activeDay].theme}
                                </p>
                            </div>
                        </div>

                        {/* Events list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {DAYS[activeDay].events.map((ev, i) => {
                                const key = `${activeDay}-${i}`
                                const isOpen = expanded[key]
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        onClick={() => toggleExpand(key)}
                                        style={{
                                            background: 'var(--surface)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            transition: 'border-color 0.2s',
                                            overflow: 'hidden',
                                            borderLeft: isOpen ? `3px solid ${TYPE_COLOR[ev.type] || 'var(--btc)'}` : '1px solid var(--border)',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hot)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = isOpen ? `${TYPE_COLOR[ev.type] || 'var(--btc)'}` : 'var(--border)'}
                                    >
                                        {/* Row */}
                                        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--btc)', minWidth: 60, fontWeight: 500 }}>
                                                {ev.time}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 4 }}>
                                                    {ev.title}
                                                </h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                                                    <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 999, background: `${TYPE_COLOR[ev.type]}20`, color: TYPE_COLOR[ev.type] || 'var(--btc)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
                                                        {ev.type}
                                                    </span>
                                                    {ev.venue && (
                                                        <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                            <MapPin size={10} /> {ev.venue}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{ color: 'var(--text-muted)' }}>
                                                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </div>
                                        </div>

                                        {/* Expandable */}
                                        <AnimatedExpand open={isOpen}>
                                            <div style={{ padding: '0 24px 20px', paddingLeft: 108, borderTop: '1px solid var(--border)' }}>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginTop: 16 }}>
                                                    {ev.desc}
                                                </p>
                                                {ev.speaker && (
                                                    <p style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        <Mic size={11} /> {ev.speaker}
                                                    </p>
                                                )}
                                            </div>
                                        </AnimatedExpand>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Coming soon notice */}
            <section style={{ background: 'var(--surface)', padding: '60px 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <div className="container">
                    <FadeIn>
                        <div className="tag" style={{ margin: '0 auto 16px', display: 'inline-flex' }}>
                            <div className="tag-dot" />
                            Programa en construcción
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 8 }}>
                            El programa completo se anunciará en los próximos meses. Suscribite para recibir las novedades.
                        </p>
                    </FadeIn>
                </div>
            </section>
        </main>
    )
}

function AnimatedExpand({ open, children }) {
    return (
        <motion.div
            initial={false}
            animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
        >
            {children}
        </motion.div>
    )
}