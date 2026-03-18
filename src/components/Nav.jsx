import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Bitcoin } from 'lucide-react'
import logo from '../assets/logoBitcoinWeek-Logo.png'

const LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/agenda', label: 'Agenda' },
    { to: '/speakers', label: 'Speakers' },
    { to: '/venues', label: 'Sedes' },
    { to: '/contacto', label: 'Contacto' },
]

export default function Nav() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    return (
        <>
            <motion.header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    height: 'var(--nav-h)',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
                    background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
                }}
            >
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img src={logo} alt="Bitcoin Week Uruguay" style={{ height: 36, width: 'auto' }} />
                    </Link>

                    {/* Desktop nav */}
                    <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="desktop-nav">
                        {LINKS.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                end={l.to === '/'}
                                style={({ isActive }) => ({
                                    padding: '8px 16px',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 500,
                                    fontSize: 13,
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                    color: isActive ? 'var(--btc)' : 'var(--text-secondary)',
                                    transition: 'color 0.2s',
                                    borderBottom: isActive ? '1px solid var(--btc)' : '1px solid transparent',
                                })}
                            >
                                {l.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Link to="/contacto" className="btn-primary" style={{ padding: '10px 20px', fontSize: 12, display: 'none' }} id="nav-cta">
                            Registrate
                        </Link>
                        <button
                            onClick={() => setOpen(true)}
                            style={{ color: 'var(--text-primary)', padding: 8, display: 'none' }}
                            className="hamburger-btn"
                            aria-label="Abrir menú"
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1100,
                            background: 'var(--black)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '24px',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
                            <img src={logo} alt="Bitcoin Week Uruguay" style={{ height: 36 }} />
                            <button onClick={() => setOpen(false)} style={{ color: 'var(--text-primary)' }}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {LINKS.map((l, i) => (
                                <motion.div
                                    key={l.to}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    <NavLink
                                        to={l.to}
                                        end={l.to === '/'}
                                        onClick={() => setOpen(false)}
                                        style={({ isActive }) => ({
                                            display: 'block',
                                            padding: '16px 0',
                                            fontFamily: 'var(--font-display)',
                                            fontSize: 40,
                                            letterSpacing: '0.04em',
                                            color: isActive ? 'var(--btc)' : 'var(--text-primary)',
                                            borderBottom: '1px solid var(--border)',
                                        })}
                                    >
                                        {l.label}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </nav>
                        <div style={{ marginTop: 'auto', paddingTop: 32 }}>
                            <Link to="/contacto" className="btn-primary" onClick={() => setOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>
                                Registrate
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          #nav-cta { display: inline-flex !important; }
        }
      `}</style>
        </>
    )
}