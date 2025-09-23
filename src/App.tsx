import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import ProductAnalyzer from './ProductAnalyzer'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product-analyzer" element={<ProductAnalyzer />} />
      </Routes>
    </Router>
  )
}

export default App
