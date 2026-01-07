import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, MessageCircle, ArrowLeft } from "lucide-react";
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
            <Button 
              variant="ghost" 
              onClick={() => navigate("/products")}
              className="gap-2 hover:bg-muted dark:hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-8 p-6 rounded-2xl bg-card border border-border/50 dark:border-border shadow-soft">
            <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
              <p className="text-muted-foreground">{cartItems.length} item(s) in your cart</p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <Card className="border-border/50 dark:border-border shadow-soft">
              <CardContent className="py-16 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/50 dark:bg-muted/20 flex items-center justify-center">
                  <ShoppingCart className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-foreground">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Browse our products and add items to your cart</p>
                <Button onClick={() => navigate("/products")} className="cta-gradient text-accent-foreground shadow-md hover:shadow-lg transition-shadow">
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden border-border/50 dark:border-border shadow-soft hover:shadow-elevated transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-44 h-44 bg-gradient-to-br from-muted to-muted/50 dark:from-muted/30 dark:to-muted/10 flex items-center justify-center">
                          <img 
                            src={acUnitImage} 
                            alt={item.title}
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                {item.brand}
                              </span>
                              <h3 className="text-lg font-semibold text-card-foreground mt-1">{item.title}</h3>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1.5 my-3">
                            {item.features.map((feature, index) => (
                              <Badge 
                                key={index} 
                                variant="secondary" 
                                className="text-xs bg-secondary/10 dark:bg-secondary/20 text-secondary-foreground dark:text-foreground border-0"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                            <span className="text-xl font-bold text-foreground">{item.price}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEnquireSingle(item)}
                              className="gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary dark:border-primary/50 dark:hover:bg-primary/20"
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

              <Card className="border-border/50 dark:border-border shadow-soft bg-gradient-to-br from-card to-muted/20 dark:from-card dark:to-muted/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Ready to Enquire?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Send us a WhatsApp message with all your selected products. Our team will get back to you with pricing and availability.
                  </p>
                  <Button onClick={handleEnquireAll} className="w-full cta-gradient text-accent-foreground gap-2 shadow-md hover:shadow-lg transition-shadow h-12 text-base">
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