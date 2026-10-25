/* ==========================================================
   VOLTIX ENERGY — CENTRAL BUSINESS SETTINGS
   Edit everything here. Empty values are hidden on the site
   (never shown as fake data). Nothing else needs touching to
   go live with real business details.
   ========================================================== */
window.VOLTIX_CONFIG = {
  brandName: "Voltix Energy",

  // Your live domain, e.g. "https://www.voltixenergy.pk" (used for canonical URLs & structured data)
  siteUrl: "",

  // WhatsApp number in international format, digits only. Example: "923001234567"
  // While empty, WhatsApp buttons send visitors to the contact form instead (no broken links).
  whatsappNumber: "923161658941",

  phone: "03161658941",
  email: "User@gmail.com",
  address: "Bilal Ganj",
  hours: "8:00 AM – 10:00 PM",                 // e.g. "Mon–Sat, 10:00 – 19:00"
  mapEmbedUrl: "https://maps.google.com/maps?q=31.5809618,74.3017897&z=17&output=embed",           // Google Maps "Embed a map" src URL, once location is verified

  social: { facebook: "", instagram: "", youtube: "", tiktok: "" },

  // Form delivery endpoint. Use a service such as Formspree (https://formspree.io):
  // create a form, paste its URL here, e.g. "https://formspree.io/f/xxxxxxx".
  // While empty, forms will honestly say they are not connected and offer WhatsApp instead.
  formEndpoint: "",

  // Home-visit coverage. Leave [] until confirmed (the team confirms coverage manually).
  // Example once confirmed: ["Lahore", "Gujranwala"]
  serviceAreas: [],

  // Pre-filled WhatsApp messages
  messages: {
    general: "Assalam-o-Alaikum, I would like to know more about Voltix Energy products and services.",
    battery: "Assalam-o-Alaikum, I am interested in a battery for my electric bike. Please help me find a compatible option.",
    repair: "Assalam-o-Alaikum, I need repair or maintenance for my electric vehicle. Please guide me about service availability.",
    home: "Assalam-o-Alaikum, I would like to request a home visit for my electric bike/scooty. Please guide me about service availability in my area.",
    cycle: "Assalam-o-Alaikum, I am interested in your electric cycles. Please share available models and details.",
    parts: "Assalam-o-Alaikum, I am looking for a spare part for my electric vehicle. Please guide me."
  },

  // Genuine customer feedback only. Leave [] to hide the section.
  // Format: { name: "Customer name", vehicle: "Optional", text: "Their words" }
  testimonials: [],

  // Policies shown on policies.html (plain text). Leave empty until confirmed.
  policies: { warranty: "", returns: "", delivery: "" },

  about: { story: "" },

  faq: [
    { q: "Which battery is compatible with my electric bike?",
      a: "Compatibility depends on voltage, capacity, connector type, physical size and your vehicle's controller. Send us your vehicle model and current battery details through the battery inquiry form or WhatsApp, and our team will confirm a suitable option before you buy." },
    { q: "What is the difference between lithium and other battery types?",
      a: "Lithium-ion batteries are generally lighter and more energy-dense than lead-acid batteries. Actual lifespan, range and charging time depend on battery chemistry, capacity, your vehicle, operating conditions and how the battery is maintained." },
    { q: "Can I request a battery replacement at home?",
      a: "Home-visit battery assistance may be available depending on your location and the battery involved. Submit a home-service request and our team will confirm whether we can visit." },
    { q: "Do you repair electric scooters and scooties?",
      a: "Voltix Energy provides repair and maintenance for electric bikes and scooties. Tell us about the fault and your model, and we will confirm whether we can service it." },
    { q: "Can I purchase spare parts separately?",
      a: "Yes, you can enquire about spare parts on their own. Share the vehicle model or the part's specification so we can confirm the right match and availability." },
    { q: "Do you manufacture electric cycles?",
      a: "Electric cycle manufacturing is part of what Voltix Energy does. Contact us for current models, customization options and business or bulk inquiries." },
    { q: "How can I request a quotation?",
      a: "Use the Request a Quote button on any product, the battery inquiry form, or message us on WhatsApp. Our team will reply with guidance and a quotation." },
    { q: "Which areas are covered by home-visit services?",
      a: "Coverage is confirmed by our team. Enter your city on the home-service form and we will let you know whether we can visit your location." }
  ]
};
