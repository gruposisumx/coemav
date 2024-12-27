import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-[var(--primary)] fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white text-xl font-bold">COEMAV</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#welcome" className="text-white hover:text-[var(--light)]">Inicio</a>
            <a href="#psychologists" className="text-white hover:text-[var(--light)]">Psicólogos</a>
            <a href="#resources" className="text-white hover:text-[var(--light)]">Recursos</a>
            <a href="#blog" className="text-white hover:text-[var(--light)]">Blog</a>
            {user ? (
              <button onClick={signOut} className="text-white hover:text-[var(--light)]">
                Cerrar Sesión
              </button>
            ) : (
              <a href="/login" className="text-white hover:text-[var(--light)]">
                Iniciar Sesión
              </a>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--primary)]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#welcome" className="block text-white hover:text-[var(--light)] px-3 py-2">
              Inicio
            </a>
            <a href="#psychologists" className="block text-white hover:text-[var(--light)] px-3 py-2">
              Psicólogos
            </a>
            <a href="#resources" className="block text-white hover:text-[var(--light)] px-3 py-2">
              Recursos
            </a>
            <a href="#blog" className="block text-white hover:text-[var(--light)] px-3 py-2">
              Blog
            </a>
            {user ? (
              <button 
                onClick={signOut}
                className="block w-full text-left text-white hover:text-[var(--light)] px-3 py-2"
              >
                Cerrar Sesión
              </button>
            ) : (
              <a href="/login" className="block text-white hover:text-[var(--light)] px-3 py-2">
                Iniciar Sesión
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}