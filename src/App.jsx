import './App.css'
import Navbar from './components/Navbar'
import Content from './components/Content'
import Footer from './components/Footer'

function App() {

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <Content />
      <Footer />
    </div>
  )
}

export default App
