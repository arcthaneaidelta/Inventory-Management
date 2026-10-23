import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Download, 
  ArrowRight, 
  Plus, 
  Filter, 
  CheckCircle2, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateInsurerReportPDF } from '../utils/pdfGenerator';

export const AssessmentHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { assessments, quotePackages, justifications, setCurrentAssessment, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = assessments.filter(a => {
    const matchesSearch = a.reference.toLowerCase().includes(search.toLowerCase()) ||
                          a.workerReference.toLowerCase().includes(search.toLowerCase()) ||
                          a.workRole.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || a.workRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleOpenQuotes = (ass: typeof assessments[0]) => {
    setCurrentAssessment(ass);
    navigate('/app/quotes');
  };

  const handleDownloadPDF = (ass: typeof assessments[0]) => {
    const pkgs = quotePackages[ass.id] || quotePackages[ass.reference];
    const pkg = pkgs ? pkgs[1] : undefined;
    if (pkg) {
      generateInsurerReportPDF(ass, pkg, justifications);
      showToast(`Exported Insurer-Ready PDF for ${ass.reference}`, 'success');
    }
  };

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
            <span className="badge badge-forest">Caseload Registry</span>
            <span style={{ fontSize: '13px', color: '#707A73' }}>
              • {assessments.length} Functional Capacity Evaluations
            </span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            Assessment History & Claim Records
          </h1>
          <p style={{ fontSize: '14px', color: '#707A73', marginTop: '2px' }}>
            Comprehensive archive of candidate evaluations, quote configurations, and exported insurer documentation.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/assessments/new')}
          className="btn btn-primary"
        >
          <Plus size={16} />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E7E8E1',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        gap: '16px'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} color="#707A73" style={{ position: 'absolute', top: 12, left: 14 }} />
          <input
            type="text"
            placeholder="Search by assessment ref (RE-xxxx), worker ref (WRK-xxxx), or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-text"
            style={{ paddingLeft: '38px' }}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="input-select"
          style={{ width: '220px' }}
        >
          <option value="All">All Occupational Roles</option>
          <option value="Administrative">Administrative</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Warehouse">Warehouse</option>
          <option value="Manufacturing">Manufacturing</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="rehab-table">
          <thead>
            <tr>
              <th>Assessment Ref</th>
              <th>Date</th>
              <th>Worker Token</th>
              <th>Role & Environment</th>
              <th>Key Restrictions</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(ass => (
              <tr key={ass.id}>
                <td>
                  <div style={{ fontWeight: 800, color: '#244A3D' }}>
                    {ass.reference}
                  </div>
                  <div style={{ fontSize: '11px', color: '#707A73' }}>
                    Consultant: {ass.consultant}
                  </div>
                </td>
                <td style={{ color: '#28332D', fontSize: '13px' }}>
                  {ass.assessmentDate}
                </td>
                <td>
                  <span className="badge badge-neutral">
                    {ass.workerReference}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#28332D', fontSize: '13px' }}>
                    {ass.workRole}
                  </div>
                  <div style={{ fontSize: '11px', color: '#707A73' }}>
                    {ass.workEnvironment}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '12px', color: '#28332D' }}>
                    Sit: {ass.posturalTolerances.sittingMinutes}m · Stand: {ass.posturalTolerances.standingMinutes}m
                  </div>
                  <div style={{ fontSize: '11px', color: '#707A73' }}>
                    Lifting: {ass.materialHandling.occasionalLiftingKg}kg limit
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
                      onClick={() => handleOpenQuotes(ass)}
                      className="btn btn-outline btn-sm"
                      title="Inspect 3 Quote Tiers"
                    >
                      <span>Quotes</span>
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(ass)}
                      className="btn btn-primary btn-sm"
                      title="Export Insurer-Ready PDF"
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
  );
};
