export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Amelia Reed",
    location: "Manchester, UK",
    initials: "AR",
    quote:
      "The only review site I've found that actually publishes the downsides. Saved me from a £300 course that would have been useless for me.",
  },
  {
    name: "Marcus Bell",
    location: "Toronto, Canada",
    initials: "MB",
    quote:
      "Their comparison tables are brilliant. I compared four AI writing tools in about five minutes and picked the right one first time.",
  },
  {
    name: "Priya Nair",
    location: "Sydney, Australia",
    initials: "PN",
    quote:
      "I appreciate that they explain the methodology. Knowing how a score was calculated makes it far easier to trust.",
  },
  {
    name: "Jonas Weber",
    location: "Hamburg, Germany",
    initials: "JW",
    quote:
      "Clear, honest and well written. The supplement ingredient breakdowns are more detailed than anything else I've read.",
  },
];