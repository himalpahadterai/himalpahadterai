import { Category, Product, HeroSlide, SiteSettings, PageContent } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: 'Himal Pahad Tarai Traders Pvt. Ltd.',
  regAddress: 'Mahottari Rural Municipality–5, Mahottari, Nepal',
  branchAddress: 'Bardibas, Mahottari',
  phone: '+977 9861730194',
  whatsappCountryCode: '977',
  whatsappNumber: '9861730194',
  email: 'nishahpt@gmail.com',
  intendedDomain: 'himalpahadtaraitraders.com.np',
  canonicalBaseUrl: 'https://himalpahadtaraitraders.com.np',
  businessDescription: 'Small and domestic-industry machinery, raw materials and training enquiries.',
  logoUrl: '/src/assets/images/regenerated_image_1791949718649.jpg',
  aboutSnippet: 'Himal Pahad Tarai Traders Pvt. Ltd. facilitates small and domestic scale manufacturing enterprises throughout Nepal with robust machinery, essential raw materials, and practical operational training.',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  updatedAt: new Date().toISOString(),
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-slipper',
    name: 'Slipper/Chappal Making Machines',
    slug: 'slipper-chappal-making-machines',
    description: 'Manual, semi-automatic, and hydraulic press machinery for cutting EVA/rubber slipper soles, strap inserting, and finishing.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    order: 1,
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'cat-agarbatti',
    name: 'Agarbatti/Incense Making Machines',
    slug: 'agarbatti-incense-making-machines',
    description: 'High-efficiency automatic and pedal-operated machines for bamboo-stick incense coating, fragrance dipping, and drying.',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    order: 2,
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'cat-paper-plate',
    name: 'Paper Plate Making Machines',
    slug: 'paper-plate-making-machines',
    description: 'Single-die and double-die hydraulic & mechanical machines for disposable paper plates, thali, and snack trays.',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    order: 3,
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'cat-dona-tapari',
    name: 'Dona–Tapari Making Machines',
    slug: 'dona-tapari-making-machines',
    description: 'Traditional Sal leaf and paper dona–tapari pressing and forming machines suitable for Nepali cultural ceremonies and food stalls.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    order: 4,
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'cat-soap-detergent',
    name: 'Soap/Detergent Making Machines',
    slug: 'soap-detergent-making-machines',
    description: 'Mixers, plodders, soap cutters, and detergent pulverizer equipment for cottage-level laundry soap and washing powder manufacturing.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    order: 5,
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'cat-packaging-sealers',
    name: 'Packaging & Continuous Band Sealers',
    slug: 'packaging-and-continuous-band-sealers',
    description: 'Horizontal and vertical continuous band sealing machines with temperature controllers and optional batch coding units.',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    order: 6,
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'cat-other-machinery',
    name: 'Other Industrial Machinery',
    slug: 'other-machinery',
    description: 'Supporting agro-processing machinery, grinders, dies, raw material extruders, and spare parts.',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    order: 7,
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-slipper-hydraulic',
    name: 'Hydraulic Slipper / Chappal Sole Cutting Machine',
    slug: 'hydraulic-slipper-chappal-sole-cutting-machine',
    categoryId: 'cat-slipper',
    shortDescription: 'Heavy-duty hydraulic press for precision cutting of EVA and rubber sheets into standard slipper soles.',
    detailedDescription: 'Engineered for cottage and domestic manufacturers, this hydraulic sole cutter provides clean cuts across varied thickness EVA sheets. Designed with safety guards, double pressure hydraulic cylinder, and compatibility with standard multi-size steel dies for gents, ladies, and kids footwear.',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Hydraulic slipper sole cutting machine in workshop',
      'Hydraulic press setup for footwear production'
    ],
    imageSourceNotice: 'Reference image—actual model may vary',
    specifications: [
      { label: 'Operation Type', value: 'Hydraulic / Semi-Automatic' },
      { label: 'Power Source', value: 'Single Phase / 3 Phase (configurable on order)' },
      { label: 'Compatible Dies', value: 'Footwear standard cutting dies' },
      { label: 'Country of Origin', value: 'Inquire on quotation' }
    ],
    price: 'Request price',
    priceType: 'request_price',
    currency: 'NPR',
    availability: 'available_on_order',
    featured: true,
    seoTitle: 'Hydraulic Slipper Cutting Machine Nepal | Himal Pahad Tarai Traders',
    seoDescription: 'Enquire for hydraulic footwear and chappal cutting machinery in Mahottari and Bardibas, Nepal.',
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'prod-agarbatti-auto',
    name: 'Automatic Agarbatti / Incense Stick Making Machine',
    slug: 'automatic-agarbatti-incense-making-machine',
    categoryId: 'cat-agarbatti',
    shortDescription: 'High-speed incense stick coating machine with automated bamboo feeder and speed controller.',
    detailedDescription: 'Compact automatic machine designed for small workshops and self-employment projects. Features an adjustable paste hopper, precise bamboo stick feed mechanism, and steady production flow. Suitable for standard round bamboo sticks and charcoal or sawdust incense premixes.',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Incense stick making production workshop'
    ],
    imageSourceNotice: 'Reference image—actual model may vary',
    specifications: [
      { label: 'Feeder Type', value: 'Automatic stick feeding' },
      { label: 'Stick Length Compatibility', value: '8 inch, 9 inch, 10 inch' },
      { label: 'Motor Power', value: '1 HP / Single Phase electric' },
      { label: 'Enquiry Requirements', value: 'Contact for current lead time & quotation' }
    ],
    price: 'Request price',
    priceType: 'request_price',
    currency: 'NPR',
    availability: 'available_on_order',
    featured: true,
    seoTitle: 'Automatic Agarbatti Making Machine Nepal | HPT Traders',
    seoDescription: 'High-efficiency incense stick machinery and bamboo stick processing equipment in Nepal.',
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'prod-paper-plate-double-die',
    name: 'Automatic Double-Die Hydraulic Paper Plate Machine',
    slug: 'automatic-double-die-hydraulic-paper-plate-machine',
    categoryId: 'cat-paper-plate',
    shortDescription: 'Double-station hydraulic paper plate and thali forming unit with thermal temperature control.',
    detailedDescription: 'Allows two workers or automated roll feeds to operate simultaneously. Accommodates changeable dies from 4-inch snack bowls up to 14-inch buffet plates. Built with rigid steel body, heating elements, and hydraulic pressure control.',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Paper plate pressing machine workstation'
    ],
    imageSourceNotice: 'Reference image—actual model may vary',
    specifications: [
      { label: 'Die Stations', value: 'Double Die' },
      { label: 'Paper Weight (GSM)', value: '80 GSM to 350 GSM' },
      { label: 'Die Sizes', value: '4 inch to 14 inch interchangeable' },
      { label: 'Heating Elements', value: 'Digital thermal control included' }
    ],
    price: 'Request price',
    priceType: 'request_price',
    currency: 'NPR',
    availability: 'available_on_order',
    featured: true,
    seoTitle: 'Double Die Paper Plate Machine Nepal | Mahottari Traders',
    seoDescription: 'Hydraulic and mechanical paper plate making equipment for domestic manufacturers in Nepal.',
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'prod-dona-tapari-press',
    name: 'Hydraulic Sal Leaf Dona–Tapari Forming Press',
    slug: 'hydraulic-sal-leaf-dona-tapari-forming-press',
    categoryId: 'cat-dona-tapari',
    shortDescription: 'Specialized thermal-hydraulic press for stitching and pressing natural Sal leaf and coated paper dona–tapari.',
    detailedDescription: 'Traditional leaf dona–tapari items are widely used in Nepali religious, wedding, and festive events. This machine provides the calibrated heat and pressing cycle necessary to mold stitched natural Sal leaves into sturdy, biodegradable dining bowls and plates.',
    images: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Leaf and eco plate pressing hydraulic station'
    ],
    imageSourceNotice: 'Reference image—actual model may vary',
    specifications: [
      { label: 'Material', value: 'Natural Sal Leaves / Laminated Paper' },
      { label: 'Operating Mechanism', value: 'Thermal press with hydraulic cylinder' },
      { label: 'Electrical Requirement', value: 'Single phase 220V' },
      { label: 'Application', value: 'Dona, Tapari, Eco-friendly bowls' }
    ],
    price: 'Request price',
    priceType: 'request_price',
    currency: 'NPR',
    availability: 'available_on_order',
    featured: true,
    seoTitle: 'Sal Leaf Dona Tapari Machine Nepal | Himal Pahad Tarai',
    seoDescription: 'Eco-friendly biodegradable Sal leaf and paper dona tapari machine sales in Mahottari & Bardibas.',
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'prod-continuous-band-sealer',
    name: 'Continuous Band Sealer with Date Coder',
    slug: 'continuous-band-sealer-with-date-coder',
    categoryId: 'cat-packaging-sealers',
    shortDescription: 'Industrial horizontal band sealing machine for pouch, plastic bag, and packaging closure.',
    detailedDescription: 'Continuous belt sealing machine suitable for sealing plastic bags, aluminum foil pouches, and laminated bags containing snack foods, pulses, detergent, or agarbatti. Features variable conveyor speed, stepless temperature regulation, and embossing / coding wheel for batch numbers and dates.',
    images: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Continuous band sealing equipment'
    ],
    imageSourceNotice: 'Reference image—actual model may vary',
    specifications: [
      { label: 'Sealing Speed', value: '0 - 12 meters/min adjustable' },
      { label: 'Sealing Width', value: '6 - 12 mm' },
      { label: 'Temperature Range', value: '0 - 300°C' },
      { label: 'Pouch Compatibility', value: 'PP, PE, Laminated Foil, Paper' }
    ],
    price: 'Request price',
    priceType: 'request_price',
    currency: 'NPR',
    availability: 'in_stock',
    featured: false,
    seoTitle: 'Continuous Band Sealer Machine Nepal | Packaging Equipment',
    seoDescription: 'High quality continuous band sealer with embossing wheel for cottage packaging in Nepal.',
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'prod-detergent-mixer',
    name: 'Detergent Powder Ribbon Blender & Mixer',
    slug: 'detergent-powder-ribbon-blender-mixer',
    categoryId: 'cat-soap-detergent',
    shortDescription: 'Rotary ribbon batch mixer for uniform blending of soda ash, acid slurry, and detergent additives.',
    detailedDescription: 'Designed for domestic and small-scale soap and detergent manufacturers. Ensures thorough, homogenous mixing of dry powder compounds, perfumes, and active surfactants without lumping. Sturdy mild steel or stainless contact parts upon request.',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Industrial powder batch mixer machine'
    ],
    imageSourceNotice: 'Reference image—actual model may vary',
    specifications: [
      { label: 'Batch Capacity', value: 'Inquire for 50kg, 100kg, 200kg models' },
      { label: 'Blender Type', value: 'Double ribbon helical agitator' },
      { label: 'Application', value: 'Washing powder, chemical salts, detergent' },
      { label: 'Motor Rating', value: 'Inquire with batch specifications' }
    ],
    price: 'Request price',
    priceType: 'request_price',
    currency: 'NPR',
    availability: 'available_on_order',
    featured: false,
    seoTitle: 'Detergent Powder Mixer Machine Nepal | HPT Traders',
    seoDescription: 'Cottage industry detergent mixer and soap making machines in Mahottari, Nepal.',
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  }
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Small & Domestic Industry Machinery in Nepal',
    description: 'Empowering local entrepreneurs with reliable slipper making, agarbatti, paper plate, and packaging machinery backed by technical training.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'Explore Machinery Catalogue',
    buttonLink: '/machines',
    order: 1,
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'slide-2',
    title: 'Complete Raw Material Supply & Guidance',
    description: 'From EVA sheets and incense premixes to paper rolls and packaging pouches, connect with us for steady raw material supply.',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'Raw Materials & Training',
    buttonLink: '/raw-materials-and-training',
    order: 2,
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    id: 'slide-3',
    title: 'Direct Quotation & Consultation via WhatsApp',
    description: 'Speak with our technical and sales team in Mahottari and Bardibas for transparent pricing, setup feasibility, and order fulfillment.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
    buttonText: 'Enquire on WhatsApp',
    buttonLink: '/contact',
    order: 3,
    status: 'published',
    createdAt: '2026-10-10T00:00:00.000Z',
    updatedAt: '2026-10-10T00:00:00.000Z',
  }
];

export const INITIAL_PAGES: PageContent[] = [
  {
    slug: 'about',
    title: 'About Himal Pahad Tarai Traders Pvt. Ltd.',
    summary: 'Dedicated supplier of small scale industrial machinery, raw materials, and enterprise training located in Mahottari, Nepal.',
    body: `### Welcome to Himal Pahad Tarai Traders Pvt. Ltd.

Himal Pahad Tarai Traders Pvt. Ltd. is a registered Nepali trading enterprise headquartered at Mahottari Rural Municipality–5, Mahottari, with our active branch facility located in Bardibas, Mahottari.

#### Our Mission
Our core focus is to support self-employment, small-scale enterprises, and cottage industries throughout the Terai, Hills, and Mountain regions of Nepal. We bridge the gap between machine procurement, continuous raw material supply, and fundamental technical knowledge.

#### What We Provide
1. **Machinery Sourcing & Supply**: Slipper/chappal presses, incense stick makers, hydraulic paper plate machines, Sal leaf dona-tapari units, soap blenders, and continuous heat sealers.
2. **Raw Material Linkage**: Helping businesses secure consistent rolls, sheets, powders, and chemicals.
3. **Operational Training & Guidance**: Hands-on operational orientation, die maintenance tips, and practical setup instruction for local startup owners.

We maintain a transparent, enquiry-based business model. We do not make exaggerated delivery claims or fabricate unverified specifications. We encourage customers to visit our Mahottari/Bardibas locations or contact us directly via WhatsApp or phone for verifiable details.`,
    seoTitle: 'About Us | Himal Pahad Tarai Traders Pvt. Ltd. Nepal',
    seoDescription: 'Learn about Himal Pahad Tarai Traders Pvt. Ltd., machinery supplier in Mahottari and Bardibas, Nepal.',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    slug: 'raw-materials-and-training',
    title: 'Raw Materials & Technical Training Information',
    summary: 'Practical details on raw material supply lines and technical orientation for small domestic industries in Nepal.',
    body: `### Raw Material Supply & Startup Training

Starting a cottage or domestic production unit requires more than just machines—it demands dependable access to raw materials and clear operating knowledge.

#### 1. Footwear & Slipper Raw Materials
- **EVA and Rubber Foam Sheets**: Available in varying shore hardnesses, thicknesses (8mm, 10mm, 12mm, 14mm), and diverse colour combinations.
- **PVC & Rubber Straps (Fita)**: Standard sizes for men, women, and children.
- **Strap Inserting Glue & Finishing Tools**: Screen printing inks, strap fitting rods, and edge grinding belts.

#### 2. Agarbatti (Incense) Raw Materials
- **Bamboo Sticks**: Machine-cut round sticks in 8, 9, and 10 inch specifications.
- **Premix Powder**: Sawdust, charcoal powder, and binder compounds (Joss powder / T1 powder).
- **Fragrance Compounds & DEP Oil**: Dipping aromatic perfumes and solvent oils.

#### 3. Paper Plate & Dona–Tapari Materials
- **PE-Coated Paper Rolls & Circles**: 80 GSM to 350 GSM laminated paper reels.
- **Sal Leaves**: Sourcing linkages for sun-dried stitched Sal leaf discs for cultural dona–tapari presses.

#### 4. Technical Training & Hands-On Setup
When you invest in machinery through Himal Pahad Tarai Traders Pvt. Ltd.:
- We demonstrate die installation, hydraulic pressure calibration, and electric heating controls.
- We explain basic maintenance routines: oil lubrication, heating coil replacement, and blade sharpening.
- We outline safe operating protocols to prevent injuries.

*Note: For specific batch quotes, lead times, or training schedules, please submit an enquiry form or message us directly on WhatsApp.*`,
    seoTitle: 'Raw Materials & Training | Himal Pahad Tarai Traders Nepal',
    seoDescription: 'Raw material procurement and machine operation training in Mahottari, Nepal.',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    summary: 'How Himal Pahad Tarai Traders Pvt. Ltd. handles and protects customer enquiry information.',
    body: `### Privacy Policy

*Last updated: October 2026*

Himal Pahad Tarai Traders Pvt. Ltd. respects your privacy and is committed to protecting your personal information.

#### 1. Information We Collect
When you submit an enquiry form on our website, we collect:
- Your Name
- Your Contact Phone Number
- Your Email Address (optional)
- Your Location/Municipality (optional)
- Machine of Interest and your specific requirement message

#### 2. How We Use Your Information
We use your provided information solely to:
- Respond to your quotation requests.
- Provide technical specifications and pricing updates.
- Coordinate delivery, inspection, or training discussions via Phone or WhatsApp.

#### 3. Protection & Retention
- Your enquiry details are stored securely in our private administrative system and are accessible only to authorized staff.
- We never sell, rent, or lease your contact information to any external marketing agencies.
- You may request deletion or updates to your enquiry record at any time by contacting us at **nishahpt@gmail.com** or **+977 9861730194**.`,
    seoTitle: 'Privacy Policy | Himal Pahad Tarai Traders Pvt. Ltd.',
    seoDescription: 'Privacy policy and customer data handling principles for Himal Pahad Tarai Traders Pvt. Ltd.',
    updatedAt: '2026-10-10T00:00:00.000Z',
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    summary: 'Standard terms of service and quotation guidelines for Himal Pahad Tarai Traders Pvt. Ltd.',
    body: `### Terms & Conditions

*Last updated: October 2026*

Please review the following terms regarding the use of this website and our quotation process:

#### 1. Enquiry-Based Sales Model
- This website serves as an informational catalogue and enquiry generation platform.
- We do not conduct automated financial transactions or online checkouts on this site.
- Submission of an enquiry does not constitute a legally binding sales contract until confirmed by written quotation or official invoice.

#### 2. Pricing and Availability
- Machinery prices and raw material market rates fluctuate based on import tariffs, transportation, and raw material indices.
- Items designated as "Request price" require direct contact with our sales desk. Written quotations are valid for the duration specified on the official quote.
- Machinery availability is subject to stock at our Bardibas/Mahottari warehouse or factory order fulfillment lead times.

#### 3. Physical Inspection
- We encourage customers to inspect machinery in person or request detailed video demonstrations prior to final order confirmation and dispatch.`,
    seoTitle: 'Terms & Conditions | Himal Pahad Tarai Traders Pvt. Ltd.',
    seoDescription: 'Terms of service and quotation guidelines for Himal Pahad Tarai Traders Pvt. Ltd., Nepal.',
    updatedAt: '2026-10-10T00:00:00.000Z',
  }
];
