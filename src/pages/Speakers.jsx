import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mic } from "lucide-react";
import { Link } from "react-router-dom";

function FadeIn({ children, delay = 0 }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const SPEAKERS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: "SPEAKER TBD",
  role: "Próximamente",
  bio: "La información sobre este ponente se anunciará en los próximos meses. Seguí nuestras redes para estar al tanto.",
  topic: "Por confirmar",
  country: "Uruguay / LATAM",
  confirmed: false,
}));

function SpeakerCard({ speaker }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        transition: "border-color 0.25s, transform 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hot)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1",
          background: "var(--surface-3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          style={{
            position: "relative",
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--surface-2)",
            border: "1px dashed var(--border-hot)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--btc)",
            fontSize: 24,
            fontFamily: "var(--font-display)",
          }}
        >
          ?
        </div>
        {!speaker.confirmed && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "var(--btc-dim)",
              border: "1px solid var(--btc-line)",
              borderRadius: 999,
              padding: "3px 10px",
              fontSize: 9,
              fontFamily: "var(--font-mono)",
              color: "var(--btc)",
              letterSpacing: "0.12em",
            }}
          >
            TBD
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: 22 }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            letterSpacing: "0.04em",
            marginBottom: 4,
            color: "var(--text-primary)",
          }}
        >
          {speaker.name}
        </h3>
        <p
          style={{
            color: "var(--btc)",
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.12em",
            marginBottom: 10,
            textTransform: "uppercase",
          }}
        >
          {speaker.role}
        </p>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 12,
            lineHeight: 1.7,
          }}
        >
          {speaker.bio}
        </p>
      </div>
    </div>
  );
}

export default function Speakers() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      {/* Header */}
      <section
        style={{
          background: "var(--black)",
          padding: "80px 0 56px",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 80% at 100% 50%, rgba(247,147,26,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <FadeIn>
            <div className="section-label">Ponentes</div>
            <h1 className="section-title">SPEAKERS</h1>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 14,
                maxWidth: 520,
                marginTop: 16,
                lineHeight: 1.8,
              }}
            >
              Referentes del ecosistema Bitcoin latinoamericano y global. Los
              confirmaremos a medida que se sumen.
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <div className="tag">
                <div className="tag-dot" /> Anuncios próximamente
              </div>
              <Link
                to="/contacto"
                className="btn-ghost"
                style={{ fontSize: 11, padding: "7px 16px" }}
              >
                Quiero ser speaker
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "28px 0",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { num: "20+", label: "Speakers esperados" },
              { num: "5", label: "Días de evento" },
              { num: "∞", label: "Inspiración" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 36,
                    color: "var(--btc)",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 9,
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section" style={{ background: "var(--black)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
              gap: 20,
            }}
          >
            {SPEAKERS.map((sp, i) => (
              <FadeIn key={sp.id} delay={(i % 4) * 0.07}>
                <SpeakerCard speaker={sp} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "var(--surface)",
          padding: "80px 0",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          className="container"
          style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}
        >
          <FadeIn>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "var(--btc-dim)",
                border: "1px solid var(--btc-line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--btc)",
                margin: "0 auto 22px",
              }}
            >
              <Mic size={20} />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px,5vw,56px)",
                marginBottom: 14,
                letterSpacing: "0.03em",
              }}
            >
              ¿QUERÉS SER SPEAKER?
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 14,
                marginBottom: 28,
                lineHeight: 1.75,
              }}
            >
              Si tenés algo valioso que aportar al ecosistema Bitcoin uruguayo y
              latinoamericano, nos encantaría escucharte.
            </p>
            <Link to="/contacto" className="btn-primary">
              Proponer charla
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
