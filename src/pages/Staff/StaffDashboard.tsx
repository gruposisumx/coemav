import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Settings, Users, FileText, Video, Calendar } from 'lucide-react';

export function StaffDashboard() {
  const { user } = useAuth();

  if (!user) {
    return <div>Acceso denegado</div>;
  }

  const modules = [
    {
      title: 'Profesionales',
      icon: <Users className="w-8 h-8" />,
      description: 'Gestionar perfiles de profesionales',
      link: '/staff/professionals'
    },
    {
      title: 'Blog',
      icon: <FileText className="w-8 h-8" />,
      description: 'Moderar entradas del blog',
      link: '/staff/blog'
    },
    {
      title: 'Transmisiones',
      icon: <Video className="w-8 h-8" />,
      description: 'Gestionar transmisiones en vivo',
      link: '/staff/streams'
    },
    {
      title: 'Eventos',
      icon: <Calendar className="w-8 h-8" />,
      description: 'Administrar eventos y talleres',
      link: '/staff/events'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-900">Panel de Administración</h1>
        <button className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200">
          <Settings className="w-5 h-5" />
          Configuración
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module) => (
          <a
            key={module.title}
            href={module.link}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-purple-600 mb-4">
                {module.icon}
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2">
                {module.title}
              </h3>
              <p className="text-purple-600">
                {module.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}