import Link from "next/link";
import ProductGrid from "../components/products/ProductGrid";
import { products } from "../data/products";
import { formatCurrency } from "../utils/format";
import { useEffect, useMemo, useState } from "react";

const featured = products.filter(p => ["iphone-17-pro-max", "iphone-17-pro", "ultrabook-pro-14", "pro-tablet-x"].includes(p.slug));
const latest = products.slice(0, 10);

export default function HomePage() {
  return (
    <div className="">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://www.pixelstalk.net/wp-content/uploads/2025/05/Abstract-glowing-Apple-logo-hovering-above-a-dark-gradient-background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-navy/40 overlay-animate" aria-hidden="true" />
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
          style={{ minHeight: "75vh" }}
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white animate-fade-up">Tecnología premium, sin concesiones.</h1>
            <p className="mt-4 text-lg text-white/85 animate-fade-up anim-delay-200">Diseño. Potencia. Confiabilidad. Tecnología de última generación.</p>
            <div className="mt-8 flex items-center gap-3">
              <Link href="/products" className="btn-cta animate-fade-up anim-delay-300">Explorar productos</Link>
              <Link href="/products?category=iphone" className="inline-flex items-center px-5 py-3 rounded-md border border-white/30 hover:border-white/60 text-white transition ring-1 ring-transparent hover:ring-cyan/30 animate-fade-up anim-delay-500">Ver iPhone</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold">Productos Destacados</h2>
          <Link href="/products" className="text-cyan hover:underline">Ver todos</Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Últimos lanzamientos (scroll horizontal) */}
      <section className="bg-gradient-to-br from-white to-cyan/5 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold mb-4">Últimos Lanzamientos</h2>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {latest.map(p => (
              <div key={p.slug} className="group min-w-[260px] max-w-[260px] card relative overflow-hidden">
                <Link href={`/products/${p.slug}`} className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <div className="rounded-t-xl w-full h-[160px] image-safe-zone flex items-center justify-center">
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-navy/70">{p.category}</p>
                      <p className="font-medium">{p.name}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-navy text-white text-xs">Más <span aria-hidden>›</span></span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oferta Exclusiva (mismo diseño, ahora rotando 3 productos) */}
      <section className="bg-navy text-white">
        <ExclusiveOffer />
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold mb-6">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link href="/products?category=iphone" className="card p-6 text-center hover:shadow-blueGlow ring-1 ring-transparent hover:ring-cyan/30">iPhone</Link>
          <Link href="/products?category=macs%20%26%20ipads" className="card p-6 text-center hover:shadow-blueGlow ring-1 ring-transparent hover:ring-cyan/30">Macs & iPads</Link>
          <Link href="/products?category=accesorios" className="card p-6 text-center hover:shadow-blueGlow ring-1 ring-transparent hover:ring-cyan/30">Accesorios</Link>
          <Link href="/products" className="card p-6 text-center hover:shadow-blueGlow ring-1 ring-transparent hover:ring-cyan/30">Todos los Productos</Link>
        </div>
      </section>
    </div>
  );
}

function ExclusiveOffer() {
  const exclusiveSlugs = ["iphone-17-pro-max", "macbook-air-15-m4", "iphone-17-air"];
  const exclusive = useMemo(() => products.filter(p => exclusiveSlugs.includes(p.slug)), []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (exclusive.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % exclusive.length);
    }, 5000);
    return () => clearInterval(id);
  }, [exclusive.length]);

  const current = exclusive[index] || exclusive[0];
  const categoryQuery = current?.category?.toLowerCase() === 'macs & ipads'
    ? 'macs%20%26%20ipads'
    : encodeURIComponent((current?.category || '').toLowerCase());

  if (!current) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-semibold">Oferta Exclusiva</h3>
          <div className="mt-3">
            <p className="text-sm text-white/70">{current.category}</p>
            <p className="text-2xl font-semibold leading-tight">{current.name}</p>
          </div>
          <p className="mt-3 text-white/80">{current.shortDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(current.specs || []).slice(0,3).map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs ring-1 ring-white/15">{s}</span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-4">
            <span className="text-xl font-semibold">{formatCurrency(current.price)}</span>
            <span className="text-white/70 text-sm">Stock: {current.stock}</span>
          </div>
          <div className="mt-6 flex gap-3">
            <Link href={`/products/${current.slug}`} className="btn-cta">Ver detalle</Link>
            <Link href={`/products?category=${categoryQuery}`} className="inline-flex items-center px-5 py-3 rounded-md border border-white/30 hover:border-white/60 text-white transition">Más en {current.category}</Link>
          </div>
        </div>
        <div className="rounded-xl shadow-blueGlow overflow-hidden">
          <div className="image-safe-zone aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.image} alt={current.name} className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        {exclusive.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition ${i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}
