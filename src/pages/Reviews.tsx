import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    role: "Homeowner",
    rating: 5,
    content:
      "Exceptional service! The team installed our AC system flawlessly. The cooling is perfect and their after-sales support is outstanding.",
    avatar: "A",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Business Owner",
    rating: 5,
    content:
      "We've been using Optimus Prime for our office building. Professional, reliable, and always on time. Highly recommend their commercial solutions!",
    avatar: "S",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Mohammed Hassan",
    role: "Villa Owner",
    rating: 5,
    content:
      "Best AC company in the region. Their technicians are knowledgeable and the installation was clean and efficient. Great value for money.",
    avatar: "M",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Property Manager",
    rating: 4,
    content:
      "Managing multiple properties is easier with Optimus Prime. Their maintenance packages are comprehensive and cost-effective.",
    avatar: "E",
    date: "1 month ago",
  },
  {
    id: 5,
    name: "Omar Al-Farsi",
    role: "Restaurant Owner",
    rating: 5,
    content:
      "Critical for our business - they responded within hours when our AC failed. The repair was quick and professional. Lifesavers!",
    avatar: "O",
    date: "2 months ago",
  },
  {
    id: 6,
    name: "Lisa Thompson",
    role: "Homeowner",
    rating: 5,
    content:
      "From consultation to installation, everything was smooth. The energy-efficient units they recommended cut our bills by 30%!",
    avatar: "L",
    date: "6 weeks ago",
  },
];

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "4.9", label: "Average Rating" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-muted">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/50 text-accent-foreground text-sm font-medium mb-6 border border-accent/30">
              ⭐ Customer Reviews
            </span>

            <h1 className="text-4xl font-bold mb-6 text-primary md:text-7xl">
              What Our Customers
              <span className="block mt-2 text-accent">Are Saying</span>
            </h1>

            {/* ✅ FIXED — theme safe color */}
            <p className="text-lg md:text-xl text-foreground">
              Real experiences from real customers. See why hundreds trust us
              with their cooling needs.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl glass-card border border-border/50"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Customer Testimonials
            </h2>
            <p className="text-muted-foreground">
              Don't just take our word for it — hear from our satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {currentReviews.map((review) => (
              <div
                key={review.id}
                className="relative bg-card rounded-2xl p-6 shadow-soft border border-border/50"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary" />
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-accent text-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-foreground/90 mb-6">
                  "{review.content}"
                </p>

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
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(i)}
                className="rounded-full"
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={currentPage === totalPages - 1}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
