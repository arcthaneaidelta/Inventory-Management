import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Save, 
  Edit3, 
  AlertCircle, 
  Info,
  PackageCheck,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Assessment, WorkRole, WorkEnvironment, GripStrengthLevel } from '../types';
import { QuoteGenerationModal } from '../components/common/QuoteGenerationModal';

export const FCEWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const { saveAssessment, generateQuotesForAssessment, showToast, setCurrentAssessment } = useApp();

  const [step, setStep] = useState<number>(1);
  const [showGenerateModal, setShowGenerateModal] = useState<boolean>(false);

  // Form State initialized with realistic clinical demonstration defaults
  const [assessment, setAssessmentState] = useState<Assessment>({
    id: 'ass-1043',
    reference: 'RE-2026-1043',
    consultant: 'Sarah Mitchell',
    organisation: 'Horizon Rehabilitation Group',
    workerReference: 'WRK-0084',
    assessmentDate: '2026-10-23',
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
      additionalNotes: 'Worker experiences cervical tension and paresthesia with sustained keyboard reach beyond neutral zone.'
    },
    status: 'Draft',
    createdAt: new Date().toISOString()
  });

  const availableCategories = [
    'Ergonomic Seating',
    'Height-Adjustable Desks',
    'Monitor Arms',
    'Keyboard & Mouse',
    'Footrests',
    'Lifting Aids',
    'Standing Support'
  ];

  const availablePosturalRestrictions = [
    'No Squatting',
    'No Kneeling',
    'No Overhead Reaching',
    'Avoid Prolonged Forward Flexion',
    'Avoid Repetitive Bending',
    'Avoid Sustained Static Postures',
    'Limited Stair Climbing',
    'Limited Walking',
    'Frequent Position Changes Required',
    'Micro-Breaks Required'
  ];

  const availableUpperLimbConstraints = [
    'Avoid Repetitive Pronation',
    'Avoid Repetitive Supination',
    'Avoid Sustained Wrist Extension',
    'Avoid Sustained Wrist Flexion',
    'Avoid Repetitive Wrist Deviation',
    'Avoid Forceful Wrist Movements',
    'Limited Repetitive Gripping',
    'Avoid Sustained Pinch Grip'
  ];

  const gripStrengthOptions: GripStrengthLevel[] = [
    'Normal',
    'Mildly Reduced',
    'Moderately Reduced',
    'Severely Reduced'
  ];

  const toggleCategory = (cat: string) => {
    setAssessmentState(prev => {
      const exists = prev.equipmentCategories.includes(cat);
      const updated = exists 
        ? prev.equipmentCategories.filter(c => c !== cat)
        : [...prev.equipmentCategories, cat];
      return { ...prev, equipmentCategories: updated };
    });
  };

  const togglePosturalRestriction = (item: string) => {
    setAssessmentState(prev => {
      const exists = prev.posturalTolerances.restrictions.includes(item);
      const updated = exists
        ? prev.posturalTolerances.restrictions.filter(r => r !== item)
        : [...prev.posturalTolerances.restrictions, item];
      return {
        ...prev,
        posturalTolerances: { ...prev.posturalTolerances, restrictions: updated }
      };
    });
  };

  const toggleUpperConstraint = (item: string) => {
    setAssessmentState(prev => {
      const exists = prev.upperLimbConstraints.constraints.includes(item);
      const updated = exists
        ? prev.upperLimbConstraints.constraints.filter(c => c !== item)
        : [...prev.upperLimbConstraints.constraints, item];
      return {
        ...prev,
        upperLimbConstraints: { ...prev.upperLimbConstraints, constraints: updated }
      };
    });
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSaveDraft = () => {
    saveAssessment(assessment);
  };

  const handleTriggerGenerate = () => {
    setShowGenerateModal(true);
  };

  const handleViewPackages = async () => {
    setShowGenerateModal(false);
    await generateQuotesForAssessment(assessment);
    setCurrentAssessment(assessment);
    navigate('/app/quotes');
  };

  const stepsHeader = [
    { num: 1, title: 'Details' },
    { num: 2, title: 'Material Handling' },
    { num: 3, title: 'Postures' },
    { num: 4, title: 'Upper Limbs' },
    { num: 5, title: 'Review & Match' }
  ];

  return (
    <div style={{ padding: '32px 36px', maxWidth: 1040, margin: '0 auto' }}>
      {/* Top Breadcrumb & Wizard Stepper */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-forest">FCE Restriction Wizard</span>
              <span style={{ fontSize: '12.5px', color: '#707A73' }}>• Step {step} of 5</span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
              Functional Capacity Assessment & Matching
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleSaveDraft} className="btn btn-outline btn-sm">
              <Save size={14} />
              <span>Save Draft</span>
            </button>
            <button onClick={() => navigate('/app')} className="btn btn-ghost btn-sm">
              Cancel
            </button>
          </div>
        </div>

        {/* Progress Bar / Stepper */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          backgroundColor: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: '16px',
          border: '1px solid #E7E8E1'
        }}>
          {stepsHeader.map(s => {
            const isDone = s.num < step;
            const isCurrent = s.num === step;
            return (
              <div
                key={s.num}
                onClick={() => setStep(s.num)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  opacity: isDone || isCurrent ? 1 : 0.45,
                  borderBottom: isCurrent ? '2px solid #244A3D' : '2px solid transparent',
                  paddingBottom: '6px'
                }}
              >
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  backgroundColor: isDone ? '#244A3D' : isCurrent ? '#E9F0EA' : '#F2F3EC',
                  color: isDone ? '#FFFFFF' : '#244A3D',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isDone ? <Check size={12} strokeWidth={3} /> : s.num}
                </div>
                <span style={{ fontSize: '13px', fontWeight: isCurrent ? 700 : 500, color: '#28332D' }}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="card card-large" style={{ marginBottom: '28px' }}>
        {/* STEP 1: ASSESSMENT DETAILS */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>
                Step 1: Assessment & Workplace Details
              </h2>
              <p style={{ fontSize: '14px', color: '#707A73' }}>
                Capture administrative evaluation metadata and candidate equipment categories.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div className="input-group">
                <label className="input-label">Assessment Reference</label>
                <input
                  type="text"
                  disabled
                  value={assessment.reference}
                  className="input-text"
                />
                <span className="input-helper">Auto-generated unique clinical identifier</span>
              </div>

              <div className="input-group">
                <label className="input-label">Worker Reference (Anonymous)</label>
                <input
                  type="text"
                  value={assessment.workerReference}
                  onChange={(e) => setAssessmentState({ ...assessment, workerReference: e.target.value })}
                  className="input-text"
                  placeholder="e.g. WRK-0084"
                />
                <span className="input-helper">Do not enter personal names (Privacy-by-Design)</span>
              </div>

              <div className="input-group">
                <label className="input-label">Rehabilitation Consultant</label>
                <input
                  type="text"
                  disabled
                  value={assessment.consultant}
                  className="input-text"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Provider Organisation</label>
                <input
                  type="text"
                  disabled
                  value={assessment.organisation}
                  className="input-text"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Work Role</label>
                <select
                  value={assessment.workRole}
                  onChange={(e) => setAssessmentState({ ...assessment, workRole: e.target.value as WorkRole })}
                  className="input-select"
                >
                  <option value="Administrative">Administrative / Office Desk Work</option>
                  <option value="Healthcare">Healthcare & Clinical Support</option>
                  <option value="Warehouse">Warehouse & Logistics</option>
                  <option value="Manufacturing">Manufacturing & Assembly</option>
                  <option value="Retail">Retail & Customer Service</option>
                  <option value="Construction">Construction & Trades</option>
                  <option value="Other">Other Occupational Setting</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Workplace Environment</label>
                <select
                  value={assessment.workEnvironment}
                  onChange={(e) => setAssessmentState({ ...assessment, workEnvironment: e.target.value as WorkEnvironment })}
                  className="input-select"
                >
                  <option value="Office">Commercial Office</option>
                  <option value="Home Office">Home Office Workstation</option>
                  <option value="Warehouse">Distribution Hub / Warehouse</option>
                  <option value="Clinical Environment">Clinical Practice / Hospital</option>
                  <option value="Retail Environment">Retail Storefront</option>
                  <option value="Industrial Environment">Industrial Workshop</option>
                  <option value="Other">Specialised Workplace</option>
                </select>
              </div>
            </div>

            {/* Equipment Categories Multi-Select */}
            <div>
              <label className="input-label" style={{ marginBottom: '10px', display: 'block' }}>
                Relevant Equipment Categories Under Review
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {availableCategories.map(cat => {
                  const isSelected = assessment.equipmentCategories.includes(cat);
                  return (
                    <div
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`selectable-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div style={{
                        width: 18,
                        height: 18,
                        borderRadius: '4px',
                        border: isSelected ? 'none' : '1.5px solid #E7E8E1',
                        backgroundColor: isSelected ? '#244A3D' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF'
                      }}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: isSelected ? 600 : 500, color: '#28332D' }}>
                        {cat}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: MATERIAL HANDLING CAPACITY */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>
                Step 2: Material Handling Capacity
              </h2>
              <p style={{ fontSize: '14px', color: '#707A73' }}>
                Enter the maximum functional limits documented in the formal evaluation.
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#FAF9F5',
              borderRadius: '12px',
              border: '1px solid #E7E8E1',
              marginBottom: '28px',
              fontSize: '13px',
              color: '#707A73'
            }}>
              <Info size={18} color="#244A3D" style={{ flexShrink: 0 }} />
              <span>
                These values are illustrative decision-support parameters. The platform filters out catalogue equipment requiring operational exertion above these limits.
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
              {/* Lifting Limits */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E7E8E1' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#28332D', marginBottom: '14px' }}>
                  Lifting Limits (Floor to Bench)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">Maximum Occasional Lifting (kg)</label>
                    <input
                      type="number"
                      min={1}
                      max={80}
                      value={assessment.materialHandling.occasionalLiftingKg}
                      onChange={(e) => setAssessmentState({
                        ...assessment,
                        materialHandling: { ...assessment.materialHandling, occasionalLiftingKg: Number(e.target.value) }
                      })}
                      className="input-text"
                    />
                    <span className="input-helper">Up to 33% of working day (Default: 10 kg)</span>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Maximum Frequent Lifting (kg)</label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={assessment.materialHandling.frequentLiftingKg}
                      onChange={(e) => setAssessmentState({
                        ...assessment,
                        materialHandling: { ...assessment.materialHandling, frequentLiftingKg: Number(e.target.value) }
                      })}
                      className="input-text"
                    />
                    <span className="input-helper">34% to 66% of working day (Default: 5 kg)</span>
                  </div>
                </div>
              </div>

              {/* Carrying Limits */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E7E8E1' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#28332D', marginBottom: '14px' }}>
                  Carrying Limits (Up to 10 metres)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">Maximum Occasional Carrying (kg)</label>
                    <input
                      type="number"
                      min={1}
                      max={80}
                      value={assessment.materialHandling.occasionalCarryingKg}
                      onChange={(e) => setAssessmentState({
                        ...assessment,
                        materialHandling: { ...assessment.materialHandling, occasionalCarryingKg: Number(e.target.value) }
                      })}
                      className="input-text"
                    />
                    <span className="input-helper">Default: 8 kg</span>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Maximum Frequent Carrying (kg)</label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={assessment.materialHandling.frequentCarryingKg}
                      onChange={(e) => setAssessmentState({
                        ...assessment,
                        materialHandling: { ...assessment.materialHandling, frequentCarryingKg: Number(e.target.value) }
                      })}
                      className="input-text"
                    />
                    <span className="input-helper">Default: 4 kg</span>
                  </div>
                </div>
              </div>

              {/* Push / Pull Force */}
              <div style={{ gridColumn: 'span 2', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '14px', border: '1px solid #E7E8E1' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#28332D', marginBottom: '14px' }}>
                  Push and Pull Force Capacities (Horizontal Initial & Sustained)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="input-group">
                    <label className="input-label">Maximum Push Force (Newtons)</label>
                    <input
                      type="number"
                      min={10}
                      max={300}
                      value={assessment.materialHandling.pushForceN}
                      onChange={(e) => setAssessmentState({
                        ...assessment,
                        materialHandling: { ...assessment.materialHandling, pushForceN: Number(e.target.value) }
                      })}
                      className="input-text"
                    />
                    <span className="input-helper">Measured via dynamometer (Default: 50 N)</span>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Maximum Pull Force (Newtons)</label>
                    <input
                      type="number"
                      min={10}
                      max={300}
                      value={assessment.materialHandling.pullForceN}
                      onChange={(e) => setAssessmentState({
                        ...assessment,
                        materialHandling: { ...assessment.materialHandling, pullForceN: Number(e.target.value) }
                      })}
                      className="input-text"
                    />
                    <span className="input-helper">Measured via dynamometer (Default: 40 N)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: POSTURAL TOLERANCES */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>
                Step 3: Postural Tolerances & Ergonomic Constraints
              </h2>
              <p style={{ fontSize: '14px', color: '#707A73' }}>
                Define how long the worker can maintain a posture before a micro-break is required.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
              <div className="card" style={{ padding: '20px', backgroundColor: '#FAF9F5' }}>
                <label className="input-label" style={{ fontSize: '14px' }}>
                  Continuous Sitting Tolerance
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    step={5}
                    value={assessment.posturalTolerances.sittingMinutes}
                    onChange={(e) => setAssessmentState({
                      ...assessment,
                      posturalTolerances: { ...assessment.posturalTolerances, sittingMinutes: Number(e.target.value) }
                    })}
                    className="input-text"
                    style={{ fontSize: '18px', fontWeight: 700, width: '120px' }}
                  />
                  <span style={{ fontSize: '14px', color: '#28332D', fontWeight: 600 }}>minutes</span>
                </div>
                <p style={{ fontSize: '12px', color: '#707A73', marginTop: '6px' }}>
                  {assessment.posturalTolerances.sittingMinutes <= 30 
                    ? 'Indicates high clinical need for sit-stand adjustable workstation.' 
                    : 'Standard commercial seating adjustability acceptable.'}
                </p>
              </div>

              <div className="card" style={{ padding: '20px', backgroundColor: '#FAF9F5' }}>
                <label className="input-label" style={{ fontSize: '14px' }}>
                  Continuous Standing Tolerance
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    step={5}
                    value={assessment.posturalTolerances.standingMinutes}
                    onChange={(e) => setAssessmentState({
                      ...assessment,
                      posturalTolerances: { ...assessment.posturalTolerances, standingMinutes: Number(e.target.value) }
                    })}
                    className="input-text"
                    style={{ fontSize: '18px', fontWeight: 700, width: '120px' }}
                  />
                  <span style={{ fontSize: '14px', color: '#28332D', fontWeight: 600 }}>minutes</span>
                </div>
                <p style={{ fontSize: '12px', color: '#707A73', marginTop: '6px' }}>
                  {assessment.posturalTolerances.standingMinutes <= 20 
                    ? 'Anti-fatigue standing mat recommended to cushion calcaneal pressure.' 
                    : 'Normal standing tolerance.'}
                </p>
              </div>
            </div>

            {/* Postural Restrictions Card Grid */}
            <div>
              <label className="input-label" style={{ marginBottom: '12px', display: 'block' }}>
                Documented Postural Contraindications (Select All Configured Restrictions)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {availablePosturalRestrictions.map(res => {
                  const isSelected = assessment.posturalTolerances.restrictions.includes(res);
                  return (
                    <div
                      key={res}
                      onClick={() => togglePosturalRestriction(res)}
                      className={`selectable-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: '6px',
                        border: isSelected ? 'none' : '1.5px solid #E7E8E1',
                        backgroundColor: isSelected ? '#244A3D' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        flexShrink: 0
                      }}>
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span style={{ fontSize: '13.5px', fontWeight: isSelected ? 600 : 500, color: '#28332D' }}>
                        {res}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: UPPER LIMB & JOINT CONSTRAINTS */}
        {step === 4 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>
                Step 4: Upper Limb & Biomechanical Joint Constraints
              </h2>
              <p style={{ fontSize: '14px', color: '#707A73' }}>
                Identify distal limb restrictions to guide ergonomic input device selection.
              </p>
            </div>

            {/* Grip Strength Segmented Control */}
            <div style={{ marginBottom: '28px' }}>
              <label className="input-label" style={{ marginBottom: '10px', display: 'block' }}>
                Grip Strength Evaluation (Jamar Dynamometer Ratio)
              </label>
              <div className="segmented-control" style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {gripStrengthOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAssessmentState({
                      ...assessment,
                      upperLimbConstraints: { ...assessment.upperLimbConstraints, gripStrength: opt }
                    })}
                    className={`segmented-button ${assessment.upperLimbConstraints.gripStrength === opt ? 'active' : ''}`}
                    style={{ textAlign: 'center', padding: '10px 0' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <span className="input-helper" style={{ display: 'block', marginTop: '6px' }}>
                Current selection: {assessment.upperLimbConstraints.gripStrength} — triggers vertical low-actuation mice and padded wave keyboards.
              </span>
            </div>

            {/* Forearm & Wrist Checkboxes */}
            <div style={{ marginBottom: '28px' }}>
              <label className="input-label" style={{ marginBottom: '12px', display: 'block' }}>
                Forearm, Wrist, & Digit Biomechanical Constraints
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {availableUpperLimbConstraints.map(con => {
                  const isSelected = assessment.upperLimbConstraints.constraints.includes(con);
                  return (
                    <div
                      key={con}
                      onClick={() => toggleUpperConstraint(con)}
                      className={`selectable-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div style={{
                        width: 18,
                        height: 18,
                        borderRadius: '4px',
                        border: isSelected ? 'none' : '1.5px solid #E7E8E1',
                        backgroundColor: isSelected ? '#244A3D' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        flexShrink: 0
                      }}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: isSelected ? 600 : 500, color: '#28332D' }}>
                        {con}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Clinical Notes */}
            <div className="input-group">
              <label className="input-label">Additional Functional Restrictions / Observations (Optional)</label>
              <textarea
                rows={3}
                value={assessment.upperLimbConstraints.additionalNotes || ''}
                onChange={(e) => setAssessmentState({
                  ...assessment,
                  upperLimbConstraints: { ...assessment.upperLimbConstraints, additionalNotes: e.target.value }
                })}
                placeholder="Enter any specific ergonomic observations documented during the physical assessment..."
                className="input-textarea"
              />
              <span className="input-helper">
                Do not include worker identifying names or medical record numbers.
              </span>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & GENERATE QUOTES */}
        {step === 5 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#28332D', marginBottom: '6px' }}>
                Step 5: Review & Evaluate Restriction Profile
              </h2>
              <p style={{ fontSize: '14px', color: '#707A73' }}>
                Verify all documented capacities prior to running the demonstration matching engine.
              </p>
            </div>

            {/* Assessment Review Summary Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              {/* Section 1 Review */}
              <div style={{
                padding: '18px',
                borderRadius: '12px',
                border: '1px solid #E7E8E1',
                backgroundColor: '#FAF9F5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#28332D', marginBottom: '4px' }}>
                    Assessment & Worker Setting
                  </h4>
                  <p style={{ fontSize: '13px', color: '#707A73' }}>
                    Ref: <strong>{assessment.reference}</strong> · Worker: <strong>{assessment.workerReference}</strong> · Role: {assessment.workRole} ({assessment.workEnvironment})
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {assessment.equipmentCategories.map(c => (
                      <span key={c} className="badge badge-forest">{c}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="btn btn-ghost btn-sm" style={{ color: '#244A3D' }}>
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
              </div>

              {/* Section 2 Review */}
              <div style={{
                padding: '18px',
                borderRadius: '12px',
                border: '1px solid #E7E8E1',
                backgroundColor: '#FAF9F5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#28332D', marginBottom: '4px' }}>
                    Material Handling Capacities
                  </h4>
                  <p style={{ fontSize: '13px', color: '#707A73' }}>
                    Occasional Lifting: <strong>{assessment.materialHandling.occasionalLiftingKg} kg</strong> · Frequent: <strong>{assessment.materialHandling.frequentLiftingKg} kg</strong> · Carrying: {assessment.materialHandling.occasionalCarryingKg} kg · Push/Pull: {assessment.materialHandling.pushForceN}N / {assessment.materialHandling.pullForceN}N
                  </p>
                </div>
                <button onClick={() => setStep(2)} className="btn btn-ghost btn-sm" style={{ color: '#244A3D' }}>
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
              </div>

              {/* Section 3 Review */}
              <div style={{
                padding: '18px',
                borderRadius: '12px',
                border: '1px solid #E7E8E1',
                backgroundColor: '#FAF9F5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#28332D', marginBottom: '4px' }}>
                    Postural Tolerances & Restrictions
                  </h4>
                  <p style={{ fontSize: '13px', color: '#707A73', marginBottom: '6px' }}>
                    Sitting: <strong>{assessment.posturalTolerances.sittingMinutes} min max</strong> · Standing: <strong>{assessment.posturalTolerances.standingMinutes} min max</strong>
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {assessment.posturalTolerances.restrictions.map(r => (
                      <span key={r} className="badge badge-sand">{r}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep(3)} className="btn btn-ghost btn-sm" style={{ color: '#244A3D' }}>
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
              </div>

              {/* Section 4 Review */}
              <div style={{
                padding: '18px',
                borderRadius: '12px',
                border: '1px solid #E7E8E1',
                backgroundColor: '#FAF9F5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#28332D', marginBottom: '4px' }}>
                    Upper Limb & Grip Strength
                  </h4>
                  <p style={{ fontSize: '13px', color: '#707A73', marginBottom: '6px' }}>
                    Grip Strength: <strong>{assessment.upperLimbConstraints.gripStrength}</strong>
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {assessment.upperLimbConstraints.constraints.map(c => (
                      <span key={c} className="badge badge-sage">{c}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep(4)} className="btn btn-ghost btn-sm" style={{ color: '#244A3D' }}>
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
              </div>
            </div>

            {/* Confirmation Banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 20px',
              backgroundColor: '#E9F0EA',
              borderRadius: '14px',
              border: '1px solid #D5E2D8',
              marginBottom: '28px'
            }}>
              <Sparkles size={22} color="#244A3D" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#244A3D' }}>
                  Ready to evaluate against 7 Australian supplier inventories
                </div>
                <div style={{ fontSize: '12.5px', color: '#707A73' }}>
                  The engine will assemble three distinct quote tiers (Value, Rapid Fulfilment, and Premium Commercial) and synthesize audit-ready clinical justifications.
                </div>
              </div>
            </div>

            {/* Generate CTA Button */}
            <button
              onClick={handleTriggerGenerate}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', fontSize: '16px', padding: '16px' }}
            >
              <PackageCheck size={20} />
              <span>Generate Three Quote Packages</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* BOTTOM NAVIGATION CONTROLS */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid #E7E8E1'
        }}>
          {step > 1 ? (
            <button onClick={handleBack} className="btn btn-outline">
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button onClick={handleNext} className="btn btn-primary">
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSaveDraft} className="btn btn-secondary">
              <Save size={16} />
              <span>Save Assessment</span>
            </button>
          )}
        </div>
      </div>

      {/* QUOTE GENERATION MODAL */}
      <QuoteGenerationModal
        isOpen={showGenerateModal}
        assessment={assessment}
        onViewPackages={handleViewPackages}
        onReviewAssessment={() => setShowGenerateModal(false)}
        onGenerateReport={() => {
          setShowGenerateModal(false);
          saveAssessment(assessment);
          navigate('/app/reports');
        }}
      />
    </div>
  );
};
