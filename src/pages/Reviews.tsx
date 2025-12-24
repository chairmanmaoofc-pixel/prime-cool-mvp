import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const reviews = [{
  id: 1,
  name: "Ahmed Al-Rashid",
  role: "Homeowner",
  rating: 5,
  content: "Exceptional service! The team installed our AC system flawlessly. The cooling is perfect and their after-sales support is outstanding.",
  avatar: "A",
  date: "2 weeks ago"
}, {
  id: 2,
  name: "Sarah Johnson",
  role: "Business Owner",
  rating: 5,
  content: "We've been using Optimus Prime for our office building. Professional, reliable, and always on time. Highly recommend their commercial solutions!",
  avatar: "S",
  date: "1 month ago"
}, {
  id: 3,
  name: "Mohammed Hassan",
  role: "Villa Owner",
  rating: 5,
  content: "Best AC company in the region. Their technicians are knowledgeable and the installation was clean and efficient. Great value for money.",
  avatar: "M",
  date: "3 weeks ago"
}, {
  id: 4,
  name: "Emily Chen",
  role: "Property Manager",
  rating: 4,
  content: "Managing multiple properties is easier with Optimus Prime. Their maintenance packages are comprehensive and cost-effective.",
  avatar: "E",
  date: "1 month ago"
}, {
  id: 5,
  name: "Omar Al-Farsi",
  role: "Restaurant Owner",
  rating: 5,
  content: "Critical for our business - they responded within hours when our AC failed. The repair was quick and professional. Lifesavers!",
  avatar: "O",
  date: "2 months ago"
}, {
  id: 6,
  name: "Lisa Thompson",
  role: "Homeowner",
  rating: 5,
  content: "From consultation to installation, everything was smooth. The energy-efficient units they recommended cut our bills by 30%!",
  avatar: "L",
  date: "6 weeks ago"
}];
const stats = [{
  value: "500+",
  label: "Happy Customers"
}, {
  value: "4.9",
  label: "Average Rating"
}, {
  value: "98%",
  label: "Satisfaction Rate"
}, {
  value: "24/7",
  label: "Support Available"
}];
const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage);
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6 animate-fade-up backdrop-blur-sm border border-accent/30">
              ⭐ Customer Reviews
            </span>
            <h1 style={{
            animationDelay: "0.1s"
          }} className="text-4xl font-bold mb-6 animate-fade-up text-primary md:text-7xl">
              What Our Customers
              <span className="block mt-2 text-accent">Are Saying</span>
            </h1>
            <p style={{
            animationDelay: "0.2s"
          }} className="text-lg md:text-xl animate-fade-up text-destructive-foreground">
              Real experiences from real customers. See why hundreds trust us with their cooling needs.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-background" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => <div key={index} className="text-center p-6 rounded-2xl glass-card border border-border/50 animate-fade-up hover:shadow-elevated transition-all duration-300" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Customer Testimonials
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it — hear from our satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {currentReviews.map((review, index) => <div key={review.id} className="group relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-primary/30 animate-fade-up" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                {/* Quote Icon */}
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Quote className="w-5 h-5 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({
                length: 5
              }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />)}
                </div>

                {/* Content */}
                <p className="text-foreground/90 mb-6 leading-relaxed">
                  "{review.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {review.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {review.role} • {review.date}
                    </div>
                  </div>
                </div>
              </div>)}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))} disabled={currentPage === 0} className="rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {Array.from({
            length: totalPages
          }).map((_, i) => <Button key={i} variant={currentPage === i ? "default" : "outline"} size="icon" onClick={() => setCurrentPage(i)} className={`rounded-full ${currentPage === i ? "hero-gradient" : ""}`}>
                {i + 1}
              </Button>)}
            
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))} disabled={currentPage === totalPages - 1} className="rounded-full">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-12 border border-border/50 shadow-elevated">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our growing family of satisfied customers. Get a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="cta-gradient text-accent-foreground hover:opacity-90 px-8">
                Get Free Quote
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Reviews;