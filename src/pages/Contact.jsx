import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Twitter, Instagram, Youtube, Send, Mic, Building2, Users, Bitcoin } from 'lucide-react'

function FadeIn({ children, delay = 0 }) {
    const ref = useRef()
    const inView = useInView(ref, { once: true, margin: '-60px' })
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    )
}

const INQUIRY_TYPES = [
    { id: 'sponsor', label: 'Quiero ser sponsor', icon: <Building2 size={18} /> },
    { id: 'speaker', label: 'Quiero ser speaker', icon: <Mic size={18} /> },
    { id: 'volunteer', label: 'Quiero ser voluntario', icon: <Users size={18} /> },
    { id: 'press', label: 'Prensa / Media', icon: <Bitcoin size={18} /> },
    { id: 'general', label: 'Consulta general', icon: <Mail size={18} /> },
]

export default function Contact() {
    const [type, setType] = useState('')
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle')

    const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!type || !form.name || !form.email || !form.message) return
        setStatus('loading')
        // Simulate send — replace with actual backend/Formspree/etc
        await new Promise(r => setTimeout(r, 1200))
        setStatus('success')
    }

    return (
        <main style={{ paddingTop: 'var(--nav-h)' }}>
            {/* Header */}
            <section style={{ background: 'var(--black)', padding: '80px 0 60px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 70% at 80% 0%, rgba(247,147,26,0.07) 0%, transparent 60%)' }} />
                <div className="container" style={{ position: 'relative' }}>
                    <FadeIn>
                        <div className="section-label">Contacto</div>
                        <h1 className="section-title">HABLEMOS</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 520 }}>
                            ¿Querés ser parte de Bitcoin Week Uruguay? Ya sea como sponsor, speaker o simplemente para sumar tu energía, estamos para escucharte.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Content */}
            <section className="section" style={{ background: 'var(--black)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>

                        {/* Left: info */}
                        <div>
                            <FadeIn>
                                <div style={{ marginBottom: 48 }}>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, marginBottom: 20, letterSpacing: '0.04em' }}>CONTACTO DIRECTO</h2>
                                    <a href="mailto:hola@bitcoinweekuruguay.com"
                                        style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--btc)', fontSize: 15, fontWeight: 500, marginBottom: 24 }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = 0.7}
                                        onMouseLeave={e => e.currentTarget.style.opacity = 1}
                                    >
                                        <Mail size={18} />
                                        hola@bitcoinweekuruguay.com
                                    </a>
                                </div>
                            </FadeIn>

                            {/* Inquiry types quick links */}
                            <FadeIn delay={0.1}>
                                <div style={{ marginBottom: 48 }}>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--btc)', marginBottom: 16 }}>¿Cómo podemos ayudarte?</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {INQUIRY_TYPES.map(t => (
                                            <div key={t.id}
                                                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 'var(--radius)', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 14 }}
                                            >
                                                <span style={{ color: 'var(--btc)' }}>{t.icon}</span>
                                                {t.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Social */}
                            <FadeIn delay={0.2}>
                                <div>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--btc)', marginBottom: 16 }}>Seguinos</p>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        {[
                                            { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
                                            { icon: <Instagram size={16} />, href: '#', label: 'Instagram' },
                                            { icon: <Youtube size={16} />, href: '#', label: 'YouTube' },
                                        ].map((s, i) => (
                                            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                                                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--text-secondary)', fontSize: 13, transition: 'all 0.2s' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--btc)'; e.currentTarget.style.color = 'var(--btc)' }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                                            >
                                                {s.icon} {s.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Right: form */}
                        <FadeIn delay={0.1}>
                            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 40 }}>
                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ textAlign: 'center', padding: '48px 0' }}
                                    >
                                        <div style={{ fontSize: 48, marginBottom: 16 }}>₿</div>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--btc)', marginBottom: 12 }}>¡MENSAJE ENVIADO!</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                                            Nos va a llegar tu mensaje y te contestamos a la brevedad.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        {/* Inquiry type selector */}
                                        <div style={{ marginBottom: 28 }}>
                                            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--btc)', marginBottom: 12 }}>
                                                Tipo de consulta *
                                            </label>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                                                {INQUIRY_TYPES.map(t => (
                                                    <button
                                                        key={t.id}
                                                        type="button"
                                                        onClick={() => setType(t.id)}
                                                        style={{
                                                            padding: '10px 14px',
                                                            background: type === t.id ? 'var(--btc-subtle)' : 'var(--surface-3)',
                                                            border: `1px solid ${type === t.id ? 'var(--border-hot)' : 'var(--border)'}`,
                                                            borderRadius: 'var(--radius)',
                                                            color: type === t.id ? 'var(--btc)' : 'var(--text-secondary)',
                                                            fontSize: 12,
                                                            fontFamily: 'var(--font-body)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 8,
                                                            cursor: 'pointer',
                                                            transition: 'all 0.15s',
                                                            textAlign: 'left',
                                                        }}
                                                    >
                                                        <span style={{ opacity: type === t.id ? 1 : 0.5 }}>{t.icon}</span>
                                                        {t.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Name + Email */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                                            {[
                                                { name: 'name', label: 'Nombre *', placeholder: 'Tu nombre', type: 'text' },
                                                { name: 'email', label: 'Email *', placeholder: 'tu@email.com', type: 'email' },
                                            ].map(f => (
                                                <div key={f.name}>
                                                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
                                                        {f.label}
                                                    </label>
                                                    <input
                                                        type={f.type}
                                                        name={f.name}
                                                        value={form[f.name]}
                                                        onChange={handleChange}
                                                        placeholder={f.placeholder}
                                                        required
                                                        style={{
                                                            width: '100%',
                                                            padding: '12px 16px',
                                                            background: 'var(--surface-3)',
                                                            border: '1px solid var(--border)',
                                                            borderRadius: 'var(--radius)',
                                                            color: 'var(--text-primary)',
                                                            fontFamily: 'var(--font-body)',
                                                            fontSize: 14,
                                                            outline: 'none',
                                                            transition: 'border-color 0.2s',
                                                        }}
                                                        onFocus={e => e.target.style.borderColor = 'var(--btc)'}
                                                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Message */}
                                        <div style={{ marginBottom: 28 }}>
                                            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
                                                Mensaje *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                placeholder="Contanos qué tenés en mente..."
                                                required
                                                rows={5}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    background: 'var(--surface-3)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: 'var(--radius)',
                                                    color: 'var(--text-primary)',
                                                    fontFamily: 'var(--font-body)',
                                                    fontSize: 14,
                                                    resize: 'vertical',
                                                    outline: 'none',
                                                    transition: 'border-color 0.2s',
                                                }}
                                                onFocus={e => e.target.style.borderColor = 'var(--btc)'}
                                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn-primary"
                                            disabled={status === 'loading' || !type}
                                            style={{ width: '100%', justifyContent: 'center', opacity: !type ? 0.6 : 1 }}
                                        >
                                            {status === 'loading' ? 'Enviando...' : <>Enviar mensaje <Send size={15} /></>}
                                        </button>
                                        {!type && (
                                            <p style={{ marginTop: 8, color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                                                Seleccioná un tipo de consulta para enviar
                                            </p>
                                        )}
                                    </form>
                                )}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </main>
    )
}