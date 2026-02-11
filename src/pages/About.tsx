import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Award,
  Clock,
  Target,
  Heart,
  Lightbulb,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
const About = () => {
  const stats = [
    {
      value: "10+",
      label: "Years Experience",
    },
    {
      value: "5000+",
      label: "Happy Customers",
    },
    {
      value: "50+",
      label: "Expert Technicians",
    },
    {
      value: "24/7",
      label: "Support Available",
    },
  ];
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for excellence in every service we provide, ensuring top-quality workmanship.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your comfort and satisfaction are our top priorities. We go the extra mile for you.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We stay updated with the latest AC technologies to offer you the best solutions.",
    },
  ];
  const team = [
    {
      name: "XAFEER KHAN",
      role: "Founder & CEO",
      description: "20+ years in HVAC industry",
    },
    {
      name: "MUSTAFA",
      role: "Technical Director",
      description: "Expert in commercial AC systems",
    },
    {
      name: "ABDULLAH HUSSAIN",
      role: "Customer Relations",
      description: "Ensuring customer satisfaction",
    },
  ];
  const whyChooseUs = [
    "Certified and trained technicians",
    "Transparent pricing, no hidden costs",
    "Genuine spare parts with warranty",
    "Fast response and same-day service",
    "All major brands supported",
    "100% satisfaction guarantee",
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-muted relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-red-600">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up text-gradient">
              About us
            </h1>
            <p
              style={{
                animationDelay: "100ms",
              }}
              className="text-lg animate-fade-up text-gradient"
            >
              Your trusted partner for all AC and cooling solutions since 2014.
              We're committed to keeping Pakistan cool and comfortable.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-medium text-sm uppercase tracking-wider text-secondary-foreground">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
                We are the most{" "}
                <span className="text-gradient">trusted AC company</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2014, Optimus Prime AC Solutions started with a
                simple mission: to provide reliable, affordable, and
                professional AC services to the people of Pakistan.
              </p>
              <p className="text-muted-foreground mb-8">
                Over the years, we've grown from a small team to a full-service
                AC company with 50+ trained technicians serving thousands of
                happy customers across the country. Our commitment to quality
                and customer satisfaction remains unchanged.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="col-span-2 bg-muted">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl hero-gradient flex items-center justify-center flex-shrink-0">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground">
                      Award Winning Service
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Recognized for excellence in AC services
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Users className="w-10 h-10 mb-4 text-secondary-foreground" />
                  <h3 className="font-semibold text-card-foreground">
                    Expert Team
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Trained professionals
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Clock className="w-10 h-10 mb-4 text-secondary-foreground" />
                  <h3 className="font-semibold text-card-foreground">
                    Fast Service
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Same-day repairs
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-medium text-sm uppercase tracking-wider text-destructive-foreground">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
              What drives us <span className="text-gradient">every day</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-elevated transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl hero-gradient flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
              Meet the <span className="text-gradient">experts</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-elevated transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-secondary">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium text-sm">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Ready to experience the difference?
            </h2>
            <p className="text-lg mb-8 text-gradient">
              Join thousands of satisfied customers who trust Optimus Prime for
              their AC needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+923412359702">
                <Button
                  size="lg"
                  className="cta-gradient text-accent-foreground gap-2 hover:opacity-90 w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4" />
                  Contact Us Today
                </Button>
              </a>
              <Link to="/services">
                <Button
                  size="lg"
                  className="cta-gradient text-accent-foreground gap-2 hover:opacity-90 w-full sm:w-auto"
                >
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
