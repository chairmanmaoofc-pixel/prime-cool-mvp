import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Snowflake, Wrench, Clock, Shield, Star, ArrowRight, CheckCircle2, Phone, Zap, ThermometerSnowflake, Fan, Wind } from "lucide-react";
const Index = () => {
  const services = [{
    icon: Wrench,
    title: "AC Installation",
    description: "Professional installation of all AC brands and types with warranty coverage."
  }, {
    icon: ThermometerSnowflake,
    title: "AC Repair",
    description: "Fast and reliable repair services for all AC problems and issues."
  }, {
    icon: Clock,
    title: "Maintenance",
    description: "Regular maintenance plans to keep your AC running efficiently."
  }, {
    icon: Zap,
    title: "Emergency Service",
    description: "24/7 emergency services for urgent AC breakdowns and repairs."
  }];
  const products = [{
    icon: Snowflake,
    title: "Split AC Units",
    description: "Energy-efficient split air conditioners for homes and offices.",
    price: "From PKR 85,000"
  }, {
    icon: Wind,
    title: "Central AC Systems",
    description: "Complete central cooling solutions for large spaces.",
    price: "From PKR 350,000"
  }, {
    icon: Fan,
    title: "Portable AC",
    description: "Flexible cooling solutions that move where you need them.",
    price: "From PKR 45,000"
  }];
  const features = ["Fast, Affordable Prices", "Reliable Plumbing Solutions Guaranteed", "24/7 Emergency Support"];
  return <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Snowflake className="w-4 h-4 text-secondary" />
                <span>FAST & RELIABLE</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-up text-secondary-foreground">
                Precision cooling for{" "}
                <span className="text-secondary">perfect comfort.</span>
              </h1>
              
              <ul className="space-y-3">
                {features.map((feature, index) => <li key={index} className="flex items-center gap-3 text-primary-foreground/90 animate-fade-up" style={{
                animationDelay: `${(index + 1) * 100}ms`
              }}>
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-destructive-foreground">{feature}</span>
                  </li>)}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{
              animationDelay: "400ms"
            }}>
                <Link to="/services">
                  <Button size="lg" className="cta-gradient text-accent-foreground gap-2 hover:opacity-90 w-full sm:w-auto">
                    View Our Services
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+923412359702">
                  <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 gap-2 w-full sm:w-auto">
                    <Phone className="w-4 h-4" />
                    +92 341 235 9702
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-4 pt-4 animate-fade-up" style={{
              animationDelay: "500ms"
            }}>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-secondary border-2 border-primary flex items-center justify-center text-xs font-semibold text-secondary-foreground">
                      {String.fromCharCode(64 + i)}
                    </div>)}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-accent fill-accent" />)}
                    <span className="ml-2 font-semibold text-secondary-foreground">4.8</span>
                  </div>
                  <p className="text-xs text-destructive-foreground">500+ Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Quick Estimate Form */}
            <div className="animate-slide-in-right">
              <Card className="shadow-elevated">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-foreground">Get a Quick Estimate</h3>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Enter your name" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                      <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <input type="email" placeholder="Enter email address" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    <select className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">Select your service</option>
                      <option value="installation">AC Installation</option>
                      <option value="repair">AC Repair</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="emergency">Emergency Service</option>
                    </select>
                    <Button type="submit" className="w-full cta-gradient text-accent-foreground hover:opacity-90">
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
              We are the most{" "}
              <span className="text-gradient">popular repair company</span>
            </h2>
            <p className="text-muted-foreground mt-4">
              With years of experience, we deliver reliable AC repair and maintenance, ensuring
              fast, safe, and efficient service for your comfort.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => <Card key={index} className="group hover:shadow-elevated transition-all duration-300 border-border hover:border-secondary/30 cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-card-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg" className="gap-2">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Highlights */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">Our Products</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
              Premium AC units for <span className="text-gradient">every need</span>
            </h2>
            <p className="text-muted-foreground mt-4">
              Explore our range of high-quality, energy-efficient air conditioning units from top brands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => <Card key={index} className="group hover:shadow-elevated transition-all duration-300 overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                    <product.icon className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  <p className="text-accent font-bold text-lg">{product.price}</p>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="cta-gradient text-accent-foreground gap-2 hover:opacity-90">
                Browse All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <div className="w-20 h-20 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-8">
              <Shield className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary-foreground">
              Still have questions?
            </h2>
            <p className="text-lg mb-8 text-secondary-foreground">
              Our expert team is ready to help you find the perfect cooling solution.
              Get in touch today for a free consultation!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+923412359702">
                <Button size="lg" className="cta-gradient text-accent-foreground gap-2 hover:opacity-90 w-full sm:w-auto">
                  <Phone className="w-4 h-4" />
                  Call Us Today
                </Button>
              </a>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 w-full sm:w-auto">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;