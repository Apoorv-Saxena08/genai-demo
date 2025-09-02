import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/CartContext";

export default function Checkout() {
  const { items, subtotal, discountAmount, couponCode, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: "",
    line1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvv: "" });

  const total = Math.max(0, subtotal - discountAmount);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Demo flow: pretend success
    clearCart();
    navigate("/marketplace");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-foreground mb-6">Checkout</h1>
      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Shipping Address</h2>
              <Input placeholder="Full Name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} required />
              <Input placeholder="Address Line" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
                <Input placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="ZIP / Postal Code" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} required />
                <Input placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Payment</h2>
              <Input placeholder="Card Number" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} required />
                <Input placeholder="CVV" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} required />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {couponCode && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Coupon ({couponCode})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Button type="submit" className="w-full">Pay Now</Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/cart">Back to Cart</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}


