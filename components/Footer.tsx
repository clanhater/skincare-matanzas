import Link from 'next/link';
import { Facebook, Instagram, Phone } from 'lucide-react'; // Asegúrate de tener estos íconos o quítalos si no

export default function Footer() {
    return (
      <footer id="nosotros" className="bg-primary-900 text-primary-100 py-12 md:py-16 mt-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          
          {/* Columna 1: Marca y SEO Local */}
          <div>
            <h3 className="font-serif text-2xl mb-4 text-white tracking-wider">UNA TALLA NATURAL</h3>
            <p className="text-primary-300 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
              Llevamos la magia de los productos Salem a tu hogar en Matanzas. 
              Calidad natural y asesoría personalizada para tu bienestar.
            </p>
          </div>
  
          {/* Columna 2: Navegación */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-[0.2em] text-accent-gold">Explorar</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#catalogo" className="hover:text-white transition-colors duration-200">Catálogo de Productos</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Rutinas para Piel Grasa</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Tratamientos Antimanchas</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Preguntas Frecuentes</Link></li>
            </ul>
          </div>
  
          {/* Columna 3: Contacto y Ubicación */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-[0.2em] text-accent-gold">Atención al Cliente</h4>
            <p className="text-sm text-primary-300 mb-4">
              ¿Dudas sobre qué producto elegir? Te asesoramos por chat.
            </p>
            <div className="flex flex-col gap-2 items-center md:items-start text-sm">
                <span className="flex items-center gap-2 text-white">
                    📍 Matanzas, Cuba
                </span>
                <a href="https://wa.me/5351339780" className="flex items-center gap-2 hover:text-accent-gold transition">
                    📱 Pedidos WhatsApp: +53 5133 9780
                </a>
            </div>
            
            {/* Redes Sociales (Opcional) */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
                <a href="#" aria-label="Facebook" className="hover:text-white transition"><Facebook size={20}/></a>
                <a href="#" aria-label="Instagram" className="hover:text-white transition"><Instagram size={20}/></a>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-primary-500 mt-16 border-t border-primary-800 pt-8 px-4">
          <p>© {new Date().getFullYear()} Una Talla Natural. Todos los derechos reservados.</p>
          <p className="mt-2 text-primary-600">Diseñado con ❤️ para la belleza cubana.</p>
        </div>
      </footer>
    );
  }