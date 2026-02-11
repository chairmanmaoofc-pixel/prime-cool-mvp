import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Snowflake, Wind, Fan, Thermometer, Zap, Leaf, Star, ShoppingCart, MessageCircle, Filter, X, HelpCircle, Check } from "lucide-react";
import { openWhatsApp } from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import acUnitImage from "@/assets/ac-unit.png";
import { User } from "@supabase/supabase-js";

const Products = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const addToCart = async (product: any) => {
    const productId = `${product.title}-${product.brand}`.replace(/\s+/g, '-').toLowerCase();
    setAddingToCart(productId);

    try {
      // Get fresh session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        toast.info("Please sign in to add items to cart");
        navigate("/login?redirect=/products");
        return;
      }

      // Check if item already exists
      const { data: existingItem, error: checkError } = await supabase
        .from("cart_items")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("product_id", productId)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking cart:", checkError);
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (existingItem) {
        toast.info("Item already in cart!");
        navigate("/cart");
        return;
      }

      // Insert new item
      const { error: insertError } = await supabase
        .from("cart_items")
        .insert({
          user_id: session.user.id,
          product_id: productId,
          title: product.title,
          brand: product.brand,
          price: product.price,
          features: product.features
        });

      if (insertError) {
        console.error("Error adding to cart:", insertError);
        toast.error("Failed to add to cart. Please try again.");
        return;
      }

      toast.success("Added to cart!", {
        action: {
          label: "View Cart",
          onClick: () => navigate("/cart")
        }
      });
    } finally {
      setAddingToCart(null);
    }
  };

  const handleEnquire = (product: { title: string; brand: string; price: string; features: string[] }) => {
    const message = `Hello! I'm interested in the following product:

🔹 *${product.title}*
🏷️ Brand: ${product.brand}
💰 Price: ${product.price}
✨ Features: ${product.features.join(", ")}

Please provide more details and availability. Thank you!`;
    
    openWhatsApp(message);
  };

  const handleAddToCart = async (product: any) => {
    if (!user) {
      toast.info("Please sign in to continue");
      navigate("/login?redirect=/products");
      return;
    }
    await addToCart(product);
  };

  const products = [{
    icon: Snowflake,
    title: "Premium Split AC - 1.5 Ton",
    brand: "Daikin",
    description: "Inverter technology with 5-star energy rating. Perfect for medium-sized rooms.",
    price: "PKR 125,000",
    priceNum: 125000,
    originalPrice: "PKR 150,000",
    features: ["Inverter Technology", "5-Star Rating", "Low Noise"],
    badge: "Best Seller",
    rating: 4.9
  }, {
    icon: Snowflake,
    title: "Eco Split AC - 1 Ton",
    brand: "Gree",
    description: "Energy-efficient split AC ideal for small rooms and offices.",
    price: "PKR 85,000",
    priceNum: 85000,
    originalPrice: "PKR 95,000",
    features: ["Energy Efficient", "Smart Control", "Auto Clean"],
    badge: "Popular",
    rating: 4.7
  }, {
    icon: Wind,
    title: "Central AC System - 5 Ton",
    brand: "Carrier",
    description: "Commercial-grade central cooling for large spaces and buildings.",
    price: "PKR 450,000",
    priceNum: 450000,
    originalPrice: "PKR 520,000",
    features: ["Commercial Grade", "Zone Control", "Smart Thermostat"],
    badge: "Commercial",
    rating: 4.8
  }, {
    icon: Fan,
    title: "Portable AC - 1 Ton",
    brand: "Haier",
    description: "Move your cooling where you need it. No installation required.",
    price: "PKR 55,000",
    priceNum: 55000,
    originalPrice: "PKR 65,000",
    features: ["Portable", "No Installation", "Dual Mode"],
    rating: 4.5
  }, {
    icon: Snowflake,
    title: "Floor Standing AC - 2 Ton",
    brand: "Orient",
    description: "Powerful floor standing unit for large living rooms and halls.",
    price: "PKR 175,000",
    priceNum: 175000,
    originalPrice: "PKR 195,000",
    features: ["High Capacity", "Floor Standing", "Remote Control"],
    rating: 4.6
  }, {
    icon: Thermometer,
    title: "Window AC - 1.5 Ton",
    brand: "Dawlance",
    description: "Classic window AC with modern features and easy installation.",
    price: "PKR 65,000",
    priceNum: 65000,
    originalPrice: "PKR 75,000",
    features: ["Easy Install", "Compact", "Affordable"],
    badge: "Value Pick",
    rating: 4.4
  }];

  // Get all unique features
  const allFeatures = useMemo(() => {
    const featureSet = new Set<string>();
    products.forEach(p => p.features.forEach(f => featureSet.add(f)));
    return Array.from(featureSet).sort();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const priceMatch = product.priceNum >= priceRange[0] && product.priceNum <= priceRange[1];
      const featureMatch = selectedFeatures.length === 0 || 
        selectedFeatures.some(f => product.features.includes(f));
      return priceMatch && featureMatch;
    });
  }, [priceRange, selectedFeatures]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 500000]);
    setSelectedFeatures([]);
  };

  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 500000 || selectedFeatures.length > 0;

  const highlightFeatures = [{
    icon: Zap,
    title: "Energy Efficient",
    description: "Save up to 40% on electricity bills with our inverter AC units."
  }, {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Environment-friendly refrigerants that don't harm the ozone layer."
  }, {
    icon: Thermometer,
    title: "Smart Controls",
    description: "WiFi-enabled units for smartphone control and scheduling."
  }];

  const faqs = [
    {
      question: "What size AC do I need for my room?",
      answer: "For a small room (up to 150 sq ft), a 1-ton AC is sufficient. Medium rooms (150-250 sq ft) need 1.5-ton, and larger rooms (250-400 sq ft) require 2-ton units. For very large spaces or commercial use, consider central AC systems."
    },
    {
      question: "What is inverter technology and why is it better?",
      answer: "Inverter ACs adjust their compressor speed based on cooling needs, unlike conventional ACs that turn on/off completely. This results in 30-50% energy savings, quieter operation, faster cooling, and longer compressor life."
    },
    {
      question: "Do you provide installation services?",
      answer: "Yes! All our products come with free professional installation by certified technicians. We also provide a 1-year warranty on installation work and ensure proper setup for optimal performance."
    },
    {
      question: "What warranty do your products have?",
      answer: "All our AC units come with manufacturer warranty ranging from 1-5 years on the unit and up to 10 years on the compressor. Extended warranty options are also available for purchase."
    },
    {
      question: "How often should I service my AC?",
      answer: "We recommend servicing your AC every 3-4 months for optimal performance. Regular maintenance includes filter cleaning, gas level check, and coil cleaning. We offer affordable annual maintenance packages."
    },
    {
      question: "What payment options are available?",
      answer: "We accept cash, bank transfers, and all major credit/debit cards. We also offer easy installment plans through various banks with 0% markup on selected products. Contact us for more details."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-muted relative overflow-hidden">
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
              Our Products
            </h1>
            <p style={{ animationDelay: "100ms" }} className="text-lg md:text-xl animate-fade-up opacity-90">
              Discover our range of premium air conditioning units from top brands.
              Quality cooling solutions for every budget.
            </p>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {highlightFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 dark:from-muted/30 dark:to-muted/10 border border-border/50 hover:border-primary/30 hover-glow transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center flex-shrink-0 shadow-lg">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid with Filters */}
      <section className="py-20 mesh-gradient">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 border-border/60 hover:border-primary/50"
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1 bg-primary/20 text-primary">
                    {selectedFeatures.length + (priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground hover:text-destructive">
                  <X className="w-4 h-4" />
                  Clear all
                </Button>
              )}
            </div>

            {/* Filters Sidebar */}
            <aside className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className="sticky top-24 glass-card shadow-elevated overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                        <Filter className="w-4 h-4 text-primary-foreground" />
                      </div>
                      Filters
                    </h3>
                    {hasActiveFilters && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10">
                        Clear all
                      </Button>
                    )}
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-8">
                    <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Price Range
                    </h4>
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      max={500000}
                      min={0}
                      step={10000}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm gap-2">
                      <span className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-medium">
                        PKR {priceRange[0].toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">—</span>
                      <span className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-medium">
                        PKR {priceRange[1].toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Features Filter */}
                  <div>
                    <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      Features
                    </h4>
                    <div className="space-y-2">
                      {allFeatures.map((feature) => (
                        <div 
                          key={feature} 
                          className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedFeatures.includes(feature)
                              ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30'
                              : 'hover:bg-muted/60 border border-transparent'
                          }`}
                          onClick={() => toggleFeature(feature)}
                        >
                          <Checkbox
                            id={feature}
                            checked={selectedFeatures.includes(feature)}
                            onCheckedChange={() => toggleFeature(feature)}
                            className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <label
                            htmlFor={feature}
                            className="text-sm text-foreground cursor-pointer flex-1"
                          >
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> of {products.length} products
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <Card className="p-16 text-center glass-card">
                  <div className="text-muted-foreground">
                    <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                      <Filter className="w-10 h-10 opacity-50" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">No products found</h3>
                    <p className="mb-6">Try adjusting your filters to see more results.</p>
                    <Button onClick={clearFilters} className="cta-gradient text-accent-foreground">
                      Clear Filters
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => {
                    const productId = `${product.title}-${product.brand}`.replace(/\s+/g, '-').toLowerCase();
                    const isAdding = addingToCart === productId;
                    
                    return (
                      <Card 
                        key={index} 
                        className="group hover:shadow-elevated transition-all duration-500 overflow-hidden glass-card hover:border-primary/30 gradient-border animate-fade-up" 
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        <CardContent className="p-0">
                          {/* Product Image */}
                          <div className="h-52 bg-gradient-to-br from-muted via-muted/80 to-muted/50 dark:from-muted/40 dark:via-muted/20 dark:to-transparent relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                            <img 
                              src={acUnitImage} 
                              alt={product.title}
                              className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                            />
                            {product.badge && (
                              <Badge className="absolute top-4 left-4 cta-gradient text-accent-foreground shadow-lg border-0 px-3 py-1">
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                                {product.brand}
                              </span>
                              <div className="flex items-center gap-1.5 bg-accent/15 dark:bg-accent/25 px-2.5 py-1 rounded-full">
                                <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                                <span className="text-xs font-bold text-accent">{product.rating}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                              {product.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-1.5 mb-5">
                              {product.features.map((feature, fIndex) => (
                                <Badge 
                                  key={fIndex} 
                                  variant="secondary" 
                                  className="text-xs bg-secondary/15 dark:bg-secondary/25 text-foreground border-0 font-medium"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/80 to-muted/40 dark:from-muted/30 dark:to-muted/10 border border-border/30">
                                <div>
                                  <span className="text-2xl font-bold text-foreground">{product.price}</span>
                                  <span className="text-sm text-muted-foreground line-through ml-2">
                                    {product.originalPrice}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  disabled={isAdding}
                                  className="flex-1 gap-2 h-11 border-primary/40 hover:bg-primary/10 hover:border-primary dark:border-primary/50 dark:hover:bg-primary/20 font-medium transition-all duration-300"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  {isAdding ? (
                                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                  ) : (
                                    <ShoppingCart className="w-4 h-4" />
                                  )}
                                  {isAdding ? "Adding..." : "Add to Cart"}
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="flex-1 cta-gradient text-accent-foreground gap-2 h-11 shadow-lg hover:shadow-xl transition-all duration-300 btn-premium font-medium"
                                  onClick={() => handleEnquire(product)}
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  Enquire
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-6 shadow-lg glow-primary">
                <HelpCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg">
                Find answers to common questions about our products and services.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="glass-card rounded-2xl px-6 data-[state=open]:shadow-elevated data-[state=open]:border-primary/20 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 mesh-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Need Help Choosing?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our experts can help you find the perfect AC unit for your space and budget.
              Get a free consultation today!
            </p>
            <a href="tel:+923412359702">
              <Button size="lg" className="cta-gradient text-accent-foreground px-8 h-14 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 btn-premium">
                Call for Expert Advice
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
