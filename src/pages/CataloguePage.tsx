import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Check, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { ProductIllustration } from '../components/common/ProductIllustration';

export const CataloguePage: React.FC = () => {
  const { openProductDrawer, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSupplier, setSelectedSupplier] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'adjustability'>('recommended');
  const [commercialOnly, setCommercialOnly] = useState(false);

  const categories = [
    'All',
    'Ergonomic Seating',
    'Height-Adjustable Desks',
    'Monitor Arms',
    'Keyboard & Mouse',
    'Footrests',
    'Standing Support',
    'Lifting Aids'
  ];

  const suppliers = [
    'All',
    'Officeworks',
    'Harvey Norman Commercial',
    'Bunnings Trade',
    'Ergonomic Office',
    'Backcare & Seating',
    'Bad Backs',
    'Zenith Ergonomics'
  ];

  // Filtering & Sorting
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.category.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSupplier = selectedSupplier === 'All' || p.supplier === selectedSupplier;
    const matchesCommercial = !commercialOnly || p.commercialGrade;

    return matchesSearch && matchesCategory && matchesSupplier && matchesCommercial;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceAUD - b.priceAUD;
    if (sortBy === 'price-desc') return b.priceAUD - a.priceAUD;
    if (sortBy === 'adjustability') return b.adjustabilityScore - a.adjustabilityScore;
    return b.commercialGrade ? 1 : -1;
  });

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1440, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-forest">Equipment Catalogue</span>
            <span style={{ fontSize: '13px', color: '#707A73' }}>
              • {filteredProducts.length} verified commercial models
            </span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            Australian Commercial Ergonomic Catalogue
          </h1>
          <p style={{ fontSize: '14px', color: '#707A73', marginTop: '2px' }}>
            Browse AFRDI-certified seating, sit-stand workstations, and biomechanical input accessories across national retailers.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          backgroundColor: '#FAF9F5',
          borderRadius: '10px',
          border: '1px solid #E7E8E1',
          fontSize: '12px',
          color: '#707A73'
        }}>
          <Sparkles size={14} color="#244A3D" />
          <span>AFRDI Level 6 & BIFMA Standard Filter Active</span>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E7E8E1',
        padding: '20px 24px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '14px'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#707A73" style={{ position: 'absolute', top: 12, left: 14 }} />
            <input
              type="text"
              placeholder="Search products by model, clinical feature, or specs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-text"
              style={{ paddingLeft: '38px' }}
            />
          </div>

          {/* Supplier Dropdown */}
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="input-select"
          >
            {suppliers.map(s => (
              <option key={s} value={s}>{s === 'All' ? 'All Suppliers' : s}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="input-select"
          >
            <option value="recommended">Recommended by Clinical Fit</option>
            <option value="price-asc">Price: Lowest to Highest</option>
            <option value="price-desc">Price: Highest to Lowest</option>
            <option value="adjustability">Highest Adjustability Score</option>
          </select>

          {/* Commercial Grade Checkbox */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 12px',
            backgroundColor: '#FAF9F5',
            borderRadius: '12px',
            border: '1px solid #E7E8E1'
          }}>
            <input
              type="checkbox"
              id="commOnly"
              checked={commercialOnly}
              onChange={(e) => setCommercialOnly(e.target.checked)}
              style={{ accentColor: '#244A3D', width: 16, height: 16 }}
            />
            <label htmlFor="commOnly" style={{ fontSize: '12.5px', color: '#28332D', fontWeight: 600, cursor: 'pointer' }}>
              Commercial Grade Only
            </label>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: selectedCategory === cat ? 700 : 500,
                color: selectedCategory === cat ? '#244A3D' : '#707A73',
                backgroundColor: selectedCategory === cat ? '#E9F0EA' : '#F8F8F4',
                border: selectedCategory === cat ? '1px solid #244A3D' : '1px solid #E7E8E1',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E7E8E1' }}>
          <Layers size={36} color="#707A73" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#28332D' }}>No matching products</h3>
          <p style={{ fontSize: '13px', color: '#707A73', marginTop: '4px' }}>
            Try adjusting your search query or supplier filters.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card card-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '22px',
                borderRadius: '18px'
              }}
            >
              <div>
                {/* Visual Area */}
                <div style={{
                  position: 'relative',
                  backgroundColor: '#F8F8F4',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '16px',
                  border: '1px solid #E7E8E1',
                  overflow: 'hidden'
                }}>
                  <ProductIllustration
                    category={product.category}
                    name={product.name}
                    image={product.image}
                    size={160}
                  />

                  {/* Top Tags */}
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: '6px' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                      {product.supplier}
                    </span>
                  </div>

                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span className="badge badge-forest" style={{ fontSize: '11px' }}>
                      Score {product.adjustabilityScore}/10
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div style={{ fontSize: '12px', color: '#8FA99A', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                  {product.category}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#28332D', marginBottom: '6px', lineHeight: 1.3 }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '12.5px', color: '#707A73', lineHeight: 1.5, marginBottom: '16px' }}>
                  {product.description.substring(0, 110)}...
                </p>

                {/* Compatibility Snippet */}
                <div style={{
                  padding: '8px 10px',
                  backgroundColor: '#FAF9F5',
                  borderRadius: '8px',
                  fontSize: '11.5px',
                  color: '#28332D',
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Sparkles size={12} color="#244A3D" />
                  <span>Clinical fit: {product.compatibleRestrictions[0]}</span>
                </div>
              </div>

              {/* Price & Actions Footer */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '14px',
                  paddingTop: '12px',
                  borderTop: '1px solid #F2F3EC'
                }}>
                  <div>
                    <span style={{ fontSize: '22px', fontWeight: 800, color: '#244A3D' }}>
                      ${product.priceAUD}
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#707A73', marginLeft: '4px' }}>AUD excl. GST</span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#244A3D', fontWeight: 600 }}>
                    {product.warrantyYears}yr Warranty
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    onClick={() => openProductDrawer(product)}
                    className="btn btn-outline btn-sm"
                    style={{ justifyContent: 'center' }}
                  >
                    <span>Inspect Specs</span>
                  </button>
                  <button
                    onClick={() => showToast(`${product.name} added to quote draft`, 'success')}
                    className="btn btn-primary btn-sm"
                    style={{ justifyContent: 'center' }}
                  >
                    <Plus size={14} />
                    <span>Add to Quote</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
