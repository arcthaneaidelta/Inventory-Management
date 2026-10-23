import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  Share2, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  Building2,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateInsurerReportPDF } from '../utils/pdfGenerator';

export const ReportsPage: React.FC = () => {
  const { currentAssessment, quotePackages, selectedPackageTier, setSelectedPackageTier, justifications, showToast } = useApp();

  const [activePage, setActivePage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const packages = quotePackages[currentAssessment.id] || quotePackages[currentAssessment.reference] || [];
  const activePackage = packages.find(p => p.tier === selectedPackageTier) || packages[1] || packages[0];

  const handleDownloadPDF = () => {
    if (!activePackage) return;
    generateInsurerReportPDF(currentAssessment, activePackage, justifications);
    showToast(`Insurer-Ready PDF downloaded for ${currentAssessment.reference}`, 'success');
  };

  if (!activePackage) {
    return <div>No package active for report generation.</div>;
  }

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Top Controls Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-forest">Audit-Ready Documentation</span>
            <span style={{ fontSize: '13px', color: '#707A73' }}>
              Report Ref: {currentAssessment.reference}
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            Insurer Clinical Report Preview
          </h1>
        </div>

        {/* Toolbar Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Package Switcher */}
          <div style={{ display: 'flex', backgroundColor: '#FFFFFF', border: '1px solid #E7E8E1', borderRadius: '10px', padding: '3px' }}>
            {packages.map(p => (
              <button
                key={p.tier}
                onClick={() => setSelectedPackageTier(p.tier)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '7px',
                  fontSize: '12.5px',
                  fontWeight: selectedPackageTier === p.tier ? 700 : 500,
                  backgroundColor: selectedPackageTier === p.tier ? '#244A3D' : 'transparent',
                  color: selectedPackageTier === p.tier ? '#FFFFFF' : '#707A73',
                  transition: 'all 0.15s ease'
                }}
              >
                {p.name.split(' ')[0]} (${p.total.toFixed(0)})
              </button>
            ))}
          </div>

          {/* Zoom Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFFFFF', border: '1px solid #E7E8E1', borderRadius: '10px', padding: '4px 8px' }}>
            <button
              onClick={() => setZoomLevel(prev => Math.max(75, prev - 10))}
              title="Zoom Out"
              style={{ padding: '4px', color: '#707A73' }}
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#28332D', minWidth: '40px', textAlign: 'center' }}>
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
              title="Zoom In"
              style={{ padding: '4px', color: '#707A73' }}
            >
              <ZoomIn size={16} />
            </button>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            className="btn btn-primary"
            style={{ padding: '10px 20px' }}
          >
            <Download size={16} />
            <span>Export Downloadable PDF</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT PREVIEW CONTAINER (A4 STYLED VIEWER) */}
      <div style={{
        backgroundColor: '#E7E8E1',
        borderRadius: '20px',
        padding: '36px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '800px',
        overflowX: 'auto'
      }}>
        {/* Page Switcher Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px',
          backgroundColor: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '9999px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <button
            onClick={() => setActivePage(prev => Math.max(1, prev - 1))}
            disabled={activePage === 1}
            style={{ color: activePage === 1 ? '#D5E2D8' : '#244A3D', cursor: activePage === 1 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronLeft size={18} />
          </button>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#28332D' }}>
            Document Page {activePage} of 3
          </span>
          <button
            onClick={() => setActivePage(prev => Math.min(3, prev + 1))}
            disabled={activePage === 3}
            style={{ color: activePage === 3 ? '#D5E2D8' : '#244A3D', cursor: activePage === 3 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Scaled A4 Sheet (210mm x 297mm proportion) */}
        <div style={{
          width: '794px',
          minHeight: '1123px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 12px 36px rgba(40, 51, 45, 0.15)',
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: 'top center',
          transition: 'transform 0.2s ease',
          boxSizing: 'border-box'
        }}>
          {/* PAGE 1 CONTENT: EVALUATION SUMMARY */}
          {activePage === 1 && (
            <div>
              {/* Report Header Banner */}
              <div style={{
                backgroundColor: '#244A3D',
                color: '#FFFFFF',
                padding: '20px 24px',
                borderRadius: '8px',
                marginBottom: '32px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '20px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                      REHABEQUIP AU
                    </h2>
                    <div style={{ fontSize: '11px', color: '#D5E2D8', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '2px' }}>
                      Clinical Equipment Sourcing & Functional Justification Report
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11.5px', color: '#D5E2D8' }}>Report Reference</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>{currentAssessment.reference}</div>
                  </div>
                </div>
              </div>

              {/* Section 1: Evaluation Meta */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#244A3D', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E7E8E1', paddingBottom: '6px', marginBottom: '14px' }}>
                  1. Clinical Evaluation Metadata
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '12.5px' }}>
                  <div>
                    <span style={{ color: '#707A73' }}>Rehabilitation Consultant: </span>
                    <strong style={{ color: '#28332D' }}>{currentAssessment.consultant}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#707A73' }}>Evaluation Date: </span>
                    <strong style={{ color: '#28332D' }}>{currentAssessment.assessmentDate}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#707A73' }}>Provider Organisation: </span>
                    <strong style={{ color: '#28332D' }}>{currentAssessment.organisation}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#707A73' }}>Worker Reference: </span>
                    <strong style={{ color: '#28332D' }}>{currentAssessment.workerReference} (Anonymous)</strong>
                  </div>
                  <div>
                    <span style={{ color: '#707A73' }}>Work Role & Environment: </span>
                    <strong style={{ color: '#28332D' }}>{currentAssessment.workRole} · {currentAssessment.workEnvironment}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#707A73' }}>Evaluation Framework: </span>
                    <strong style={{ color: '#28332D' }}>icare NSW / WorkSafe Standard</strong>
                  </div>
                </div>
              </div>

              {/* Section 2: Documented Capacity Limits */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#244A3D', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E7E8E1', paddingBottom: '6px', marginBottom: '14px' }}>
                  2. Documented Functional Restrictions (FCE)
                </h3>

                {/* Sub-blocks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px' }}>
                  <div style={{ padding: '12px 14px', backgroundColor: '#FAF9F5', borderRadius: '8px', border: '1px solid #E7E8E1' }}>
                    <div style={{ fontWeight: 700, color: '#28332D', marginBottom: '4px' }}>
                      Material Handling Capacity
                    </div>
                    <div style={{ color: '#707A73' }}>
                      • Occasional Lifting: <strong>{currentAssessment.materialHandling.occasionalLiftingKg} kg</strong> max · Frequent: <strong>{currentAssessment.materialHandling.frequentLiftingKg} kg</strong> max<br />
                      • Occasional Carrying: <strong>{currentAssessment.materialHandling.occasionalCarryingKg} kg</strong> max · Frequent: <strong>{currentAssessment.materialHandling.frequentCarryingKg} kg</strong> max<br />
                      • Maximum Push Force: {currentAssessment.materialHandling.pushForceN} N · Maximum Pull Force: {currentAssessment.materialHandling.pullForceN} N
                    </div>
                  </div>

                  <div style={{ padding: '12px 14px', backgroundColor: '#FAF9F5', borderRadius: '8px', border: '1px solid #E7E8E1' }}>
                    <div style={{ fontWeight: 700, color: '#28332D', marginBottom: '4px' }}>
                      Postural Tolerances
                    </div>
                    <div style={{ color: '#707A73' }}>
                      • Continuous Sitting Tolerance: <strong>{currentAssessment.posturalTolerances.sittingMinutes} minutes</strong> prior to micro-break<br />
                      • Continuous Standing Tolerance: <strong>{currentAssessment.posturalTolerances.standingMinutes} minutes</strong> prior to posture change<br />
                      • Documented Constraints: {currentAssessment.posturalTolerances.restrictions.join(', ')}
                    </div>
                  </div>

                  <div style={{ padding: '12px 14px', backgroundColor: '#FAF9F5', borderRadius: '8px', border: '1px solid #E7E8E1' }}>
                    <div style={{ fontWeight: 700, color: '#28332D', marginBottom: '4px' }}>
                      Upper Limb & Joint Biomechanics
                    </div>
                    <div style={{ color: '#707A73' }}>
                      • Grip Strength Evaluation: <strong>{currentAssessment.upperLimbConstraints.gripStrength}</strong><br />
                      • Documented Limb Constraints: {currentAssessment.upperLimbConstraints.constraints.join(', ')}<br />
                      {currentAssessment.upperLimbConstraints.additionalNotes && (
                        <span>• Observational Notes: {currentAssessment.upperLimbConstraints.additionalNotes}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2 CONTENT: ITEMIZED EQUIPMENT & COMMERCIAL BREAKDOWN */}
          {activePage === 2 && (
            <div>
              <div style={{
                backgroundColor: '#244A3D',
                color: '#FFFFFF',
                padding: '16px 20px',
                borderRadius: '8px',
                marginBottom: '28px'
              }}>
                <h3 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '15px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  3. ITEMIZED EQUIPMENT QUOTE: {activePackage.name.toUpperCase()}
                </h3>
                <div style={{ fontSize: '11px', color: '#D5E2D8' }}>
                  Aggregated from commercial Australian suppliers · Dispatch Lead Time: {activePackage.estimatedDeliveryText}
                </div>
              </div>

              {/* Itemised Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', marginBottom: '24px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#FAF9F5', borderBottom: '1.5px solid #244A3D' }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#244A3D' }}>Item Description</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#244A3D' }}>Supplier</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700, color: '#244A3D' }}>Qty</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#244A3D' }}>Unit (AUD)</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700, color: '#244A3D' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {activePackage.items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #E7E8E1' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: 700, color: '#28332D' }}>{item.product.name}</div>
                        <div style={{ fontSize: '10.5px', color: '#707A73' }}>{item.product.category} · {item.product.warrantyYears}yr Warranty</div>
                      </td>
                      <td style={{ padding: '12px', color: '#28332D' }}>{item.product.supplier}</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#28332D' }}>{item.quantity}</td>
                      <td style={{ padding: '12px', textAlign: 'right', color: '#28332D' }}>${item.product.priceAUD.toFixed(2)}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#244A3D' }}>
                        ${(item.product.priceAUD * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Summary */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '28px'
              }}>
                <div style={{
                  width: '280px',
                  backgroundColor: '#FAF9F5',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  border: '1px solid #E7E8E1'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#707A73', marginBottom: '6px' }}>
                    <span>Equipment Subtotal:</span>
                    <strong style={{ color: '#28332D' }}>${activePackage.subtotal.toFixed(2)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#707A73', marginBottom: '6px' }}>
                    <span>Freight / Delivery:</span>
                    <strong style={{ color: '#28332D' }}>${activePackage.delivery.toFixed(2)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#707A73', marginBottom: '8px' }}>
                    <span>GST (10%):</span>
                    <strong style={{ color: '#28332D' }}>${activePackage.gst.toFixed(2)}</strong>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#244A3D',
                    borderTop: '1.5px solid #244A3D',
                    paddingTop: '8px'
                  }}>
                    <span>Total Package Cost:</span>
                    <span>${activePackage.total.toFixed(2)} AUD</span>
                  </div>
                </div>
              </div>

              {/* Inventory Snapshot Notice */}
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#E9F0EA',
                borderRadius: '8px',
                fontSize: '11px',
                color: '#244A3D',
                border: '1px solid #D5E2D8'
              }}>
                <strong>Inventory Validation Snapshot: </strong>
                Demonstration feed validated 2026-10-23 12:00:00 AEST. Stock counts and delivery intervals simulated across commercial channels.
              </div>
            </div>
          )}

          {/* PAGE 3 CONTENT: FUNCTIONAL JUSTIFICATIONS & SIGN OFF */}
          {activePage === 3 && (
            <div>
              <div style={{
                backgroundColor: '#244A3D',
                color: '#FFFFFF',
                padding: '16px 20px',
                borderRadius: '8px',
                marginBottom: '28px'
              }}>
                <h3 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '15px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  4. CLINICAL FUNCTIONAL REASONING & JUSTIFICATIONS
                </h3>
                <div style={{ fontSize: '11px', color: '#D5E2D8' }}>
                  Itemized clinical rationale mapped to documented physical restrictions
                </div>
              </div>

              {/* Justification Blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {activePackage.items.map((item, idx) => {
                  const text = justifications[item.product.id] || item.itemJustification;
                  return (
                    <div key={idx} style={{
                      padding: '14px 18px',
                      borderRadius: '8px',
                      border: '1px solid #E7E8E1',
                      backgroundColor: '#FFFFFF'
                    }}>
                      <div style={{ fontWeight: 800, color: '#244A3D', fontSize: '13px', marginBottom: '4px' }}>
                        • {item.product.name} ({item.product.category})
                      </div>
                      <p style={{ fontSize: '12px', color: '#28332D', lineHeight: 1.5 }}>
                        {text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Compliance & Disclaimers */}
              <div style={{
                padding: '16px',
                backgroundColor: '#FAF9F5',
                borderRadius: '8px',
                border: '1px solid #E7E8E1',
                marginBottom: '40px',
                fontSize: '11px',
                color: '#707A73',
                lineHeight: 1.5
              }}>
                <strong style={{ color: '#28332D' }}>Statutory Framework Note: </strong>
                Structured in alignment with return-to-work guidelines for Comcare, icare NSW, WorkSafe Victoria, and WorkCover Queensland. Final clinical necessity must be endorsed by the treating medical practitioner and approved by the claims manager.
              </div>

              {/* Sign-off */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '32px',
                fontSize: '12px',
                color: '#28332D',
                borderTop: '1px solid #E7E8E1',
                paddingTop: '20px'
              }}>
                <div>
                  <div style={{ marginBottom: '24px' }}>Consultant Signature: ____________________________</div>
                  <div>Name: <strong>{currentAssessment.consultant}</strong></div>
                  <div style={{ color: '#707A73', fontSize: '11px' }}>Senior Rehabilitation Consultant</div>
                </div>
                <div>
                  <div style={{ marginBottom: '24px' }}>Date: ________________________</div>
                  <div>Organisation: <strong>{currentAssessment.organisation}</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* Document Footer (Common to all pages) */}
          <div style={{
            borderTop: '1px solid #E7E8E1',
            paddingTop: '14px',
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '10.5px',
            color: '#707A73'
          }}>
            <span>RehabEquip AU · Report Ref: {currentAssessment.reference}</span>
            <span>Confidential Occupational Rehabilitation Document · Page {activePage} of 3</span>
          </div>
        </div>
      </div>
    </div>
  );
};
