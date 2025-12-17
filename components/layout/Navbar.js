import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/products?category=iphone", label: "iPhone" },
  { href: "/products?category=macs%20%26%20ipads", label: "Macs & iPads" },
  { href: "/products?category=accesorios", label: "Accesorios" },
  { href: "/products", label: "Todos los Productos" },
];

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-navy text-lg">Fantech</Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm hover:text-cyan transition">
              {l.label}
            </Link>
          ))}
        </nav>
        <button onClick={toggleCart} aria-label="Carrito" className="relative p-2 rounded-md hover:bg-gray-100 transition">
          <ShoppingCart size={24} className="text-navy" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[22px] h-5 px-1.5 text-[11px] rounded-full bg-green-500 text-gray-700/80 flex items-center justify-center shadow-blueGlow">
              {totalItems}
            </span>
          )}
        </button>
      </div>
      {/* Línea inferior azul marino brillante */}
      <div className="h-[3px] bg-gradient-to-r from-cyan to-navy"></div>
    </header>
  );
}
