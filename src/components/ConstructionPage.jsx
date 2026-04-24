import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Calendar, Bell, Instagram, Send, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

// ─── Mailchimp vía JSONP ───
const MAILCHIMP_URL = import.meta.env.VITE_MAILCHIMP_URL;

const subscribeToMailchimp = (email) => {
  return new Promise((resolve, reject) => {
    const callbackName = 'mc_callback_' + Date.now();
    const url = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}&tags=bitcoin-week&c=${callbackName}`;
    const script = document.createElement('script');
    script.src = url;
    const timeout = setTimeout(() => { cleanup(); reject(new Error('Tiempo de espera agotado. Intentá de nuevo.')); }, 8000);
    const cleanup = () => { clearTimeout(timeout); delete window[callbackName]; if (script.parentNode) script.parentNode.removeChild(script); };
    window[callbackName] = (data) => {
      cleanup();
      if (data.result === 'success') { resolve(data); }
      else {
        const msg = data.msg || 'Error al suscribir';
        if (msg.toLowerCase().includes('already subscribed')) { resolve({ result: 'success', msg: 'Ya estás suscripto' }); }
        else { reject(new Error(msg.replace(/^\d+ - /, ''))); }
      }
    };
    script.onerror = () => { cleanup(); reject(new Error('No se pudo conectar. Verificá tu conexión.')); };
    document.body.appendChild(script);
  });
};

// ─── Animated counter ───
function Counter({ from, to, duration = 2 }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, Math.round);
  const [display, setDisplay] = useState(from);
  useEffect(() => {
    const controls = animate(count, to, { duration });
    const unsub = rounded.on('change', v => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, []);
  return <span>{display}</span>;
}

// ─── Floating Bitcoin symbol ───
function FloatingSym({ size, x, y, delay, opacity, rotate = 0 }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontSize: size,
        opacity,
        color: '#F7931A',
        pointerEvents: 'none',
        userSelect: 'none',
        fontWeight: 900,
        fontFamily: 'serif',
        transform: `rotate(${rotate}deg)`,
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [rotate, rotate + 10, rotate - 5, rotate],
        opacity: [opacity, opacity * 1.6, opacity],
      }}
      transition={{ duration: 5 + delay * 1.2, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      ₿
    </motion.div>
  );
}

const FLOATERS = [
  { size: '1.2rem', x: '4%', y: '8%', delay: 0, opacity: 0.07, rotate: -10 },
  { size: '2rem', x: '88%', y: '6%', delay: 1.2, opacity: 0.08, rotate: 15 },
  { size: '1rem', x: '93%', y: '55%', delay: 2.5, opacity: 0.06, rotate: 5 },
  { size: '1.5rem', x: '2%', y: '65%', delay: 0.8, opacity: 0.07, rotate: -20 },
  { size: '0.9rem', x: '48%', y: '4%', delay: 3, opacity: 0.05, rotate: 8 },
  { size: '1.8rem', x: '76%', y: '82%', delay: 1.5, opacity: 0.07, rotate: -5 },
  { size: '1.1rem', x: '20%', y: '90%', delay: 2.2, opacity: 0.06, rotate: 12 },
  { size: '1.4rem', x: '60%', y: '92%', delay: 0.5, opacity: 0.07, rotate: -8 },
  { size: '0.8rem', x: '12%', y: '45%', delay: 3.5, opacity: 0.05, rotate: 20 },
  { size: '1.3rem', x: '82%', y: '35%', delay: 1.8, opacity: 0.06, rotate: -15 },
  { size: '0.9rem', x: '35%', y: '88%', delay: 4, opacity: 0.05, rotate: 7 },
  { size: '1.6rem', x: '5%', y: '30%', delay: 2.8, opacity: 0.06, rotate: -12 },
  { size: '1rem', x: '70%', y: '15%', delay: 0.3, opacity: 0.05, rotate: 18 },
  { size: '1.2rem', x: '55%', y: '78%', delay: 3.2, opacity: 0.06, rotate: -6 },
  { size: '0.8rem', x: '90%', y: '72%', delay: 1.1, opacity: 0.05, rotate: 10 },
  { size: '1.5rem', x: '28%', y: '15%', delay: 4.5, opacity: 0.06, rotate: -18 },
  { size: '0.9rem', x: '43%', y: '60%', delay: 2, opacity: 0.04, rotate: 14 },
  { size: '1.1rem', x: '15%', y: '75%', delay: 3.8, opacity: 0.05, rotate: -3 },
];

const STATS = [
  { val: 7, suffix: ' días', label: 'de eventos' },
  { val: 100, suffix: '%', label: 'bitcoin only' },
  { val: 1, suffix: '\u00aa', label: 'edición' },
];

const ConstructionPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(5);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isSubscribed) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(interval); window.location.reload(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubscribed]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setError('');
    try {
      await subscribeToMailchimp(email);
      setIsSubscribed(true);
      confetti({
        particleCount: 180,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#F7931A', '#FFD166', '#ffffff', '#ff9f1c'],
      });
    } catch (err) {
      setError(err.message || 'Algo salió mal. Intentá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.grain} />
      <div style={styles.glowOrange} />
      <div style={styles.glowAmber} />

      {/* ── Floating ₿ symbols ── */}
      {FLOATERS.map((f, i) => <FloatingSym key={i} {...f} />)}

      <div style={styles.topLine} />

      <main style={styles.main}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.preBadge}
        >
          <span style={styles.preBadgeDot} />
          <span style={{ letterSpacing: '0.18em', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#F7931A' }}>
            En Construcción
          </span>
        </motion.div>

        {/* Logo giratorio — agrandado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={styles.logoWrap}
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ width: '100%', height: '100%' }}
          >
            <img
              src="/logoBitcoinWeek-Logo.png"
              alt="Bitcoin Week Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 30px rgba(247,147,26,0.4))' }}
            />
          </motion.div>
        </motion.div>

        {/* Title — imagen en lugar de texto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={styles.titleImgWrap}
        >
          <img
            src="/logoBitcoinWeek-Text.png"
            alt="Bitcoin Week"
            style={styles.titleImg}
          />
        </motion.div>

        {/* Location + Date — apilados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={styles.locationBlock}
        >
          <span style={styles.chip}>
            <MapPin size={13} strokeWidth={2.2} />
            Colonia, Montevideo y Punta del Este, Uruguay
          </span>
          <span style={styles.chipMuted}>
            <Calendar size={13} strokeWidth={2.2} />
            18 – 24 Mayo 2026
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={styles.divider}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={styles.description}
        >
          La agenda más relevante de eventos Bitcoin en LATAM está tomando forma,
          promoviendo el intercambio de conocimiento y la innovación financiera.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={styles.statsRow}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                ...styles.statItem,
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <div style={styles.statNum}>
                <Counter from={0} to={s.val} duration={1.4 + i * 0.3} />
                <span style={{ color: '#F7931A' }}>{s.suffix}</span>
              </div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Form / Success */}
        {!isSubscribed ? (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onSubmit={handleSubscribe}
            style={styles.form}
          >
            <div style={styles.inputGroup}>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={isLoading}
                style={styles.input}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(247,147,26,0.55)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(247,147,26,0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <motion.button
                type="submit"
                disabled={isLoading}
                style={styles.btn}
                whileHover={{ scale: 1.02, boxShadow: '0 4px 24px rgba(247,147,26,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                {isLoading ? (
                  <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                    Registrando…
                  </motion.span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    Notificarme <Send size={14} strokeWidth={2.2} />
                  </span>
                )}
              </motion.button>
            </div>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.errorMsg}>
                {error}
              </motion.p>
            )}
            <p style={styles.formNote}>Sin spam. Solo novedades del evento.</p>
          </motion.form>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={styles.successBox}
          >
            <Bell size={18} style={{ color: '#F7931A' }} />
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: '#fff', fontSize: '15px' }}>¡Estás en la lista!</p>
              <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
                Volviendo en {countdown}s…
              </p>
            </div>
          </motion.div>
        )}

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          style={styles.socials}
        >
          <a
            href="https://www.instagram.com/bitcoinweekuy"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(247,147,26,0.4)'; e.currentTarget.style.color = '#F7931A'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
          >
            <Instagram size={15} strokeWidth={1.8} />
            @bitcoinweekuy
          </a>
          <a
            href="https://www.google.com/calendar/render?action=TEMPLATE&text=Bitcoin%20Week%20Montevideo%202026&dates=20260518/20260525&details=El%20evento%20de%20Bitcoin%20m%C3%A1s%20esperado%20de%20Latinoam%C3%A9rica.&location=Montevideo%2C%20Uruguay"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(247,147,26,0.4)'; e.currentTarget.style.color = '#F7931A'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
          >
            <Calendar size={15} strokeWidth={1.8} />
            Guardar fecha
          </a>
        </motion.div>
      </main>

      <div style={styles.bottomLine} />
      <p style={styles.bottomNote}>
        © 2026 Bitcoin Week Montevideo — desarrollado por{' '}
        <a 
          href="https://salvadorcastro.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            color: 'rgba(255,255,255,0.4)', 
            textDecoration: 'underline',
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
        >
          salvaCastro
        </a>
      </p>
    </div>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = {
  root: {
    minHeight: '100vh',
    background: '#0A0A0A',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '0 20px',
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
  },
  grain: {
    position: 'fixed',
    inset: 0,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'repeat',
    backgroundSize: '200px',
    opacity: 0.5,
    pointerEvents: 'none',
    zIndex: 1,
  },
  glowOrange: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(247,147,26,0.12) 0%, transparent 70%)',
    top: '-10%',
    left: '-15%',
    pointerEvents: 'none',
  },
  glowAmber: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(247,147,26,0.07) 0%, transparent 70%)',
    bottom: '-5%',
    right: '-10%',
    pointerEvents: 'none',
  },
  topLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(247,147,26,0.5) 40%, rgba(247,147,26,0.5) 60%, transparent)',
    zIndex: 2,
  },
  bottomLine: {
    position: 'absolute',
    bottom: '36px',
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent)',
    zIndex: 2,
  },
  bottomNote: {
    position: 'absolute',
    bottom: '14px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '11px',
    color: 'rgba(255,255,255,0.18)',
    letterSpacing: '0.06em',
    margin: 0,
    zIndex: 10,
    whiteSpace: 'nowrap',
  },
  main: {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '480px',
    width: '100%',
    padding: '60px 0',
  },
  preBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(247,147,26,0.08)',
    border: '1px solid rgba(247,147,26,0.2)',
    borderRadius: '100px',
    padding: '6px 14px',
    marginBottom: '28px',
  },
  preBadgeDot: {
    display: 'inline-block',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#F7931A',
    boxShadow: '0 0 8px rgba(247,147,26,0.8)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  // Logo agrandado: de 100px a 160px
  logoWrap: {
    width: '160px',
    height: '160px',
    marginBottom: '20px',
  },
  // Imagen del título
  titleImgWrap: {
    marginBottom: '20px',
    width: '100%',
    maxWidth: '340px',
    display: 'flex',
    justifyContent: 'center',
  },
  titleImg: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 0 20px rgba(247,147,26,0.2))',
  },
  // Location block apilado verticalmente
  locationBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '24px',
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#F7931A',
    letterSpacing: '0.02em',
  },
  chipMuted: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '0.02em',
  },
  divider: {
    width: '40px',
    height: '1px',
    background: 'rgba(247,147,26,0.35)',
    marginBottom: '20px',
    transformOrigin: 'center',
  },
  description: {
    fontSize: '15px',
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    margin: '0 0 28px 0',
    maxWidth: '360px',
    fontWeight: 400,
  },
  statsRow: {
    display: 'flex',
    marginBottom: '32px',
    width: '100%',
    maxWidth: '340px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '14px',
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    padding: '16px 0',
    textAlign: 'center',
  },
  statNum: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.2,
    fontFamily: '"DM Serif Display", Georgia, serif',
    letterSpacing: '-0.02em',
  },
  statLabel: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.35)',
    marginTop: '3px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 500,
  },
  form: {
    width: '100%',
    maxWidth: '420px',
    marginBottom: '28px',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'stretch',
  },
  input: {
    flex: 1,
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  },
  btn: {
    padding: '13px 20px',
    background: 'linear-gradient(135deg, #F7931A, #e07e10)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    letterSpacing: '0.01em',
  },
  errorMsg: {
    color: '#ff7b7b',
    fontSize: '12px',
    margin: '8px 0 0',
    textAlign: 'center',
  },
  formNote: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.25)',
    textAlign: 'center',
    margin: '10px 0 0',
    letterSpacing: '0.03em',
  },
  successBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: 'rgba(247,147,26,0.08)',
    border: '1px solid rgba(247,147,26,0.25)',
    borderRadius: '12px',
    padding: '16px 20px',
    width: '100%',
    maxWidth: '420px',
    marginBottom: '28px',
  },
  socials: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    padding: '9px 16px',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '100px',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.55)',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'border-color 0.2s, color 0.2s',
    letterSpacing: '0.01em',
  },
};

export default ConstructionPage;