import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Instagram, Youtube, Mail } from 'lucide-react'
import logo from '../assets/logoBitcoinWeek-Logo.png'

const MAILCHIMP_URL =
    'https://gmail.us12.list-manage.com/subscribe/post-json?u=88b29d5e90032b558d0f0fb95&id=0966db89bf&f_id=0009c4e1f0'

export default function Footer() {
    return (
        <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', paddingTop: 80, paddingBottom: 40 }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 64, marginBottom: 64 }}>
                    {/* Brand */}
                    <div>
                        <img src={logo} alt="Bitcoin Week Uruguay" style={{ height: 44, marginBottom: 20 }} />
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, maxWidth: 340 }}>
                            El encuentro de la comunidad Bitcoin en Uruguay. Una semana para aprender, conectar y construir el futuro financiero de América Latina.
                        </p>
                        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                            {[
                                { icon: <Twitter size={16} />, href: 'https://twitter.com/bitcoinweekuy' },
                                { icon: <Instagram size={16} />, href: 'https://www.instagram.com/bitcoinweekuy' },
                                { icon: <Youtube size={16} />, href: 'https://youtube.com/@bitcoinweekuy' },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                                    style={{
                                        width: 38, height: 38,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius)',
                                        color: 'var(--text-secondary)',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--btc)'; e.currentTarget.style.color = 'var(--btc)' }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav */}
                    <div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--btc)', marginBottom: 20 }}>
                            Navegación
                        </p>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                                { to: '/', label: 'Inicio' },
                                { to: '/agenda', label: 'Agenda' },
                                { to: '/speakers', label: 'Speakers' },
                                { to: '/venues', label: 'Sedes' },
                                { to: '/contacto', label: 'Contacto' },
                            ].map(l => (
                                <Link key={l.to} to={l.to}
                                    style={{ color: 'var(--text-secondary)', fontSize: 14, transition: 'color 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--btc)', marginBottom: 20 }}>
                            Contacto
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <a href="mailto:hola@bitcoinweekuruguay.com"
                                style={{ color: 'var(--text-secondary)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--btc)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                            >
                                <Mail size={14} />
                                hola@bitcoinweekuruguay.com
                            </a>
                            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                                Montevideo, Uruguay<br />
                                Mayo 2026
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glow-line" style={{ marginBottom: 32 }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                        © 2026 Bitcoin Week Uruguay. Todos los derechos reservados.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        Construido con ₿ en Uruguay
                    </p>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
        </footer>
    )
}