/* ==========================================================
   VOLTIX ENERGY — PRODUCT CATALOGUE DATA
   Add / edit real products here. Every product uses the same shape.
   - price: number (PKR) or null  → null shows "Request a Quote"
   - availability: "In stock" | "Out of stock" | "Made to order" | "" (empty = "Ask for availability")
   - specs: only list verified specifications. Empty / missing specs are hidden.
   - image: path to a real photo (e.g. "img/battery-48v.jpg"). Empty → neutral illustration.
   - compatibility: verified compatible models only.
   Products below are catalogue CATEGORIES with no invented specs, prices or stock.
   Replace them with your real inventory.
   ========================================================== */
window.VOLTIX_PRODUCTS = [
  { id: "ebike-replacement-battery", type: "battery", name: "Electric Bike Replacement Battery",
    vehicle: "Electric bike", chemistry: "", voltage: "", capacityAh: "", price: null, availability: "",
    short: "Replacement battery packs for electric bikes. Share your current battery details and we will confirm the right match.",
    description: "Replacement battery solutions for electric bikes. Because compatibility depends on voltage, capacity, connector and physical fit, our team confirms the right battery with you before purchase.",
    specs: {}, compatibility: [], image: "" },
  { id: "scooty-battery", type: "battery", name: "Electric Scooty Battery",
    vehicle: "Electric scooty", chemistry: "", voltage: "", capacityAh: "", price: null, availability: "",
    short: "Battery options for electric scooties and scooters, matched to your model and usage.",
    description: "Battery options for electric scooties and scooters. Tell us your model and current battery specifications and we will guide you to a suitable option.",
    specs: {}, compatibility: [], image: "" },
  { id: "lithium-ion-pack", type: "battery", name: "Lithium-Ion Battery Pack",
    vehicle: "Compatible electric vehicles", chemistry: "Lithium-ion", voltage: "", capacityAh: "", price: null, availability: "",
    short: "Lithium-ion battery solutions for compatible electric vehicles. Specifications confirmed on inquiry.",
    description: "Lithium-ion battery solutions for compatible electric vehicles. Performance, lifespan, charging time and range depend on chemistry, capacity, the vehicle, operating conditions and maintenance.",
    specs: {}, compatibility: [], image: "" },
  { id: "battery-charger", type: "part", category: "Chargers", name: "Battery Charger",
    vehicle: "Matched to battery", price: null, availability: "",
    short: "Chargers matched to your battery's voltage and chemistry. Never use a mismatched charger.",
    description: "Chargers must match your battery's voltage, chemistry and connector. Share your battery details and we will confirm a compatible charger.",
    specs: {}, compatibility: [], image: "" },
  { id: "controller", type: "part", category: "Controllers", name: "Controller",
    vehicle: "Matched to motor and battery", price: null, availability: "",
    short: "Compatible controllers for electric bikes and scooties, identified by specification.",
    description: "Controllers must match the motor and battery system. Send us your vehicle model and the existing controller's specification to confirm a compatible replacement.",
    specs: {}, compatibility: [], image: "" },
  { id: "motor-components", type: "part", category: "Motors & Components", name: "Motor & Related Components",
    vehicle: "By model", price: null, availability: "",
    short: "Motors and related components for supported electric vehicles.",
    description: "Motors and related components for supported electric vehicles. Please share the model and part details so we can confirm availability.",
    specs: {}, compatibility: [], image: "" },
  { id: "wiring-connectors", type: "part", category: "Wiring & Connectors", name: "Wiring Harness & Connectors",
    vehicle: "By model", price: null, availability: "",
    short: "Wiring harnesses and connectors identified by model and connector type.",
    description: "Wiring harnesses and connectors identified by vehicle model and connector type. Share a photo of the connector for the quickest match.",
    specs: {}, compatibility: [], image: "" },
  { id: "throttle-switches", type: "part", category: "Throttles & Switches", name: "Throttle & Switches",
    vehicle: "By model", price: null, availability: "",
    short: "Throttles and handlebar switches for compatible vehicles.",
    description: "Throttles and handlebar switches for compatible vehicles. Share your model or a photo of the existing part to confirm the match.",
    specs: {}, compatibility: [], image: "" },
  { id: "brake-components", type: "part", category: "Braking", name: "Braking Components",
    vehicle: "By model", price: null, availability: "",
    short: "Brake components for compatible electric bikes and scooties.",
    description: "Brake components for compatible electric bikes and scooties. Confirm the exact part with our team before ordering.",
    specs: {}, compatibility: [], image: "" },
  { id: "lights-indicators", type: "part", category: "Lights & Indicators", name: "Lights & Indicators",
    vehicle: "By model", price: null, availability: "",
    short: "Headlights, tail lights and indicators for compatible vehicles.",
    description: "Headlights, tail lights and indicators for compatible vehicles. Share your model to confirm voltage and fitment.",
    specs: {}, compatibility: [], image: "" },
  { id: "electric-cycle", type: "cycle", name: "Voltix Electric Cycle",
    colors: [], motor: "", battery: "", range: "", chargingTime: "", topSpeed: "", weight: "", load: "",
    price: null, availability: "",
    short: "Our electric cycle range. Contact us for current models, variants and customization options.",
    description: "Voltix Energy electric cycles for everyday mobility. Contact us for current models, variants, customization options and business or bulk inquiries.",
    specs: {}, compatibility: [], image: "" }
];

window.VOLTIX_PART_CATEGORIES = ["Chargers", "Controllers", "Motors & Components", "Wiring & Connectors", "Throttles & Switches", "Braking", "Lights & Indicators"];
