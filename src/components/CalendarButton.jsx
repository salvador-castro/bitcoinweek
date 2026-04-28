// src/components/CalendarButton.jsx
import React from "react";
import { Calendar } from "lucide-react";

export default function CalendarButton({ className, style }) {
  const event = {
    title: "Bitcoin Week Uruguay 2026",
    start: "20260518T090000Z",
    end: "20260522T210000Z",
    location: "Montevideo, Uruguay",
    description:
      "Una semana para reunir comunidad, conocimiento y visión. El encuentro de Bitcoin más importante de América Latina.",
  };
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className || "btn-ghost"}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, ...style }}
    >
      <Calendar size={14} /> Guardar Fecha
    </a>
  );
}
