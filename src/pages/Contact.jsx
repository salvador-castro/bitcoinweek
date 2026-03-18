import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Twitter, Instagram, Youtube, Send, Mic, Building2, Users, Bitcoin } from 'lucide-react'

function FadeIn({ children, delay = 0 }) {
    const ref = useRef()
    const inView = useInView(ref, { once: true, margin: '-60px' })
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >{children}</motion.div>
    )
}

const INQUIRY_TYPES = [
    { id: 'sponsor', label: 'Quiero ser sponsor', icon: <Building2 size={16} /> },
    { id: 'speaker', label: 'Quiero ser speaker', icon: <Mic size={16} /> },
    { id: 'volunteer', label: 'Quiero ser voluntario', icon: <Users size={16} /> },
    { id: 'press', label: 'Prensa / Media', icon: <Bitcoin size={16} /> },
    { id: 'general', label: 'Consulta general', icon: <Mail size={16} /> },
]

const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'var(--surface-3)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none',
    transition: 'border-color 0.2s',
}

export default function Contact() {
    const [type, setType] = useState('')
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle')

    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

    const handleSubmit = async e => {
        e.preventDefault()
        if (!type || !form.name || !form.email || !form.message) return
        setStatus('loading')
        await new Promise(r => setTimeout(r, 1200))
        setStatus('success')
    }

    return (
        <main style={{ paddingTop: 'var(--nav-h)' }}>

            {/* Header */}
            <section style={{ background: 'var(--black)', padding: '80px 0 56px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 65% at 80% 0%, rgba(247,147,26,0.06) 0%, transparent 60%)' }} />
                <div className="container" style={{ position: 'relative' }}>
                    <FadeIn>
                        <div className="section-label">Contacto</div>
                        <h1 className="section-title">HABLEMOS</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 480, marginTop: 16, lineHeight: 1.8 }}>
                            ¿Querés ser parte de Bitcoin Week Uruguay? Ya sea como sponsor, speaker o simplemente para sumar tu energía, estamos para escucharte.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Content */}
            <section className="section" style={{ background: 'var(--black)' }}>
                <div className="container">
                    <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 72, alignItems: 'start' }}>

                        {/* Left */}
                        <div>
                            <FadeIn>
                                <div style={{ marginBottom: 44 }}>
                                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, marginBottom: 18, letterSpacing: '0.04em', color: 'var(--text-primary)' }}>CONTACTO DIRECTO</h2>
                                    <a href="mailto:info@plugin.uy"
                                        style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--btc)', fontSize: 13, fontWeight: 500 }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                    >
                                        <Mail size={15} /> info@plugin.uy
                                    </a>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.08}>
                                <div style={{ marginBottom: 44 }}>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--btc)', marginBottom: 14 }}>¿Cómo podemos ayudarte?</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                        {INQUIRY_TYPES.map(t => (
                                            <div key={t.id} style={{
                                                display: 'flex', alignItems: 'center', gap: 10,
                                                padding: '11px 14px', borderRadius: 'var(--radius)',
                                                background: 'var(--surface)', border: '1px solid var(--border)',
                                                color: 'var(--text-secondary)', fontSize: 12,
                                            }}>
                                                <span style={{ color: 'var(--btc)' }}>{t.icon}</span>{t.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.15}>
                                <div>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--btc)', marginBottom: 14 }}>Seguinos</p>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        {[
                                            { icon: <Twitter size={14} />, href: 'https://twitter.com/bitcoinweekuy', label: 'Twitter' },
                                            { icon: <Instagram size={14} />, href: 'https://www.instagram.com/bitcoinweekuy', label: 'Instagram' },
                                            { icon: <Youtube size={14} />, href: 'https://youtube.com/@bitcoinweekuy', label: 'YouTube' },
                                        ].map((s, i) => (
                                            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                                                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--text-secondary)', fontSize: 12, transition: 'all 0.2s' }}
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
                            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 36 }}>
                                {status === 'success' ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                                        style={{ textAlign: 'center', padding: '48px 0' }}
                                    >
                                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, color: 'var(--btc)', marginBottom: 14 }}>₿</div>
                                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--btc)', marginBottom: 10, letterSpacing: '0.04em' }}>¡MENSAJE ENVIADO!</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                                            Nos va a llegar tu mensaje y te contestamos a la brevedad.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit}>

                                        {/* Type selector */}
                                        <div style={{ marginBottom: 26 }}>
                                            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--btc)', marginBottom: 10 }}>
                                                Tipo de consulta *
                                            </label>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 7 }}>
                                                {INQUIRY_TYPES.map(t => (
                                                    <button key={t.id} type="button" onClick={() => setType(t.id)}
                                                        style={{
                                                            padding: '9px 12px',
                                                            background: type === t.id ? 'var(--btc-dim)' : 'var(--surface-3)',
                                                            border: `1px solid ${type === t.id ? 'var(--btc-line)' : 'var(--border)'}`,
                                                            borderRadius: 'var(--radius)',
                                                            color: type === t.id ? 'var(--btc)' : 'var(--text-secondary)',
                                                            fontSize: 11, fontFamily: 'var(--font-body)',
                                                            display: 'flex', alignItems: 'center', gap: 7,
                                                            cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left',
                                                        }}
                                                    >
                                                        <span style={{ opacity: type === t.id ? 1 : 0.45 }}>{t.icon}</span>
                                                        {t.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Name + Email */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                                            {[
                                                { name: 'name', label: 'Nombre *', placeholder: 'Tu nombre', type: 'text' },
                                                { name: 'email', label: 'Email *', placeholder: 'tu@email.com', type: 'email' },
                                            ].map(f => (
                                                <div key={f.name}>
                                                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 7 }}>
                                                        {f.label}
                                                    </label>
                                                    <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange}
                                                        placeholder={f.placeholder} required style={inputStyle}
                                                        onFocus={e => e.target.style.borderColor = 'var(--btc)'}
                                                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Message */}
                                        <div style={{ marginBottom: 24 }}>
                                            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 7 }}>
                                                Mensaje *
                                            </label>
                                            <textarea name="message" value={form.message} onChange={handleChange}
                                                placeholder="Contanos qué tenés en mente..." required rows={5}
                                                style={{ ...inputStyle, resize: 'vertical' }}
                                                onFocus={e => e.target.style.borderColor = 'var(--btc)'}
                                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                            />
                                        </div>

                                        <button type="submit" className="btn-primary"
                                            disabled={status === 'loading' || !type}
                                            style={{ width: '100%', justifyContent: 'center', opacity: !type ? 0.55 : 1 }}
                                        >
                                            {status === 'loading' ? 'Enviando...' : <><Send size={13} /> Enviar mensaje</>}
                                        </button>

                                        {!type && (
                                            <p style={{ marginTop: 8, color: 'var(--text-muted)', fontSize: 11, textAlign: 'center', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
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

            <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
        </main>
    )
}