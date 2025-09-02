import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/CartContext";

export default function Cart() {
  const { items, subtotal, count, updateQuantity, removeItem, applyCoupon, couponCode, discountAmount } = useCart();

  const total = Math.max(0, subtotal - discountAmount);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-foreground mb-6">Your Cart</h1>

      {count === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Button asChild>
            <Link to="/marketplace">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 flex gap-4 items-center">
                  <div className="w-24 h-24 rounded bg-muted overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹{item.price * item.quantity}</div>
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => removeItem(item.id)}>Remove</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Coupon Code</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code (FLAT10 or SAVE50)" defaultValue={couponCode ?? ""} onBlur={(e) => applyCoupon(e.target.value)} />
                    <Button onClick={() => applyCoupon((document.querySelector<HTMLInputElement>('input[placeholder^="Enter code"]')?.value || ""))}>Apply</Button>
                  </div>
                  {discountAmount > 0 && (
                    <p className="text-green-600 text-sm">Discount applied: -₹{discountAmount}</p>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <Button asChild className="w-full">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/marketplace">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}


