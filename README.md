# 🥄 SpoonFlow

> **The Chronic Illness, Neurodivergent & Burnout-Aware Energy Budgeting OS**  
> *Built for the [Taskforge Hackathon on Devpost](https://taskforge.devpost.com/)*  
> *"Work should fit people — not force people to fit the tool."*

---

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20GitHub%20Pages-10b981?style=for-the-badge&logo=github)](https://vidishagupta.github.io/spoonflow/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-818cf8?style=for-the-badge&logo=github)](https://github.com/vidishagupta/spoonflow)
[![Accessibility WCAG AAA](https://img.shields.io/badge/Accessibility-WCAG%20AAA-06b6d4?style=for-the-badge)](https://vidishagupta.github.io/spoonflow/)

🔗 **Live Deployment**: [https://vidishagupta.github.io/spoonflow/](https://vidishagupta.github.io/spoonflow/)  
📦 **GitHub Repository**: [https://github.com/vidishagupta/spoonflow](https://github.com/vidishagupta/spoonflow)

---

## 📖 Introduction
Traditional productivity software (Jira, Notion, Todoist) assumes endless stamina and floods users with overdue red badges when fatigue hits. 

**SpoonFlow** brings Christine Miserandino's medical **Spoon Theory** to life. It helps people with chronic illness (Long COVID, Fibromyalgia, ME/CFS), neurodivergence (ADHD, Autism), or acute burnout budget work according to biological and cognitive capacity rather than arbitrary hours.

---

## ✨ Standout Features

- 🌅 **Morning Spoon Calibration**: Calibrate your daily capacity (1 to 12 spoons) with qualitative descriptors (**Survival Mode**, **Moderate Capacity**, **High Stamina**).
- 🧠 **Cognitive Drain Engine**: Tag tasks by mental focus, social drain, low-stamina micro-actions, or **restorative recovery** (+1 spoon recovery!).
- 🛡️ **Over-Capacity Shield & Auto-Triage**: Proactively alerts you when planned tasks exceed your biological budget and defers non-essentials with **1 click**.
- 💬 **Gentle Boundary & Communication Generator**: Generates compassionate, professional emails and Slack messages to decline or reschedule tasks without anxiety.
- 🎯 **Single-Task "Zero-Spill" Focus Rail**: Hides the entire dashboard to eliminate sensory overload. Includes a **4-4-4-4 Box Breathing visual pacer** and anti-freeze micro-step helper.
- ♿ **WCAG AAA Accessibility Toolbar**: Dyslexia-friendly typography, 7:1 high-contrast mode, reduced motion overrides, and synthesized **Web Audio API micro-sounds** (no external audio files needed).
- ⚡ **1-Click Judge Demo Personas**: Instant pre-loaded profiles for Maya (Long COVID), Alex (ADHD Burnout), and Jordan (Chronic Fatigue).

---

## ⌨️ Accessible Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Alt + N` | Add New Paced Task |
| `Alt + S` | Morning Spoon Calibration Check-In |
| `Alt + B` | Gentle Boundary Generator |
| `Esc` | Close any active modal or exit Focus Rail |

---

## 🚀 Quick Start & Local Run

No `npm install` needed! SpoonFlow runs with zero external dependencies.

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/spoonflow.git
cd spoonflow

# Run with Node.js built-in server
npm start
# or: node dev.js
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📁 Project Structure

```text
spoonflow/
├── index.html                 # Semantic HTML5, accessible landmarks & WCAG AAA
├── css/
│   ├── variables.css          # Design tokens, high-contrast & dyslexia themes
│   ├── base.css               # Typography, skip link, reset, accessible buttons
│   ├── components.css         # Spoon reservoir, task grid, focus rail, modals
│   └── animations.css         # 4-4-4-4 breathing circle & micro-interactions
├── js/
│   ├── audio.js               # Web Audio API sound synthesizer (zero external assets)
│   ├── state.js               # Reactive store, localStorage sync & demo personas
│   ├── boundaryGenerator.js   # Compassionate communication script matrix
│   ├── ui.js                  # UI controller, event delegation & keyboard handlers
│   └── app.js                 # Application bootstrap
├── dev.js                     # Zero-dependency local dev server
├── test.js                    # Automated architecture & accessibility test suite
├── vercel.json                # 1-Click Vercel deployment config
├── DEVPOST_SUBMISSION.md      # Full hackathon story, challenges, and video script
├── DEPLOYMENT_GUIDE.md        # Step-by-step GitHub & Vercel deployment instructions
└── package.json               # Project metadata & npm scripts
```

---

## 🏆 Devpost Hackathon Criteria Alignment

1. **Choose a user**: People with chronic illness, Long COVID, ADHD/autism, and severe burnout.
2. **Name one productivity or access barrier**: Traditional rigid 9-to-5 tools punish energy crashes with anxiety-inducing red badges and guilt.
3. **Show a meaningful change**: Replaces shame with biological pacing, 1-click deferral celebration, nervous system protection, and instant boundary generation.

---

## 📜 License
MIT License. Created for the Taskforge Hackathon 2026.
