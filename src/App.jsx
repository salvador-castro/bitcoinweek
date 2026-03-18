import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Agenda from './pages/Agenda'
import Speakers from './pages/Speakers'
import Venues from './pages/Venues'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}