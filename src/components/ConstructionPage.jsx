import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coins, Calendar, Bell, Instagram, Send, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

// ─── Mailchimp vía JSONP ───
const MAILCHIMP_URL = import.meta.env.VITE_MAILCHIMP_URL;

const subscribeToMailchimp = (email) => {
  return new Promise((resolve, reject) => {
    const callbackName = 'mc_callback_' + Date.now();
    const url = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}&tags=bitcoin-week&c=${callbackName}`;

    const script = document.createElement('script');
    script.src = url;

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Tiempo de espera agotado. Intentá de nuevo.'));
    }, 8000);

    const cleanup = () => {
      clearTimeout(timeout);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    window[callbackName] = (data) => {
      cleanup();
      if (data.result === 'success') {
        resolve(data);
      } else {
        // Mailchimp devuelve el error en data.msg
        const msg = data.msg || 'Error al suscribir';
        // "already subscribed" viene en inglés, lo traducimos
        if (msg.toLowerCase().includes('already subscribed')) {
          resolve({ result: 'success', msg: 'Ya estás suscripto' });
        } else {
          reject(new Error(msg.replace(/^\d+ - /, '')));
        }
      }
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('No se pudo conectar. Verificá tu conexión.'));
    };

    document.body.appendChild(script);
  });
};

const ConstructionPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(5);

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
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F7931A', '#FFB119', '#ffffff'],
      });
    } catch (err) {
      setError(err.message || 'Algo salió mal. Intentá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="bg-blur-1" />
      <div className="bg-blur-2" />

      <main className="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card"
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="icon-container"
            style={{ perspective: 1000 }}
          >
            <img
              src="/logoBitcoinWeek.png"
              alt="Bitcoin Week Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="title"
          >
            Bitcoin <span className="text-gradient">Week</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginBottom: '12px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F7931A', fontWeight: 600 }}>
              <MapPin size={15} />
              <span style={{ fontSize: '15px' }}>Montevideo, Uruguay</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#aaa', fontSize: '14px' }}>
              <Calendar size={14} />
              <span>18 – 24 de Mayo, 2025</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="subtitle"
          >
            El evento de Bitcoin más esperado de Latinoamérica está tomando forma.
            Únete a nosotros en Montevideo para redefinir el futuro de las finanzas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="badge"
          >
            <div className="badge-dot" />
            <span className="badge-text">En Construcción</span>
          </motion.div>

          {!isSubscribed ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onSubmit={handleSubscribe}
              className="form-container"
            >
              <div className="input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu email"
                  required
                  disabled={isLoading}
                  className="email-input"
                />
              </div>
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Notificarme'}
                {!isLoading && <Send size={16} />}
              </button>
              {error && (
                <p style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px', textAlign: 'center' }}>
                  {error}
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="success-message"
              style={{ flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={20} />
                ¡Estás en la lista! Te mantendremos informado.
              </div>
              <span style={{ fontSize: '13px', opacity: 0.7 }}>
                Volviendo al inicio en {countdown}s...
              </span>
            </motion.div>
          )}

          <div className="social-links">
            <a 
              href="https://www.instagram.com/bitcoinweekuy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              <Instagram size={16} />
              Instagram
            </a>
            <a 
              href="https://www.google.com/calendar/render?action=TEMPLATE&text=Bitcoin%20Week%20Montevideo%202025&dates=20250518/20250525&details=El%20evento%20de%20Bitcoin%20m%C3%A1s%20esperado%20de%20Latinoam%C3%A9rica.%20%C3%9Anate%20a%20nosotros%20en%20Montevideo%20para%20redefinir%20el%20futuro%20de%20las%20finanzas.&location=Montevideo%2C%20Uruguay" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              <Calendar size={16} />
              Guardar Fecha
            </a>
          </div>
        </motion.div>
      </main>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background: 'linear-gradient(to bottom right, rgba(247,147,26,0.1), transparent)',
              borderRadius: '50%',
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ConstructionPage;