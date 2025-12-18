import Link from "next/link";
import { useRouter } from "next/router";
import { getProductBySlug, getRelatedProducts, products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useEffect, useMemo, useState } from "react";
import ProductGrid from "../../components/products/ProductGrid";
import RelatedCarousel from "../../components/products/RelatedCarousel";
import { formatCurrency } from "../../utils/format";
import { Bolt, Battery, Shield, Globe } from "lucide-react";

export default function ProductDetailPage() {
  const { query } = useRouter();
  const product = useMemo(() => (query.slug ? getProductBySlug(query.slug) : null), [query.slug]);
  const related = useMemo(() => (product ? getRelatedProducts(product) : []), [product]);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => setQty(1), [product?.slug]);

  // helpers para comparación simple (no hooks)
  const extractSpec = (specs = [], key) => {
    const s = specs.find(x => x.toLowerCase().startsWith(key));
    return s ? s.split(" ").slice(1).join(" ") : "-";
  };

  // asegurar orden de hooks estable en todas las renderizaciones
  const peers = useMemo(() => {
    const cat = product?.category;
    if (!cat) return [];
    return products.filter(p => p.category === cat).slice(0, 4);
  }, [product?.category]);

  if (!product) return null;

  return (
    <div className="">
      {/* Hero de producto */}
      <section className="hero-gradient border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6 text-navy/70">
            <Link href="/">Inicio</Link> <span className="mx-2">/</span>
            <Link href={`/products?category=${encodeURIComponent(product.category.toLowerCase())}`}>{product.category}</Link> <span className="mx-2">/</span>
            <span className="text-navy">{product.name}</span>
          </nav>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <span className="badge">{product.category}</span>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight">{product.name}</h1>
              <p className="mt-2 text-navy/80">Rendimiento profesional. Diseño premium.</p>
              <p className="mt-4 text-2xl font-semibold">{formatCurrency(product.price)}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100">-</button>
                  <span className="px-4">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(99, q + 1))} className="px-3 py-2 hover:bg-gray-100">+</button>
                </div>
                <button className="btn-cta active:brightness-90 active:scale-[0.98] active:bg-cyan/90" onClick={() => addToCart(product, qty)}>Agregar al carrito</button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] rounded-xl image-safe-zone bg-white group shadow-blueGlow overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios clave */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{Icon:Bolt, t:"Rendimiento extremo"}, {Icon:Battery, t:"Autonomía optimizada"}, {Icon:Shield, t:"Seguridad avanzada"}, {Icon:Globe, t:"Conectividad premium"}].map(({Icon,t}) => (
            <div key={t} className="card p-5 flex items-start gap-3">
              <Icon className="text-cyan" size={22} />
              <div>
                <p className="font-medium">{t}</p>
                <p className="text-sm text-navy/70">Experiencia fluida en tareas exigentes.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de características clave removida según solicitud */}

      {/* Especificaciones técnicas (colapsable) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="details-panel overflow-hidden">
          <details open>
            <summary className="details-summary">
              Especificaciones técnicas
              <span className="text-cyan">Mostrar/Ocultar</span>
            </summary>
            <div className="details-content">
              <ul className="list-disc list-inside space-y-1">
                {product.specs.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </details>
        </div>
      </section>

      {/* Comparación con otros modelos */}
      <section className="section-gradient border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h3 className="text-xl font-semibold mb-4">Compará con otros modelos</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-navy/70">
                <tr>
                  <th className="py-2 pr-6">Modelo</th>
                  <th className="py-2 pr-6">Pantalla</th>
                  <th className="py-2 pr-6">Cámara</th>
                  <th className="py-2 pr-6">Chip</th>
                  <th className="py-2 pr-6">Precio</th>
                </tr>
              </thead>
              <tbody>
                {peers.map(m => (
                  <tr key={m.slug} className="border-t border-gray-200">
                    <td className="py-3 pr-6 font-medium"><Link href={`/products/${m.slug}`} className="hover:text-cyan">{m.name}</Link></td>
                    <td className="py-3 pr-6">{extractSpec(m.specs, 'pantalla')}</td>
                    <td className="py-3 pr-6">{extractSpec(m.specs, 'triple') || extractSpec(m.specs, 'doble') || extractSpec(m.specs, 'cámara') }</td>
                    <td className="py-3 pr-6">{extractSpec(m.specs, 'chip')}</td>
                    <td className="py-3 pr-6">{formatCurrency(m.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Relacionados mejorados */}
      {related.length > 0 && (
        <section className="section-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-xl font-semibold mb-4">Productos relacionados</h2>
            <RelatedCarousel products={related} />
          </div>
        </section>
      )}

      {/* Confianza / Garantía */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="card p-4">✔ Garantía premium</div>
          <div className="card p-4">✔ Soporte personalizado</div>
          <div className="card p-4">✔ Envíos rápidos</div>
        </div>
      </section>
    </div>
  );
}
