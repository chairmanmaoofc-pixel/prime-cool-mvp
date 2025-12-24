import { Link } from "react-router-dom";
import { Snowflake, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
const Footer = () => {
  const quickLinks = [{
    path: "/",
    label: "Home"
  }, {
    path: "/products",
    label: "Products"
  }, {
    path: "/services",
    label: "Services"
  }, {
    path: "/about",
    label: "About Us"
  }];
  const services = ["AC Installation", "AC Repair", "Maintenance", "Emergency Service"];
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16 bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-destructive-foreground">Optimus Prime</span>
                <span className="text-xs -mt-0.5 text-accent font-medium">AC Solutions</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-secondary-foreground">
              Your trusted partner for all AC and cooling solutions. We provide fast, reliable, and affordable services to keep you comfortable year-round.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => <a key={index} href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Icon className="w-5 h-5 text-secondary-foreground bg-primary border-destructive-foreground" />
                </a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-secondary-foreground">
            <h3 className="font-semibold text-lg mb-6 bg-primary text-secondary-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.path}>
                  <Link to={link.path} className="transition-colors text-sm text-secondary-foreground">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-secondary-foreground">Our Services</h3>
            <ul className="space-y-3">
              {services.map(service => <li key={service}>
                  <span className="text-sm text-destructive-foreground">{service}</span>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-secondary-foreground">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-destructive-foreground">+92 341 235 9702</p>
                  <p className="text-xs text-secondary-foreground">Mon-Sat: 8am - 8pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary-foreground">info@optimusprime.ac</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-secondary-foreground">
                  ​London cluster center , Dubai Int'; city Road.         <br />
                  Dubai, UAE.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-destructive-foreground">
            © {new Date().getFullYear()} Optimus Prime AC Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="transition-colors text-secondary-foreground">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors text-secondary-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;