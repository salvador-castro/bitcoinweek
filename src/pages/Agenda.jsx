// src/pages/Agenda.jsx

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Mic, ChevronDown, ChevronUp } from "lucide-react";

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

const DAYS = [
  {
    date: "18 May",
    weekday: "Lunes",
    theme: "Apertura",
    color: "#F7931A",
    events: [
      {
        time: "18:00",
        title: "Ceremonia de Apertura",
        type: "Keynote",
        venue: "Sede principal · TBD",
        speaker: "Organizadores Bitcoin Week UY",
        desc: "Bienvenida oficial al evento y presentación de la semana.",
      },
      {
        time: "19:30",
        title: "Panel Inaugural: Bitcoin en Latinoamérica",
        type: "Panel",
        venue: "Sede principal · TBD",
        speaker: "Múltiples ponentes",
        desc: "Estado del ecosistema Bitcoin en la región y perspectivas para 2026.",
      },
    ],
  },
  {
    date: "19 May",
    weekday: "Martes",
    theme: "Tecnología",
    color: "#c47314",
    events: [
      {
        time: "10:00",
        title: "Taller: Lightning Network desde cero",
        type: "Workshop",
        venue: "Sede técnica · TBD",
        speaker: "TBD",
        desc: "Introducción práctica al protocolo Lightning y cómo correr un nodo.",
      },
      {
        time: "14:00",
        title: "Charla: Bitcoin y privacidad",
        type: "Charla",
        venue: "Sede técnica · TBD",
        speaker: "TBD",
        desc: "Herramientas y buenas prácticas para preservar la privacidad en transacciones.",
      },
      {
        time: "17:00",
        title: "Mesa redonda: Custodia y self-custody",
        type: "Panel",
        venue: "Sede técnica · TBD",
        speaker: "Múltiples ponentes",
        desc: "No tus llaves, no tus bitcoins. Mejores prácticas de custodia.",
      },
    ],
  },
  {
    date: "20 May",
    weekday: "Miércoles",
    theme: "Economía",
    color: "#F7931A",
    events: [
      {
        time: "10:00",
        title: "Bitcoin como reserva de valor",
        type: "Charla",
        venue: "Sede económica · TBD",
        speaker: "TBD",
        desc: "Análisis del Bitcoin como activo de largo plazo en un mundo inflacionario.",
      },
      {
        time: "13:00",
        title: "Bitcoin y el sistema financiero uruguayo",
        type: "Panel",
        venue: "Sede económica · TBD",
        speaker: "Múltiples ponentes",
        desc: "Regulación, bancarización y convivencia con el sistema tradicional.",
      },
      {
        time: "16:00",
        title: "Caso de uso: empresas que aceptan Bitcoin en UY",
        type: "Charla",
        venue: "Sede económica · TBD",
        speaker: "TBD",
        desc: "Experiencias reales de negocios uruguayos que adoptaron Bitcoin.",
      },
    ],
  },
  {
    date: "21 May",
    weekday: "Jueves",
    theme: "Comunidad",
    color: "#c47314",
    events: [
      {
        time: "10:00",
        title: "Encuentro de comunidades",
        type: "Networking",
        venue: "Múltiples sedes",
        speaker: "Comunidades Bitcoin UY",
        desc: "Espacio libre para que las distintas comunidades del ecosistema se encuentren.",
      },
      {
        time: "14:00",
        title: "Bitcoin para el público general",
        type: "Charla",
        venue: "Sede comunitaria · TBD",
        speaker: "TBD",
        desc: "Introducción accesible a Bitcoin sin tecnicismos.",
      },
      {
        time: "18:00",
        title: "Social: Bitcoin Pizza Night",
        type: "Social",
        venue: "TBD",
        speaker: "",
        desc: "Celebración del Bitcoin Pizza Day con pizza y conversación.",
      },
    ],
  },
  {
    date: "22 May",
    weekday: "Viernes",
    theme: "Comunidad",
    color: "#c47314",
    events: [
      {
        time: "10:00",
        title: "Encuentro de comunidades",
        type: "Networking",
        venue: "Múltiples sedes",
        speaker: "Comunidades Bitcoin UY",
        desc: "Espacio libre para que las distintas comunidades del ecosistema se encuentren.",
      },
      {
        time: "14:00",
        title: "Bitcoin para el público general",
        type: "Charla",
        venue: "Sede comunitaria · TBD",
        speaker: "TBD",
        desc: "Introducción accesible a Bitcoin sin tecnicismos.",
      },
      {
        time: "18:00",
        title: "Social: Bitcoin Pizza Night",
        type: "Social",
        venue: "TBD",
        speaker: "",
        desc: "Celebración del Bitcoin Pizza Day con pizza y conversación.",
      },
    ],
  },
  {
    date: "23 May",
    weekday: "Sábado",
    theme: "Comunidad",
    color: "#c47314",
    events: [
      {
        time: "10:00",
        title: "Encuentro de comunidades",
        type: "Networking",
        venue: "Múltiples sedes",
        speaker: "Comunidades Bitcoin UY",
        desc: "Espacio libre para que las distintas comunidades del ecosistema se encuentren.",
      },
      {
        time: "14:00",
        title: "Bitcoin para el público general",
        type: "Charla",
        venue: "Sede comunitaria · TBD",
        speaker: "TBD",
        desc: "Introducción accesible a Bitcoin sin tecnicismos.",
      },
      {
        time: "18:00",
        title: "Social: Bitcoin Pizza Night",
        type: "Social",
        venue: "TBD",
        speaker: "",
        desc: "Celebración del Bitcoin Pizza Day con pizza y conversación.",
      },
    ],
  },
  {
    date: "24 May",
    weekday: "Domingo",
    theme: "Bitcoin Pizza Day",
    color: "#F7931A",
    events: [
      {
        time: "10:00",
        title: "Historia del Bitcoin Pizza Day",
        type: "Keynote",
        venue: "Sede principal · TBD",
        speaker: "TBD",
        desc: "El día que 10.000 BTC valían dos pizzas. Retrospectiva y reflexión.",
      },
      {
        time: "12:00",
        title: "Panel: El futuro de Bitcoin en Uruguay",
        type: "Panel",
        venue: "Sede principal · TBD",
        speaker: "Múltiples ponentes",
        desc: "Qué queremos construir desde Uruguay para los próximos años.",
      },
      {
        time: "17:00",
        title: "Ceremonia de Cierre",
        type: "Cierre",
        venue: "Sede principal · TBD",
        speaker: "Organizadores",
        desc: "Conclusiones, agradecimientos y anuncio de la próxima edición.",
      },
    ],
  },
];

const TYPE_COLOR = {
  Keynote: "#F7931A",
  Panel: "#7B61FF",
  Workshop: "#22C55E",
  Charla: "#3B9EFF",
  Networking: "#F97316",
  Social: "#EC4899",
  Cierre: "#F7931A",
};

function AnimatedExpand({ open, children }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

export default function Agenda() {
  const [activeDay, setActiveDay] = useState(0);
  const [expanded, setExpanded] = useState({});
  const toggle = (key) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

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
              "radial-gradient(ellipse 55% 80% at 0% 50%, rgba(247,147,26,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <FadeIn>
            <div className="section-label">Programa</div>
            <h1 className="section-title">AGENDA</h1>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 14,
                maxWidth: 520,
                marginTop: 16,
                lineHeight: 1.8,
              }}
            >
              Cinco días de charlas, talleres, paneles y encuentros a lo largo
              de Montevideo. El programa detallado se confirmará próximamente.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 28,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  color: "var(--text-secondary)",
                  fontSize: 12,
                }}
              >
                <Calendar size={12} style={{ color: "var(--btc)" }} /> 18–22
                Mayo 2026
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  color: "var(--text-secondary)",
                  fontSize: 12,
                }}
              >
                <MapPin size={12} style={{ color: "var(--btc)" }} /> Montevideo,
                Uruguay
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Day tabs — sticky */}
      <section
        style={{
          background: "var(--surface)",
          position: "sticky",
          top: "var(--nav-h)",
          zIndex: 100,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", overflowX: "auto" }}>
            {DAYS.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                style={{
                  padding: "18px 26px",
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color:
                    activeDay === i ? "var(--btc)" : "var(--text-secondary)",
                  borderBottom:
                    activeDay === i
                      ? "2px solid var(--btc)"
                      : "2px solid transparent",
                  background: "none",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 9,
                    fontFamily: "var(--font-mono)",
                    opacity: 0.55,
                    marginBottom: 2,
                    letterSpacing: "0.15em",
                  }}
                >
                  {day.weekday}
                </span>
                {day.date}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Day content */}
      <section className="section" style={{ background: "var(--black)" }}>
        <div className="container">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Day header */}
            <div
              style={{
                marginBottom: 44,
                borderLeft: `3px solid ${DAYS[activeDay].color}`,
                paddingLeft: 22,
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(38px,6vw,60px)",
                  color: "var(--text-primary)",
                  letterSpacing: "0.03em",
                  lineHeight: 0.95,
                }}
              >
                {DAYS[activeDay].date} · {DAYS[activeDay].weekday}
              </h2>
              <p
                style={{
                  color: "var(--btc)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                Temática: {DAYS[activeDay].theme}
              </p>
            </div>

            {/* Events */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DAYS[activeDay].events.map((ev, i) => {
                const key = `${activeDay}-${i}`;
                const open = expanded[key];
                const tc = TYPE_COLOR[ev.type] || "var(--btc)";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => toggle(key)}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "border-color 0.18s",
                      borderLeft: open
                        ? `3px solid ${tc}`
                        : "1px solid var(--border)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = open
                        ? tc
                        : "var(--border-hot)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = open
                        ? tc
                        : "var(--border)")
                    }
                  >
                    {/* Row */}
                    <div
                      style={{
                        padding: "18px 22px",
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 16,
                          color: "var(--btc)",
                          minWidth: 56,
                          fontWeight: 500,
                        }}
                      >
                        {ev.time}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 500,
                            fontSize: 15,
                            color: "var(--text-primary)",
                            marginBottom: 5,
                          }}
                        >
                          {ev.title}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              padding: "2px 10px",
                              borderRadius: 999,
                              background: `${tc}18`,
                              color: tc,
                              fontFamily: "var(--font-mono)",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {ev.type}
                          </span>
                          {ev.venue && (
                            <span
                              style={{
                                fontSize: 11,
                                color: "var(--text-muted)",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <MapPin size={9} /> {ev.venue}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ color: "var(--text-muted)" }}>
                        {open ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </div>
                    </div>

                    {/* Expandable */}
                    <AnimatedExpand open={open}>
                      <div
                        style={{
                          padding: "0 22px 18px",
                          paddingLeft: 98,
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <p
                          style={{
                            color: "var(--text-secondary)",
                            fontSize: 13,
                            lineHeight: 1.75,
                            marginTop: 14,
                          }}
                        >
                          {ev.desc}
                        </p>
                        {ev.speaker && (
                          <p
                            style={{
                              marginTop: 10,
                              color: "var(--text-muted)",
                              fontSize: 11,
                              fontFamily: "var(--font-mono)",
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <Mic size={10} /> {ev.speaker}
                          </p>
                        )}
                      </div>
                    </AnimatedExpand>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming soon notice */}
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
              <div className="tag-dot" /> Programa en construcción
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: 14,
                marginTop: 10,
                lineHeight: 1.7,
              }}
            >
              El programa completo se anunciará en los próximos meses.
              Suscribite para recibir las novedades.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
