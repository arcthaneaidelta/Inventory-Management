import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Sliders, 
  Check, 
  ExternalLink, 
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductIllustration } from './ProductIllustration';

export const ProductDetailDrawer: React.FC = () => {
  const { activeProductDrawer, closeProductDrawer, currentAssessment, showToast } = useApp();

  if (!activeProductDrawer) return null;

  const product = activeProductDrawer;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="drawer-overlay" 
        onClick={closeProductDrawer} 
      />

      {/* Slide-in Content Panel */}
      <div className="drawer-content">
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-forest">{product.category}</span>
              <span className="badge badge-neutral">{product.supplier}</span>
              {product.commercialGrade && (
                <span className="badge badge-sage">Commercial Grade</span>
              )}
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
              {product.name}
            </h2>
            <div style={{ fontSize: '13px', color: '#707A73', marginTop: '2px' }}>
              Manufactured by {product.manufacturer}
            </div>
          </div>

          <button
            onClick={closeProductDrawer}
            title="Close Drawer"
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#F8F8F4',
              color: '#707A73',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Product Visual */}
        <div style={{
          backgroundColor: '#F8F8F4',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px',
          border: '1px solid #E7E8E1'
        }}>
          <ProductIllustration
            category={product.category}
            name={product.name}
            image={product.image}
            size={220}
          />
        </div>

        {/* Pricing & Commercial Highlights Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{
            padding: '14px',
            backgroundColor: '#FAF9F5',
            borderRadius: '12px',
            border: '1px solid #E7E8E1'
          }}>
            <div style={{ fontSize: '11px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
              Simulated Price
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#244A3D', marginTop: '2px' }}>
              ${product.priceAUD}
            </div>
            <div style={{ fontSize: '10.5px', color: '#8FA99A' }}>AUD excl. GST</div>
          </div>

          <div style={{
            padding: '14px',
            backgroundColor: '#FAF9F5',
            borderRadius: '12px',
            border: '1px solid #E7E8E1'
          }}>
            <div style={{ fontSize: '11px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
              Stock & Dispatch
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#28332D', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Truck size={14} color="#244A3D" />
              {product.dispatchDays === 1 ? 'Next Day' : `${product.dispatchDays} Days`}
            </div>
            <div style={{ fontSize: '11px', color: '#244A3D', fontWeight: 600 }}>{product.stockStatus}</div>
          </div>

          <div style={{
            padding: '14px',
            backgroundColor: '#FAF9F5',
            borderRadius: '12px',
            border: '1px solid #E7E8E1'
          }}>
            <div style={{ fontSize: '11px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
              Warranty
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#28332D', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="#8FA99A" />
              {product.warrantyYears} Years
            </div>
            <div style={{ fontSize: '11px', color: '#707A73' }}>Commercial Cover</div>
          </div>
        </div>

        {/* CLINICAL DECISION-SUPPORT: Why This Item Is Included */}
        <div style={{
          backgroundColor: '#E9F0EA',
          borderRadius: '16px',
          border: '1px solid #D5E2D8',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={16} color="#244A3D" />
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#244A3D' }}>
              Why this item is clinically indicated
            </h3>
          </div>
          <p style={{ fontSize: '13px', color: '#28332D', lineHeight: 1.5, marginBottom: '12px' }}>
            This ergonomic workstation component may support the documented requirement for reduced sustained static postures by allowing position changes during the workday. Designed to accommodate active tolerance limits ({currentAssessment.posturalTolerances.sittingMinutes}m sitting / {currentAssessment.posturalTolerances.standingMinutes}m standing).
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11.5px',
            color: '#707A73',
            fontStyle: 'italic'
          }}>
            <Info size={13} />
            <span>Illustrative clinical decision support — verify against individual worker pathology.</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#28332D', marginBottom: '8px' }}>
            Equipment Overview
          </h4>
          <p style={{ fontSize: '13.5px', color: '#707A73', lineHeight: 1.6 }}>
            {product.description}
          </p>
        </div>

        {/* Functional Features */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#28332D', marginBottom: '10px' }}>
            Clinical & Functional Features
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {product.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#28332D' }}>
                <div style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: '#E9F0EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px'
                }}>
                  <Check size={12} color="#244A3D" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#28332D', marginBottom: '10px' }}>
            Technical Specifications
          </h4>
          <div style={{
            border: '1px solid #E7E8E1',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF'
          }}>
            {Object.entries(product.specs).map(([key, val], idx) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  fontSize: '12.5px',
                  borderBottom: idx === Object.entries(product.specs).length - 1 ? 'none' : '1px solid #F2F3EC',
                  backgroundColor: idx % 2 === 0 ? '#FAF9F5' : '#FFFFFF'
                }}
              >
                <span style={{ fontWeight: 600, color: '#707A73' }}>{key}</span>
                <span style={{ fontWeight: 500, color: '#28332D' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #E7E8E1' }}>
          <button
            onClick={() => {
              showToast(`${product.name} added to demonstration quote draft`, 'success');
              closeProductDrawer();
            }}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            Add to Active Quote Package
          </button>
          <button
            onClick={closeProductDrawer}
            className="btn btn-outline"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
