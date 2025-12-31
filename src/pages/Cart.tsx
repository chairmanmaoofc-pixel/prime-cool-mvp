import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, MessageCircle, ArrowLeft } from "lucide-react";
import { openWhatsApp } from "@/components/WhatsAppButton";
import acUnitImage from "@/assets/ac-unit.png";

interface CartItem {
  id: string;
  title: string;
  brand: string;
  price: string;
  features: string[];
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login?redirect=/cart");
        return;
      }
      
      // Load cart from localStorage
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/login?redirect=/cart");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleEnquireAll = () => {
    if (cartItems.length === 0) return;

    const itemsList = cartItems.map((item, index) => 
      `${index + 1}. *${item.title}* (${item.brand}) - ${item.price}`
    ).join("\n");

    const message = `Hello! I'm interested in the following products:\n\n${itemsList}\n\nPlease provide more details and availability. Thank you!`;
    openWhatsApp(message);
  };

  const handleEnquireSingle = (item: CartItem) => {
    const message = `Hello! I'm interested in the following product:

🔹 *${item.title}*
🏷️ Brand: ${item.brand}
💰 Price: ${item.price}
✨ Features: ${item.features.join(", ")}

Please provide more details and availability. Thank you!`;
    openWhatsApp(message);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate("/products")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
              <p className="text-muted-foreground">{cartItems.length} item(s)</p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-foreground">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Browse our products and add items to your cart</p>
                <Button onClick={() => navigate("/products")} className="cta-gradient text-accent-foreground">
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-40 h-40 bg-muted flex items-center justify-center">
                          <img 
                            src={acUnitImage} 
                            alt={item.title}
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-xs font-medium text-secondary uppercase tracking-wider">
                                {item.brand}
                              </span>
                              <h3 className="text-lg font-semibold text-card-foreground">{item.title}</h3>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 my-3">
                            {item.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-card-foreground">{item.price}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEnquireSingle(item)}
                              className="gap-2"
                            >
                              <MessageCircle className="w-4 h-4" />
                              Enquire
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Ready to Enquire?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Send us a WhatsApp message with all your selected products. Our team will get back to you with pricing and availability.
                  </p>
                  <Button onClick={handleEnquireAll} className="w-full cta-gradient text-accent-foreground gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Enquire About All Items
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
