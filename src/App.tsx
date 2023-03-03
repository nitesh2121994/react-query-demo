import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, ProductDemo, Products } from 'pages';
import { lazy } from "react";

// const Products = lazy(()=> import('./pages/Products'))

function App() {

  return (
    <div style={{ padding: '2rem' }}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='products-old/*' element={<Products />} />
          <Route path='products/*' element={<ProductDemo />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
