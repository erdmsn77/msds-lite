# MSDS-Lite: Boatbuilding & Composite Workshop OHS Assistant

> **Field-Oriented, Offline-First Mobile Chemical Safety & Emergency Response Assistant**

[ 🇹🇷 Türkçe ](README.md) • [ 🇬🇧 English ](README.en.md) • [ 🇩🇪 Deutsch ](README.de.md)

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-22d3ee?style=flat-square&logo=pwa)](https://erdmsn77.github.io/msds-lite/)
[![Offline First](https://img.shields.io/badge/Offline-100%25-emerald?style=flat-square)](https://erdmsn77.github.io/msds-lite/)
[![Languages](https://img.shields.io/badge/Languages-TR%20%7C%20EN%20%7C%20DE-blue?style=flat-square)](https://erdmsn77.github.io/msds-lite/)
[![License](https://img.shields.io/badge/License-MIT%20%2F%20Open-orange?style=flat-square)](LICENSE)

* **Live Web App:** [erdmsn77.github.io/msds-lite](https://erdmsn77.github.io/msds-lite/)  
* **Important Disclaimer:** This application does not replace manufacturer-issued official Safety Data Sheets (SDS/MSDS). It is designed as a rapid, on-site quick-reference tool to enable fast, life-saving decision-making within seconds during workshop emergencies.

---

## Motivation & Project Origin

As a fiberglass boatbuilding and composite technologies student, through my practical workshop coursework and while preparing for future shipyard internships, I recognized a critical safety hazard: **the sudden panic and information retrieval barrier during direct chemical contact or accidents.**

In composite boat manufacturing (vacuum infusion, hand lay-up, vacuum bagging, mold release, and finishing), workers handle hazardous organic peroxides, promoters, and reactive resins daily. When an incident occurs (such as MEK-P splashing into the eyes):
* Workers' hands are often covered in gloves, sticky resins, or sanding dust.
* Searching through multi-page, dense SDS PDF documents on a mobile screen wastes crucial minutes.
* Many shipyard hangars, mold shops, and vessel hulls suffer from weak or nonexistent cellular reception.

**MSDS-Lite** was engineered to solve this challenge: operating without reliance on external servers or internet connectivity, delivering **the life-saving first 60 seconds of action** straight to the worker's mobile screen.

---

## Architecture & UX (2-Tier Information Model)

To eliminate cognitive overload in high-stress workshop environments, a **2-Tier Card Architecture** was designed:

### Tier 1: Field Summary Cards (Card View)
On the home screen, chemicals are quickly scanned via horizontal or vertical scroll:
* **Identification:** Commercial/workshop name, CAS registry number, and chemical class.
* **Signal Word:** International GHS standard red `DANGER` or amber `WARNING` tag.
* **GHS Pictograms:** Vector-rendered red diamond hazard symbols (Flammable, Corrosive, Toxic, Environmental Hazard, etc.).
* **Primary Hazard Statement (H-Statement):** The core hazard classification of the substance.
* **Color-Coded Risk Badges:** Concise risk summaries for Fire (red), Health (blue), and Environmental (green) hazards.
* **Mandatory Eyewash Badge:** The minimum continuous washing duration required upon exposure (`⏱ At least 15 min flush`).

### Tier 2: Rapid Emergency Drawer (Slide-in Drawer)
Tapping any chemical card reveals a smooth slide-in drawer organized into 4 critical emergency action tabs:
1. **First Aid (The First 60 Seconds):** Immediate eye, skin, inhalation, and ingestion protocols. Features a top high-visibility **Mandatory Continuous Wash Timer** alongside local emergency dispatch contacts.
2. **Fire & Response:** Certified firefighting media, **STRICTLY PROHIBITED methods** (such as high-pressure water jets that scatter burning peroxides), thermal runaway hazards, and flash points (°C).
3. **PPE Equipment (Personal Protective Equipment):** Required respiratory filters (e.g., A2 organic vapor, P3 particulate), eye/face protection, and a **Glove Compatibility Matrix** (Latex, Nitrile, Butyl/Neoprene suitability indicators).
4. **Storage & Incompatibility:** Recommended storage temperatures and strict workshop incompatibility warnings (e.g., violent explosion risk if MEK-P directly contacts Cobalt promoter).
5. **Official Verification & Source:** Direct links to certified SDS documents and regulatory health & safety dossiers (ECHA/industrial SDS).

---

## Technical & Workshop Ergonomics Highlights

* **☀️ Field (Daylight) & 🌙 Night Themes:** High-contrast light palette (`#F8FAFC` base with `#0F172A` text) ensures instant legibility under direct sunlight in open shipyard hangars. Single-tap dark theme is available for evening and night shifts (preference persisted in `localStorage`).
* **📱 Native Mobile Gesture Navigation:** In fullscreen PWA or mobile browsers, swiping back from the edge or using device hardware back buttons cleanly dismisses the drawer rather than exiting the application (implemented with `history.pushState` & `popstate` combined with touch gesture tracking).
* **🌍 Trilingual Architecture (TR / EN / DE):** Full localization across Turkish, English, and German. Curated specifically for marine and composite industrial terminology across Turkish yards and European/German boatbuilding facilities.
* **⚡ Zero External Dependencies (Pure Vanilla JS & CSS):** Completely free from third-party CSS or JS frameworks (no Tailwind, Bootstrap, React, or Vue). Under 150 KB total bundle size, ensuring instantaneous startup even on budget rugged workshop smartphones.
* **📶 100% Offline-First (PWA):** Powered by an optimized Service Worker cache. Once loaded, it functions seamlessly inside enclosed hulls, basements, or offshore with zero network connection.
* **🔗 Direct Deep-Linking:** Append chemical IDs to the URL (e.g., `/#mek-p`) to trigger specific cards directly via QR codes affixed to workshop chemical storage lockers.

---

## Chemical Coverage (11 Essential Workshop Substances)

The application covers the 11 most hazardous and commonly utilized substances in modern composite workshops:

| Chemical Name | Category | CAS No | Risk Level | Critical Workshop Precaution |
|---|---|---|---|---|
| **MEK-P** (Methyl Ethyl Ketone Peroxide) | Peroxide | 1338-23-4 | **CRITICAL** | Never mix directly with cobalt promoter (severe explosion risk). Permanent vision loss risk on eye contact; flush continuously with low-pressure water for at least 15 min. |
| **Cobalt Naphthenate** (6%) | Accelerator | 61789-51-3 | **CRITICAL** | Store in a dedicated cabinet away from peroxides. Potent skin sensitizer; requires at least 20 min wash upon contact. |
| **Orthophthalic Polyester Resin** | Resin | 25032-83-3 | **HIGH** | Contains styrene monomer. Never use acetone for skin cleaning (acetone pushes the chemical deeper into skin pores). |
| **Vinyl Ester Resin** | Resin | 36425-15-7 | **HIGH** | Highly reactive resin. A2 organic vapor filter and chemical-resistant nitrile gloves are mandatory. |
| **Epoxy Resin (DGEBA)** | Resin | 25068-38-6 | **HIGH** | Strong skin sensitizer; repeated exposure causes lifelong occupational contact dermatitis. Latex is permeable; use nitrile. |
| **Epoxy Hardener (IPDA)** | Hardener | 2855-13-2 | **CRITICAL** | Corrosive aliphatic amine. Mixing large batches in deep pots creates dangerous exothermic thermal runaway (intense heat and smoke). |
| **Technical Acetone** | Solvent | 67-64-1 | **MEDIUM** | Extremely low flash point (-17°C). Strictly forbidden for skin cleaning; use solely for tool and brush washing. |
| **Carbon Fiber Dust** | Dust & Fiber | 7440-44-0 | **HIGH** | Microscopic airborne fibers scratch the cornea during mechanical cutting/sanding. Wear P3/FFP3 masks. Vacuum; do not sweep. |
| **Gelcoat (Isophthalic)** | Resin | 25032-83-3 | **HIGH** | Contains styrene and pigments. A full-face respirator with combined A2P3 filters is required during spray application. |
| **PVA Release Agent** | Release Agent | 9002-89-5 | **MEDIUM** | Alcohol carrier produces flammable vapors. Easily removed from skin by washing thoroughly with water. |
| **Mold Release Wax** | Release Agent | 64742-88-7 | **MEDIUM** | Formulated with petroleum distillates and carnauba wax. Ensure adequate ventilation when buffing large hull surfaces. |

---

## Installation & Local Development

Because MSDS-Lite is built with pure static files, no bundlers, transpilers, or package managers (`npm`, `yarn`, `webpack`, etc.) are needed.

1. Clone the repository:
   ```bash
   git clone https://github.com/erdmsn77/msds-lite.git
   cd msds-lite
   ```
2. Start a local HTTP server (required for Service Worker and CORS-compliant JSON loading):
   ```bash
   # Using Python:
   python -m http.server 4173

   # Or using Node.js:
   npx http-server . -p 4173
   ```
3. Open in your browser:
   ```
   http://localhost:4173/index.html
   ```

---

## Installing on Mobile Devices (PWA)

Run MSDS-Lite directly from your device home screen with native app performance and complete offline capability:

* **Android (Chrome):** Visit the [live demo](https://erdmsn77.github.io/msds-lite/), tap the three dots in the upper-right corner, and select **"Install app"** or **"Add to Home Screen"**.
* **iOS / iPhone (Safari):** Open the live URL in Safari, tap the **Share** button at the bottom, and select **"Add to Home Screen"**.

---

## Data Integrity & Synchronization Architecture

* **Dual-Source Sync Guarantee:** All chemical records are maintained identically in both `data/chemicals.json` and the inline `fallbackChemicals` array within `index.html`. This ensures the app works flawlessly even if opened directly via the local `file://` protocol without a web server.
* **Technical Rigor:** Data is strictly grounded in official manufacturer Safety Data Sheets, OSHA standards, and ECHA dossiers—avoiding fabricated or estimated chemical properties.

---

## License & Contact

This project is open-source under the MIT License.

For internships, industry projects, or collaboration in fiberglass boatbuilding, yacht construction, composite materials, and occupational health & safety (OHS):

* **Developer:** Erdem Doğan ([@erdmsn77](https://github.com/erdmsn77))
* **Live Application:** [https://erdmsn77.github.io/msds-lite/](https://erdmsn77.github.io/msds-lite/)
