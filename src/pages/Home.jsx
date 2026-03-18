import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, MapPin, Users, Mic, Building2, Send, Bitcoin, ChevronDown } from 'lucide-react'
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

function FadeIn({ children, delay = 0, y = 28 }) {
    const ref = useRef()
    const inView = useInView(ref, { once: true, margin: '-70px' })
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
        >{children}</motion.div>
    )
}

function Counter({ to, suffix = '' }) {
    const ref = useRef()
    const inView = useInView(ref, { once: true })
    const [val, setVal] = useState(0)
    useEffect(() => {
        if (!inView) return
        let s = 0; const step = to / 50
        const t = setInterval(() => {
            s += step
            if (s >= to) { setVal(to); clearInterval(t) } else { setVal(Math.floor(s)) }
        }, 28)
        return () => clearInterval(t)
    }, [inView, to])
    return <span ref={ref}>{val}{suffix}</span>
}

/* Sponsor tiers */
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

export default function Home() {
    const { scrollY } = useScroll()
    const heroY = useTransform(scrollY, [0, 600], [0, 100])
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle')
    const [errMsg, setErrMsg] = useState('')

    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!email) return
        setStatus('loading'); setErrMsg('')
        try {
            await subscribeMailchimp(email)
            setStatus('success'); setEmail('')
            confetti({ particleCount: 110, spread: 65, origin: { y: 0.6 }, colors: ['#F7931A', '#FFB119', '#fff'] })
        } catch (err) {
            setStatus('error'); setErrMsg(err.message)
        }
    }

    return (
        <main>

            {/* ═══ HERO ════════════════════════════════════════════════════ */}
            <section style={{
                position: 'relative', minHeight: '100vh',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                overflow: 'hidden', paddingBottom: 80,
            }}>
                {/* Grid bg */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    backgroundImage: 'linear-gradient(rgba(247,147,26,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(247,147,26,0.025) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 50% -10%, rgba(247,147,26,0.10) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, var(--black) 100%)' }} />

                {/* Large ghost ₿ */}
                <div style={{
                    position: 'absolute', right: '-2%', top: '8%', zIndex: 0,
                    fontFamily: 'var(--font-display)', fontSize: '55vw', lineHeight: 1,
                    color: 'rgba(247,147,26,0.03)', pointerEvents: 'none', userSelect: 'none',
                }}>₿</div>

                <motion.div className="container" style={{ position: 'relative', zIndex: 1, y: heroY }}>

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}
                    >
                        <div className="tag"><div className="tag-dot" />Mayo 2026 · Montevideo</div>
                        <span style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em' }}>#BitcoinWeekUY</span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(80px, 18vw, 210px)', lineHeight: 0.88, letterSpacing: '0.01em', marginBottom: 0 }}
                    >
                        <span style={{ display: 'block', color: 'var(--text-primary)' }}>BITCOIN</span>
                        <span style={{ display: 'block', color: 'var(--btc)', textShadow: '0 0 60px rgba(247,147,26,0.3)' }}>WEEK</span>
                        <span style={{ display: 'block', WebkitTextStroke: '1px rgba(247,147,26,0.25)', color: 'transparent' }}>URUGUAY</span>
                    </motion.h1>

                    {/* Sub */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 48, marginTop: 48, flexWrap: 'wrap' }}
                    >
                        <div style={{ maxWidth: 460 }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: 32 }}>
                                Una semana para reunir comunidad, conocimiento y visión. El encuentro de Bitcoin más importante de América Latina.
                            </p>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                <Link to="/agenda" className="btn-primary">Ver Agenda <ArrowRight size={14} /></Link>
                                <CalendarButton className="btn-ghost" />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                { icon: <Calendar size={13} />, text: '18–24 Mayo 2026' },
                                { icon: <MapPin size={13} />, text: 'Montevideo, Uruguay' },
                                { icon: <Users size={13} />, text: 'Comunidad abierta' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: 13 }}>
                                    <span style={{ color: 'var(--btc)' }}>{item.icon}</span>{item.text}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                    style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.2em' }}
                >
                    <span>SCROLL</span>
                    <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                        <ChevronDown size={13} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ TICKER ══════════════════════════════════════════════════ */}
            <div className="ticker-wrap">
                <div className="ticker-inner">
                    {[...Array(2)].map((_, ti) => (
                        <React.Fragment key={ti}>
                            {['Bitcoin Week Uruguay', '18–22 Mayo 2026', 'Bitcoin Pizza Day', 'Montevideo, Uruguay', 'Comunidad Abierta', '#BitcoinWeekUY', 'América Latina'].map((t, i) => (
                                <React.Fragment key={i}>
                                    <span className="ticker-item">{t}</span>
                                    <span className="ticker-sep"> · </span>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* ═══ STATS ═══════════════════════════════════════════════════ */}
            <section style={{ padding: '72px 0', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--border)' }}>
                        {[
                            { num: 7, suffix: ' días', label: 'De evento' },
                            { num: 20, suffix: '+', label: 'Speakers' },
                            { num: 500, suffix: '+', label: 'Asistentes esperados' },
                            { num: 5, suffix: '+', label: 'Sedes en Montevideo' },
                        ].map((s, i) => (
                            <div key={i} style={{ background: 'var(--surface)', padding: '40px 28px', textAlign: 'center' }}>
                                <div className="stat-number"><Counter to={s.num} suffix={s.suffix} /></div>
                                <p style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 8 }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ MANIFIESTO ══════════════════════════════════════════════ */}
            <section className="section" style={{ background: 'var(--black)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }}>

                        {/* Left sticky label */}
                        <div style={{ position: 'sticky', top: 120 }}>
                            <FadeIn>
                                <div className="section-label">Manifiesto</div>
                                <h2 className="section-title">SOBRE<br />EL EVENTO</h2>
                                <div style={{ width: 40, height: 3, background: 'var(--btc)', margin: '20px 0 20px' }} />
                                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
                                    Bitcoin Week Uruguay nace con el espíritu del Bitcoin Pizza Day: el instante en que una tecnología encontró su primer uso real.
                                </p>
                                <div style={{ marginTop: 28 }}>
                                    <Link to="/sedes" className="btn-ghost">Ver sedes <ArrowRight size={13} /></Link>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Right: manifesto blocks */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {[
                                { num: '01', title: 'Una Respuesta', text: 'Bitcoin nació como una respuesta frente a sistemas cerrados. Frente a la necesidad de recuperar confianza. Frente a la posibilidad de imaginar nuevas formas de intercambiar valor y construir libertad.' },
                                { num: '02', title: 'Bitcoin Pizza Day', text: 'Cada 22 de mayo recordamos el momento en que una idea comenzó a convertirse en realidad cotidiana. Una tecnología abierta encontró su primera forma concreta de circulación.' },
                                { num: '03', title: 'Construcción Colectiva', text: 'Bitcoin Week Uruguay no pertenece a una sola mirada. Es una construcción colectiva de la comunidad uruguaya: encuentro, conversación, aprendizaje y nuevas conexiones.' },
                                { num: '04', title: 'Escala Uruguaya', text: 'Uruguay tiene una escala única: cercanía, confianza y capacidad de articulación. Desde esa identidad, aportamos una voz propia al desarrollo de Bitcoin en América Latina.' },
                            ].map((item, i) => (
                                <FadeIn key={i} delay={i * 0.08}>
                                    <div style={{
                                        display: 'flex', gap: 24, padding: '32px 0',
                                        borderBottom: '1px solid var(--border)',
                                    }}>
                                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: 'var(--btc)', opacity: 0.15, lineHeight: 1, flexShrink: 0, paddingTop: 4 }}>{item.num}</div>
                                        <div>
                                            <h3 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22, marginBottom: 10, color: 'var(--text-primary)' }}>{item.title}</h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>{item.text}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ PULL QUOTE ══════════════════════════════════════════════ */}
            <section style={{ background: 'var(--btc)', padding: '72px 0', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(0,0,0,0.4) 18px, rgba(0,0,0,0.4) 19px)' }} />
                <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
                    <FadeIn>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 64px)', color: 'var(--black)', lineHeight: 1.05, maxWidth: 860, margin: '0 auto', letterSpacing: '0.02em' }}>
                            "UNA SEMANA PARA ENCONTRARNOS, APRENDER, DEBATIR Y PROYECTAR"
                        </p>
                        <p style={{ marginTop: 20, color: 'rgba(0,0,0,0.5)', fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            BITCOIN WEEK URUGUAY · MAYO 2026
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* ═══ PILLARS ═════════════════════════════════════════════════ */}
            <section className="section" style={{ background: 'var(--surface)' }}>
                <div className="container">
                    <FadeIn>
                        <div className="section-label">El evento</div>
                        <h2 className="section-title">QUÉ NOS<br />ESPERA</h2>
                    </FadeIn>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, marginTop: 48, background: 'var(--border)' }}>
                        {[
                            { icon: <Mic size={22} />, title: 'Charlas & Paneles', desc: 'Speakers de referencia de la escena Bitcoin latinoamericana y global. Debates que importan.' },
                            { icon: <Users size={22} />, title: 'Comunidad', desc: 'Meetups, networking y espacios informales para conectar con la comunidad Bitcoin uruguaya.' },
                            { icon: <Building2 size={22} />, title: 'Múltiples Sedes', desc: 'Distintos puntos de Montevideo albergarán los eventos durante los cinco días del evento.' },
                        ].map((p, i) => (
                            <FadeIn key={i} delay={i * 0.08}>
                                <div style={{ background: 'var(--surface)', padding: '48px 32px' }}>
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--btc-dim)', border: '1px solid var(--btc-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--btc)', marginBottom: 24 }}>
                                        {p.icon}
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginBottom: 12, letterSpacing: '0.03em', color: 'var(--text-primary)' }}>{p.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.75 }}>{p.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SPONSORS ════════════════════════════════════════════════ */}
            <section className="section" style={{ background: 'var(--black)', borderTop: '1px solid var(--border)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 60 }}>
                        <FadeIn>
                            <div className="section-label" style={{ justifyContent: 'center' }}>Sponsors</div>
                            <h2 className="section-title">QUIÉNES<br />NOS APOYAN</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 480, margin: '20px auto 0', lineHeight: 1.75 }}>
                                Empresas y proyectos que creen en el futuro de Bitcoin en Uruguay y América Latina.
                            </p>
                        </FadeIn>
                    </div>

                    {/* Gold */}
                    <FadeIn>
                        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', color: 'var(--btc)', marginBottom: 20, textTransform: 'uppercase' }}>— Oro —</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 40 }}>
                            {SPONSORS.filter(s => s.tier === 'gold').map((sp, i) => (
                                <div key={i} style={{
                                    border: '1px dashed rgba(247,147,26,0.4)', borderRadius: 'var(--radius-md)',
                                    padding: '52px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.1em',
                                    color: 'rgba(247,147,26,0.55)', background: 'rgba(247,147,26,0.03)',
                                    cursor: 'pointer', transition: 'background 0.2s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(247,147,26,0.07)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(247,147,26,0.03)'}
                                >{sp.name}</div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Silver */}
                    <FadeIn delay={0.08}>
                        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(180,180,180,0.5)', marginBottom: 20, textTransform: 'uppercase' }}>— Plata —</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 28 }}>
                            {SPONSORS.filter(s => s.tier === 'silver').map((sp, i) => (
                                <div key={i} style={{
                                    border: '1px dashed rgba(180,180,180,0.2)', borderRadius: 'var(--radius-md)',
                                    padding: '32px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: '0.08em',
                                    color: 'rgba(180,180,180,0.45)',
                                }}>{sp.name}</div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Bronze */}
                    <FadeIn delay={0.14}>
                        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(140,90,40,0.55)', marginBottom: 20, textTransform: 'uppercase' }}>— Bronce —</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 44 }}>
                            {SPONSORS.filter(s => s.tier === 'bronze').map((sp, i) => (
                                <div key={i} style={{
                                    border: '1px dashed rgba(140,90,40,0.25)', borderRadius: 'var(--radius-md)',
                                    padding: '20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.06em',
                                    color: 'rgba(160,100,50,0.5)',
                                }}>{sp.name}</div>
                            ))}
                        </div>
                    </FadeIn>

                    <FadeIn>
                        <div style={{ textAlign: 'center' }}>
                            <Link to="/contacto" className="btn-ghost">Quiero ser sponsor <ArrowRight size={13} /></Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ═══ NEWSLETTER ══════════════════════════════════════════════ */}
            <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '96px 0' }}>
                <div className="container" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
                    <FadeIn>
                        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--btc)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 22, color: '#000', fontFamily: 'var(--font-display)' }}>₿</div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,7vw,76px)', letterSpacing: '0.03em', marginBottom: 14, lineHeight: 0.92 }}>
                            SUSCRIBITE
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 36, lineHeight: 1.75 }}>
                            Sé el primero en saber quiénes se suman, cuándo abre el registro y qué está pasando en la comunidad.
                        </p>

                        {status !== 'success' ? (
                            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 10, maxWidth: 460, margin: '0 auto', flexWrap: 'wrap' }}>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="tu@email.com" required disabled={status === 'loading'}
                                    style={{
                                        flex: 1, minWidth: 200, padding: '13px 18px',
                                        background: 'var(--surface-3)', border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius)', color: 'var(--text-primary)',
                                        fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'var(--btc)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                />
                                <button type="submit" className="btn-primary" disabled={status === 'loading'}>
                                    {status === 'loading' ? 'Enviando...' : <><Send size={13} /> Notificarme</>}
                                </button>
                                {status === 'error' && <p style={{ width: '100%', color: '#ff6b6b', fontSize: 12, textAlign: 'center' }}>{errMsg}</p>}
                            </form>
                        ) : (
                            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 28px', background: 'var(--btc-dim)', border: '1px solid var(--btc-line)', borderRadius: 'var(--radius)', color: 'var(--btc)', fontWeight: 500, fontSize: 15 }}
                            >
                                <Bitcoin size={18} /> ¡Listo! Te avisamos cuando haya novedades.
                            </motion.div>
                        )}
                    </FadeIn>
                </div>
            </section>
        </main>
    )
}