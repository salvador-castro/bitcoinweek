// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Instagram, Youtube, Mail } from "lucide-react";
import logo from "../assets/logoBitcoinWeek-Logo.png";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/agenda", label: "Agenda" },
  { to: "/speakers", label: "Speakers" },
  { to: "/sedes", label: "Sedes" },
  { to: "/contacto", label: "Contacto" },
];

const SOCIALS = [
  {
    icon: <Twitter size={15} />,
    href: "https://twitter.com/bitcoinweekuy",
    label: "Twitter",
  },
  {
    icon: <Instagram size={15} />,
    href: "https://www.instagram.com/bitcoinweekuy",
    label: "Instagram",
  },
  {
    icon: <Youtube size={15} />,
    href: "https://www.youtube.com/@bitcoinuruguay",
    label: "YouTube",
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...Array(2)].map((_, ti) => (
            <React.Fragment key={ti}>
              {[
                "Bitcoin Week Uruguay",
                "18–22 Mayo 2026",
                "Montevideo Uruguay",
                "#BitcoinWeekUY",
                "Comunidad · Conocimiento · Libertad",
                "Bitcoin Pizza Day",
              ].map((t, i) => (
                <React.Fragment key={i}>
                  <span className="ticker-item">{t}</span>
                  <span className="ticker-sep">·</span>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: "64px 28px 36px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 56,
            marginBottom: 56,
          }}
        >
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="Bitcoin Week Uruguay"
              style={{ height: 38, marginBottom: 20 }}
            />
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 13,
                lineHeight: 1.75,
                maxWidth: 320,
                fontFamily: "var(--font-body)",
              }}
            >
              El encuentro de la comunidad Bitcoin en Uruguay. Una semana para
              aprender, conectar y construir el futuro financiero de América
              Latina.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--text-secondary)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--btc)";
                    e.currentTarget.style.color = "var(--btc)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--btc)",
                marginBottom: 20,
              }}
            >
              Navegación
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {NAV.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 13,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-secondary)")
                  }
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--btc)",
                marginBottom: 20,
              }}
            >
              Contacto
            </p>
            <a
              href="mailto:info@plugin.uy"
              style={{
                color: "var(--text-secondary)",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--btc)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              <Mail size={13} />
              info@plugin.uy
            </a>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 12,
                lineHeight: 1.7,
              }}
            >
              Montevideo, Uruguay
              <br />
              Mayo 2026
            </p>
          </div>
        </div>

        <div className="glow-line" style={{ marginBottom: 28 }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
          >
            © 2026 Bitcoin Week Uruguay. Todos los derechos reservados.
          </p>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
          >
            Construido con ₿ por{" "}
            <a
              href="https://salvadorcastro.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              SalvaCastro
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-of-type { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  );
}
