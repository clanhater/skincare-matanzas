export default function Footer() {
    return (
      <footer className="bg-primary-900 text-primary-100 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Columna 1 */}
          <div>
            <h3 className="font-serif text-2xl mb-4">MI RUTINA</h3>
            <p className="text-primary-300 text-sm max-w-xs mx-auto md:mx-0">
              Cuidado de la piel simplificado, efectivo y elegante. Descubre tu mejor versión.
            </p>
          </div>
  
          {/* Columna 2 */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary-300">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Catálogo</a></li>
              <li><a href="#" className="hover:text-white transition">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition">Contacto</a></li>
            </ul>
          </div>
  
          {/* Columna 3 */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary-300">Contacto</h4>
            <p className="text-sm text-primary-300">¿Dudas sobre tu piel?</p>
            <a href="#" className="text-accent-gold hover:text-white transition mt-2 inline-block">
              Chatear por WhatsApp
            </a>
          </div>
        </div>
        
        <div className="text-center text-xs text-primary-500 mt-12 border-t border-primary-800 pt-8">
          © {new Date().getFullYear()} Mi Rutina Skincare. Todos los derechos reservados.
        </div>
      </footer>
    );
  }