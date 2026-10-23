import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  PackageCheck,
  Building2,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Assessment, QuotePackage } from '../../types';

interface QuoteGenerationModalProps {
  assessment: Assessment;
  isOpen: boolean;
  onViewPackages: () => void;
  onReviewAssessment: () => void;
  onGenerateReport: () => void;
}

const STAGES = [
  { id: 1, title: 'Validating Restriction Profile', desc: 'Cross-referencing documented lifting, postural, and joint tolerances' },
  { id: 2, title: 'Matching Equipment Specifications', desc: 'Filtering ergonomic catalogue for weight ratings and adjustability ranges' },
  { id: 3, title: 'Comparing Supplier Inventory', desc: 'Querying demonstration feeds across 7 Australian supplier channels' },
  { id: 4, title: 'Evaluating Pricing & Fulfilment', desc: 'Optimising trade pricing, dispatch lead-times, and GST components' },
  { id: 5, title: 'Assembling Three Quote Packages', desc: 'Finalising Value, Rapid Fulfilment, and Premium Commercial packages' }
];

export const QuoteGenerationModal: React.FC<QuoteGenerationModalProps> = ({
  assessment,
  isOpen,
  onViewPackages,
  onReviewAssessment,
  onGenerateReport
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStageIndex(0);
      setIsComplete(false);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStageIndex(prev => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#244A3D', '#8FA99A', '#C49B55', '#D5E2D8']
            });
          } catch (e) {
            // fallback if confetti fails
          }
          return prev;
        }
      });
    }, 550);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: 580, padding: 36 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            backgroundColor: '#E9F0EA',
            color: '#244A3D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            border: '1px solid #D5E2D8'
          }}>
            {isComplete ? (
              <PackageCheck size={28} color="#244A3D" />
            ) : (
              <Sparkles size={28} color="#244A3D" />
            )}
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#28332D', letterSpacing: '-0.02em' }}>
            {isComplete ? 'Three Quote Packages Ready' : 'Evaluating Clinical Matching Engine'}
          </h2>
          <p style={{ fontSize: '14px', color: '#707A73', marginTop: '4px' }}>
            {isComplete 
              ? `Demonstration quotes synthesized for Assessment ${assessment.reference}`
              : `Analyzing worker profile ${assessment.workerReference} against commercial equipment catalogue`}
          </p>
        </div>

        {/* Sequential Stages Progress List */}
        <div style={{
          backgroundColor: '#FAF9F5',
          borderRadius: '16px',
          border: '1px solid #E7E8E1',
          padding: '16px 20px',
          marginBottom: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {STAGES.map((stage, idx) => {
            const isPast = isComplete || idx < currentStageIndex;
            const isCurrent = !isComplete && idx === currentStageIndex;

            return (
              <div
                key={stage.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  opacity: isPast || isCurrent ? 1 : 0.45,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px'
                }}>
                  {isPast ? (
                    <CheckCircle2 size={20} color="#244A3D" />
                  ) : isCurrent ? (
                    <Loader2 size={18} color="#244A3D" style={{ animation: 'spin 1.2s linear infinite' }} />
                  ) : (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#E7E8E1' }} />
                  )}
                </div>

                <div>
                  <div style={{
                    fontSize: '13.5px',
                    fontWeight: isPast || isCurrent ? 700 : 500,
                    color: '#28332D'
                  }}>
                    {stage.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#707A73', marginTop: '1px' }}>
                    {stage.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions when complete */}
        {isComplete ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={onViewPackages}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>View Three Quote Packages</span>
              <ArrowRight size={18} />
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={onGenerateReport}
                className="btn btn-secondary"
                style={{ justifyContent: 'center' }}
              >
                <FileText size={16} />
                <span>Audit Report Preview</span>
              </button>
              <button
                onClick={onReviewAssessment}
                className="btn btn-outline"
                style={{ justifyContent: 'center' }}
              >
                Review Assessment
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '12px', color: '#707A73' }}>
            Synthesizing deterministic demonstration recommendations...
          </div>
        )}
      </div>
    </div>
  );
};
