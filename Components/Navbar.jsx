import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const links = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/Products",
    text: "Products",
  },
];

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado correcto para saber si está logueado
  const router = useRouter(); // Llamada correcta a useRouter

  useEffect(() => {
    const token = localStorage.getItem("token"); // Busca el token en el localStorage

    if (token) {
      setIsLoggedIn(true); // Si hay token, significa que está logueado
    }
  }, []);

  function handleLoginLogout() {
    if (isLoggedIn) {
      localStorage.removeItem("token"); // Elimina el token al hacer logout
      setIsLoggedIn(false); // Cambia el estado a no logueado
      router.push("/login"); // Redirige a la página de login
    } else {
      router.push("/login"); // Redirige a login si no está logueado
    }
  }

  return (
    <nav className="w-full flex flex-row gap-4">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="w-full text-center p-4">
          {link.text}
        </Link>
      ))}
      <div className="w-full text-center p-4" onClick={handleLoginLogout}>
        {isLoggedIn ? "Logout" : "Login"} {/* Texto dinámico dependiendo del estado */}
      </div>
    </nav>
  );
}
