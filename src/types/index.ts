export type WorkRole = 
  | 'Administrative' 
  | 'Warehouse' 
  | 'Healthcare' 
  | 'Manufacturing' 
  | 'Retail' 
  | 'Construction' 
  | 'Other';

export type WorkEnvironment = 
  | 'Office' 
  | 'Home Office' 
  | 'Warehouse' 
  | 'Clinical Environment' 
  | 'Retail Environment' 
  | 'Industrial Environment' 
  | 'Other';

export type GripStrengthLevel = 
  | 'Normal' 
  | 'Mildly Reduced' 
  | 'Moderately Reduced' 
  | 'Severely Reduced';

export interface Assessment {
  id: string;
  reference: string;
  consultant: string;
  organisation: string;
  workerReference: string;
  assessmentDate: string;
  workRole: WorkRole;
  workEnvironment: WorkEnvironment;
  equipmentCategories: string[];

  materialHandling: {
    occasionalLiftingKg: number;
    frequentLiftingKg: number;
    occasionalCarryingKg: number;
    frequentCarryingKg: number;
    pushForceN: number;
    pullForceN: number;
  };

  posturalTolerances: {
    sittingMinutes: number;
    standingMinutes: number;
    restrictions: string[];
  };

  upperLimbConstraints: {
    constraints: string[];
    gripStrength: GripStrengthLevel;
    additionalNotes?: string;
  };

  status: 'Draft' | 'Quotes Generated' | 'Report Exported';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  supplier: string;
  priceAUD: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Priority Dispatch' | 'Ready to Ship';
  dispatchDays: number;
  warrantyYears: number;
  adjustabilityScore: number; // 1-10
  commercialGrade: boolean;
  image: string;
  description: string;
  features: string[];
  compatibleRestrictions: string[];
  specs: Record<string, string>;
}

export interface QuotePackageItem {
  product: Product;
  quantity: number;
  itemJustification?: string;
}

export interface QuotePackage {
  id: string;
  assessmentId: string;
  tier: 'value' | 'rapid' | 'premium';
  name: string;
  subtitle: string;
  description: string;
  items: QuotePackageItem[];
  subtotal: number;
  delivery: number;
  gst: number;
  total: number;
  generatedAt: string;
  estimatedDeliveryText: string;
  warrantyHighlight: string;
  supplierCount: number;
}

export interface SupplierSyncInfo {
  id: string;
  name: string;
  type: 'Mass Retail & Big Chains' | 'Specialised Ergonomic Stores';
  productCount: number;
  status: 'Synchronised' | 'Refreshed' | 'Simulated Feed';
  lastSyncAEST: string;
  location: string;
  avgDispatchDays: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Workspace Owner' | 'Administrator' | 'Consultant' | 'Viewer';
  status: 'Active' | 'Invited';
  lastActive: string;
}

export interface WorkspaceConfig {
  orgName: string;
  workspaceId: string;
  currentPlanId: 'starter' | 'pro' | 'enterprise';
  reportsUsed: number;
  reportsLimit: number;
  seatsUsed: number;
  seatsLimit: number;
  timezone: string;
  reportBrandingColor: string;
  includeInsurerFrameworks: boolean;
  anonymousMode: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'assessment' | 'quote' | 'report' | 'system' | 'inventory';
}
