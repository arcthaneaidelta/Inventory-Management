import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  Download, 
  FileText, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Edit2,
  RefreshCw,
  Building2,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QuotePackage } from '../types';
import { generateInsurerReportPDF } from '../utils/pdfGenerator';
import { ProductIllustration } from '../components/common/ProductIllustration';

export const QuotePackagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentAssessment, 
    quotePackages, 
    selectedPackageTier, 
    setSelectedPackageTier,
    justifications, 
    openProductDrawer,
    showToast 
  } = useApp();

  const [expandedJustifications, setExpandedJustifications] = useState<Record<string, boolean>>({});

  const packages = quotePackages[currentAssessment.id] || quotePackages[currentAssessment.reference] || [];
  const activePackage = packages.find(p => p.tier === selectedPackageTier) || packages[1] || packages[0];

  const toggleJustification = (productId: string) => {
    setExpandedJustifications(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleExportPDF = () => {
    if (!activePackage) return;
    generateInsurerReportPDF(currentAssessment, activePackage, justifications);
    showToast(`Insurer-ready PDF report downloaded for ${currentAssessment.reference}`, 'success');
  };

  if (!activePackage) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h2>No quote packages found for active assessment.</h2>
        <button onClick={() => navigate('/app/assessments/new')} className="btn btn-primary" style={{ marginTop: '16px' }}>
          Create New Assessment
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1360, margin: '0 auto' }}>
      {/* Top Breadcrumb & Assessment Context */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-forest">Quote Engine · Assessment {currentAssessment.reference}</span>
            <span style={{ fontSize: '13px', color: '#707A73' }}>
              Worker: {currentAssessment.workerReference} ({currentAssessment.workRole})
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            Three Differentiated Quote Packages
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/app/reports')}
            className="btn btn-outline"
          >
            <FileText size={16} />
            <span>Report Viewer</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="btn btn-primary"
          >
            <Download size={16} />
            <span>Export Insurer-Ready PDF</span>
          </button>
        </div>
      </div>

      {/* THREE-TIER CARDS COMPARISON BAR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {packages.map((pkg) => {
          const isSelected = pkg.tier === selectedPackageTier;
          const tierColor = pkg.tier === 'value' 
            ? '#796135' 
            : pkg.tier === 'rapid' 
              ? '#244A3D' 
              : '#1C3B31';
          
          const tierBg = pkg.tier === 'value' 
            ? '#FAF9F5' 
            : pkg.tier === 'rapid' 
              ? '#FAFBF9' 
              : '#FFFFFF';

          const accentBorder = isSelected
            ? (pkg.tier === 'value' ? '2px solid #C49B55' : '2px solid #244A3D')
            : '1px solid #E7E8E1';

          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackageTier(pkg.tier)}
              style={{
                borderRadius: '16px',
                border: accentBorder,
                backgroundColor: tierBg,
                padding: '22px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: isSelected ? '0 10px 30px rgba(36, 74, 61, 0.08)' : 'none'
              }}
            >
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: -10,
                  right: 18,
                  backgroundColor: '#244A3D',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  ACTIVE PACKAGE
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className={`badge ${pkg.tier === 'value' ? 'badge-sand' : pkg.tier === 'rapid' ? 'badge-forest' : 'badge-sage'}`}>
                  {pkg.tier.toUpperCase()} TIER
                </span>
                <span style={{ fontSize: '11.5px', color: '#707A73' }}>
                  {pkg.items.length} items · {pkg.supplierCount} suppliers
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#28332D', marginBottom: '4px' }}>
                {pkg.name}
              </h3>
              <p style={{ fontSize: '12px', color: '#707A73', marginBottom: '14px', lineHeight: 1.4 }}>
                {pkg.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: tierColor }}>
                  ${pkg.total.toFixed(0)}
                </span>
                <span style={{ fontSize: '12px', color: '#707A73' }}>AUD incl. GST</span>
              </div>

              <div style={{
                fontSize: '11.5px',
                color: '#28332D',
                padding: '8px 10px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #E7E8E1',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Truck size={13} color="#244A3D" />
                <span>{pkg.estimatedDeliveryText} · {pkg.warrantyHighlight}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE PACKAGE ITEMIZED EQUIPMENT BREAKDOWN */}
      <div className="card card-large" style={{ marginBottom: '32px' }}>
        {/* Table Header & Snapshot Timestamp */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid #F2F3EC'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#28332D' }}>
                Itemised Equipment & Supplier Logistics: {activePackage.name}
              </h2>
              <span className="badge badge-neutral">Ref: QTE-2026-0042</span>
            </div>
            <div style={{ fontSize: '12.5px', color: '#707A73', marginTop: '3px' }}>
              Trade procurement prices compiled across Australian distribution channels.
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11.5px',
            color: '#707A73',
            backgroundColor: '#FAF9F5',
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid #E7E8E1'
          }}>
            <Clock size={13} color="#244A3D" />
            <span>Simulated Snapshot: 2026-10-23 12:00:00 AEST</span>
          </div>
        </div>

        {/* Itemised Table */}
        <div className="table-container" style={{ marginBottom: '24px' }}>
          <table className="rehab-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Equipment Specification</th>
                <th>Supplier</th>
                <th style={{ textAlign: 'center' }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Unit Price (AUD)</th>
                <th>Estimated Dispatch</th>
                <th style={{ textAlign: 'right' }}>Subtotal</th>
                <th style={{ textAlign: 'center' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {activePackage.items.map((item) => {
                const isExpanded = expandedJustifications[item.product.id];
                const customJustification = justifications[item.product.id] || item.itemJustification;

                return (
                  <React.Fragment key={item.product.id}>
                    <tr>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            style={{
                              width: 48,
                              height: 48,
                              objectFit: 'contain',
                              borderRadius: '8px',
                              backgroundColor: '#F8F8F4',
                              border: '1px solid #E7E8E1'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: '#28332D', fontSize: '13.5px' }}>
                              {item.product.name}
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#707A73' }}>
                              {item.product.category} · Warranty: {item.product.warrantyYears} yrs
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#28332D', fontSize: '13px' }}>
                          {item.product.supplier}
                        </div>
                        <div style={{ fontSize: '11px', color: '#8FA99A' }}>
                          Trade Merchant
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 600, color: '#28332D' }}>
                        {item.quantity}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 600, color: '#28332D' }}>
                        ${item.product.priceAUD}
                      </td>
                      <td>
                        <span className="badge badge-forest" style={{ fontSize: '11.5px' }}>
                          <Truck size={12} />
                          {item.product.dispatchDays === 1 ? 'Next Day' : `${item.product.dispatchDays} Days`}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#244A3D', fontSize: '14px' }}>
                        ${item.product.priceAUD * item.quantity}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            onClick={() => openProductDrawer(item.product)}
                            className="btn btn-outline btn-sm"
                            title="Inspect full product specs"
                          >
                            <ExternalLink size={13} />
                          </button>
                          <button
                            onClick={() => toggleJustification(item.product.id)}
                            className="btn btn-ghost btn-sm"
                            title="View clinical functional rationale"
                            style={{ color: '#244A3D' }}
                          >
                            {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Justification Row */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={7} style={{ backgroundColor: '#FAF9F5', padding: '16px 24px' }}>
                          <div style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            border: '1px solid #E7E8E1',
                            padding: '16px 20px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <Sparkles size={16} color="#244A3D" />
                              <span style={{ fontSize: '13px', fontWeight: 700, color: '#244A3D' }}>
                                Functional Capacity Justification for Claims Review
                              </span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#28332D', lineHeight: 1.6, marginBottom: '10px' }}>
                              {customJustification}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#707A73' }}>
                              <ShieldCheck size={14} color="#8FA99A" />
                              <span>Evaluated against documented {currentAssessment.posturalTolerances.sittingMinutes}m sitting limit and grip tolerance.</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* FINANCIAL SUMMARY & TOTALS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Insurer Framework Compliance Notice */}
          <div style={{
            backgroundColor: '#FAF9F5',
            borderRadius: '14px',
            border: '1px solid #E7E8E1',
            padding: '20px'
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#28332D', marginBottom: '8px' }}>
              Documentation Framework Alignment
            </h4>
            <p style={{ fontSize: '12.5px', color: '#707A73', lineHeight: 1.5, marginBottom: '12px' }}>
              Item specifications and justifications formatted to support statutory rehabilitation submissions for <strong>icare NSW</strong>, <strong>Comcare</strong>, and <strong>WorkSafe Victoria</strong>.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="badge badge-forest">icare Compliant Structure</span>
              <span className="badge badge-neutral">Comcare Standard</span>
              <span className="badge badge-sage">WorkSafe Vic Ready</span>
            </div>
          </div>

          {/* Totals Box */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E7E8E1',
            padding: '20px 24px',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: '#707A73' }}>
              <span>Equipment Subtotal:</span>
              <span style={{ fontWeight: 600, color: '#28332D' }}>${activePackage.subtotal.toFixed(2)} AUD</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: '#707A73' }}>
              <span>Estimated Delivery Freight:</span>
              <span style={{ fontWeight: 600, color: '#28332D' }}>${activePackage.delivery.toFixed(2)} AUD</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '13px', color: '#707A73' }}>
              <span>Australian GST (10%):</span>
              <span style={{ fontWeight: 600, color: '#28332D' }}>${activePackage.gst.toFixed(2)} AUD</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingTop: '12px',
              borderTop: '1.5px solid #244A3D',
              marginTop: '8px'
            }}>
              <div>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#28332D' }}>Total Package Cost:</span>
                <div style={{ fontSize: '11px', color: '#8FA99A' }}>Includes 10% GST</div>
              </div>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#244A3D' }}>
                ${activePackage.total.toFixed(2)} AUD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
