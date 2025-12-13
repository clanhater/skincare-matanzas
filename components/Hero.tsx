import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    // CAMBIO 1: Usamos 'h-[100dvh]' para evitar problemas con la barra de navegación en iOS/Android
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg" 
          alt="Rutina de skincare natural"
          fill
          className="object-cover"
          priority
        />
        
        {/* Degradados para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-primary-900/10 mix-blend-multiply z-10" />
      </div>

      {/* Contenido Principal */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center mt-12 md:mt-0">
        
        {/* Badge / Etiqueta */}
        <div className="animate-fade-in-up mb-6">
          <span className="text-primary-900 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase border border-primary-900/30 px-4 py-2 md:px-6 md:py-3 rounded-full inline-block backdrop-blur-sm bg-white/30">
            Nueva Colección 2025
          </span>
        </div>
        
        {/* CAMBIO 2: Tipografía escalonada (Mobile: 4xl -> Tablet: 5xl -> Desktop: 7xl) */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-primary-900 leading-[1.1] md:leading-[0.9] mb-6">
          Belleza <br />
          <span className="italic font-light text-primary-800">Consciente</span>
        </h1>
        
        {/* Subtítulo: Ajustado ancho máximo en móvil para que no toque los bordes */}
        <p className="text-base sm:text-lg md:text-xl text-primary-800 font-sans max-w-xs sm:max-w-xl mx-auto leading-relaxed font-medium mb-8">
          Formulaciones clínicas con alma botánica. <br className="hidden sm:block"/> Diseñadas para respetar tu barrera natural.
        </p>

        {/* CAMBIO 3: Botones Apilados en Móvil (flex-col) y Anchos (w-full) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xs sm:max-w-none">
          <Link 
            href="#catalogo" 
            // w-full en móvil para facilitar el clic con el pulgar
            className="w-full sm:w-auto bg-primary-900 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 hover:bg-primary-800 shadow-xl shadow-primary-900/20 flex justify-center text-center"
          >
            Ver Rutinas
          </Link>
          <Link 
            href="#nosotros" 
            className="w-full sm:w-auto text-primary-900 px-8 py-4 rounded-full font-medium transition-all hover:bg-white/40 backdrop-blur-sm border border-primary-900/10 hover:border-primary-900/20 flex justify-center text-center"
          >
            Nuestra Filosofía
          </Link>
        </div>
      </div>

      {/* Indicador de Scroll (Oculto en pantallas muy bajitas para no estorbar) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-primary-800/70 hidden sm:block">
        <ArrowDown size={32} strokeWidth={1} />
      </div>
    </section>
  );
}