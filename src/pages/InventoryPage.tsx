import React from 'react';
import { 
  RefreshCw, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertCircle, 
  ShieldCheck, 
  ArrowUpRight,
  Database,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InventoryPage: React.FC = () => {
  const { suppliers, refreshSuppliers, isRefreshingSuppliers } = useApp();

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1440, margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-forest">Inventory Intelligence Engine</span>
            <span style={{ fontSize: '13px', color: '#707A73' }}>
              • 7 Australian Retail & Trade Channels
            </span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            Live Inventory Aggregation Feeds
          </h1>
          <p style={{ fontSize: '14px', color: '#707A73', marginTop: '2px' }}>
            Simulated real-time inventory polling across national mass retail and specialized ergonomic suppliers.
          </p>
        </div>

        {/* Refresh Inventory Button */}
        <button
          onClick={refreshSuppliers}
          disabled={isRefreshingSuppliers}
          className="btn btn-primary"
          style={{ padding: '10px 20px' }}
        >
          <RefreshCw size={16} className={isRefreshingSuppliers ? 'animate-spin' : ''} />
          <span>{isRefreshingSuppliers ? 'Syncing Feeds...' : 'Refresh Inventory'}</span>
        </button>
      </div>

      {/* Simulation Integrity Notice Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 20px',
        backgroundColor: '#FAF9F5',
        borderRadius: '16px',
        border: '1px solid #E7E8E1',
        marginBottom: '32px'
      }}>
        <Database size={22} color="#244A3D" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#28332D' }}>
            Demonstration Inventory Feed Architecture
          </div>
          <div style={{ fontSize: '12.5px', color: '#707A73', lineHeight: 1.4 }}>
            All trade pricing, stock levels, and dispatch lead times represent simulated local Australian merchant data. The production deployment will connect via approved B2B procurement APIs.
          </div>
        </div>
        <span className="badge badge-neutral">Simulated Mode Active</span>
      </div>

      {/* METRIC CARDS ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
            Active Suppliers
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#244A3D', marginTop: '4px' }}>
            7 Providers
          </div>
          <div style={{ fontSize: '11.5px', color: '#8FA99A', marginTop: '2px' }}>
            Mass Retail & Specialist
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
            Catalogued SKUs
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#28332D', marginTop: '4px' }}>
            288 Items
          </div>
          <div style={{ fontSize: '11.5px', color: '#244A3D', fontWeight: 600, marginTop: '2px' }}>
            100% Commercial Grade
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
            Avg Dispatch Lead Time
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#244A3D', marginTop: '4px' }}>
            1.4 Days
          </div>
          <div style={{ fontSize: '11.5px', color: '#707A73', marginTop: '2px' }}>
            Across Metropolitan Hubs
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: '#707A73', fontWeight: 600, textTransform: 'uppercase' }}>
            Sync Health
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#244A3D', marginTop: '4px' }}>
            100%
          </div>
          <div style={{ fontSize: '11.5px', color: '#244A3D', fontWeight: 600, marginTop: '2px' }}>
            All Feeds Responding
          </div>
        </div>
      </div>

      {/* SUPPLIERS GRID */}
      <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#28332D', marginBottom: '16px' }}>
        Configured Australian Supply Channels
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="card card-hover"
            style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span className="badge badge-forest">{supplier.type}</span>
                <span className={`badge ${supplier.status === 'Refreshed' ? 'badge-sage' : 'badge-neutral'}`}>
                  <CheckCircle2 size={12} />
                  {supplier.status}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>
                {supplier.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#707A73', marginBottom: '16px' }}>
                Distribution Hubs: {supplier.location}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                padding: '12px',
                backgroundColor: '#FAF9F5',
                borderRadius: '10px',
                border: '1px solid #E7E8E1',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#707A73' }}>Sample SKUs</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#28332D' }}>
                    {supplier.productCount} models
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#707A73' }}>Avg Dispatch</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#244A3D' }}>
                    {supplier.avgDispatchDays === 1 ? '24 Hours' : `${supplier.avgDispatchDays} Days`}
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '12px',
              borderTop: '1px solid #F2F3EC',
              fontSize: '11.5px',
              color: '#707A73'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} color="#244A3D" />
                <span>Sync: {supplier.lastSyncAEST}</span>
              </div>
              <span style={{ color: '#244A3D', fontWeight: 600 }}>Operational</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
