"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Asegúrate de importar Image correctamente

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin"); // Si es correcto, ir al panel
        router.refresh();
      } else {
        setError("Contraseña incorrecta");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-primary-100">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-primary-900 mb-2">Una Talla Natural</h1>
          <p className="text-primary-500 text-sm tracking-widest uppercase">Acceso Administrativo</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-2">Contraseña Maestra</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-primary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-900 text-white py-3 rounded-lg font-bold hover:bg-primary-800 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Entrar al Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}