import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Clock, Shield, Star, ArrowRight, CheckCircle2, Phone, Zap, ThermometerSnowflake, Fan, Wind, Home, Users, Leaf, Award, Snowflake } from "lucide-react";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, Parallax, Floating, HoverScale, SlideIn } from "@/components/ScrollAnimations";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import familyComfortImg from "@/assets/family-comfort.png";
import expertInstallationImg from "@/assets/expert-installation.png";
import heroBackgroundImg from "@/assets/hero-background.png";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const services = [
    {
      icon: Wrench,
      title: "AC Installation",
      description: "Professional installation of all AC brands and types with warranty coverage."
    },
    {
      icon: ThermometerSnowflake,
      title: "AC Repair",
      description: "Fast and reliable repair services for all AC problems and issues."
    },
    {
      icon: Clock,
      title: "Maintenance",
      description: "Regular maintenance plans to keep your AC running efficiently."
    },
    {
      icon: Zap,
      title: "Emergency Service",
      description: "24/7 emergency services for urgent AC breakdowns and repairs."
    }
  ];

  const products = [
    {
      icon: Snowflake,
      title: "Split AC Units",
      description: "Energy-efficient split air conditioners for homes and offices.",
      price: "From PKR 85,000"
    },
    {
      icon: Wind,
      title: "Central AC Systems",
      description: "Complete central cooling solutions for large spaces.",
      price: "From PKR 350,000"
    },
    {
      icon: Fan,
      title: "Portable AC",
      description: "Flexible cooling solutions that move where you need them.",
      price: "From PKR 45,000"
    }
  ];

  const features = ["Fast, Affordable Prices", "Reliable AC Solutions Guaranteed", "24/7 Emergency Support"];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax Background */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroBackgroundImg}
            alt="Modern interior with AC"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Floating Text Box - Boutique Style */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white dark:bg-card p-8 md:p-12 border-l-4 border-primary shadow-elevated"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full text-sm mb-6"
              >
                <Snowflake className="w-4 h-4 text-secondary" />
                <span className="text-secondary font-medium">FAST & RELIABLE</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-foreground"
              >
                Premium AC
                <br />
                <span className="text-primary">Solutions</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-muted-foreground mb-8 text-lg"
              >
                Transform your space with our expert AC installation, repair, and maintenance services.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link to="/products">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    Shop now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right side - Feature highlights */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 bg-white/90 dark:bg-card/90 backdrop-blur-sm px-5 py-4 rounded-lg shadow-soft"
                  >
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-8 bg-white/90 dark:bg-card/90 backdrop-blur-sm p-6 rounded-lg shadow-soft"
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-secondary border-2 border-white flex items-center justify-center text-xs font-semibold text-white">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                      ))}
                      <span className="ml-2 font-semibold text-foreground">4.8</span>
                    </div>
                    <p className="text-sm text-muted-foreground">500+ Happy Customers</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Decorative Elements with Parallax */}
        <Floating delay={0} className="absolute top-1/4 right-[5%] hidden xl:block">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Snowflake className="w-8 h-8 text-white" />
          </div>
        </Floating>
        <Floating delay={1} className="absolute bottom-1/4 left-[5%] hidden xl:block">
          <div className="w-12 h-12 rounded-xl bg-primary/40 backdrop-blur-sm flex items-center justify-center">
            <ThermometerSnowflake className="w-6 h-6 text-white" />
          </div>
        </Floating>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <Parallax speed={-0.2} className="absolute -top-20 -right-20 opacity-10">
          <div className="w-80 h-80 rounded-full bg-primary blur-3xl" />
        </Parallax>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-medium text-sm uppercase tracking-wider text-primary">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 text-foreground">
              We are the most{" "}
              <span className="text-gradient">trusted AC company</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              With years of experience, we deliver reliable AC repair and maintenance, ensuring
              fast, safe, and efficient service for your comfort.
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <HoverScale>
                  <Card className="group hover:shadow-elevated transition-all duration-300 border-border hover:border-primary/30 cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <service.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-card-foreground">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.4} className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Family Comfort Section - Image Left, Text Right */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <Parallax speed={0.15} className="absolute top-0 right-0 opacity-10">
          <div className="w-96 h-96 rounded-full bg-secondary blur-3xl" />
        </Parallax>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
                <img 
                  src={familyComfortImg} 
                  alt="Family enjoying comfort with AC" 
                  className="relative rounded-2xl shadow-elevated w-full object-cover aspect-square"
                />
                <div className="absolute -bottom-6 -right-6 bg-card p-4 rounded-xl shadow-lg hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-card-foreground">500+</p>
                      <p className="text-xs text-muted-foreground">Happy Families</p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
            
            <SlideIn direction="right">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Home className="w-4 h-4" />
                  Home Comfort
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Create the Perfect Climate for Your <span className="text-gradient">Family</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Transform your living space into a haven of comfort. Our premium AC solutions ensure your family enjoys the perfect temperature year-round, creating memories in a comfortable environment.
                </p>
                <ul className="space-y-4">
                  {["Whisper-quiet operation for peaceful nights", "Energy-efficient cooling saves on bills", "Smart temperature control for every room", "Healthier air with advanced filtration"].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link to="/products">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 mt-4">
                    Explore AC Units
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Expert Installation Section - Text Left, Image Right */}
      <section className="py-24 bg-background relative overflow-hidden">
        <Parallax speed={0.2} className="absolute top-20 -left-20 opacity-10">
          <div className="w-72 h-72 rounded-full bg-secondary blur-3xl" />
        </Parallax>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left" className="order-2 lg:order-1">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                  <Award className="w-4 h-4" />
                  Expert Service
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Professional Installation You Can <span className="text-gradient">Trust</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our certified technicians deliver flawless AC installations with precision and care. From old, inefficient units to modern, energy-saving systems – we handle the complete transformation.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-muted p-4 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Wrench className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Expert Technicians</h4>
                    <p className="text-sm text-muted-foreground">Certified professionals with years of experience</p>
                  </div>
                  <div className="bg-muted p-4 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                      <Leaf className="w-5 h-5 text-secondary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Energy Efficient</h4>
                    <p className="text-sm text-muted-foreground">Save money with modern, efficient systems</p>
                  </div>
                </div>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="gap-2 mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    View Our Services
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </SlideIn>
            
            <SlideIn direction="right" className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/10 rounded-3xl blur-2xl" />
                <img 
                  src={expertInstallationImg} 
                  alt="Expert AC installation service" 
                  className="relative rounded-2xl shadow-elevated w-full object-cover aspect-square"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-card-foreground">100%</p>
                      <p className="text-xs text-muted-foreground">Satisfaction Guaranteed</p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Products Highlights */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <Parallax speed={0.3} className="absolute top-1/2 -left-20 opacity-10">
          <div className="w-60 h-60 rounded-full bg-primary blur-3xl" />
        </Parallax>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Products</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 text-foreground">
              Premium AC units for <span className="text-gradient">every need</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Explore our range of high-quality, energy-efficient air conditioning units from top brands.
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <StaggerItem key={index}>
                <HoverScale scale={1.03}>
                  <Card className="group hover:shadow-elevated transition-all duration-300 overflow-hidden h-full">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <product.icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-card-foreground">{product.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                      <p className="text-primary font-bold text-lg">{product.price}</p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.4} className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                Browse All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <Parallax speed={0.4} className="absolute -bottom-10 -right-10 opacity-20">
          <div className="w-72 h-72 rounded-full bg-white/30 blur-3xl" />
        </Parallax>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScaleIn className="max-w-3xl mx-auto text-center text-primary-foreground">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-8">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Still have questions?
            </h2>
            <p className="text-lg mb-8 text-white/80">
              Our expert team is ready to help you find the perfect cooling solution.
              Get in touch today for a free consultation!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+923412359702">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 w-full sm:w-auto px-8">
                  <Phone className="w-4 h-4" />
                  Call Us Today
                </Button>
              </a>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 w-full sm:w-auto px-8">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
};

export default Index;
