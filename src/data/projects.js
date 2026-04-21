import brochurePdfFile from "../assets/Balaji-Sky-Harmony-Brochure.pdf";

export const projectsData = [
  {
    id: "sky-harmony",
    title: "BALAJI SKY HARMONY",
    subtitle: "A Sanctuary of Modern Living",
    location: "Vastral, Ahmedabad East",
    address:
      "Opp. Madhav Farm, Behind Reliance Petrol Pump, Vastral, Ahmedabad",
    pincode: "382418",
    developer: "Balaji Construction",

    status: "Ready to Move",
    launchDate: "MAY 2023",
    possession: "June 2025",

    priceRange: "34.12 L - 47.27 L",
    avgPrice: "₹5,500 / sq.ft",
    emiStarts: "₹18,070 / month",

    type: "2 & 3 BHK",
    configurations: ["2 BHK", "3 BHK"],

    unitSizes: "620 - 859 sq.ft",
    carpetArea: "620 - 859 sq.ft",

    mainImage: "/assets/FrontViewBuilding.webp",

    gallery: [
      "/assets/FrontViewBuilding.webp",
      "/assets/SideViewGarden.webp",
      "/assets/HeroImage.webp",
      "/assets/GateImage.webp",
      "/assets/BackViewGround.webp",
      "/assets/ChildrenPlayArea.webp",
    ],

    floorPlans: [
      { 
        type: "2 BHK", 
        image: "/assets/2BHKFloor.png", 
        area: "Approx. 620 - 650 sq.ft (Carpet)", 
        carpetArea: "650 sq. ft.",
        balconySize: "120 sq. ft.",
        totalArea: "770 sq. ft.",
        bedrooms: "2",
        bathrooms: "2",
        desc: "Spacious and ventilated 2 BHK layout designed for comfort." 
      },
      { 
        type: "3 BHK", 
        image: "/assets/3BHKFloor.png", 
        area: "Approx. 820 - 859 sq.ft (Carpet)", 
        carpetArea: "859 sq. ft.",
        balconySize: "180 sq. ft.",
        totalArea: "1039 sq. ft.",
        bedrooms: "3",
        bathrooms: "3",
        desc: "Premium 3 BHK configuration with expansive living areas." 
      }
    ],
    brochurePdf: brochurePdfFile,

    overview:
      "Balaji Sky Harmony is a premium residential project located in Vastral, Ahmedabad East. Spread across a thoughtfully planned gated community, this project offers spacious 2 & 3 BHK apartments with modern amenities, quality construction, and excellent connectivity to metro, schools, hospitals, and shopping hubs.",

    highlights: [
      "Just 2 KM from Vastral Gam Metro Station",
      "Earthquake-resistant RCC structure",
      "Automatic high-speed lifts",
      "24x7 water supply",
      "Fire sprinklers & fire fighting system",
      "Solar power system",
      "Granite kitchen platform with steel sink",
      "Premium vitrified tile flooring",
    ],

    amenities: [
      {
        name: "Security Cabin",
        icon: "🛡️",
        image: "/assets/GateImage.webp",
        desc: "Dedicated security cabin with gated access and architecture.",
      },
      {
        name: "Front View",
        icon: "🏢",
        image: "/assets/FrontViewBuilding.webp",
        desc: "Stunning modern architectural facade.",
      },
      {
        name: "Children Play Area",
        icon: "🎡",
        image: "/assets/ChildrenPlayArea.webp",
        desc: "Safe and vibrant zone for children to explore.",
      },
      {
        name: "Residential Towers",
        icon: "🛗",
        image: "/assets/SideViewGarden.webp",
        desc: "Modern automatic lifts and wide lobbies.",
      },
      {
        name: "Rear Entrance",
        icon: "🚗",
        image: "/assets/BackViewGround.webp",
        desc: "Easy access gates for smooth traffic flow.",
      },
      {
        name: "24x7 Security",
        icon: "🚨",
        image: "/assets/GateImage.webp",
        desc: "Round-the-clock security surveillance.",
      },
      {
        name: "Water Supply",
        icon: "💧",
        image: "/assets/HeroImage.webp",
        desc: "Continuous water availability and storage.",
      },
      {
        name: "Luxury Living",
        icon: "✨",
        image: "/assets/HeroImage.webp",
        desc: "Experience the pinnacle of high-end design.",
      },
    ],

    specifications: {
      structure: "Earthquake resistant RCC frame structure",
      flooring: "Vitrified tiles in all rooms",
      kitchen: "Granite platform with SS sink and glazed tiles up to lintel level",
      doors: "Elegant main door and internal flush doors",
      windows: "Powder coated aluminum sliding windows",
      plumbing: "Concealed plumbing with premium quality sanitary ware",
      electrification: "Concealed copper wiring with modular switches",
      paint: "Internal putty finish and external weather-resistant paint"
    },

    whatsappMsg: "Hi Balaji Construction, I am interested in BALAJI SKY HARMONY. Please send me more details about availability and floor plans."
  }
];
