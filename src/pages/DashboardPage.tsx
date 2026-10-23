import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FilePlus, 
  FileText, 
  Layers, 
  Users, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  PackageCheck, 
  Download, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateInsurerReportPDF } from '../utils/pdfGenerator';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    assessments, 
    quotePackages, 
    justifications, 
    workspaceConfig, 
    showToast,
    setCurrentAssessment
  } = useApp();

  const handleExportPDF = (assessmentId: string) => {
    const ass = assessments.find(a => a.id === assessmentId || a.reference === assessmentId);
    if (!ass) return;
    const pkgs = quotePackages[ass.id] || quotePackages[ass.reference];
    const pkg = pkgs ? pkgs[1] : undefined; // Rapid default
    if (pkg) {
      generateInsurerReportPDF(ass, pkg, justifications);
      showToast(`Exported Insurer-Ready PDF for ${ass.reference}`, 'success');
    }
  };

  const handleOpenAssessment = (ass: typeof assessments[0]) => {
    setCurrentAssessment(ass);
    navigate(`/app/quotes`);
  };

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1440, margin: '0 auto' }}>
      {/* Welcome Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-forest">Horizon Rehabilitation Group</span>
            <span style={{ fontSize: '13px', color: '#707A73' }}>• Sydney Metro Practice</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            Good morning, {currentUser.name.split(' ')[0]}.
          </h1>
          <p style={{ fontSize: '14px', color: '#707A73', marginTop: '2px' }}>
            Here is the clinical quote and equipment activity across your rehabilitation caseload.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/app/catalogue')}
            className="btn btn-outline"
          >
            <Layers size={16} />
            <span>Catalogue</span>
          </button>
          <button
            onClick={() => navigate('/app/assessments/new')}
            className="btn btn-primary"
          >
            <FilePlus size={16} />
            <span>New Assessment</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS (4 CARDS) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {/* Metric 1 */}
        <div className="card" style={{ padding: '22px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#707A73' }}>
              Assessments This Month
            </span>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              backgroundColor: '#E9F0EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#244A3D'
            }}>
              <FileText size={16} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            42
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '12px', color: '#244A3D', fontWeight: 600 }}>
            <TrendingUp size={14} />
            <span>+14% vs. previous cycle</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card" style={{ padding: '22px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#707A73' }}>
              Reports Generated
            </span>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              backgroundColor: '#E9F0EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#244A3D'
            }}>
              <PackageCheck size={16} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#244A3D', letterSpacing: '-0.02em' }}>
            36
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '12px', color: '#707A73' }}>
            <span>86% insurer submission rate</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card" style={{ padding: '22px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#707A73' }}>
              Active Quote Packages
            </span>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              backgroundColor: '#FAF9F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C49B55'
            }}>
              <Sparkles size={16} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            12
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '12px', color: '#707A73' }}>
            <span>Under claims manager review</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="card" style={{ padding: '22px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#707A73' }}>
              Avg. Quote Turnaround
            </span>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              backgroundColor: '#E9F0EA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#244A3D'
            }}>
              <Clock size={16} />
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#244A3D', letterSpacing: '-0.02em' }}>
            4.8 <span style={{ fontSize: '16px', fontWeight: 600, color: '#707A73' }}>min</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '12px', color: '#244A3D', fontWeight: 600 }}>
            <span>Down from 3.5 hrs manual work</span>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2.2fr 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Left Column: Recent Assessments Table */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#28332D' }}>
                Recent Functional Capacity Assessments
              </h2>
              <p style={{ fontSize: '12.5px', color: '#707A73' }}>
                Worker claims with generated quote packages and clinical justifications
              </p>
            </div>

            <button
              onClick={() => navigate('/app/assessments')}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '13px' }}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="table-container">
            <table className="rehab-table">
              <thead>
                <tr>
                  <th>Assessment Ref</th>
                  <th>Worker Ref</th>
                  <th>Work Role</th>
                  <th>Restrictions</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((ass) => (
                  <tr key={ass.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#244A3D' }}>
                        {ass.reference}
                      </div>
                      <div style={{ fontSize: '11px', color: '#707A73' }}>
                        {ass.assessmentDate}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral" style={{ fontSize: '11.5px' }}>
                        {ass.workerReference}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '13px', color: '#28332D', fontWeight: 500 }}>
                        {ass.workRole}
                      </div>
                      <div style={{ fontSize: '11px', color: '#707A73' }}>
                        {ass.workEnvironment}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '12px', color: '#28332D' }}>
                        Sit {ass.posturalTolerances.sittingMinutes}m · Lift {ass.materialHandling.occasionalLiftingKg}kg
                      </div>
                      <div style={{ fontSize: '11px', color: '#707A73' }}>
                        {ass.posturalTolerances.restrictions.length} restrictions noted
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${ass.status === 'Report Exported' ? 'badge-forest' : 'badge-amber'}`}>
                        {ass.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => handleOpenAssessment(ass)}
                          className="btn btn-outline btn-sm"
                          title="View 3 Quote Packages"
                        >
                          <span>Quotes</span>
                        </button>
                        <button
                          onClick={() => handleExportPDF(ass.id)}
                          className="btn btn-primary btn-sm"
                          title="Download Insurer-Ready PDF"
                        >
                          <Download size={13} />
                          <span>PDF</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Activity Timeline & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quick Action Tiles */}
          <div className="card" style={{ padding: '22px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#28332D', marginBottom: '14px' }}>
              Quick Rehabilitation Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => navigate('/app/assessments/new')}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
              >
                <FilePlus size={16} />
                <span>Create New FCE Assessment</span>
              </button>
              <button
                onClick={() => navigate('/app/reports')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
              >
                <FileText size={16} />
                <span>Review Audit Reports</span>
              </button>
              <button
                onClick={() => navigate('/app/catalogue')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
              >
                <Layers size={16} />
                <span>Browse Equipment Catalogue</span>
              </button>
              <button
                onClick={() => navigate('/app/inventory')}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
              >
                <RefreshCw size={16} />
                <span>Synchronise Supplier Stock</span>
              </button>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#28332D' }}>
                Recent Caseload Activity
              </h3>
              <span style={{ fontSize: '11px', color: '#8FA99A', fontWeight: 600 }}>LIVE LOG</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Quote Packages Generated', sub: 'Assessment RE-2026-1043 · 3 packages ready', time: '12m ago', icon: PackageCheck },
                { title: 'Insurer PDF Exported', sub: 'RE-2026-1041 downloaded for icare submission', time: '1h ago', icon: Download },
                { title: 'Supplier Inventory Synced', sub: 'Refreshed 7 feeds including Officeworks & Bad Backs', time: '3h ago', icon: RefreshCw },
                { title: 'New Assessment Created', sub: 'Worker WRK-0084 profile initialized by Sarah Mitchell', time: 'Yesterday', icon: FilePlus }
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      backgroundColor: '#E9F0EA',
                      color: '#244A3D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#28332D' }}>
                        {act.title}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#707A73' }}>
                        {act.sub}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#9DA6A0', marginTop: '2px' }}>
                        {act.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
