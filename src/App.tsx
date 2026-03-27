import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CharacterDetail from './pages/CharacterDetail'
import Community from './pages/Community'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App