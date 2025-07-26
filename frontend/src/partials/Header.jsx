import React, { useState } from 'react';
import SearchModal from '../components/ModalSearch';
import UserMenu from '../components/DropdownProfile';
import ThemeToggle from '../components/ThemeToggle';

function Header({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {
  const [searchModalOpen, setSearchModalOpen] = useState(false)

{/* <div>
  Diseña un logotipo profesional y vectorizable (apto para exportar a SVG) inspirado en una iglesia tradicional mexicana. El diseño debe ser moderadamente detallado (nivel de complejidad 6 de 10), sin texturas ni degradados, estilo flat.

El logo debe incluir los siguientes elementos clave:
- Fachada frontal con **tres arcos redondeados** y columnas simplificadas
- Un **campanario central** por encima del arco del medio, con una **cruz** encima
- En el arco central, una **representación minimalista de la Virgen de Guadalupe**, con túnica larga, manos juntas en oración y aureola con rayos suaves

Estilo visual:
- Moderadamente detallado pero limpio y balanceado, con siluetas claras y trazos definidos
- Sin sombras, sin degradados, sin texturas
- Formas geométricas limpias y bien organizadas
- Compatible para convertir a SVG fácilmente

Colores:
- El logo debe funcionar en **modo claro y oscuro**
- En modo claro: fondo blanco (`#FFFFFF`), contornos oscuros (`#2D2D2D`), detalles en gris claro (`#E5E5E5`)
- En modo oscuro: fondo gris oscuro (`bg-gray-800/90` equivalente a `#1F2937E6`), elementos visibles en blanco y gris claro
- Se permite un toque sutil de color **beige dorado** (`#D6B56B`) para detalles como la aureola de la Virgen

Formato:
- Proporción cuadrada o vertical
- Sin fondo (o fondo plano)
- Estilo flat, ideal para ser usado como ícono de identidad visual religiosa

El diseño debe transmitir espiritualidad, simplicidad, respeto y ser adaptable a materiales impresos y digitales.
</div> */}
  return (
    <header className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 z-30 ${variant === 'v2' || variant === 'v3' ? 'before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 dark:after:bg-gray-700/60 after:-z-10' : 'max-lg:shadow-xs lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90'} ${variant === 'v2' ? 'dark:before:bg-gray-800' : ''} ${variant === 'v3' ? 'dark:before:bg-gray-900' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Aumenté la altura del header a h-20 (5rem) */}
        <div className={`flex items-center justify-between h-20 ${variant === 'v2' || variant === 'v3' ? '' : 'lg:border-b border-gray-200 dark:border-gray-700/60'}`}>

          {/* Header: Left side - Puedes agregar logo o título aquí */}
          <div className="flex">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">S.G. El Mandho</h1>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-4"> {/* Aumenté el espacio entre elementos */}
            {/* Botón de búsqueda más grande */}
            <div>
              <button
                className={`w-10 h-10 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full ml-3 ${searchModalOpen && 'bg-gray-200 dark:bg-gray-800'}`}
                onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); }}
                aria-controls="search-modal"
              >
                <span className="sr-only">Search</span>
                <svg
                  className="fill-current text-gray-500/80 dark:text-gray-400/80 w-5 h-5" // Ícono más grande
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
                  <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
                </svg>
              </button>
              <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
            </div>

            {/* Divider más alto para coincidir con el header */}
            <hr className="w-px h-8 bg-gray-200 dark:bg-gray-700/60 border-none" />
            <ThemeToggle />
            {/* UserMenu - No necesita cambios ya que se adaptará */}
            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;