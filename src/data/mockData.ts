import { Product, SupplierSyncInfo, TeamMember, Assessment, QuotePackage } from '../types';

export const MOCK_SUPPLIERS: SupplierSyncInfo[] = [
  {
    id: 'sup-1',
    name: 'Officeworks',
    type: 'Mass Retail & Big Chains',
    productCount: 48,
    status: 'Synchronised',
    lastSyncAEST: 'Today at 09:14 AEST',
    location: 'National Distribution Centres',
    avgDispatchDays: 1,
  },
  {
    id: 'sup-2',
    name: 'Harvey Norman Commercial',
    type: 'Mass Retail & Big Chains',
    productCount: 36,
    status: 'Synchronised',
    lastSyncAEST: 'Today at 08:45 AEST',
    location: 'Sydney & Melbourne Hubs',
    avgDispatchDays: 2,
  },
  {
    id: 'sup-3',
    name: 'Bunnings Trade',
    type: 'Mass Retail & Big Chains',
    productCount: 22,
    status: 'Synchronised',
    lastSyncAEST: 'Today at 10:02 AEST',
    location: 'State Logistics Hubs',
    avgDispatchDays: 2,
  },
  {
    id: 'sup-4',
    name: 'Ergonomic Office',
    type: 'Specialised Ergonomic Stores',
    productCount: 64,
    status: 'Synchronised',
    lastSyncAEST: 'Today at 11:20 AEST',
    location: 'Alexandria NSW & Richmond VIC',
    avgDispatchDays: 1,
  },
  {
    id: 'sup-5',
    name: 'Backcare & Seating',
    type: 'Specialised Ergonomic Stores',
    productCount: 52,
    status: 'Synchronised',
    lastSyncAEST: 'Today at 07:30 AEST',
    location: 'Melbourne, Brisbane, Adelaide',
    avgDispatchDays: 2,
  },
  {
    id: 'sup-6',
    name: 'Bad Backs',
    type: 'Specialised Ergonomic Stores',
    productCount: 41,
    status: 'Synchronised',
    lastSyncAEST: 'Today at 09:50 AEST',
    location: 'Sydney & Perth Facilities',
    avgDispatchDays: 1,
  },
  {
    id: 'sup-7',
    name: 'Zenith Ergonomics',
    type: 'Specialised Ergonomic Stores',
    productCount: 29,
    status: 'Synchronised',
    lastSyncAEST: 'Today at 10:40 AEST',
    location: 'National Commercial Showrooms',
    avgDispatchDays: 3,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-chair-pro',
    name: 'ErgoFlex Pro Task Chair',
    category: 'Ergonomic Seating',
    manufacturer: 'AeroErgo Australia',
    supplier: 'Ergonomic Office',
    priceAUD: 685,
    stockStatus: 'In Stock',
    dispatchDays: 1,
    warrantyYears: 10,
    adjustabilityScore: 9.6,
    commercialGrade: true,
    image: '/images/chair.jpg',
    description: 'Commercial-grade ergonomic task chair with synchronised mechanism, independent seat slide, multi-directional 3D armrests, and dynamic lumbar support. AFRDI Level 6 certified for 24/7 commercial use.',
    features: [
      'Synchronised tilt with 4 lockable positions',
      'Seat depth slider (50mm adjustment range)',
      'Height-adjustable lumbar support cushion',
      'Breathable elastomer mesh back with high-density moulded foam seat',
      'AFRDI Level 6 Rated to 150kg worker capacity'
    ],
    compatibleRestrictions: [
      'Sitting tolerance < 45 mins',
      'Avoid Sustained Static Postures',
      'Avoid Prolonged Forward Flexion',
      'Frequent Position Changes Required'
    ],
    specs: {
      'Seat Height Range': '450mm - 570mm',
      'Seat Width': '510mm',
      'Seat Depth': '470mm - 520mm',
      'Backrest Height': '580mm',
      'Weight Rating': '150 kg',
      'Warranty': '10 Years Commercial'
    }
  },
  {
    id: 'prod-chair-value',
    name: 'Horizon Ergonomic Task Chair',
    category: 'Ergonomic Seating',
    manufacturer: 'WorkWell Ergonomics',
    supplier: 'Officeworks',
    priceAUD: 395,
    stockStatus: 'In Stock',
    dispatchDays: 1,
    warrantyYears: 5,
    adjustabilityScore: 8.2,
    commercialGrade: true,
    image: '/images/chair.jpg',
    description: 'Reliable three-lever ergonomic office chair featuring independent seat and back tilt adjustment, gas-lift height regulation, and contoured lumbar contouring.',
    features: [
      '3-lever independent mechanism for custom tilt',
      'Adjustable armrests with soft PU pads',
      'High-resilience moulded dual-density foam',
      'AFRDI Level 5 commercial durability certification'
    ],
    compatibleRestrictions: [
      'Sitting tolerance < 45 mins',
      'Frequent Position Changes Required',
      'Micro-Breaks Required'
    ],
    specs: {
      'Seat Height Range': '440mm - 560mm',
      'Seat Width': '490mm',
      'Backrest Height': '530mm',
      'Weight Rating': '135 kg',
      'Warranty': '5 Years'
    }
  },
  {
    id: 'prod-desk-align',
    name: 'Align Commercial Sit-Stand Desk (1500 x 750mm)',
    category: 'Height-Adjustable Desks',
    manufacturer: 'ModuDesk Commercial',
    supplier: 'Harvey Norman Commercial',
    priceAUD: 890,
    stockStatus: 'Priority Dispatch',
    dispatchDays: 2,
    warrantyYears: 10,
    adjustabilityScore: 9.8,
    commercialGrade: true,
    image: '/images/desk.jpg',
    description: 'High-performance dual-motor electric sit-stand workstation with whisper-quiet drive, digital LED keypad with 4 memory presets, collision avoidance sensor, and heavy-gauge steel C-frame.',
    features: [
      'Dual German-engineered precision electric motors (<45dB)',
      'Digital LED height readout with 4 programmable presets',
      'Anti-collision gyroscopic safety cut-off system',
      'Integrated under-desk wire management basket',
      'Heavy-duty 140kg dynamic lifting capacity'
    ],
    compatibleRestrictions: [
      'Sitting tolerance < 30 mins',
      'Standing tolerance < 20 mins',
      'Avoid Sustained Static Postures',
      'Frequent Position Changes Required'
    ],
    specs: {
      'Height Range': '620mm - 1270mm (BIFMA standard)',
      'Top Dimensions': '1500mm x 750mm x 25mm E0 melamine',
      'Speed': '38mm / second',
      'Lifting Capacity': '140 kg dynamic load',
      'Warranty': '10 Years Frame & Motors'
    }
  },
  {
    id: 'prod-desk-rapid',
    name: 'SwiftRise Dual Motor Desk (1400 x 700mm)',
    category: 'Height-Adjustable Desks',
    manufacturer: 'ErgoMotion AU',
    supplier: 'Officeworks',
    priceAUD: 620,
    stockStatus: 'Ready to Ship',
    dispatchDays: 1,
    warrantyYears: 5,
    adjustabilityScore: 8.8,
    commercialGrade: true,
    image: '/images/desk.jpg',
    description: 'Fast-dispatch motorized sit-to-stand desk designed for rapid rehabilitation return-to-work deployments. Features memory touch pad and durable scratch-resistant edge banding.',
    features: [
      'Dual electric lift columns with soft start/stop',
      'Touchscreen controller with 3 height presets',
      'Rapid same-day dispatch from metropolitan hubs',
      'Pre-drilled cable grommets'
    ],
    compatibleRestrictions: [
      'Sitting tolerance < 30 mins',
      'Avoid Sustained Static Postures',
      'Frequent Position Changes Required'
    ],
    specs: {
      'Height Range': '660mm - 1200mm',
      'Top Dimensions': '1400mm x 700mm',
      'Lifting Capacity': '100 kg',
      'Warranty': '5 Years'
    }
  },
  {
    id: 'prod-arm-dual',
    name: 'Precision Dual Articulating Monitor Arm',
    category: 'Monitor Arms',
    manufacturer: 'VisionMount Pro',
    supplier: 'Backcare & Seating',
    priceAUD: 265,
    stockStatus: 'In Stock',
    dispatchDays: 1,
    warrantyYears: 10,
    adjustabilityScore: 9.4,
    commercialGrade: true,
    image: '/images/monitor-arm.jpg',
    description: 'Commercial grade gas-strut dual monitor arm with full 360-degree rotation, tilt, and height articulation to eliminate neck flexion and promote neutral cervical spine alignment.',
    features: [
      'Smooth fingertip gas-spring counterbalance adjustment',
      'Independent height, tilt (+90°/-45°), and swivel (360°)',
      'Integrated internal cable containment channels',
      'Universal desk clamp and grommet mounting included',
      'VESA 75x75 and 100x100 compatible'
    ],
    compatibleRestrictions: [
      'Avoid Prolonged Forward Flexion',
      'Avoid Sustained Static Postures',
      'No Overhead Reaching'
    ],
    specs: {
      'Screen Size Support': 'Up to 32 inches per screen',
      'Weight Capacity': '2kg - 9kg per arm',
      'Height Adjustment Range': '340mm vertical travel',
      'Warranty': '10 Years'
    }
  },
  {
    id: 'prod-arm-single',
    name: 'Glide Single Monitor Arm',
    category: 'Monitor Arms',
    manufacturer: 'VisionMount Pro',
    supplier: 'Officeworks',
    priceAUD: 145,
    stockStatus: 'In Stock',
    dispatchDays: 1,
    warrantyYears: 5,
    adjustabilityScore: 8.5,
    commercialGrade: true,
    image: '/images/monitor-arm.jpg',
    description: 'Single-screen gas-assisted monitor mount engineered to align focal distance and eliminate forward head posture during desktop computer tasks.',
    features: [
      'Gas counterbalance with tension gauge',
      'Quick-release VESA plate',
      'Full tilt and horizontal rotation',
      'Supports screens up to 34" ultrawide'
    ],
    compatibleRestrictions: [
      'Avoid Prolonged Forward Flexion',
      'Avoid Sustained Static Postures'
    ],
    specs: {
      'Screen Capacity': 'Up to 34 inches',
      'Weight Range': '1.5kg - 8kg',
      'Warranty': '5 Years'
    }
  },
  {
    id: 'prod-keyboard-contour',
    name: 'Contour Ergonomic Wave Keyboard',
    category: 'Keyboard & Mouse',
    manufacturer: 'NeuroErgo Labs',
    supplier: 'Bad Backs',
    priceAUD: 175,
    stockStatus: 'In Stock',
    dispatchDays: 1,
    warrantyYears: 3,
    adjustabilityScore: 9.2,
    commercialGrade: true,
    image: '/images/chair.jpg', // will render custom SVG illustration
    description: 'Curved split-keyframe ergonomic keyboard with integrated memory foam palm support. Reduces ulnar deviation by 34% and prevents sustained wrist extension.',
    features: [
      'Split wave layout separates typing zones for natural forearm posture',
      'Integrated high-density cushioned wrist rest with reverse-tilt legs',
      'Low-force scissor keys to minimize fingertip impact pressure',
      'Dual wireless Bluetooth & 2.4GHz USB dongle connectivity'
    ],
    compatibleRestrictions: [
      'Avoid Sustained Wrist Extension',
      'Avoid Sustained Wrist Flexion',
      'Avoid Repetitive Wrist Deviation',
      'Avoid Forceful Wrist Movements'
    ],
    specs: {
      'Key Travel': '1.8mm low-impact',
      'Reverse Tilt Angle': '-4° and -7° option',
      'Connectivity': 'Bluetooth 5.1 / 2.4G',
      'Warranty': '3 Years Commercial'
    }
  },
  {
    id: 'prod-mouse-vertical',
    name: 'AeroPosture Vertical Wireless Mouse',
    category: 'Keyboard & Mouse',
    manufacturer: 'NeuroErgo Labs',
    supplier: 'Bad Backs',
    priceAUD: 135,
    stockStatus: 'In Stock',
    dispatchDays: 1,
    warrantyYears: 3,
    adjustabilityScore: 9.5,
    commercialGrade: true,
    image: '/images/chair.jpg',
    description: 'Scientifically validated 57-degree vertical handshake orientation mouse. Eliminates forearm pronation, relieves carpal tunnel compression, and accommodates reduced grip force.',
    features: [
      '57-degree natural handshake posture angle',
      'Ultra-light touch micro-switches requiring minimal actuation force',
      'Sculpted thumb cradle with low-friction glide pads',
      'Adjustable DPI sensor (800-2400) to minimize repetitive hand excursion'
    ],
    compatibleRestrictions: [
      'Avoid Repetitive Pronation',
      'Avoid Repetitive Supination',
      'Avoid Forceful Wrist Movements',
      'Limited Repetitive Gripping',
      'Grip Strength Moderately Reduced'
    ],
    specs: {
      'Angle': '57° vertical handshake',
      'Sensor': 'High-precision optical',
      'Weight': '115g balanced',
      'Warranty': '3 Years'
    }
  },
  {
    id: 'prod-footrest-multi',
    name: 'ActiveRelief Adjustable Ergonomic Footrest',
    category: 'Footrests',
    manufacturer: 'BioPosture Systems',
    supplier: 'Zenith Ergonomics',
    priceAUD: 110,
    stockStatus: 'In Stock',
    dispatchDays: 2,
    warrantyYears: 5,
    adjustabilityScore: 8.9,
    commercialGrade: true,
    image: '/images/chair.jpg',
    description: 'Heavy-duty steel-base foot support platform with foot-actuated tilt mechanism (0° to 35°) to promote active ankle dorsiflexion and relieve lower lumbar disc compression.',
    features: [
      'Foot-controlled dynamic tilt angle adjustment',
      'Textured rubberized massage surface for plantar stimulation',
      'Non-slip rubber feet securely lock position on carpet or hard floors',
      'Assists shorter stature workers to maintain 90° knee angle'
    ],
    compatibleRestrictions: [
      'Avoid Sustained Static Postures',
      'Sitting tolerance < 30 mins',
      'Avoid Repetitive Bending'
    ],
    specs: {
      'Platform Size': '450mm x 350mm',
      'Tilt Range': '0° to 35° floating',
      'Warranty': '5 Years'
    }
  },
  {
    id: 'prod-mat-anti-fatigue',
    name: 'OrthoSupport High-Density Anti-Fatigue Mat',
    category: 'Standing Support',
    manufacturer: 'MatTech Industrial',
    supplier: 'Bunnings Trade',
    priceAUD: 140,
    stockStatus: 'In Stock',
    dispatchDays: 2,
    warrantyYears: 5,
    adjustabilityScore: 8.7,
    commercialGrade: true,
    image: '/images/chair.jpg',
    description: 'Commercial anti-fatigue mat with 19mm high-density polyurethane core and beveled anti-trip ramp borders. Encourages subtle muscle micro-contractions to relieve joint fatigue.',
    features: [
      '19mm energy-return polyurethane foam core',
      'Beveled zero-trip transition edge profile',
      'Slip-resistant textured surface meeting AS/NZS 4586 standards',
      'Easy wipe-clean sanitisation surface'
    ],
    compatibleRestrictions: [
      'Standing tolerance < 20 mins',
      'Avoid Sustained Static Postures',
      'Limited Walking'
    ],
    specs: {
      'Dimensions': '900mm x 600mm x 19mm',
      'Material': '100% Solid High-Density Polyurethane',
      'Warranty': '5 Years'
    }
  },
  {
    id: 'prod-lift-aid',
    name: 'Compact Electric Ergonomic Lift Trolley',
    category: 'Lifting Aids',
    manufacturer: 'AeroLift Industrial',
    supplier: 'Bunnings Trade',
    priceAUD: 1250,
    stockStatus: 'Ready to Ship',
    dispatchDays: 3,
    warrantyYears: 3,
    adjustabilityScore: 9.3,
    commercialGrade: true,
    image: '/images/chair.jpg',
    description: 'Mobile battery-powered lift platform engineered to transfer boxes and parcels between 150mm and 1100mm height, eliminating manual spinal flexion and heavy lifting.',
    features: [
      'Electric screw-drive lifter powered by rechargeable 24V battery pack',
      'Emergency stop button and overload safety trip clutch',
      'Smooth non-marking polyurethane swivel casters with total brake',
      'Eliminates manual lifting above worker occasional limit'
    ],
    compatibleRestrictions: [
      'Occasional Lifting < 10kg',
      'Frequent Lifting < 5kg',
      'Avoid Repetitive Bending',
      'Avoid Sustained Static Postures'
    ],
    specs: {
      'Safe Working Load': '80 kg',
      'Platform Dimensions': '600mm x 450mm',
      'Lift Height Travel': '150mm to 1100mm',
      'Warranty': '3 Years Commercial'
    }
  }
];

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'ass-1042',
    reference: 'RE-2026-1042',
    consultant: 'Sarah Mitchell',
    organisation: 'Horizon Rehabilitation Group',
    workerReference: 'WRK-0084',
    assessmentDate: '2026-10-22',
    workRole: 'Administrative',
    workEnvironment: 'Office',
    equipmentCategories: [
      'Ergonomic Seating',
      'Height-Adjustable Desks',
      'Monitor Arms',
      'Keyboard & Mouse'
    ],
    materialHandling: {
      occasionalLiftingKg: 10,
      frequentLiftingKg: 5,
      occasionalCarryingKg: 8,
      frequentCarryingKg: 4,
      pushForceN: 50,
      pullForceN: 40
    },
    posturalTolerances: {
      sittingMinutes: 30,
      standingMinutes: 15,
      restrictions: [
        'Avoid Sustained Static Postures',
        'Avoid Prolonged Forward Flexion',
        'Frequent Position Changes Required',
        'Micro-Breaks Required'
      ]
    },
    upperLimbConstraints: {
      constraints: [
        'Avoid Repetitive Pronation',
        'Avoid Sustained Wrist Extension',
        'Avoid Repetitive Wrist Deviation',
        'Limited Repetitive Gripping'
      ],
      gripStrength: 'Moderately Reduced',
      additionalNotes: 'Worker experiences cervical radicular symptoms exacerbated by forward head carriage and mouse reach beyond 350mm.'
    },
    status: 'Quotes Generated',
    createdAt: '2026-10-22T09:30:00+11:00'
  },
  {
    id: 'ass-1041',
    reference: 'RE-2026-1041',
    consultant: 'Sarah Mitchell',
    organisation: 'Horizon Rehabilitation Group',
    workerReference: 'WRK-0079',
    assessmentDate: '2026-10-20',
    workRole: 'Healthcare',
    workEnvironment: 'Clinical Environment',
    equipmentCategories: [
      'Ergonomic Seating',
      'Standing Support',
      'Footrests'
    ],
    materialHandling: {
      occasionalLiftingKg: 8,
      frequentLiftingKg: 3,
      occasionalCarryingKg: 6,
      frequentCarryingKg: 3,
      pushForceN: 45,
      pullForceN: 35
    },
    posturalTolerances: {
      sittingMinutes: 25,
      standingMinutes: 20,
      restrictions: [
        'No Squatting',
        'No Kneeling',
        'Avoid Repetitive Bending',
        'Frequent Position Changes Required'
      ]
    },
    upperLimbConstraints: {
      constraints: ['Avoid Sustained Pinch Grip'],
      gripStrength: 'Mildly Reduced',
      additionalNotes: 'Post-lumbar decompression rehabilitation. Needs dynamic sit-to-stand transitions.'
    },
    status: 'Report Exported',
    createdAt: '2026-10-20T14:15:00+11:00'
  },
  {
    id: 'ass-1040',
    reference: 'RE-2026-1040',
    consultant: 'Sarah Mitchell',
    organisation: 'Horizon Rehabilitation Group',
    workerReference: 'WRK-0072',
    assessmentDate: '2026-10-18',
    workRole: 'Warehouse',
    workEnvironment: 'Warehouse',
    equipmentCategories: [
      'Lifting Aids',
      'Standing Support'
    ],
    materialHandling: {
      occasionalLiftingKg: 5,
      frequentLiftingKg: 2,
      occasionalCarryingKg: 5,
      frequentCarryingKg: 2,
      pushForceN: 35,
      pullForceN: 30
    },
    posturalTolerances: {
      sittingMinutes: 45,
      standingMinutes: 15,
      restrictions: [
        'No Overhead Reaching',
        'Avoid Repetitive Bending',
        'Limited Walking'
      ]
    },
    upperLimbConstraints: {
      constraints: ['Limited Repetitive Gripping', 'Avoid Forceful Wrist Movements'],
      gripStrength: 'Severely Reduced',
      additionalNotes: 'Bilateral supraspinatus tear recovery. Requires electric scissor lifter for small parts staging.'
    },
    status: 'Report Exported',
    createdAt: '2026-10-18T11:00:00+11:00'
  },
  {
    id: 'ass-1039',
    reference: 'RE-2026-1039',
    consultant: 'Sarah Mitchell',
    organisation: 'Horizon Rehabilitation Group',
    workerReference: 'WRK-0068',
    assessmentDate: '2026-10-15',
    workRole: 'Manufacturing',
    workEnvironment: 'Industrial Environment',
    equipmentCategories: [
      'Ergonomic Seating',
      'Lifting Aids',
      'Footrests'
    ],
    materialHandling: {
      occasionalLiftingKg: 12,
      frequentLiftingKg: 6,
      occasionalCarryingKg: 10,
      frequentCarryingKg: 5,
      pushForceN: 60,
      pullForceN: 50
    },
    posturalTolerances: {
      sittingMinutes: 35,
      standingMinutes: 20,
      restrictions: [
        'Avoid Sustained Static Postures',
        'Limited Stair Climbing',
        'Frequent Position Changes Required'
      ]
    },
    upperLimbConstraints: {
      constraints: ['Avoid Repetitive Supination'],
      gripStrength: 'Normal'
    },
    status: 'Quotes Generated',
    createdAt: '2026-10-15T16:20:00+11:00'
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'user-1',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@horizonrehab.com.au',
    role: 'Workspace Owner',
    status: 'Active',
    lastActive: 'Just now'
  },
  {
    id: 'user-2',
    name: 'Dr. Lachlan Vance',
    email: 'lachlan.vance@horizonrehab.com.au',
    role: 'Administrator',
    status: 'Active',
    lastActive: '2 hours ago'
  },
  {
    id: 'user-3',
    name: 'Chloe Davenport (OT)',
    email: 'chloe.d@horizonrehab.com.au',
    role: 'Consultant',
    status: 'Active',
    lastActive: 'Yesterday'
  },
  {
    id: 'user-4',
    name: 'Marcus Bell',
    email: 'marcus.bell@horizonrehab.com.au',
    role: 'Viewer',
    status: 'Active',
    lastActive: '3 days ago'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Three Quote Packages Ready',
    message: 'Assessment RE-2026-1043 evaluated against 7 demonstration supplier inventories.',
    timestamp: '2 mins ago',
    read: false,
    type: 'quote' as const
  },
  {
    id: 'notif-2',
    title: 'Audit Report Exported',
    message: 'Insurer-ready PDF for RE-2026-1041 downloaded with icare NSW framework compliance.',
    timestamp: '1 hour ago',
    read: false,
    type: 'report' as const
  },
  {
    id: 'notif-3',
    title: 'Supplier Inventory Synchronised',
    message: 'Demonstration stock records refreshed across Officeworks, Ergonomic Office, and Backcare.',
    timestamp: '3 hours ago',
    read: true,
    type: 'inventory' as const
  },
  {
    id: 'notif-4',
    title: 'Monthly Usage Alert',
    message: 'Workspace has utilised 42 of 250 monthly clinical reports (16.8%).',
    timestamp: 'Yesterday',
    read: true,
    type: 'system' as const
  }
];

// Helper to generate Quote Packages deterministically based on an Assessment
export function generateQuotePackagesForAssessment(assessment: Assessment): QuotePackage[] {
  const sittingRestricted = assessment.posturalTolerances.sittingMinutes <= 35;
  const wristRestricted = assessment.upperLimbConstraints.constraints.length > 0;
  const liftingRestricted = assessment.materialHandling.occasionalLiftingKg <= 10;

  // Tier 1: Value Package
  const valueItems = [
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-chair-value')!,
      quantity: 1,
      itemJustification: `Selected to provide independent 3-lever adjustability accommodating the worker's ${assessment.posturalTolerances.sittingMinutes}-minute sitting tolerance constraint at an economical price point.`
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-desk-rapid')!,
      quantity: 1,
      itemJustification: `Allows electric sit-to-stand transitions to break up sustained static seated postures without exceeding budgetary parameters.`
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-arm-single')!,
      quantity: 1,
      itemJustification: `Corrects screen visual height to prevent forward cervical flexion.`
    }
  ];

  if (wristRestricted) {
    valueItems.push({
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-keyboard-contour')!,
      quantity: 1,
      itemJustification: `Curved keyboard design directly mitigates documented wrist extension and ulnar deviation.`
    });
  }

  const valueSubtotal = valueItems.reduce((sum, item) => sum + item.product.priceAUD * item.quantity, 0);
  const valueDelivery = 65;
  const valueGST = Math.round((valueSubtotal + valueDelivery) * 0.1);
  const valueTotal = valueSubtotal + valueDelivery + valueGST;

  // Tier 2: Rapid Fulfilment
  const rapidItems = [
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-chair-pro')!,
      quantity: 1,
      itemJustification: `Available for immediate 24-hour dispatch from Alexandria NSW hub. Dynamic lumbar supports worker's ${assessment.posturalTolerances.sittingMinutes}-minute tolerance.`
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-desk-rapid')!,
      quantity: 1,
      itemJustification: `In-stock local warehouse inventory enabling immediate return-to-work setup with 1-day turnaround.`
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-arm-dual')!,
      quantity: 1,
      itemJustification: `Instant dispatch dual monitor support allowing multi-screen positioning without neck rotation.`
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-mouse-vertical')!,
      quantity: 1,
      itemJustification: `Immediate availability vertical ergonomic mouse to relieve forearm pronation and wrist tension.`
    }
  ];

  if (liftingRestricted && assessment.workEnvironment === 'Warehouse') {
    rapidItems.push({
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-lift-aid')!,
      quantity: 1,
      itemJustification: `Prioritised for rapid dispatch to prevent handling tasks exceeding documented ${assessment.materialHandling.occasionalLiftingKg}kg limit.`
    });
  }

  const rapidSubtotal = rapidItems.reduce((sum, item) => sum + item.product.priceAUD * item.quantity, 0);
  const rapidDelivery = 95;
  const rapidGST = Math.round((rapidSubtotal + rapidDelivery) * 0.1);
  const rapidTotal = rapidSubtotal + rapidDelivery + rapidGST;

  // Tier 3: Premium Commercial
  const premiumItems = [
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-chair-pro')!,
      quantity: 1,
      itemJustification: `AFRDI Level 6 certified 10-year warranty chair. Synchronised seat slide mechanism directly addresses worker's ${assessment.posturalTolerances.sittingMinutes}m sitting limit by distributing ischial tuberosity pressure.`
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-desk-align')!,
      quantity: 1,
      itemJustification: `Commercial dual-motor sit-stand desk with 10-year warranty, gyroscopic anti-collision, and 4 programmable memory presets to facilitate documented micro-break protocols.`
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-arm-dual')!,
      quantity: 1,
      itemJustification: `Precision gas-strut dual articulating arms maintaining optical focal alignment to eliminate cervical and thoracic spine strain.`
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-keyboard-contour')!,
      quantity: 1,
      itemJustification: `Reduces wrist extension and ulnar deviation by 34%, protecting median and ulnar nerve pathways.`
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-mouse-vertical')!,
      quantity: 1,
      itemJustification: `57-degree neutral handshake posture mouse mitigating pronator teres strain and reducing grip force exertion.`
    },
    {
      product: MOCK_PRODUCTS.find(p => p.id === 'prod-footrest-multi')!,
      quantity: 1,
      itemJustification: `Multi-angle steel footrest promotes active ankle movement and facilitates posterior pelvic tilt relief.`
    }
  ];

  const premiumSubtotal = premiumItems.reduce((sum, item) => sum + item.product.priceAUD * item.quantity, 0);
  const premiumDelivery = 110;
  const premiumGST = Math.round((premiumSubtotal + premiumDelivery) * 0.1);
  const premiumTotal = premiumSubtotal + premiumDelivery + premiumGST;

  return [
    {
      id: `qte-${assessment.reference}-val`,
      assessmentId: assessment.id,
      tier: 'value',
      name: 'Value Package',
      subtitle: 'Cost-Conscious Essential Ergonomics',
      description: 'Carefully curated to meet all essential functional restrictions while maintaining the lowest total procurement cost.',
      items: valueItems,
      subtotal: valueSubtotal,
      delivery: valueDelivery,
      gst: valueGST,
      total: valueTotal,
      generatedAt: '2026-10-23T12:00:00 AEST',
      estimatedDeliveryText: '3 - 5 Business Days',
      warrantyHighlight: '5-Year Manufacturer Warranty',
      supplierCount: 2
    },
    {
      id: `qte-${assessment.reference}-rap`,
      assessmentId: assessment.id,
      tier: 'rapid',
      name: 'Rapid Fulfilment',
      subtitle: 'Immediate Local Stock Priority',
      description: 'Prioritises verified local Australian metropolitan stock availability for urgent return-to-work rehabilitation timelines.',
      items: rapidItems,
      subtotal: rapidSubtotal,
      delivery: rapidDelivery,
      gst: rapidGST,
      total: rapidTotal,
      generatedAt: '2026-10-23T12:00:00 AEST',
      estimatedDeliveryText: '24 - 48 Hours Dispatch',
      warrantyHighlight: '5 to 10-Year Warranty Coverage',
      supplierCount: 3
    },
    {
      id: `qte-${assessment.reference}-prem`,
      assessmentId: assessment.id,
      tier: 'premium',
      name: 'Premium Commercial',
      subtitle: 'Commercial Durability & Maximum Adjustability',
      description: 'Top-tier commercial equipment with 10-year warranties, maximum adjustability ratings, and comprehensive ergonomic support.',
      items: premiumItems,
      subtotal: premiumSubtotal,
      delivery: premiumDelivery,
      gst: premiumGST,
      total: premiumTotal,
      generatedAt: '2026-10-23T12:00:00 AEST',
      estimatedDeliveryText: '2 - 4 Business Days',
      warrantyHighlight: '10-Year Comprehensive Commercial Warranty',
      supplierCount: 4
    }
  ];
}
