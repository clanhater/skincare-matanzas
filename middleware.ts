import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Solo protegemos la ruta /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    
    // Excepción: Permitir entrar a la página de login sin llave
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Verificar si tiene la cookie
    const authCookie = request.cookies.get("admin_session");

    // Si no tiene cookie, patearlo al login
    if (!authCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configuración: En qué rutas actúa el portero
export const config = {
  matcher: "/admin/:path*",
};