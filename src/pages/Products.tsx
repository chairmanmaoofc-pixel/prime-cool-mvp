import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Snowflake, Wind, Fan, Thermometer, Zap, Leaf, Star, ShoppingCart } from "lucide-react";
const Products = () => {
  const products = [{
    icon: Snowflake,
    title: "Premium Split AC - 1.5 Ton",
    brand: "Daikin",
    description: "Inverter technology with 5-star energy rating. Perfect for medium-sized rooms.",
    price: "PKR 125,000",
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
    originalPrice: "PKR 65,000",
    features: ["Portable", "No Installation", "Dual Mode"],
    rating: 4.5
  }, {
    icon: Snowflake,
    title: "Floor Standing AC - 2 Ton",
    brand: "Orient",
    description: "Powerful floor standing unit for large living rooms and halls.",
    price: "PKR 175,000",
    originalPrice: "PKR 195,000",
    features: ["High Capacity", "Floor Standing", "Remote Control"],
    rating: 4.6
  }, {
    icon: Thermometer,
    title: "Window AC - 1.5 Ton",
    brand: "Dawlance",
    description: "Classic window AC with modern features and easy installation.",
    price: "PKR 65,000",
    originalPrice: "PKR 75,000",
    features: ["Easy Install", "Compact", "Affordable"],
    badge: "Value Pick",
    rating: 4.4
  }];
  const features = [{
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
            {features.map((feature, index) => <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => <Card key={index} className="group hover:shadow-elevated transition-all duration-300 overflow-hidden animate-fade-up" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <CardContent className="p-0">
                  {/* Product Image Placeholder */}
                  <div className="h-48 bg-muted relative flex items-center justify-center">
                    <product.icon className="w-20 h-20 text-secondary/30 group-hover:text-secondary/50 transition-colors" />
                    {product.badge && <Badge className="absolute top-4 left-4 cta-gradient text-accent-foreground">
                        {product.badge}
                      </Badge>}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-secondary uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 text-card-foreground">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.map((feature, fIndex) => <Badge key={fIndex} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-card-foreground">{product.price}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {product.originalPrice}
                        </span>
                      </div>
                      <Button size="sm" className="cta-gradient text-accent-foreground gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Enquire
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
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