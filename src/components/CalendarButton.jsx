import React from 'react'
import { Calendar } from 'lucide-react'

export default function CalendarButton({ className }) {
    const event = {
        title: 'Bitcoin Week Uruguay 2026',
        start: '20260518T090000Z',
        end: '20260522T210000Z',
        location: 'Montevideo, Uruguay',
        description: 'Una semana para reunir comunidad, conocimiento y visión. El encuentro de Bitcoin más importante de América Latina.'
    }

    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`

    return (
        <a 
            href={googleUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={className || "btn-primary"}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
            <Calendar size={16} />
            Guardar Fecha
        </a>
    )
}
