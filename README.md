# Fantech E-commerce (Next.js 14 - Pages Router)

Sitio de e-commerce premium inspirado en la estética minimalista del ecosistema Apple (sin usar marca oficial). Código escalable, componentes reutilizables, carrito global y checkout por WhatsApp.

## Stack
- Next.js 14 (Pages Router)
- React 18 (JavaScript)
- Tailwind CSS (custom theme)
- lucide-react (iconos)
- Context API (estado global del carrito)

## Diseño
- Paleta: Blanco (#FFFFFF), Azul Oscuro (#003366), Cian (#00AEEF), Gris Claro (#F7F7F7)
- Sombra especial: `blueGlow: 0 0 25px rgba(0,174,239,0.35)` usada en CTAs, cards hover y ofertas.
- Navbar sticky con blur sutil.

## Estructura
- components/layout: `Navbar`, `Footer`
- components/products: `ProductCard`, `ProductGrid`
- components/cart: `CartDrawer`, `CartItem`
- context: `CartContext`
- data: `products` (catálogo iPhone 14–17 completo + extras)
- utils: `whatsapp`, `format`
- pages: `index`, `products/index`, `products/[slug]`, `cart`, `_app`

## Flujo WhatsApp
1. Agrega productos al carrito desde cards o detalle.
2. Abre el drawer o la página `/cart`.
3. Presiona “Finalizar compra” → se genera mensaje con lista, cantidades, precio unitario y total.
4. Redirección a `wa.me` con el texto formateado. Para configurar un número destino, edita `checkoutWhatsApp(phone)` o agrega tu número en el llamado.

## Scripts
```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Servir build
npm start
```

## Notas
- Catálogo mock listo para conectar a backend real.
- Sin librerías de animación ni UI kits. Solo Tailwind.
- Pages Router (no App Router).

## Screenshots (agregar)
- Home, detalle, carrito, flujo WhatsApp.