import { useRouter } from "next/router";
import ProductGrid from "../../components/products/ProductGrid";
import { products } from "../../data/products";
import Link from "next/link";
import FilterBar from "../../components/products/FilterBar";

const pills = [
  { key: "", label: "Todos" },
  { key: "pro", label: "Pro" },
  { key: "plus", label: "Plus" },
  { key: "nuevo", label: "Nuevo" },
];

export default function ProductsPage() {
  const router = useRouter();
  const category = (router.query.category || "").toString().toLowerCase();
  const filteredBase = category ? products.filter(p => p.category.toLowerCase() === category) : products;
  const [filters, setFilters] = require("react").useState({ search: "", minPrice: "", maxPrice: "", sort: "relevance", tags: [] });
  const pill = (router.query.filter || "").toString().toLowerCase();
  let filtered = filteredBase.filter(p => {
    // Aplicar filtros solo en categoría iPhone
    if (category !== "iphone") return true;
    if (!pill) return true;
    if (pill === "pro") return /pro/i.test(p.name);
    if (pill === "plus") return /plus/i.test(p.name);
    if (pill === "nuevo") return /17|16/.test(p.name);
    return true;
  });

  // Aplicar filtros inteligentes comunes
  filtered = filtered.filter(p => {
    const matchesSearch = filters.search ? (p.name.toLowerCase().includes(filters.search.toLowerCase()) || (p.shortDescription || "").toLowerCase().includes(filters.search.toLowerCase())) : true;
    const priceOk = (
      (filters.minPrice ? p.price >= Number(filters.minPrice) : true) &&
      (filters.maxPrice ? p.price <= Number(filters.maxPrice) : true)
    );
    const tagsOk = filters.tags.length > 0 ? filters.tags.some(t => new RegExp(t, "i").test(p.name)) : true;
    return matchesSearch && priceOk && tagsOk;
  });

  // Ordenamiento
  filtered = [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "name-asc": return a.name.localeCompare(b.name);
      case "name-desc": return b.name.localeCompare(a.name);
      case "new": return (b.id || 0) - (a.id || 0);
      default: return 0;
    }
  });

  const isIphone = category === "iphone";
  const isMacs = category === "macs & ipads" || category === "macs%20%26%20ipads";
  const isAcc = category === "accesorios";

  return (
    <div className="">
      {!category && (
        <section
          className="relative overflow-hidden all-products-hero"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/70/37/f4/7037f423289e9142d874380eb3b7c857.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-navy/30" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-[60vh] flex items-end justify-center">
            <div className="max-w-3xl text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white animate-fade-up">Todos los Productos</h1>
              <p className="mt-4 text-lg text-white/85 animate-fade-up anim-delay-200">Explorá todo nuestro catálogo: iPhones, Macs & iPads y Accesorios.</p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link href={{ pathname: '/products', query: { category: 'iphone' } }} className="inline-flex items-center px-5 py-3 rounded-md bg-white text-navy font-semibold hover:bg-white/90 transition animate-fade-up anim-delay-300">Ver iPhones</Link>
                <Link href={{ pathname: '/products', query: { category: 'macs%20%26%20ipads' } }} className="inline-flex items-center px-5 py-3 rounded-md border border-white text-white hover:bg-white hover:text-navy transition animate-fade-up anim-delay-500">Ver Macs & iPads</Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {isIphone && (
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/94/90/75/9490756a789b5455286d550207e6fb64.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-navy/40" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-[86vh] flex items-end justify-start">
            <div className="max-w-3xl text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs uppercase tracking-wider animate-fade-up">
                Nuevo diseño
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-cyan"></span>
              </span>
              <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold tracking-tight text-white animate-fade-up font-sans">iPhone 17 Pro Max</h1>
              <p className="mt-3 text-base sm:text-lg text-white/85 animate-fade-up anim-delay-200">Velocidad sin esfuerzo, cámaras que inspiran y una pantalla que se siente viva.</p>
              <div className="mt-8 flex items-center justify-start gap-3">
                <Link href={{ pathname: '/products', query: { category: 'iphone' } }} className="inline-flex items-center px-5 py-3 rounded-md bg-white text-navy font-semibold hover:bg-white/90 transition animate-fade-up anim-delay-300">Ver catálogo</Link>
                <Link href={{ pathname: '/products', query: { category: 'iphone', filter: 'pro' } }} className="inline-flex items-center px-5 py-3 rounded-md bg-transparent border border-white/80 text-white hover:bg-white hover:text-navy transition animate-fade-up anim-delay-500">Gama Pro</Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {isAcc && (
        <section
          className="relative overflow-hidden accessories-hero"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/0f/fe/1d/0ffe1d4d1c44dda07b2edb0975557d53.jpg')",
            backgroundRepeat: "no-repeat",
            minHeight: "64vh",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-navy/30" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-[64vh] flex items-end justify-center">
            <div className="max-w-3xl text-center">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white animate-fade-up">Accesorios</h1>
              <p className="mt-4 text-lg text-white/85 animate-fade-up anim-delay-200">Carga, audio y protección pensados para tu día a día.</p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link href={{ pathname: '/products', query: { category: 'accesorios' } }} className="inline-flex items-center px-5 py-3 rounded-md bg-white text-navy font-semibold hover:bg-white/90 transition animate-fade-up anim-delay-300">Ver catálogo</Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {isMacs && (
        <section
          className="relative overflow-hidden macs-hero"
          style={{
            backgroundImage:
              "url('https://nobon.me/wp-content/uploads/2013/03/1840_macbookprojustawesome_1920x1080.jpg')",
            backgroundRepeat: "no-repeat",
            minHeight: "72vh",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-navy/40 overlay-animate-soft" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-[72vh] flex items-end justify-center">
            <div className="max-w-3xl text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white animate-fade-up">Macs & iPads</h1>
              <p className="mt-4 text-lg text-white/85 animate-fade-up anim-delay-200">Potencia para crear. Rendimiento sin límites.</p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link href={{ pathname: '/products', query: { category: 'macs%20%26%20ipads' } }} className="btn-cta animate-fade-up anim-delay-300">Ver catálogo</Link>
                <Link href={{ pathname: '/products', query: { category: 'iphone' } }} className="inline-flex items-center px-5 py-3 rounded-md border border-white/30 hover:border-white/60 text-white transition ring-1 ring-transparent hover:ring-cyan/30 animate-fade-up anim-delay-500">Ver iPhone</Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Intro premium por categoría */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <h1 className="text-4xl font-semibold tracking-tight">{isIphone ? "Ver más modelos de iPhones" : (category ? category.charAt(0).toUpperCase() + category.slice(1) : "Todos los Productos")}</h1>
        {isIphone && <p className="mt-2 text-navy/80">Tecnología de precisión. Rendimiento que se siente.</p>}
        {isMacs && <p className="mt-2 text-navy/80">Potencia para crear. Rendimiento sin límites.</p>}
        {isAcc && <p className="mt-2 text-navy/80">Complementos pensados para mejorar tu día a día.</p>}
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60" />
      </section>

      {/* Filtros inteligentes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FilterBar category={category} onChange={setFilters} />
        {isIphone && (
          <div className="mt-4 flex flex-wrap gap-3">
            {pills.map(p => {
              const active = pill === p.key;
              const href = { pathname: "/products", query: { category, filter: p.key } };
              return (
                <Link key={p.key} href={href} className={`px-4 py-2 rounded-full text-sm border ${active ? 'bg-cyan text-white shadow-blueGlow border-cyan' : 'border-navy/20 hover:border-cyan text-navy ring-1 ring-transparent hover:ring-cyan/30'} transition`}>
                  {p.label}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Grids por categoría */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <ProductGrid products={filtered} />
      </section>

      {/* Sección 'Gama Pro' eliminada según solicitud */}
    </div>
  );
}
