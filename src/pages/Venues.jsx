// src/pages/Venues.jsx

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, ExternalLink, Calendar } from "lucide-react";

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

const VENUES = [
  {
    id: 1,
    name: "Puntabitcoin / Bemlocal",
    event: "HUB Físico",
    area: "Punta del Este",
    city: "Punta del Este",
    address: "Pedragosa Sierra y San Francisco, Punta del Este",
    desc: "HUB físico Bitcoin en Punta del Este con capacidad para 50 personas. Incluye proyector, pantalla LED, sonido, micrófonos, WiFi, escenario, streaming y cabina técnica.",
    days: ["Dom 18 de mayo"],
    time: "14:00 – 21:00",
    capacity: "50",
    lat: -34.9649,
    lng: -54.9533,
    color: "#3B9EFF",
    type: "HUB",
    mapsUrl: "https://maps.app.goo.gl/vEuQBUxCvoNzPkm8A",
    mapQ: "Pedragosa+Sierra+y+San+Francisco+Punta+del+Este+Uruguay",
  },
  {
    id: 2,
    name: "Club de Yachting Colonia",
    event: "Bitcoin Wellness Day",
    area: "Colonia del Sacramento",
    city: "Colonia del Sacramento",
    address: "Calle Santa Rita S/N, Colonia del Sacramento",
    desc: "Jornada de bienestar y Bitcoin en el histórico Club de Yachting de Colonia. Capacidad para 50 personas, con internet de 100 Mb y espacio para sponsors, networking y catering.",
    days: ["Jue 21 de mayo"],
    time: "17:00 – 22:00",
    capacity: "50",
    lat: -34.474,
    lng: -57.8431,
    color: "#22C55E",
    type: "Wellness",
    mapsUrl: "https://maps.app.goo.gl/F8EgUTwoXM61UDEt9",
    mapQ: "Calle+Santa+Rita+Colonia+del+Sacramento+Uruguay",
  },
  {
    id: 3,
    name: "Victoria Plaza Office Tower",
    event: "Bitcoin Space by Pizza DAO",
    area: "Rooftop Piso 18 · Montevideo",
    city: "Montevideo",
    address: "Plaza Independencia 755, piso 18, Montevideo",
    desc: "Evento de cierre en el rooftop del piso 18 del Victoria Plaza. Vistas panorámicas de Montevideo, capacidad para 100 personas y acceso al networking de la semana.",
    days: ["Vie 22 de mayo"],
    time: "19:00 – 22:00",
    capacity: "100",
    lat: -34.9044,
    lng: -56.1895,
    color: "#F7931A",
    type: "Social",
    mapsUrl: "https://maps.app.goo.gl/fAtrJwHVbnJvfkrZ9",
    mapQ: "Plaza+Independencia+755+Montevideo+Uruguay",
  },
  {
    id: 4,
    name: "Centro Cultural AFE",
    event: "Global Pizza Party",
    area: "Colonia del Sacramento",
    city: "Colonia del Sacramento",
    address: "Arquitecto Miguel Angel Odriozola, Colonia del Sacramento",
    desc: "Auditorio con capacidad para 250 personas (100 sentados / 150 parados). Cuenta con proyector, sonido, escenario y sillas. Internet de 100 Mb, espacio amplio para sponsors, networking y catering. Estacionamiento amplio y accesibilidad para personas con movilidad reducida.",
    days: ["Vie 22 de mayo"],
    time: "17:00 – 23:00",
    capacity: "250",
    lat: -34.4712,
    lng: -57.8425,
    color: "#F7931A",
    type: "Auditorio",
    mapsUrl: "https://maps.app.goo.gl/FiuUNti5DbZyc3ux5",
    mapQ: "Centro+Cultural+AFE+Colonia+del+Sacramento+Uruguay",
  },
];

export default function Venues() {
  const [active, setActive] = useState(0);

  const v = VENUES[active];

  const mapFallback = `https://maps.google.com/maps?q=${v.lat},${v.lng}&z=15&output=embed`;

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
              "radial-gradient(ellipse 70% 55% at 30% 100%, rgba(247,147,26,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <FadeIn>
            <div className="section-label">Ubicaciones</div>
            <h1 className="section-title">SEDES</h1>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 14,
                maxWidth: 520,
                marginTop: 16,
                lineHeight: 1.8,
              }}
            >
              Bitcoin Week Uruguay se despliega por todo el país: Punta del Este,
              Colonia del Sacramento y Montevideo. Tres sedes, tres experiencias.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Map + list */}
      <section className="section" style={{ background: "var(--black)" }}>
        <div className="container">
          <div
            className="venues-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.3fr",
              gap: 44,
              alignItems: "start",
            }}
          >
            {/* Left: venue list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {VENUES.map((venue, i) => (
                <FadeIn key={venue.id} delay={i * 0.07}>
                  <div
                    onClick={() => setActive(i)}
                    style={{
                      padding: "20px 22px",
                      background:
                        active === i ? "var(--surface)" : "transparent",
                      border: `1px solid ${active === i ? venue.color + "55" : "var(--border)"}`,
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      transition: "all 0.22s",
                      borderLeft:
                        active === i
                          ? `3px solid ${venue.color}`
                          : `1px solid ${active === i ? venue.color + "55" : "var(--border)"}`,
                    }}
                    onMouseEnter={(e) => {
                      if (active !== i)
                        e.currentTarget.style.borderColor = "var(--border-hot)";
                    }}
                    onMouseLeave={(e) => {
                      if (active !== i)
                        e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            marginBottom: 4,
                          }}
                        >
                          <div
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: venue.color,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 9,
                              fontFamily: "var(--font-mono)",
                              color: venue.color,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                            }}
                          >
                            {venue.type}
                          </span>
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 20,
                            letterSpacing: "0.03em",
                            color: "var(--text-primary)",
                            marginBottom: 2,
                          }}
                        >
                          {venue.name}
                        </h3>
                        <div
                          style={{
                            fontSize: 11,
                            color: venue.color,
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.06em",
                            marginBottom: 4,
                          }}
                        >
                          {venue.event}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            color: "var(--text-secondary)",
                            fontSize: 12,
                          }}
                        >
                          <MapPin size={10} style={{ color: venue.color }} />{" "}
                          {venue.area}
                        </div>
                      </div>
                      {active === i && (
                        <motion.a
                          href={venue.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{
                            color: venue.color,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 11,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={11} />
                        </motion.a>
                      )}
                    </div>

                    {active === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.25 }}
                      >
                        <p
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: 12,
                            lineHeight: 1.7,
                            marginTop: 10,
                          }}
                        >
                          {venue.desc}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: 14,
                            marginTop: 10,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              color: "var(--text-muted)",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Calendar size={10} /> {venue.days.join(", ")}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: "var(--text-muted)",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Clock size={10} /> {venue.time}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: "var(--text-muted)",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            Cap. {venue.capacity} personas
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Right: Map */}
            <div style={{ position: "sticky", top: 100 }}>
              <FadeIn delay={0.2}>
                <div
                  style={{
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                  }}
                >
                  {/* Map header */}
                  <div
                    style={{
                      padding: "14px 20px",
                      borderBottom: "1px solid var(--border)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <MapPin size={13} style={{ color: "var(--btc)" }} />
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Uruguay
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: "var(--text-muted)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {v.area}
                    </span>
                  </div>

                  {/* Google Maps embed */}
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "4/3",
                      background: "var(--surface-3)",
                    }}
                  >
                    <motion.iframe
                      key={active}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      title={`Mapa ${v.name}`}
                      src={mapFallback}
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        filter:
                          "grayscale(0.85) invert(0.92) hue-rotate(175deg)",
                        opacity: 0.88,
                      }}
                      loading="lazy"
                      allowFullScreen={false}
                      referrerPolicy="no-referrer-when-downgrade"
                    />

                    {/* Overlay label pin */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <motion.div
                        key={active}
                        initial={{ scale: 0, y: -10 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div
                          style={{
                            background: v.color,
                            color: "#000",
                            padding: "5px 13px",
                            borderRadius: 999,
                            fontSize: 11,
                            fontWeight: 600,
                            fontFamily: "var(--font-body)",
                            boxShadow: `0 3px 16px ${v.color}55`,
                            whiteSpace: "nowrap",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {v.name}
                        </div>
                        <div
                          style={{
                            width: 2,
                            height: 12,
                            background: v.color,
                            margin: "0 auto",
                          }}
                        />
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: v.color,
                            margin: "0 auto",
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Selected venue info */}
                  <div style={{ padding: "18px 22px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        marginBottom: 2,
                        color: v.color,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {v.name}
                    </h3>
                    <div
                      style={{
                        fontSize: 10,
                        fontFamily: "var(--font-mono)",
                        color: "var(--text-muted)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      {v.event}
                    </div>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: 12,
                        marginBottom: 12,
                        lineHeight: 1.6,
                      }}
                    >
                      {v.address}
                    </p>
                    <a
                      href={v.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{
                        fontSize: 10,
                        padding: "7px 14px",
                        display: "inline-flex",
                        gap: 5,
                      }}
                    >
                      <ExternalLink size={10} /> Ver en Google Maps
                    </a>
                  </div>
                </div>

                {/* Legend pills */}
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {VENUES.map((venue, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 12px",
                        background:
                          active === i ? "var(--surface)" : "transparent",
                        border: `1px solid ${active === i ? venue.color + "55" : "var(--border)"}`,
                        borderRadius: 999,
                        color: active === i ? venue.color : "var(--text-muted)",
                        fontSize: 10,
                        fontFamily: "var(--font-mono)",
                        cursor: "pointer",
                        transition: "all 0.18s",
                        letterSpacing: "0.08em",
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: venue.color,
                        }}
                      />
                      {venue.area}
                    </button>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section
        style={{
          background: "var(--surface)",
          padding: "56px 0",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
        }}
      >
        <div className="container">
          <FadeIn>
            <div
              className="tag"
              style={{ margin: "0 auto 14px", display: "inline-flex" }}
            >
              <div className="tag-dot" /> Más sedes por anunciarse
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 13,
                marginTop: 10,
                lineHeight: 1.7,
              }}
            >
              Estas son las sedes confirmadas hasta ahora. Seguinos para no
              perderte los próximos anuncios.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
