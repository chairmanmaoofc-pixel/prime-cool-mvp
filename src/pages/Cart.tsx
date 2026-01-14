import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, MessageCircle, ArrowLeft, Package } from "lucide-react";
import { openWhatsApp } from "@/components/WhatsAppButton";
import { toast } from "sonner";
import acUnitImage from "@/assets/ac-unit.png";

interface CartItem {
  id: string;
  product_id: string;
  title: string;
  brand: string;
  price: string;
  features: string[];
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchCartItems = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login?redirect=/cart");
      return;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart items");
    } else {
      setCartItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItems();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/login?redirect=/cart");
        } else {
          fetchCartItems();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const removeFromCart = async (id: string) => {
    setRemovingId(id);
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    } else {
      setCartItems(prev => prev.filter(item => item.id !== id));
      toast.success("Item removed from cart");
    }
    setRemovingId(null);
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
      <div className="min-h-screen flex items-center justify-center mesh-gradient">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 mesh-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/products")}
              className="gap-2 hover:bg-muted dark:hover:bg-muted/30 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Button>
          </div>

          <div className="flex items-center gap-5 mb-10 p-6 rounded-2xl glass-card shadow-elevated">
            <div className="w-16 h-16 rounded-xl hero-gradient flex items-center justify-center shadow-lg glow-primary">
              <ShoppingCart className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Your Cart</h1>
              <p className="text-muted-foreground mt-1">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <Card className="glass-card shadow-elevated overflow-hidden">
              <CardContent className="py-20 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-muted to-muted/50 dark:from-muted/40 dark:to-muted/20 flex items-center justify-center">
                  <Package className="w-12 h-12 text-muted-foreground/50" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-foreground">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                  Browse our products and add items to your cart to get started
                </p>
                <Button 
                  onClick={() => navigate("/products")} 
                  className="cta-gradient text-accent-foreground px-8 h-12 text-base shadow-lg hover:shadow-xl transition-all duration-300 btn-premium"
                >
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-5 mb-8">
                {cartItems.map((item, index) => (
                  <Card 
                    key={item.id} 
                    className="overflow-hidden glass-card shadow-soft hover:shadow-elevated transition-all duration-500 animate-fade-up gradient-border"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-48 h-48 bg-gradient-to-br from-muted via-muted/80 to-muted/50 dark:from-muted/40 dark:via-muted/20 dark:to-transparent flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                          <img 
                            src={acUnitImage} 
                            alt={item.title}
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                                {item.brand}
                              </span>
                              <h3 className="text-xl font-bold text-foreground mt-1">{item.title}</h3>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={removingId === item.id}
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full w-10 h-10 transition-all duration-300"
                            >
                              {removingId === item.id ? (
                                <div className="w-4 h-4 border-2 border-destructive/30 border-t-destructive rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 my-4">
                            {item.features.map((feature, fIndex) => (
                              <Badge 
                                key={fIndex} 
                                variant="secondary" 
                                className="text-xs bg-secondary/15 dark:bg-secondary/25 text-foreground border-0 font-medium"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-5 pt-5 border-t border-border/50">
                            <span className="text-2xl font-bold text-foreground">{item.price}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEnquireSingle(item)}
                              className="gap-2 h-10 border-primary/40 hover:bg-primary/10 hover:border-primary dark:border-primary/50 dark:hover:bg-primary/20 font-medium transition-all duration-300"
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

              <Card className="glass-card shadow-elevated overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-muted/50 to-transparent">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-primary-foreground" />
                    </div>
                    Ready to Enquire?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Send us a WhatsApp message with all your selected products. Our team will get back to you with pricing and availability within minutes.
                  </p>
                  <Button 
                    onClick={handleEnquireAll} 
                    className="w-full cta-gradient text-accent-foreground gap-3 shadow-lg hover:shadow-xl transition-all duration-300 h-14 text-lg btn-premium"
                  >
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
