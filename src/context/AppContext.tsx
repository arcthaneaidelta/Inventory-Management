import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Assessment, 
  QuotePackage, 
  Product, 
  SupplierSyncInfo, 
  TeamMember, 
  WorkspaceConfig, 
  NotificationItem 
} from '../types';
import { 
  INITIAL_ASSESSMENTS, 
  MOCK_SUPPLIERS, 
  INITIAL_TEAM, 
  INITIAL_NOTIFICATIONS, 
  generateQuotePackagesForAssessment,
  MOCK_PRODUCTS 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title?: string;
  message: string;
}

interface AppContextType {
  // Auth
  isAuthenticated: boolean;
  currentUser: {
    name: string;
    role: string;
    email: string;
    organisation: string;
    avatarInitials: string;
  };
  login: (email: string, role?: string) => void;
  logout: () => void;
  loginAsDemo: () => void;

  // Assessments
  assessments: Assessment[];
  currentAssessment: Assessment;
  setCurrentAssessment: React.Dispatch<React.SetStateAction<Assessment>>;
  saveAssessment: (assessment: Assessment) => void;
  getAssessmentById: (idOrRef: string) => Assessment | undefined;

  // Quote Packages
  quotePackages: Record<string, QuotePackage[]>;
  selectedPackageTier: 'value' | 'rapid' | 'premium';
  setSelectedPackageTier: (tier: 'value' | 'rapid' | 'premium') => void;
  generateQuotesForAssessment: (assessment: Assessment) => Promise<QuotePackage[]>;
  isGeneratingQuotes: boolean;

  // AI Justifications
  justifications: Record<string, string>;
  updateJustification: (productId: string, text: string) => void;
  regenerateJustification: (productId: string, restrictionHint?: string) => Promise<string>;

  // Products & Drawer
  activeProductDrawer: Product | null;
  openProductDrawer: (product: Product) => void;
  closeProductDrawer: () => void;

  // Suppliers & Sync
  suppliers: SupplierSyncInfo[];
  refreshSuppliers: () => Promise<void>;
  isRefreshingSuppliers: boolean;

  // Team & Workspace
  team: TeamMember[];
  inviteTeamMember: (name: string, email: string, role: TeamMember['role']) => void;
  updateMemberRole: (id: string, role: TeamMember['role']) => void;
  removeMember: (id: string) => void;

  workspaceConfig: WorkspaceConfig;
  updateWorkspaceConfig: (updates: Partial<WorkspaceConfig>) => void;
  upgradePlan: (planId: 'starter' | 'pro' | 'enterprise') => void;
  simulateAdditionalUsage: (count?: number) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning', title?: string) => void;
  removeToast: (id: string) => void;

  // Initial loading state
  hasInitialLoaded: boolean;
  setHasInitialLoaded: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [hasInitialLoaded, setHasInitialLoaded] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState({
    name: 'Sarah Mitchell',
    role: 'Senior Rehabilitation Consultant',
    email: 'sarah.mitchell@horizonrehab.com.au',
    organisation: 'Horizon Rehabilitation Group',
    avatarInitials: 'SM'
  });

  const [assessments, setAssessments] = useState<Assessment[]>(INITIAL_ASSESSMENTS);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment>(INITIAL_ASSESSMENTS[0]);
  const [quotePackages, setQuotePackages] = useState<Record<string, QuotePackage[]>>(() => {
    // Pre-generate packages for initial assessments
    const map: Record<string, QuotePackage[]> = {};
    INITIAL_ASSESSMENTS.forEach(ass => {
      map[ass.id] = generateQuotePackagesForAssessment(ass);
      map[ass.reference] = map[ass.id];
    });
    return map;
  });

  const [selectedPackageTier, setSelectedPackageTier] = useState<'value' | 'rapid' | 'premium'>('rapid');
  const [isGeneratingQuotes, setIsGeneratingQuotes] = useState<boolean>(false);
  const [activeProductDrawer, setActiveProductDrawer] = useState<Product | null>(null);

  const [suppliers, setSuppliers] = useState<SupplierSyncInfo[]>(MOCK_SUPPLIERS);
  const [isRefreshingSuppliers, setIsRefreshingSuppliers] = useState<boolean>(false);

  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);

  const [workspaceConfig, setWorkspaceConfig] = useState<WorkspaceConfig>({
    orgName: 'Horizon Rehabilitation Group',
    workspaceId: 'HRG-NSW-2026',
    currentPlanId: 'pro',
    reportsUsed: 42,
    reportsLimit: 250,
    seatsUsed: 4,
    seatsLimit: 10,
    timezone: 'Australia/Sydney (AEST)',
    reportBrandingColor: '#244A3D',
    includeInsurerFrameworks: true,
    anonymousMode: true
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent justification state
  const [justifications, setJustifications] = useState<Record<string, string>>({
    'prod-chair-pro': `The ErgoFlex Pro task chair provides independent seat pan slide (50mm) and dynamic synchronized tilt to accommodate the worker's continuous sitting tolerance limit of 30 minutes. By facilitating frequent micro-postural adjustments without manual tension resets, this commercial mechanism distributes peak ischial tuberosity pressure and supports lumbar lordosis. Recommended for consideration in conjunction with the documented FCE restrictions and workplace ergonomic suitability.`,
    'prod-desk-align': `The Align commercial sit-stand electric workstation allows smooth motorized transitions between sitting and standing, directly addressing the worker's documented requirement to avoid sustained static postures. Four programmable memory presets enable consistent implementation of the recommended 30-min sitting / 15-min standing rotation protocol without disruption to workflow.`,
    'prod-arm-dual': `The gas-strut dual articulating monitor mount supports full vertical and focal distance adjustment, positioning screen displays directly at eye level. This eliminates continuous forward cervical flexion and compensatory thoracic kyphosis during computer tasks.`,
    'prod-mouse-vertical': `The 57-degree vertical handshake design places the forearm in a neutral biomechanical orientation, significantly reducing pronator teres muscle loading and relieving carpal tunnel pressure to accommodate moderately reduced grip strength.`,
    'prod-keyboard-contour': `The contoured split wave keyframe promotes a neutral wrist alignment and incorporates an integrated cushioned palm support with reverse tilt (-4°), preventing sustained wrist extension and repetitive ulnar deviation.`,
    'prod-footrest-multi': `The ActiveRelief dynamic foot support facilitates optimal 90-degree knee angulation for correct thigh support while seated, reducing hamstring tethering and alleviating lower lumbar compression.`,
    'prod-lift-aid': `Battery-powered mobile lift platform eliminates manual spinal flexion and loads exceeding the documented 10kg occasional lifting restriction, safeguarding against repetitive lumbar re-injury during parcel handling.`
  });

  // Toasts
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success', title?: string) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth
  const login = (email: string, role = 'Senior Rehabilitation Consultant') => {
    setIsAuthenticated(true);
    setCurrentUser({
      name: 'Sarah Mitchell',
      role,
      email,
      organisation: 'Horizon Rehabilitation Group',
      avatarInitials: 'SM'
    });
    showToast('Signed in successfully as Sarah Mitchell', 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Signed out of rehabilitation workspace', 'info');
  };

  const loginAsDemo = () => {
    login('sarah.mitchell@horizonrehab.com.au');
  };

  // Assessments
  const saveAssessment = (assessment: Assessment) => {
    setAssessments(prev => {
      const idx = prev.findIndex(a => a.id === assessment.id || a.reference === assessment.reference);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = assessment;
        return updated;
      }
      return [assessment, ...prev];
    });

    // Generate packages
    const pkgs = generateQuotePackagesForAssessment(assessment);
    setQuotePackages(prev => ({
      ...prev,
      [assessment.id]: pkgs,
      [assessment.reference]: pkgs
    }));

    setCurrentAssessment(assessment);
    showToast(`Assessment ${assessment.reference} saved successfully`, 'success');
  };

  const getAssessmentById = (idOrRef: string) => {
    return assessments.find(a => a.id === idOrRef || a.reference === idOrRef);
  };

  // Quotes generator
  const generateQuotesForAssessment = async (assessment: Assessment): Promise<QuotePackage[]> => {
    setIsGeneratingQuotes(true);
    // Simulating deterministic matching stages
    await new Promise(r => setTimeout(r, 2600));

    const packages = generateQuotePackagesForAssessment(assessment);
    setQuotePackages(prev => ({
      ...prev,
      [assessment.id]: packages,
      [assessment.reference]: packages
    }));

    // Update assessment status
    const updated = { ...assessment, status: 'Quotes Generated' as const };
    saveAssessment(updated);

    // Increase reports used in workspace
    setWorkspaceConfig(prev => ({
      ...prev,
      reportsUsed: prev.reportsUsed + 1
    }));

    setIsGeneratingQuotes(false);
    showToast(`Three quote packages generated for ${assessment.reference}`, 'success', 'Inventory Matched');
    return packages;
  };

  // Justifications
  const updateJustification = (productId: string, text: string) => {
    setJustifications(prev => ({
      ...prev,
      [productId]: text
    }));
    showToast('Clinical justification updated', 'info');
  };

  const regenerateJustification = async (productId: string, restrictionHint?: string): Promise<string> => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    const prodName = product ? product.name : 'The selected equipment';

    await new Promise(r => setTimeout(r, 1200));

    const refreshedText = `Biomechanical assessment indicates ${prodName} directly aligns with the documented functional restrictions${restrictionHint ? ` (${restrictionHint})` : ''}. Its multi-axial ergonomic adjustments support physiological spinal alignment, mitigate sustained static load, and allow customizable posture variation throughout standard work tasks. Recommended as an audit-ready ergonomic accommodation under Australian return-to-work guidelines.`;

    setJustifications(prev => ({
      ...prev,
      [productId]: refreshedText
    }));

    showToast(`Justification regenerated for ${prodName}`, 'success');
    return refreshedText;
  };

  // Drawer
  const openProductDrawer = (product: Product) => {
    setActiveProductDrawer(product);
  };
  const closeProductDrawer = () => {
    setActiveProductDrawer(null);
  };

  // Suppliers refresh
  const refreshSuppliers = async () => {
    setIsRefreshingSuppliers(true);
    await new Promise(r => setTimeout(r, 1800));

    const now = new Date();
    const timeStr = `Today at ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} AEST`;

    setSuppliers(prev => prev.map(s => ({
      ...s,
      status: 'Refreshed',
      lastSyncAEST: timeStr,
      productCount: s.productCount + Math.floor(Math.random() * 3)
    })));

    setIsRefreshingSuppliers(false);
    showToast('Simulated supplier inventories refreshed across all 7 providers', 'success', 'Sync Completed');
  };

  // Team
  const inviteTeamMember = (name: string, email: string, role: TeamMember['role']) => {
    const newMember: TeamMember = {
      id: 'user-' + Date.now(),
      name,
      email,
      role,
      status: 'Invited',
      lastActive: 'Invitation Sent'
    };
    setTeam(prev => [...prev, newMember]);
    setWorkspaceConfig(prev => ({ ...prev, seatsUsed: prev.seatsUsed + 1 }));
    showToast(`Invitation dispatched to ${email}`, 'success');
  };

  const updateMemberRole = (id: string, role: TeamMember['role']) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, role } : m));
    showToast('Team member permissions updated', 'info');
  };

  const removeMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    setWorkspaceConfig(prev => ({ ...prev, seatsUsed: Math.max(1, prev.seatsUsed - 1) }));
    showToast('Team member removed from workspace', 'info');
  };

  // Workspace
  const updateWorkspaceConfig = (updates: Partial<WorkspaceConfig>) => {
    setWorkspaceConfig(prev => ({ ...prev, ...updates }));
    showToast('Workspace settings saved', 'success');
  };

  const upgradePlan = (planId: 'starter' | 'pro' | 'enterprise') => {
    const limits = {
      starter: { reportsLimit: 50, seatsLimit: 3 },
      pro: { reportsLimit: 250, seatsLimit: 10 },
      enterprise: { reportsLimit: 1000, seatsLimit: 50 }
    }[planId];

    setWorkspaceConfig(prev => ({
      ...prev,
      currentPlanId: planId,
      reportsLimit: limits.reportsLimit,
      seatsLimit: limits.seatsLimit
    }));
    showToast(`Workspace upgraded to ${planId.toUpperCase()} tier`, 'success', 'Plan Updated');
  };

  const simulateAdditionalUsage = (count = 10) => {
    setWorkspaceConfig(prev => ({
      ...prev,
      reportsUsed: Math.min(prev.reportsLimit, prev.reportsUsed + count)
    }));
    showToast(`Simulated +${count} report evaluations`, 'info');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notification center cleared', 'info');
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      currentUser,
      login,
      logout,
      loginAsDemo,
      assessments,
      currentAssessment,
      setCurrentAssessment,
      saveAssessment,
      getAssessmentById,
      quotePackages,
      selectedPackageTier,
      setSelectedPackageTier,
      generateQuotesForAssessment,
      isGeneratingQuotes,
      justifications,
      updateJustification,
      regenerateJustification,
      activeProductDrawer,
      openProductDrawer,
      closeProductDrawer,
      suppliers,
      refreshSuppliers,
      isRefreshingSuppliers,
      team,
      inviteTeamMember,
      updateMemberRole,
      removeMember,
      workspaceConfig,
      updateWorkspaceConfig,
      upgradePlan,
      simulateAdditionalUsage,
      notifications,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      clearNotifications,
      toasts,
      showToast,
      removeToast,
      hasInitialLoaded,
      setHasInitialLoaded
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
