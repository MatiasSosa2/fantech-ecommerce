import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../../utils/format";

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeFromCart, totalPrice, checkoutWhatsApp } = useCart();

  return (
    <div className={`fixed inset-0 z-50 transition ${isOpen ? 'visible' : 'invisible'}`} aria-hidden={!isOpen}>
      <div className={`absolute inset-0 bg-black/20 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl border-l border-gray-200 transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold">Tu Carrito</h2>
          <button onClick={() => setIsOpen(false)} className="text-sm text-cyan hover:underline">Cerrar</button>
        </div>
        <div className="p-4 h-[calc(100%-150px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm text-navy/70">Tu carrito está vacío.</p>
          ) : (
            items.map(it => (
              <CartItem key={it.slug} item={it} onUpdate={updateQuantity} onRemove={removeFromCart} />
            ))
          )}
        </div>
        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-navy/70">Total</span>
            <span className="font-semibold">{formatCurrency(totalPrice)}</span>
          </div>
          <button className="btn-cta w-full" onClick={() => checkoutWhatsApp("")}>Finalizar compra</button>
        </div>
      </aside>
    </div>
  );
}
