import React from 'react'
import AddUsers from './components/AddUsers'
import ViewUsers from './components/ViewUsers'
import EditUsers from './components/EditUsers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewUsers />} />
        <Route path="/AddUsers" element={<AddUsers />} />
        <Route path="/EditUsers/:id" element={<EditUsers />} />
      </Routes>
    </Router>
  )
}

export default App
