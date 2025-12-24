import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  ThermometerSnowflake,
  Clock,
  Zap,
  Settings,
  Shield,
  CheckCircle2,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: ThermometerSnowflake,
      title: "AC Installation",
      description:
        "Professional installation of split, window, central, and portable AC units. We handle all brands with proper setup and testing.",
      features: [
        "All major brands supported",
        "Proper mounting & wiring",
        "Testing & calibration",
        "Installation warranty",
      ],
      price: "Starting from PKR 5,000",
    },
    {
      icon: Wrench,
      title: "AC Repair",
      description:
        "Fast and reliable repair services for all AC problems including gas refilling, compressor issues, and electrical faults.",
      features: [
        "Same-day service available",
        "Genuine spare parts",
        "All AC types & brands",
        "90-day repair warranty",
      ],
      price: "Starting from PKR 2,000",
    },
    {
      icon: Settings,
      title: "Maintenance Plans",
      description:
        "Regular maintenance to keep your AC running efficiently. Prevent breakdowns and extend the life of your unit.",
      features: [
        "Deep cleaning service",
        "Filter replacement",
        "Performance check",
        "Priority scheduling",
      ],
      price: "PKR 3,500/visit",
    },
    {
      icon: Zap,
      title: "Emergency Service",
      description:
        "24/7 emergency AC repair services. We're here when you need us most, any time of day or night.",
      features: [
        "Available 24/7",
        "Fast response time",
        "No extra night charges",
        "Expert technicians",
      ],
      price: "Call for quote",
    },
    {
      icon: Shield,
      title: "AMC Contracts",
      description:
        "Annual Maintenance Contracts for worry-free AC care. Regular visits, priority service, and discounted repairs.",
      features: [
        "Quarterly visits",
        "Priority response",
        "Discounted repairs",
        "Free gas top-ups",
      ],
      price: "PKR 12,000/year",
    },
    {
      icon: Clock,
      title: "Same Day Service",
      description:
        "Need urgent help? Our same-day service ensures your AC is back up and running before the day ends.",
      features: [
        "Morning booking, same-day fix",
        "Express diagnostics",
        "Quick turnaround",
        "Guaranteed satisfaction",
      ],
      price: "Starting from PKR 2,500",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Book Service",
      description: "Call us or fill the form to schedule your service.",
    },
    {
      step: "02",
      title: "Technician Visit",
      description: "Our expert arrives at your location on time.",
    },
    {
      step: "03",
      title: "Diagnosis & Quote",
      description: "We identify the issue and provide a transparent quote.",
    },
    {
      step: "04",
      title: "Service Complete",
      description: "Work is done, tested, and you enjoy cool comfort!",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
              Our Services
            </h1>
            <p className="text-lg text-primary-foreground/80 animate-fade-up" style={{ animationDelay: "100ms" }}>
              Professional AC installation, repair, and maintenance services.
              Fast, reliable, and affordable solutions for all your cooling needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-elevated transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl hero-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{service.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-border">
                    <span className="text-accent font-bold">{service.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
              Simple <span className="text-gradient">4-step process</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 rounded-full hero-gradient flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary-foreground">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Book your service today and experience the Optimus Prime difference.
              Fast, professional, and guaranteed satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+923412359702">
                <Button size="lg" className="cta-gradient text-accent-foreground gap-2 hover:opacity-90 w-full sm:w-auto">
                  <Phone className="w-4 h-4" />
                  Book Now: +92 341 235 9702
                </Button>
              </a>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 w-full sm:w-auto"
                >
                  Learn About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
