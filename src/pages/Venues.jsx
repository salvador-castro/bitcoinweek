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
    name: "Sede Principal",
    area: "Ciudad Vieja",
    address: "Por confirmar · Ciudad Vieja, Montevideo",
    desc: "Sede principal del evento. Aquí se realizarán las keynotes y la ceremonia de apertura y cierre.",
    days: ["Lunes 18", "Viernes 22"],
    capacity: "200+",
    lat: -34.9059,
    lng: -56.2011,
    color: "#F7931A",
    type: "Principal",
    mapQ: "Ciudad+Vieja+Montevideo+Uruguay",
  },
  {
    id: 2,
    name: "Sede Técnica",
    area: "Palermo",
    address: "Por confirmar · Palermo, Montevideo",
    desc: "Espacio dedicado a talleres técnicos, charlas sobre tecnología Bitcoin y workshops de Lightning Network.",
    days: ["Martes 19"],
    capacity: "80",
    lat: -34.8995,
    lng: -56.1804,
    color: "#3B9EFF",
    type: "Técnica",
    mapQ: "Palermo+Montevideo+Uruguay",
  },
  {
    id: 3,
    name: "Sede Económica",
    area: "Centro",
    address: "Por confirmar · Centro, Montevideo",
    desc: "Paneles y conversaciones sobre economía Bitcoin, regulación y el sistema financiero uruguayo.",
    days: ["Miércoles 20"],
    capacity: "120",
    lat: -34.9061,
    lng: -56.1895,
    color: "#22C55E",
    type: "Económica",
    mapQ: "Centro+Montevideo+Uruguay",
  },
  {
    id: 4,
    name: "Sede Comunitaria",
    area: "Cordón",
    address: "Por confirmar · Cordón, Montevideo",
    desc: "Meetups, encuentros de comunidad y el espacio para el público general.",
    days: ["Jueves 21"],
    capacity: "100",
    lat: -34.9032,
    lng: -56.1848,
    color: "#EC4899",
    type: "Comunitaria",
    mapQ: "Cordon+Montevideo+Uruguay",
  },
  {
    id: 5,
    name: "Bitcoin Pizza Night",
    area: "A confirmar",
    address: "Por confirmar · Montevideo",
    desc: "Celebración especial del Bitcoin Pizza Day. Evento social abierto a toda la comunidad.",
    days: ["Jueves 21 (noche)"],
    capacity: "150",
    lat: -34.915,
    lng: -56.165,
    color: "#F97316",
    type: "Social",
    mapQ: "Montevideo+Uruguay",
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
              Bitcoin Week Uruguay se distribuye por distintos puntos de
              Montevideo. Cada sede tiene su propia personalidad y temática.
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
                            marginBottom: 4,
                          }}
                        >
                          {venue.name}
                        </h3>
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
                          href={`https://maps.google.com/?q=${venue.mapQ}`}
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
                            <Clock size={10} /> Capacidad: {venue.capacity}
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
                        Montevideo, Uruguay
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
                        marginBottom: 4,
                        color: v.color,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {v.name}
                    </h3>
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
                      href={`https://maps.google.com/?q=${v.mapQ}`}
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
              <div className="tag-dot" /> Sedes en proceso de confirmación
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 13,
                marginTop: 10,
                lineHeight: 1.7,
              }}
            >
              Las ubicaciones exactas se confirmarán próximamente. Seguinos para
              no perderte ningún anuncio.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
