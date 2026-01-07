import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Snowflake, Wind, Fan, Thermometer, Zap, Leaf, Star, ShoppingCart, MessageCircle, Filter, X, HelpCircle } from "lucide-react";
import { openWhatsApp } from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import acUnitImage from "@/assets/ac-unit.png";

const Products = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

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

  const handleAuthAction = async (product: any, action: 'cart' | 'enquire') => {
    if (!user) {
      toast.info("Please sign in to continue");
      navigate("/login?redirect=/cart");
      return;
    }

    await addToCart(product);
    
    if (action === 'enquire') {
      handleEnquire(product);
    }
  };

  const addToCart = async (product: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login?redirect=/cart");
      return;
    }

    const productId = `${product.title}-${product.brand}`.replace(/\s+/g, '-').toLowerCase();

    // First try to check if item exists
    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("product_id", productId)
      .maybeSingle();

    if (existingItem) {
      toast.info("Item already in cart!");
      navigate("/cart");
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .insert({
        user_id: session.user.id,
        product_id: productId,
        title: product.title,
        brand: product.brand,
        price: product.price,
        features: product.features
      });

    if (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
      return;
    }

    toast.success("Added to cart!");
    navigate("/cart");
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

  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up text-primary-foreground">
              Our Products
            </h1>
            <p style={{
            animationDelay: "100ms"
          }} className="text-lg animate-fade-up text-slate-400">
              Discover our range of premium air conditioning units from top brands.
              Quality cooling solutions for every budget.
            </p>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {highlightFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 dark:bg-muted/20 hover:bg-muted dark:hover:bg-muted/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary dark:text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid with Filters */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedFeatures.length + (priceRange[0] > 0 || priceRange[1] < 500000 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                  <X className="w-4 h-4" />
                  Clear all
                </Button>
              )}
            </div>

            {/* Filters Sidebar */}
            <aside className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className="sticky top-24 border-border/50 dark:border-border shadow-soft dark:shadow-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg text-card-foreground flex items-center gap-2">
                      <Filter className="w-5 h-5 text-primary" />
                      Filters
                    </h3>
                    {hasActiveFilters && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-destructive hover:text-destructive">
                        Clear all
                      </Button>
                    )}
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-8">
                    <h4 className="font-medium text-card-foreground mb-4">Price Range</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      max={500000}
                      min={0}
                      step={10000}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground">PKR {priceRange[0].toLocaleString()}</span>
                      <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground">PKR {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Features Filter */}
                  <div>
                    <h4 className="font-medium text-card-foreground mb-4">Features</h4>
                    <div className="space-y-3">
                      {allFeatures.map((feature) => (
                        <div key={feature} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={feature}
                            checked={selectedFeatures.includes(feature)}
                            onCheckedChange={() => toggleFeature(feature)}
                            className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <label
                            htmlFor={feature}
                            className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors flex-1"
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
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> of {products.length} products
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2 text-foreground">No products found</h3>
                    <p className="mb-4">Try adjusting your filters to see more results.</p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <Card 
                      key={index} 
                      className="group hover:shadow-elevated transition-all duration-300 overflow-hidden animate-fade-up border-border/50 dark:border-border dark:hover:border-primary/30" 
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-0">
                        {/* Product Image */}
                        <div className="h-48 bg-gradient-to-br from-muted to-muted/50 dark:from-muted/30 dark:to-muted/10 relative flex items-center justify-center overflow-hidden">
                          <img 
                            src={acUnitImage} 
                            alt={product.title}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.badge && (
                            <Badge className="absolute top-4 left-4 cta-gradient text-accent-foreground shadow-lg">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="p-6 bg-card">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                              {product.brand}
                            </span>
                            <div className="flex items-center gap-1 bg-accent/10 dark:bg-accent/20 px-2 py-1 rounded-full">
                              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                              <span className="text-xs font-semibold text-accent">{product.rating}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2 text-card-foreground">{product.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                          
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {product.features.map((feature, fIndex) => (
                              <Badge 
                                key={fIndex} 
                                variant="secondary" 
                                className="text-xs bg-secondary/10 dark:bg-secondary/20 text-secondary-foreground dark:text-foreground border-0"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 dark:bg-muted/20">
                              <div>
                                <span className="text-xl font-bold text-foreground">{product.price}</span>
                                <span className="text-sm text-muted-foreground line-through ml-2">
                                  {product.originalPrice}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="flex-1 gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary dark:border-primary/50 dark:hover:bg-primary/20"
                                onClick={() => handleAuthAction(product, 'cart')}
                              >
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                              </Button>
                              <Button 
                                size="sm" 
                                className="flex-1 cta-gradient text-accent-foreground gap-2 shadow-md hover:shadow-lg transition-shadow"
                                onClick={() => handleAuthAction(product, 'enquire')}
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
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold text-card-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our products and services.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-background border border-border rounded-xl px-6 data-[state=open]:shadow-soft"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Need Help Choosing?</h2>
            <p className="text-muted-foreground mb-8">
              Our experts can help you find the perfect AC unit for your space and budget.
              Get a free consultation today!
            </p>
            <a href="tel:+923412359702">
              <Button size="lg" className="cta-gradient text-accent-foreground">
                Call for Expert Advice
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>;
};
export default Products;
