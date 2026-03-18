import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Calendar, Users, Mic, Building2, Send, Bitcoin, ChevronDown } from 'lucide-react'
import confetti from 'canvas-confetti'
import CalendarButton from '../components/CalendarButton'

/* ── Mailchimp JSONP ── */
const MAILCHIMP_URL = 'https://gmail.us12.list-manage.com/subscribe/post-json?u=88b29d5e90032b558d0f0fb95&id=0966db89bf&f_id=0009c4e1f0'

function subscribeMailchimp(email) {
    return new Promise((resolve, reject) => {
        const cb = 'mc_' + Date.now()
        const url = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}&c=${cb}`
        const script = document.createElement('script')
        script.src = url
        const t = setTimeout(() => { cleanup(); reject(new Error('Tiempo agotado')) }, 8000)
        const cleanup = () => { clearTimeout(t); delete window[cb]; script.parentNode?.removeChild(script) }
        window[cb] = (d) => {
            cleanup()
            if (d.result === 'success' || d.msg?.toLowerCase().includes('already subscribed')) resolve(d)
            else reject(new Error((d.msg || '').replace(/^\d+ - /, '')))
        }
        script.onerror = () => { cleanup(); reject(new Error('Error de conexión')) }
        document.body.appendChild(script)
    })
}

/* ── Floating bitcoin particle ── */
function BitcoinParticle({ style }) {
    return (
        <motion.div
            style={{ position: 'absolute', color: 'rgba(247,147,26,0.12)', fontSize: 18, userSelect: 'none', ...style }}
            animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
        >
            ₿
        </motion.div>
    )
}

/* ── Animated counter ── */
function Counter({ to, suffix = '' }) {
    const ref = useRef()
    const inView = useInView(ref, { once: true })
    const [val, setVal] = useState(0)
    useEffect(() => {
        if (!inView) return
        let start = 0
        const step = to / 50
        const timer = setInterval(() => {
            start += step
            if (start >= to) { setVal(to); clearInterval(timer) } else { setVal(Math.floor(start)) }
        }, 30)
        return () => clearInterval(timer)
    }, [inView, to])
    return <span ref={ref}>{val}{suffix}</span>
}

/* ── Section fade-in wrapper ── */
function FadeIn({ children, delay = 0, y = 30 }) {
    const ref = useRef()
    const inView = useInView(ref, { once: true, margin: '-80px' })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}

/* ── Sponsor placeholder ── */
const SPONSORS = [
    { name: 'SPONSOR ORO', tier: 'gold' },
    { name: 'SPONSOR ORO', tier: 'gold' },
    { name: 'SPONSOR PLATA', tier: 'silver' },
    { name: 'SPONSOR PLATA', tier: 'silver' },
    { name: 'SPONSOR PLATA', tier: 'silver' },
    { name: 'SPONSOR BRONCE', tier: 'bronze' },
    { name: 'SPONSOR BRONCE', tier: 'bronze' },
    { name: 'SPONSOR BRONCE', tier: 'bronze' },
]

const TIER_STYLE = {
    gold: { border: 'rgba(247,147,26,0.5)', color: '#F7931A', fontSize: 22 },
    silver: { border: 'rgba(180,180,180,0.3)', color: 'rgba(200,200,200,0.7)', fontSize: 16 },
    bronze: { border: 'rgba(140,90,40,0.3)', color: 'rgba(180,120,60,0.7)', fontSize: 13 },
}

export default function Home() {
    const { scrollY } = useScroll()
    const heroY = useTransform(scrollY, [0, 600], [0, 120])
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [errMsg, setErrMsg] = useState('')

    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!email) return
        setStatus('loading')
        setErrMsg('')
        try {
            await subscribeMailchimp(email)
            setStatus('success')
            setEmail('')
            confetti({ particleCount: 120, spread: 65, origin: { y: 0.6 }, colors: ['#F7931A', '#FFB119', '#ffffff'] })
        } catch (err) {
            setStatus('error')
            setErrMsg(err.message)
        }
    }

    return (
        <main>
            {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
            <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingBottom: 80 }}>

                {/* Background gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(247,147,26,0.12) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, var(--black) 100%)' }} />

                {/* Floating particles */}
                {[
                    { top: '18%', left: '8%' }, { top: '30%', right: '10%' },
                    { top: '60%', left: '15%' }, { top: '45%', right: '20%' },
                    { top: '70%', right: '8%' }, { top: '25%', left: '40%' },
                ].map((s, i) => <BitcoinParticle key={i} style={s} />)}

                {/* Diagonal grid */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: 'linear-gradient(rgba(247,147,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(247,147,26,0.03) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />

                <motion.div
                    className="container"
                    style={{ position: 'relative', zIndex: 1, y: heroY }}
                >
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}
                    >
                        <div className="tag">
                            <div className="tag-dot" />
                            Mayo 2026 · Montevideo
                        </div>
                        <span style={{ color: 'var(--text-muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
                            #BitcoinWeekUY
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h1 style={{ fontSize: 'clamp(72px, 16vw, 200px)', lineHeight: 0.9, marginBottom: 0, letterSpacing: '-0.01em' }}>
                            <span style={{ display: 'block', color: 'var(--text-primary)' }}>BITCOIN</span>
                            <span style={{ display: 'block', color: 'var(--btc)', WebkitTextStroke: '0px', textShadow: '0 0 80px rgba(247,147,26,0.4)' }}>WEEK</span>
                            <span style={{ display: 'block', color: 'var(--text-primary)' }}>URUGUAY</span>
                        </h1>
                    </motion.div>

                    {/* Sub info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 48, marginTop: 48, flexWrap: 'wrap' }}
                    >
                        <div style={{ maxWidth: 480 }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 18, lineHeight: 1.6, fontWeight: 300, marginBottom: 32 }}>
                                Una semana para reunir comunidad, conocimiento y visión.<br />
                                El encuentro de Bitcoin más importante de América Latina.
                            </p>
                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                <Link to="/agenda" className="btn-primary">
                                    Ver Agenda <ArrowRight size={15} />
                                </Link>
                                <CalendarButton className="btn-ghost" />
                                <Link to="/contacto" className="btn-ghost" style={{ display: 'none' }}>
                                    Quiero participar
                                </Link>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[
                                { icon: <Calendar size={14} />, text: '18–22 Mayo 2026' },
                                { icon: <MapPin size={14} />, text: 'Montevideo, Uruguay' },
                                { icon: <Users size={14} />, text: 'Comunidad abierta' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: 14 }}>
                                    <span style={{ color: 'var(--btc)' }}>{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}
                >
                    <span>SCROLL</span>
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ChevronDown size={14} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ STATS ══════════════════════════════════════════════════════ */}
            <section style={{ padding: '80px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
                        {[
                            { num: 5, suffix: ' días', label: 'De evento' },
                            { num: 20, suffix: '+', label: 'Speakers' },
                            { num: 500, suffix: '+', label: 'Asistentes esperados' },
                            { num: 10, suffix: '+', label: 'Sedes en Montevideo' },
                        ].map((s, i) => (
                            <div key={i} style={{ background: 'var(--surface-2)', padding: '40px 32px', textAlign: 'center' }}>
                                <div className="stat-number"><Counter to={s.num} suffix={s.suffix} /></div>
                                <p style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 8 }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <style>{`@media(max-width:768px){ .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
            </section>

            {/* ═══ MANIFIESTO ═════════════════════════════════════════════════ */}
            <section className="section" style={{ background: 'var(--black)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>
                        <div style={{ position: 'sticky', top: 120 }}>
                            <FadeIn>
                                <div className="section-label">Manifiesto</div>
                                <h2 className="section-title">SOBRE EL EVENTO</h2>
                                <div style={{ width: 48, height: 3, background: 'var(--btc)', marginBottom: 24 }} />
                                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
                                    Bitcoin Week Uruguay nace con el espíritu del Bitcoin Pizza Day: el instante en que una tecnología encontró su primer uso real.
                                </p>
                                <div style={{ marginTop: 32 }}>
                                    <Link to="/venues" className="btn-ghost">
                                        Ver sedes <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                            {[
                                {
                                    num: '01',
                                    title: 'Una Respuesta',
                                    text: 'Bitcoin nació como una respuesta frente a sistemas cerrados. Frente a la necesidad de recuperar confianza. Frente a la posibilidad de imaginar nuevas formas de intercambiar valor y construir libertad.',
                                },
                                {
                                    num: '02',
                                    title: 'Bitcoin Pizza Day',
                                    text: 'Cada 22 de mayo recordamos el momento en que una idea comenzó a convertirse en realidad cotidiana. Una tecnología abierta encontró su primera forma concreta de circulación.',
                                },
                                {
                                    num: '03',
                                    title: 'Construcción Colectiva',
                                    text: 'Bitcoin Week Uruguay no pertenece a una sola mirada. Es una construcción colectiva de la comunidad uruguaya: encuentro, conversación, aprendizaje y nuevas conexiones.',
                                },
                                {
                                    num: '04',
                                    title: 'Escala Uruguaya',
                                    text: 'Uruguay tiene una escala única para hacerlo posible: cercanía, confianza y capacidad de articulación. Desde esa identidad, aportamos una voz propia al desarrollo de Bitcoin en América Latina.',
                                },
                            ].map((item, i) => (
                                <FadeIn key={i} delay={i * 0.1}>
                                    <div className="card" style={{ display: 'flex', gap: 24 }}>
                                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--btc-dim)', lineHeight: 1, flexShrink: 0, opacity: 0.5 }}>
                                            {item.num}
                                        </div>
                                        <div>
                                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 8, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>{item.title}</h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{item.text}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ HIGHLIGHT QUOTE ════════════════════════════════════════════ */}
            <section style={{ background: 'var(--btc)', padding: '80px 0', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.3) 21px)' }} />
                <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
                    <FadeIn>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 64px)', color: 'var(--black)', lineHeight: 1.1, maxWidth: 900, margin: '0 auto', letterSpacing: '0.02em' }}>
                            "UNA SEMANA PARA ENCONTRARNOS, APRENDER, DEBATIR Y PROYECTAR"
                        </p>
                        <p style={{ marginTop: 24, color: 'rgba(0,0,0,0.6)', fontSize: 13, fontFamily: 'var(--font-mono)', letterSpacing: '0.15em' }}>
                            BITCOIN WEEK URUGUAY · MAYO 2026
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* ═══ PILLARS ════════════════════════════════════════════════════ */}
            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container">
                    <FadeIn>
                        <div className="section-label">El evento</div>
                        <h2 className="section-title">QUÉ NOS ESPERA</h2>
                    </FadeIn>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48 }}>
                        {[
                            {
                                icon: <Mic size={24} />,
                                title: 'Charlas & Paneles',
                                desc: 'Speakers de referencia de la escena Bitcoin latinoamericana y global. Debates que importan.',
                            },
                            {
                                icon: <Users size={24} />,
                                title: 'Comunidad',
                                desc: 'Meetups, networking y espacios informales para conectar con la comunidad Bitcoin uruguaya.',
                            },
                            {
                                icon: <Building2 size={24} />,
                                title: 'Múltiples Sedes',
                                desc: 'Distintos puntos de Montevideo albergarán los eventos a lo largo de la semana.',
                            },
                        ].map((p, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--btc-subtle)', border: '1px solid var(--border-hot)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--btc)', margin: '0 auto 24px' }}>
                                        {p.icon}
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 12, letterSpacing: '0.04em' }}>{p.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SPONSORS ═══════════════════════════════════════════════════ */}
            <section className="section" style={{ background: 'var(--black)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <FadeIn>
                            <div className="section-label" style={{ justifyContent: 'center' }}>Sponsors</div>
                            <h2 className="section-title">QUIÉNES NOS APOYAN</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 520, margin: '16px auto 0' }}>
                                Empresas y proyectos que creen en el futuro de Bitcoin en Uruguay y América Latina.
                            </p>
                        </FadeIn>
                    </div>

                    {/* Gold */}
                    <FadeIn>
                        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: '#F7931A', marginBottom: 24, textTransform: 'uppercase' }}>— Oro —</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 48 }}>
                            {SPONSORS.filter(s => s.tier === 'gold').map((sp, i) => (
                                <div key={i} style={{
                                    border: `1px dashed ${TIER_STYLE.gold.border}`,
                                    borderRadius: 'var(--radius-md)',
                                    padding: '48px 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: TIER_STYLE.gold.color,
                                    fontFamily: 'var(--font-display)',
                                    fontSize: TIER_STYLE.gold.fontSize,
                                    letterSpacing: '0.1em',
                                    background: 'rgba(247,147,26,0.03)',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(247,147,26,0.07)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(247,147,26,0.03)'}
                                >
                                    {sp.name}
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Silver */}
                    <FadeIn delay={0.1}>
                        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(180,180,180,0.6)', marginBottom: 24, textTransform: 'uppercase' }}>— Plata —</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
                            {SPONSORS.filter(s => s.tier === 'silver').map((sp, i) => (
                                <div key={i} style={{
                                    border: `1px dashed ${TIER_STYLE.silver.border}`,
                                    borderRadius: 'var(--radius-md)',
                                    padding: '32px 16px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: TIER_STYLE.silver.color,
                                    fontFamily: 'var(--font-display)',
                                    fontSize: TIER_STYLE.silver.fontSize,
                                    letterSpacing: '0.08em',
                                }}>
                                    {sp.name}
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Bronze */}
                    <FadeIn delay={0.2}>
                        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(140,90,40,0.6)', marginBottom: 24, textTransform: 'uppercase' }}>— Bronce —</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 48 }}>
                            {SPONSORS.filter(s => s.tier === 'bronze').map((sp, i) => (
                                <div key={i} style={{
                                    border: `1px dashed ${TIER_STYLE.bronze.border}`,
                                    borderRadius: 'var(--radius-md)',
                                    padding: '20px 12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: TIER_STYLE.bronze.color,
                                    fontFamily: 'var(--font-display)',
                                    fontSize: TIER_STYLE.bronze.fontSize,
                                    letterSpacing: '0.06em',
                                }}>
                                    {sp.name}
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    <FadeIn>
                        <div style={{ textAlign: 'center' }}>
                            <Link to="/contacto" className="btn-ghost">
                                Quiero ser sponsor <ArrowRight size={14} />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ═══ NEWSLETTER ═════════════════════════════════════════════════ */}
            <section style={{ background: 'var(--surface-2)', borderTop: '1px solid var(--border)', padding: '100px 0' }}>
                <div className="container" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
                    <FadeIn>
                        <div style={{ display: 'inline-block', marginBottom: 32 }}>
                            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--btc)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 24 }}>
                                ₿
                            </div>
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 7vw, 72px)', letterSpacing: '0.04em', marginBottom: 16 }}>
                            SUSCRIBITE A LAS NOVEDADES
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 40 }}>
                            Sé el primero en saber quiénes se suman, cuándo abre el registro y qué está pasando en la comunidad.
                        </p>

                        {status !== 'success' ? (
                            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' }}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    disabled={status === 'loading'}
                                    style={{
                                        flex: 1,
                                        minWidth: 200,
                                        padding: '14px 20px',
                                        background: 'var(--surface-3)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius)',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: 15,
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'var(--btc)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                />
                                <button type="submit" className="btn-primary" disabled={status === 'loading'}>
                                    {status === 'loading' ? 'Enviando...' : <>Notificarme <Send size={14} /></>}
                                </button>
                                {status === 'error' && (
                                    <p style={{ width: '100%', color: '#ff6b6b', fontSize: 13, textAlign: 'center' }}>{errMsg}</p>
                                )}
                            </form>
                        ) : (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: '16px 32px',
                                    background: 'var(--btc-subtle)',
                                    border: '1px solid var(--border-hot)',
                                    borderRadius: 'var(--radius)',
                                    color: 'var(--btc)',
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}
                            >
                                <Bitcoin size={20} />
                                ¡Listo! Te avisamos cuando haya novedades.
                            </motion.div>
                        )}
                    </FadeIn>
                </div>
            </section>
        </main>
    )
}