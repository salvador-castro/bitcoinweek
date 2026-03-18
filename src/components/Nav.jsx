import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logoBitcoinWeek-Logo.png'

const LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/agenda', label: 'Agenda' },
    { to: '/speakers', label: 'Speakers' },
    { to: '/sedes', label: 'Sedes' },
    { to: '/contacto', label: 'Contacto' },
]

export default function Nav() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', h)
        return () => window.removeEventListener('scroll', h)
    }, [])

    return (
        <>
            <motion.header
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                    height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
                    transition: 'background 0.4s, border-color 0.4s',
                    background: scrolled ? 'rgba(8,8,8,0.94)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
                }}
            >
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="Bitcoin Week Uruguay" style={{ height: 34 }} />
                    </Link>

                    {/* Desktop nav */}
                    <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
                        {LINKS.map(l => (
                            <NavLink key={l.to} to={l.to} end={l.to === '/'}
                                style={({ isActive }) => ({
                                    padding: '7px 15px',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 11,
                                    fontWeight: 500,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: isActive ? 'var(--btc)' : 'var(--text-secondary)',
                                    borderBottom: isActive ? '1px solid var(--btc)' : '1px solid transparent',
                                    transition: 'color 0.2s',
                                })}
                                onMouseEnter={e => { if (!e.currentTarget.style.color.includes('247')) e.currentTarget.style.color = 'var(--text-primary)' }}
                                onMouseLeave={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.color = 'var(--text-secondary)' }}
                            >
                                {l.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* CTA + hamburger */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Link to="/contacto" className="btn-primary"
                            style={{ padding: '9px 18px', fontSize: 11, display: 'none' }}
                            id="nav-cta"
                        >
                            Participar
                        </Link>
                        <button onClick={() => setOpen(true)}
                            style={{ color: 'var(--text-primary)', padding: 8, background: 'none', display: 'none' }}
                            className="hamburger-btn"
                        >
                            <Menu size={20} />
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
                        transition={{ type: 'tween', duration: 0.28 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1100,
                            background: 'var(--black)',
                            display: 'flex', flexDirection: 'column', padding: 24,
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
                            <img src={logo} alt="Bitcoin Week Uruguay" style={{ height: 32 }} />
                            <button onClick={() => setOpen(false)} style={{ color: 'var(--text-primary)', background: 'none' }}>
                                <X size={22} />
                            </button>
                        </div>

                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {LINKS.map((l, i) => (
                                <motion.div key={l.to}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <NavLink to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}
                                        style={({ isActive }) => ({
                                            display: 'block', padding: '14px 0',
                                            fontFamily: 'var(--font-display)',
                                            fontSize: 40, letterSpacing: '0.03em',
                                            color: isActive ? 'var(--btc)' : 'var(--text-primary)',
                                            borderBottom: '1px solid var(--border)',
                                        })}
                                    >{l.label}</NavLink>
                                </motion.div>
                            ))}
                        </nav>

                        <div style={{ marginTop: 'auto' }}>
                            <Link to="/contacto" className="btn-primary"
                                onClick={() => setOpen(false)}
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                Participar
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