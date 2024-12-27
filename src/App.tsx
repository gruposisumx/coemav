import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Carousel } from './components/home/Carousel';
import { AuthProvider } from './contexts/AuthContext';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-16">
            <section id="welcome" className="py-12 px-4">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4">
                  Bienvenida a COEMAV
                </h1>
                <p className="text-center text-gray-600 mb-8">
                  Un espacio seguro para mujeres que buscan apoyo y sanación.
                </p>
                <Carousel />
              </div>
            </section>
            {/* Otros componentes se agregarán aquí */}
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;