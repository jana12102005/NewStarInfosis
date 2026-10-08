# New Star Infosis — Developer-First Corporate Website (Bytewax Design System)

> A modern, developer-grade corporate website for **New Star Infosis** built strictly with **HTML5, CSS3, and Vanilla JavaScript**. Re-themed to the **Bytewax Design System** featuring a bright white canvas, near-black Inter typography, a high-voltage yellow accent (`#fab90f`), flat hairline borders, zero box shadows, two-tone yellow+black CTA button pairing, and an interactive monospace install pill.

---

## 🌟 Key Highlights & Design Characteristics

- **Pure Front-End Architecture:** 100% Vanilla HTML5, CSS3, and JavaScript — zero external frameworks, zero Node.js/React dependencies.
- **Bytewax-Inspired Design System (`DESIGN-bytewax.md`):**
  - **White Canvas Floor:** Clean `#ffffff` canvas with `#fafafa` subtle section alternating.
  - **Single High-Voltage Accent:** Brand yellow (`#fab90f`) used with deliberate scarcity for CTA buttons and headline emphasis.
  - **Inter Typography:** Single-family Inter across display, title, body, and button roles. Signature 72px / 700 / -0.72px tracking hero headline whose second line flips to brand yellow.
  - **Flat Elevation (`shadows: []`):** Depth communicated purely via 1px hairline borders (`#e5e5e5`) and light gray fills. Zero drop shadows anywhere in the system.
  - **Two-Tone CTA Pairing:** Accent yellow button (`btn-accent`) paired side-by-side with pure black button (`btn-dark`), both with tight 6px border radii (`--radius-sm`).
  - **Interactive Monospace Install Pill:** `$ pip install newstar-engine` on `#e5e5e5` with one-click copy-to-clipboard functionality.
  - **Feature Cards (`--radius-lg` 12px):** 3-up responsive desktop grid with clean line-icons, 20px / 600 titles, 18px body descriptions, and uppercase muted action links (`EXPLORE SERVICE →`).
- **Dynamic Interactions:**
  - Animated stats counters with IntersectionObserver
  - High-voltage yellow marquee brand band
  - Project gallery with live category filtering and modal case study popups
  - Real-time client-side form validations with custom toast notifications
  - Direct WhatsApp integration with phone **+91 9384303044**
  - Developer mode theme toggle with LocalStorage persistence
  - Scroll progress indicator and floating back-to-top button

---

## 📂 Project Structure

```text
new star infosis/
│
├── index.html            # Home: 72px two-tone hero, install pill, yellow+black CTAs, feature cards
├── about.html            # About Us: Mission, vision, founded 2024, leadership, research centers
├── services.html         # Services: 9 specialized domains, technical stacks & direct inquiries
├── projects.html         # Projects: Filterable gallery, case studies, technical stacks & demos
├── contact.html          # Contact: Direct phone 9384303044, WhatsApp chat, contact form, hours
│
├── css/
│   ├── style.css         # Bytewax design tokens (white canvas, #fab90f accent, flat hairline borders)
│   ├── responsive.css    # Responsive breakpoints (desktop 3-up, tablet 2-up, mobile drawer)
│   └── animations.css    # Keyframes (marquee, smooth reveals, transitions, toast popups)
│
├── js/
│   ├── main.js           # Install pill clipboard copy, theme toggle, stats counter, toast engine
│   ├── navigation.js     # Sticky header, mobile hamburger drawer, active link detection
│   ├── projects.js       # Dynamic category filtering, projects dataset, case study modal
│   ├── forms.js          # Contact form validation & direct WhatsApp message dispatch
│   └── animations.js     # IntersectionObserver scroll reveal engine
│
├── assets/
│   ├── images/           # High-resolution 3D engineering renders & lab visuals
│   │   ├── hero-tech.jpg
│   │   ├── ai-ml.jpg
│   │   ├── bioinformatics.jpg
│   │   ├── iot-cloud.jpg
│   │   ├── web-mobile.jpg
│   │   ├── computational-tools.jpg
│   │   └── team-lab.jpg
│   ├── logo/             # Official New Star Infosis branding & vector SVGs
│   │   ├── logo.png      # Original high-res emblem
│   │   ├── logo.svg      # Scalable vector logo
│   │   └── logo-mark.svg # Icon mark and favicon
│   ├── icons/            # Lucide SVG icon fallbacks
│   └── videos/           # Media video assets
│
├── DESIGN-bytewax.md     # Official Bytewax design system specification
└── README.md             # Project documentation and guide
```

---

## 🚀 How to Run the Website

### Method 1: VS Code with Live Server (Recommended)

1. Open **Visual Studio Code**.
2. Click **File** > **Open Folder...** and select `c:\Users\dnavi\Downloads\new star infosis`.
3. If not already installed, install the **Live Server** extension (by *Ritwick Dey*) from the VS Code Extensions tab (`Ctrl+Shift+X`).
4. In the File Explorer pane, right-click `index.html` and select **"Open with Live Server"**.
5. Your default web browser will automatically open:
   ```text
   http://127.0.0.1:5500/index.html
   ```

### Method 2: Direct Browser Execution

Since the project uses purely native HTML, CSS, and JavaScript with zero build steps, you can double-click `index.html` in Windows Explorer to open it directly in any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

---

## 🛠️ The 9 Specialized Engineering Services

1. **AI & Machine Learning:** Autonomous multi-agent pipelines, PyTorch neural networks, LLM agent tool use, and computer vision.
2. **Bioinformatics:** Next-generation sequencing (NGS), AlphaFold macromolecular structure modeling, and virtual drug docking.
3. **Web Development:** Cloud-native, high-performance web applications with 100/100 Core Web Vitals and offline PWA support.
4. **Mobile App Development:** Cross-platform Flutter and native iOS/Android experiences with offline sync and biometric authentication.
5. **IoT Solutions:** ESP32/microcontroller C/C++ firmware, MQTT real-time telemetry, and industrial edge dashboards.
6. **UI/UX Design:** Flat modern design systems, ergonomic interfaces, micro-animations, and accessible color hierarchy.
7. **Portfolio Development:** High-impact showcase sites for enterprises, researchers, and technical executives.
8. **IT Consulting:** Senior advisory on cloud migrations, security audits, database indexing, and DevOps CI/CD.
9. **Computational Tools Development:** High-speed CUDA, C++, and Python algorithmic solvers for scientific workloads.

---

## 📞 Official Contact & Business Details

- **Company:** New Star Infosis
- **Established:** 2024
- **Phone:** +91 9384303044
- **WhatsApp:** [Direct Chat (+91 9384303044)](https://wa.me/919384303044)
- **LinkedIn:** [New Star Infosis on LinkedIn](https://www.linkedin.com/company/new-star-infosis/posts/?feedView=all)
- **Instagram:** [@new_star_infosis](https://www.instagram.com/new_star_infosis?stkn=MXdnd203a3Vubmh5ZA==)
- **Email:** info@newstarinfosis.com
- **Locations:** Technology & R&D Hub, India (Serving Global Clients)

---

&copy; 2024 – 2026 **New Star Infosis**. All Rights Reserved.
