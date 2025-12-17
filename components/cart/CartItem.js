import { formatCurrency } from "../../utils/format";

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="flex gap-4 py-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover bg-gray-100" />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-navy/70">{formatCurrency(item.price)}</p>
          </div>
          <button onClick={() => onRemove(item.slug)} className="text-sm text-cyan hover:underline">Eliminar</button>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <button onClick={() => onUpdate(item.slug, item.quantity - 1)} className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200">-</button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button onClick={() => onUpdate(item.slug, item.quantity + 1)} className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200">+</button>
        </div>
      </div>
    </div>
  );
}
