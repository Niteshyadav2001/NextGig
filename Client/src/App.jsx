import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ApplyJob from "./pages/ApplyJob"
import Applications from "./pages/Applications"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/apply-jobs/:id" element={<ApplyJob/>} />
        <Route path="/applications" element={<Applications/>} />
      </Routes>
    </div>
  )
}

export default App
