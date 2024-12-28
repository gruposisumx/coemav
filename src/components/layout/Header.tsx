import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="bg-purple-700 text-white">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8" />
            <span className="text-xl font-bold">COEMAV</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/recursos" className="hover:text-purple-200">Recursos</Link>
            <Link to="/blog" className="hover:text-purple-200">Blog</Link>
            <Link to="/profesionales" className="hover:text-purple-200">Profesionales</Link>
            {user && (
              <Link to="/staff" className="hover:text-purple-200">Staff</Link>
            )}
            {user ? (
              <>
                <Link to="/perfil" className="hover:text-purple-200">Mi Perfil</Link>
                <button 
                  onClick={signOut}
                  className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3">
            <div className="flex flex-col space-y-3">
              <Link to="/recursos" className="hover:text-purple-200">Recursos</Link>
              <Link to="/blog" className="hover:text-purple-200">Blog</Link>
              <Link to="/profesionales" className="hover:text-purple-200">Profesionales</Link>
              {user && (
                <Link to="/staff" className="hover:text-purple-200">Staff</Link>
              )}
              {user ? (
                <>
                  <Link to="/perfil" className="hover:text-purple-200">Mi Perfil</Link>
                  <button 
                    onClick={signOut}
                    className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 text-left"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link 
                  to="/login"
                  className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}