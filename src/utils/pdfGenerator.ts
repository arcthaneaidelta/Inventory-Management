import jsPDF from 'jspdf';
import { Assessment, QuotePackage } from '../types';

export function generateInsurerReportPDF(
  assessment: Assessment,
  selectedPackage: QuotePackage,
  justifications: Record<string, string>
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Helper colors
  const forestGreen = '#244A3D';
  const sageGreen = '#8FA99A';
  const charcoal = '#28332D';
  const slateGrey = '#707A73';
  const warmGrey = '#E7E8E1';

  let y = margin;

  // PAGE 1: COVER & ASSESSMENT SUMMARY
  // Top Header Banner
  doc.setFillColor(36, 74, 61); // #244A3D
  doc.rect(margin, y, contentWidth, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('REHABEQUIP AU', margin + 8, y + 10);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('OCCUPATIONAL REHABILITATION EQUIPMENT SOURCING & CLINICAL JUSTIFICATION REPORT', margin + 8, y + 16);

  y += 30;

  // Assessment Meta Table
  doc.setTextColor(36, 74, 61);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. EVALUATION & CONSULTANT SPECIFICATION', margin, y);
  y += 6;

  doc.setDrawColor(231, 232, 225);
  doc.setLineWidth(0.4);
  doc.line(margin, y, margin + contentWidth, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 51, 45);

  const metaRows = [
    ['Assessment Reference:', assessment.reference, 'Date of Evaluation:', assessment.assessmentDate],
    ['Rehabilitation Consultant:', assessment.consultant, 'Provider Organisation:', assessment.organisation],
    ['Worker Reference:', assessment.workerReference, 'Work Role & Setting:', `${assessment.workRole} (${assessment.workEnvironment})`],
    ['Selected Package Tier:', selectedPackage.name, 'Demonstration Inventory:', 'Verified Simulated Australian Aggregation']
  ];

  metaRows.forEach(row => {
    doc.setFont('helvetica', 'bold');
    doc.text(row[0], margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(row[1], margin + 45, y);

    doc.setFont('helvetica', 'bold');
    doc.text(row[2], margin + 95, y);
    doc.setFont('helvetica', 'normal');
    doc.text(row[3], margin + 140, y);
    y += 6.5;
  });

  y += 6;

  // Functional Restrictions Matrix
  doc.setTextColor(36, 74, 61);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('2. DOCUMENTED FUNCTIONAL CAPACITY LIMITS', margin, y);
  y += 6;
  doc.line(margin, y, margin + contentWidth, y);
  y += 7;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 51, 45);
  doc.text('Material Handling Restrictions:', margin, y);
  doc.setFont('helvetica', 'normal');
  y += 5;
  doc.text(`• Occasional Lifting: ${assessment.materialHandling.occasionalLiftingKg} kg max | Frequent Lifting: ${assessment.materialHandling.frequentLiftingKg} kg max`, margin + 4, y);
  y += 5;
  doc.text(`• Occasional Carrying: ${assessment.materialHandling.occasionalCarryingKg} kg max | Frequent Carrying: ${assessment.materialHandling.frequentCarryingKg} kg max`, margin + 4, y);
  y += 5;
  doc.text(`• Push Force: ${assessment.materialHandling.pushForceN} N max | Pull Force: ${assessment.materialHandling.pullForceN} N max`, margin + 4, y);

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.text('Postural Tolerances & Ergonomic Constraints:', margin, y);
  doc.setFont('helvetica', 'normal');
  y += 5;
  doc.text(`• Continuous Sitting Tolerance: ${assessment.posturalTolerances.sittingMinutes} minutes prior to micro-break requirement`, margin + 4, y);
  y += 5;
  doc.text(`• Continuous Standing Tolerance: ${assessment.posturalTolerances.standingMinutes} minutes prior to postural change`, margin + 4, y);
  y += 5;
  doc.text(`• Documented Restrictions: ${assessment.posturalTolerances.restrictions.join(', ')}`, margin + 4, y);

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.text('Upper Limb & Biomechanical Joint Constraints:', margin, y);
  doc.setFont('helvetica', 'normal');
  y += 5;
  doc.text(`• Grip Strength: ${assessment.upperLimbConstraints.gripStrength}`, margin + 4, y);
  y += 5;
  doc.text(`• Specific Limb Limits: ${assessment.upperLimbConstraints.constraints.join(', ')}`, margin + 4, y);
  if (assessment.upperLimbConstraints.additionalNotes) {
    y += 5;
    doc.text(`• Clinical Notes: ${assessment.upperLimbConstraints.additionalNotes}`, margin + 4, y);
  }

  // Footer Page 1
  doc.setFontSize(8);
  doc.setTextColor(112, 122, 115);
  doc.text(`RehabEquip AU · Report Ref: ${assessment.reference} · Page 1 of 3`, margin, pageHeight - 12);
  doc.text('Confidential Occupational Rehabilitation Document · For Insurer Claims Review', margin + 85, pageHeight - 12);

  // PAGE 2: ITEMIZED EQUIPMENT QUOTE & COMMERCIAL BREAKDOWN
  doc.addPage();
  y = margin;

  doc.setFillColor(36, 74, 61);
  doc.rect(margin, y, contentWidth, 14, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`3. SELECTED EQUIPMENT SPECIFICATIONS: ${selectedPackage.name.toUpperCase()}`, margin + 8, y + 9);

  y += 22;

  // Table Header
  doc.setFillColor(248, 248, 244);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setDrawColor(231, 232, 225);
  doc.rect(margin, y, contentWidth, 8, 'S');

  doc.setTextColor(40, 51, 45);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('ITEM & DESCRIPTION', margin + 4, y + 5.5);
  doc.text('SUPPLIER', margin + 78, y + 5.5);
  doc.text('QTY', margin + 115, y + 5.5);
  doc.text('UNIT (AUD)', margin + 128, y + 5.5);
  doc.text('SUBTOTAL', margin + 152, y + 5.5);

  y += 8;

  doc.setFont('helvetica', 'normal');
  selectedPackage.items.forEach((item) => {
    doc.rect(margin, y, contentWidth, 12, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(item.product.name.substring(0, 38), margin + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(112, 122, 115);
    doc.text(`${item.product.category} · Warranty: ${item.product.warrantyYears} yrs`, margin + 4, y + 9.5);

    doc.setTextColor(40, 51, 45);
    doc.setFontSize(8.5);
    doc.text(item.product.supplier.substring(0, 18), margin + 78, y + 7);
    doc.text(item.quantity.toString(), margin + 118, y + 7);
    doc.text(`$${item.product.priceAUD}`, margin + 130, y + 7);
    doc.text(`$${item.product.priceAUD * item.quantity}`, margin + 152, y + 7);

    y += 12;
  });

  y += 6;

  // Totals Box
  const totalsX = margin + 105;
  const totalsW = contentWidth - 105;

  doc.setDrawColor(231, 232, 225);
  doc.setFillColor(250, 249, 245);
  doc.roundedRect(totalsX, y, totalsW, 34, 3, 3, 'FD');

  doc.setFontSize(8.5);
  doc.setTextColor(40, 51, 45);

  doc.text('Equipment Subtotal:', totalsX + 4, y + 7);
  doc.text(`$${selectedPackage.subtotal.toFixed(2)} AUD`, totalsX + totalsW - 28, y + 7);

  doc.text('Simulated Metro Freight:', totalsX + 4, y + 14);
  doc.text(`$${selectedPackage.delivery.toFixed(2)} AUD`, totalsX + totalsW - 28, y + 14);

  doc.text('Australian GST (10%):', totalsX + 4, y + 21);
  doc.text(`$${selectedPackage.gst.toFixed(2)} AUD`, totalsX + totalsW - 28, y + 21);

  doc.setDrawColor(36, 74, 61);
  doc.line(totalsX + 4, y + 24, totalsX + totalsW - 4, y + 24);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(36, 74, 61);
  doc.text('TOTAL AUD (Inc. GST):', totalsX + 4, y + 30);
  doc.text(`$${selectedPackage.total.toFixed(2)}`, totalsX + totalsW - 28, y + 30);

  y += 44;

  // Inventory Validation Timestamp Notice
  doc.setFillColor(233, 240, 234);
  doc.roundedRect(margin, y, contentWidth, 18, 3, 3, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(36, 74, 61);
  doc.text('SUPPLIER INVENTORY VALIDATION AUDIT TRAIL', margin + 6, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 51, 45);
  doc.text('Catalogue Snapshot: Demonstration local aggregation feed · Timestamp: 2026-10-23 12:00:00 AEST', margin + 6, y + 11);
  doc.text('Trade pricing, stock quantities, and delivery schedules reflect simulated Australian merchant data.', margin + 6, y + 15);

  // Footer Page 2
  doc.setFontSize(8);
  doc.setTextColor(112, 122, 115);
  doc.text(`RehabEquip AU · Report Ref: ${assessment.reference} · Page 2 of 3`, margin, pageHeight - 12);
  doc.text('Confidential Occupational Rehabilitation Document · For Insurer Claims Review', margin + 85, pageHeight - 12);

  // PAGE 3: CLINICAL JUSTIFICATIONS & AUDIT FRAMEWORK
  doc.addPage();
  y = margin;

  doc.setFillColor(36, 74, 61);
  doc.rect(margin, y, contentWidth, 14, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('4. CLINICAL FUNCTIONAL REASONING & JUSTIFICATIONS', margin + 8, y + 9);

  y += 20;

  selectedPackage.items.forEach(item => {
    const prodJust = justifications[item.product.id] || item.itemJustification || 'Item selected in accordance with ergonomic assessment guidelines.';

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(36, 74, 61);
    doc.text(`• ${item.product.name} (${item.product.category})`, margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(40, 51, 45);

    const splitText = doc.splitTextToSize(prodJust, contentWidth - 6);
    doc.text(splitText, margin + 4, y);
    y += (splitText.length * 4) + 6;
  });

  y += 4;

  // Framework Alignment Box
  doc.setFillColor(248, 248, 244);
  doc.setDrawColor(231, 232, 225);
  doc.roundedRect(margin, y, contentWidth, 38, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(36, 74, 61);
  doc.text('DOCUMENTATION FRAMEWORK & COMPLIANCE STATEMENTS', margin + 6, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(112, 122, 115);
  doc.text('This quote and justification report has been structured to facilitate submission across Australian statutory workers compensation schemes:', margin + 6, y + 13);
  doc.text('• Comcare (Commonwealth) · icare NSW (Workers Compensation Scheme)', margin + 8, y + 18);
  doc.text('• WorkSafe Victoria · WorkCover Queensland · ReturnToWorkSA', margin + 8, y + 23);

  doc.setFont('helvetica', 'italic');
  doc.text('Disclaimer: Demonstration prototype data. Individual equipment suitability and clinical necessity must be verified by the nominated treating professional and approved by the claims manager prior to purchase order placement.', margin + 6, y + 31, { maxWidth: contentWidth - 12 });

  // Signature Block
  y += 46;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 51, 45);
  doc.text('Consultant Sign-off: _______________________________', margin, y);
  doc.text('Approval Date: ___________________', margin + 110, y);

  // Footer Page 3
  doc.setFontSize(8);
  doc.setTextColor(112, 122, 115);
  doc.text(`RehabEquip AU · Report Ref: ${assessment.reference} · Page 3 of 3`, margin, pageHeight - 12);
  doc.text('Confidential Occupational Rehabilitation Document · End of Report', margin + 95, pageHeight - 12);

  // Trigger browser download
  const filename = `RehabEquip_Report_${assessment.reference}.pdf`;
  doc.save(filename);
}
