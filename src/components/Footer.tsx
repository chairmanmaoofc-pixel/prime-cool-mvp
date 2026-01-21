import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logoImg from "@/assets/logo.png";

const Footer = () => {
  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About Us" }
  ];
  
  const services = ["AC Installation", "AC Repair", "Maintenance", "Emergency Service"];
  
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logoImg} 
                alt="Optimus General" 
                className="h-16 w-auto object-contain bg-white rounded-lg p-1"
              />
            </Link>
            <p className="text-sm leading-relaxed text-background/80">
              Your trusted partner for all AC and cooling solutions. We provide fast, reliable, and affordable services to keep you comfortable year-round.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors group"
                >
                  <Icon className="w-5 h-5 text-background group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-background">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="transition-colors text-sm text-background/70 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-background">Our Services</h3>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service}>
                  <span className="text-sm text-background/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-background">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-background">+92 341 235 9702</p>
                  <p className="text-xs text-background/60">Mon-Sat: 8am - 8pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-background/80">info@optimusprime.ac</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-background/80">
                  London cluster center, Dubai Int'l City Road
                  <br />
                  Dubai, UAE
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/70">
            © {new Date().getFullYear()} Optimus Prime AC Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="transition-colors text-background/70 hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors text-background/70 hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
