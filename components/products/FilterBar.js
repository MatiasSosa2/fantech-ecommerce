import { useState, useEffect } from "react";

export default function FilterBar({ category, onChange }) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("relevance");
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    onChange({ search, minPrice, maxPrice, sort, tags: activeTags });
  }, [search, minPrice, maxPrice, sort, activeTags, onChange]);

  useEffect(() => {
    // Derivar tags por categoría
    const baseTags = ["pro", "plus", "max", "air", "mini", "ultra", "nuevo"];
    const categoryTags = category?.includes("iphone")
      ? ["pro", "plus", "max", "nuevo"]
      : category?.includes("macs")
      ? ["pro", "air", "max"]
      : ["pro", "mini", "ultra"];
    const unique = Array.from(new Set([...categoryTags, ...baseTags]));
    setTags(unique);
    setActiveTags([]);
  }, [category]);

  const toggleTag = (t) => {
    setActiveTags((prev) => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]));
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-white border border-gray-200 rounded-xl p-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar productos..."
        className="flex-1 min-w-[200px] px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan/40 focus:ring-offset-2 focus:ring-offset-white"
      />
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Precio mín"
          className="w-28 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan/40 focus:ring-offset-2 focus:ring-offset-white"
        />
        <span className="text-navy/60">–</span>
        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Precio máx"
          className="w-28 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan/40 focus:ring-offset-2 focus:ring-offset-white"
        />
      </div>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="px-3 py-2 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-cyan/40 focus:ring-offset-2 focus:ring-offset-white"
      >
        <option value="relevance">Relevancia</option>
        <option value="price-asc">Precio: bajo a alto</option>
        <option value="price-desc">Precio: alto a bajo</option>
        <option value="name-asc">Nombre: A-Z</option>
        <option value="name-desc">Nombre: Z-A</option>
        <option value="new">Novedades</option>
      </select>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => toggleTag(t)}
            className={`px-3 py-2 rounded-full text-sm border transition ${
              activeTags.includes(t)
                ? "bg-cyan text-white shadow-blueGlow border-cyan"
                : "border-navy/20 hover:border-cyan text-navy ring-1 ring-transparent hover:ring-cyan/30"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
