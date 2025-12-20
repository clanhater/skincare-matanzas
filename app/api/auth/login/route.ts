import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  // Verificamos si la contraseña coincide con la del archivo .env
  if (password === process.env.ADMIN_PASSWORD) {
    
    // Crear la "llave" (Cookie)
    const cookie = serialize("admin_session", "true", {
      httpOnly: true, // No accesible por JavaScript (seguridad)
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      maxAge: 60 * 60 * 24 * 7, // Dura 1 semana
      path: "/", // Válida en todo el sitio
    });

    // Responder con éxito y enviar la cookie
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Set-Cookie": cookie },
    });
  }

  return NextResponse.json({ success: false, message: "Contraseña incorrecta" }, { status: 401 });
}