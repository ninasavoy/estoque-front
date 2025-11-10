"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1
        className="text-lg font-bold cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Sistema de Gestão de Medicamentos
      </h1>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
      >
        Sair
      </button>
    </nav>
  );
}
