# RehabEquip AU
### Live Inventory Aggregator & AI-Powered Clinical Quote Engine

> **The right equipment. Backed by clinical reasoning.**  
> Next-generation equipment sourcing and clinical quote generation platform designed for Australian occupational rehabilitation consultants, occupational therapists, and insurer claim frameworks.

---

## 🌟 Key Features

1. **Interactive Public Landing Page**:
   - Cinematic ambient background with 60 FPS motion canvas
   - Floating interactive product & restriction preview card
   - Narrative problem/solution workflow and 3-tier quote showcase
   - Australian privacy architecture demonstration

2. **Simulated Authentication**:
   - 1-Click instant demo access as **Sarah Mitchell** (Senior Rehabilitation Consultant, Horizon Rehabilitation Group)
   - Sign in, account creation, and password recovery states

3. **Consultant Dashboard**:
   - Key rehabilitation KPI metrics (Assessments, Generated Reports, Active Packages, Avg Turnaround 4.8 min)
   - Recent Functional Capacity Evaluation (FCE) records table with quick quote and PDF export actions
   - Real-time caseload activity stream

4. **Structured 5-Step FCE Restriction Wizard**:
   - **Step 1: Details** — Assessment reference (`RE-2026-1043`), anonymous worker token (`WRK-0084`), role, environment, and equipment categories
   - **Step 2: Material Handling** — Occasional/frequent lifting and carrying limits (kg), push/pull force (N)
   - **Step 3: Postural Tolerances** — Continuous sitting and standing tolerances (minutes) with selectable contraindication chips
   - **Step 4: Upper Limb Constraints** — Forearm pronation/supination, wrist deviation/flexion, and Jamar grip strength segmented control
   - **Step 5: Review & Evaluation** — Section summaries with direct edit shortcuts and evaluation trigger

5. **Deterministic Three-Tier Quoting Engine**:
   - **Value Package**: Cost-conscious equipment selections meeting all essential functional restrictions ($1,485 AUD approx)
   - **Rapid Fulfilment**: Prioritised for 24-48h dispatch from local Australian metropolitan hubs ($1,840 AUD approx)
   - **Premium Commercial**: AFRDI Level 6 commercial grade with 10-year warranties and maximum adjustability ($2,695 AUD approx)

6. **AI Functional Justification Engine**:
   - Itemized clinical occupational therapy rationale mapped directly to documented worker restrictions
   - Formatted for Australian statutory claims review (Comcare, icare NSW, WorkSafe Victoria)

7. **Insurer-Ready Audit Report Preview & True PDF Export**:
   - High-fidelity A4 document viewer with zoom controls, page switching, and compliance disclaimers
   - **Downloadable PDF Generator** using `jsPDF` (`RehabEquip_Report_RE-2026-1043.pdf`)

8. **Live Inventory Aggregation Feeds**:
   - Simulated real-time inventory feeds across 7 Australian retailers (Officeworks, Harvey Norman Commercial, Bunnings Trade, Ergonomic Office, Backcare & Seating, Bad Backs, Zenith Ergonomics)
   - Interactive **Refresh Inventory** action with simulated sync animations

9. **Workspace Administration, Billing & Privacy**:
   - Team member role hierarchy with invitation modal
   - Usage meters (e.g. 42 / 250 reports used) with plan switching and simulation tools
   - Sanitized AI payload inspector demonstrating Privacy-by-Design (Zero PII transmission)

---

## 🚀 Netlify Deployment

This repository is pre-configured for automated continuous deployment on **Netlify**:

### 1. Pre-configured Files
- **`netlify.toml`**: Specifies build command (`npm run build`), publish directory (`dist`), Node.js environment, and SPA routing rewrites.
- **`public/_redirects`**: Ensures single-page application client-side routes (e.g., `/app`, `/app/quotes`, `/app/reports`) resolve directly to `/index.html` with HTTP 200.

### 2. Connect to Netlify
1. Log into your [Netlify Dashboard](https://app.netlify.com/).
2. Click **"Add new site"** → **"Import an existing project"**.
3. Select **GitHub** and authorize access to `arcthaneaidelta/Inventory-Management`.
4. Netlify will automatically detect the build settings from `netlify.toml`:
   - **Base directory**: *(leave empty)*
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"**. Your site will be live in ~1 minute!

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/arcthaneaidelta/Inventory-Management.git

# Enter project directory
cd Inventory-Management

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## 🎨 Design System Palette

| Token | Hex | Role |
|---|---|---|
| Warm Ivory | `#F8F8F4` | Main page backgrounds |
| Pure White | `#FFFFFF` | Cards, modals, report preview |
| Deep Forest | `#244A3D` | Primary brand accent |
| Sage | `#8FA99A` | Secondary accents |
| Pale Sage | `#E9F0EA` | Highlighted sections & tags |
| Charcoal | `#28332D` | Primary typography |
| Slate Grey | `#707A73` | Secondary text |
| Warm Grey | `#E7E8E1` | Borders and dividers |
| Sand | `#F1EBDD` | Warm accent surfaces |
