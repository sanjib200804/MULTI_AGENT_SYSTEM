import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import NavBar from './components/NavBar'
import LenisScroll from './components/LenisScroll'
import AuthModal from './components/AuthModal'

const App = () => {
  return (
    <>
      <LenisScroll />
      <AuthModal />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Home />} />
        <Route path="/pricing" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/dashboard" element={<Chat />} />
      </Routes>
    </>
  )
}

export default App
