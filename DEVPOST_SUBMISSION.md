# SpoonFlow — Devpost Hackathon Submission Package

> **Submission for Taskforge Hackathon 2026**  
> *"Work should fit people — not force people to fit the tool."*

---

* **Live Working Demo**: [https://vidishagupta.github.io/spoonflow/](https://vidishagupta.github.io/spoonflow/)
* **YouTube Video Walkthrough**: [https://youtu.be/ADIYajBt5Ds](https://youtu.be/ADIYajBt5Ds)
* **GitHub Repository**: [https://github.com/vidishagupta/spoonflow](https://github.com/vidishagupta/spoonflow)

---

## 🌟 Pitch & Quick Overview
* **Project Name**: **SpoonFlow**
* **Elevator Pitch**: SpoonFlow brings Christine Miserandino's medical **Spoon Theory** into daily task management. Instead of assuming endless 9-to-5 stamina and shaming users with red overdue badges, SpoonFlow budgets tasks by biological and cognitive energy, shields the nervous system from crash cycles with 1-click deferral, and drafts compassionate boundary messages to protect your capacity.
* **Target Users**: People with chronic illness (Long COVID, Fibromyalgia, ME/CFS), neurodivergence (ADHD, Autism), or severe burnout who experience fluctuating daily capacity.

---

## 💡 Inspiration
Modern productivity software treats human beings like manufacturing lines with fixed hourly slots. If you don't finish 10 tasks on Tuesday, tools like Jira, Notion, and Todoist turn aggressive red, flooding your prefrontal cortex with cortisol and initiating a shame spiral.

For millions living with chronic illnesses, post-exertional malaise (PEM), or neurodivergent executive dysfunction, **energy is not infinite**. In disability communities, this is understood through **Spoon Theory** — where energy is represented as a finite bundle of spoons. Some mornings you wake up with 10 spoons; other mornings, pain or brain fog leaves you with only 3.

We built **SpoonFlow** because existing tools force people to conform to rigid schedules. We asked: *What if our task manager actually protected our health instead of pushing us toward exhaustion?*

---

## ⚙️ What It Does

1. **Daily Energy Calibration (The Morning Spoon Check-In)**:
   - Users begin their day with an honest capacity check (1 to 12 spoons).
   - Dynamically shifts the operating mode between **Survival Mode (1-3 Spoons)**, **Moderate Capacity (4-7 Spoons)**, and **High Stamina (8-12 Spoons)**.

2. **Cognitive Drain Task Engine**:
   - Categorizes every task by its actual neurological drain:
     - 🧠 **Mental Focus**: Analytical thinking, writing, problem-solving.
     - 🗣️ **Social/Emotional Drain**: High-friction meetings, reviews, calls.
     - ⚡ **Low-Stamina Micro-Action**: 2-minute admin tasks.
     - 🌿 **Restorative (+1 Spoon Recovery)**: Naps, walks, gentle stretching, and meditation that replenish biological spoons!

3. **Over-Capacity Shield & Auto-Triage**:
   - The moment total planned tasks exceed your daily spoon budget, the application activates the **Rest & Rebalance Protocol**.
   - With **1 click**, it defers flexible tasks to tomorrow with an affirming message: *"You didn't fail these tasks; you protected your health."*
   - Tracks a counter for **"Spoons Preserved by Saying No"**, positively reinforcing healthy boundaries.

4. **Gentle Boundary & Communication Generator**:
   - An integrated script generator that drafts polite, confident capacity messages for Managers, Teammates, Clients, or Professors across multiple tones (*Professional & Warm*, *Concise & Direct*, *Casual & Friendly*).
   - Eliminates the emotional paralysis and guilt of declining or rescheduling work.

5. **Single-Task "Zero-Spill" Focus Rail**:
   - Hides the entire dashboard to eliminate sensory and cognitive overload.
   - Embeds a **4-4-4-4 Box Breathing visual pacer** and low-pressure momentum timer.
   - Includes an **Anti-Paralysis Micro-Step Input** if the user experiences task freeze.

6. **Accessibility Toolbar (WCAG AAA)**:
   - One-click toggles for **Dyslexia-friendly typography**, **7:1 High-Contrast mode**, **Reduced Motion**, text scaling, and organic **Web Audio API micro-sounds** (gentle marimba completion chimes, no jarring alarms).

7. **Instant Judge Demo Personas**:
   - Includes pre-configured one-click scenarios:
     - **Maya**: College student with Long COVID (3 Spoons — Survival Mode).
     - **Alex**: Senior Engineer with ADHD Burnout (6 Spoons — Focus Rail).
     - **Jordan**: Freelancer with Chronic Fatigue (8 Spoons — Balanced Pacing).

---

## 🛠️ How We Built It
- **Zero-Dependency Architecture**: Built using semantic HTML5 landmarks, modern Vanilla CSS custom properties, and modular ES6 JavaScript. No heavy frameworks or vulnerable node dependencies required.
- **Embedded Web Audio Synthesis**: Zero external audio downloads. Uses the Web Audio API oscillator nodes to generate relaxing pentatonic frequencies (Eb5, G5, Bb5) and soothing bubble soundscapes.
- **Accessible State Engine**: Reactive `Store` architecture with full `localStorage` persistence, offline-first reliability, and accessible keyboard shortcuts (`Alt+N`, `Alt+S`, `Alt+B`, `Esc`).

---

## 🧗 Challenges We Ran Into
- **Designing Non-Punitive UX**: Most UX design patterns rely on urgency (red badges, countdowns, streaks). Stripping out anxiety while maintaining momentum required redefining visual metaphors (e.g., replacing red warnings with warm amber shields and restorative cyan tokens).
- **Sensory Audio Tuning**: Crafting synthesized tones that don't trigger sensory sensitivities for neurodivergent users. We iterated on gentle attack/decay curves and low-gain sine waves.

---

## 🏆 Accomplishments That We're Proud Of
- **WCAG AAA Compliance**: Tested with screen readers, full keyboard navigation, high-contrast themes, and dyslexia support.
- **Celebration of Deferral**: Creating a product that actively celebrates saying "no" and deferring tasks as a biological victory.
- **Zero-Friction Testing**: Judges and users can test the app instantly in any modern browser without npm installations or logins.

---

## 📚 What We Learned
True accessibility extends beyond alt text and screen readers — it requires **cognitive and sensory accessibility**. Software must respect human biological variability. Designing for people with chronic illness creates software that is fundamentally kinder and better for everyone.

---

## 🚀 What's Next for SpoonFlow
- **Wearable Biometric Sync**: Pulling daily spoon recommendations from sleep, HRV, and recovery data from Oura Ring, WHOOP, and Apple Health.
- **Calendar Capacity Heatmap**: Syncing with Google Calendar to automatically calculate meetings as Social Drain spoons.
- **Team Spoon Transparency**: An opt-in team dashboard so managers can see team bandwidth without requiring team members to disclose private medical details.

---

## 🎬 2-Minute Video Demo Script (For Loom / Screen Recording)

| Timestamp | Screen Action | Voiceover Script |
| :--- | :--- | :--- |
| **0:00 - 0:20** | Show traditional todo app with red overdue items, then transition to SpoonFlow's calming slate interface. | *"Most productivity tools treat us like machines with unlimited 9-to-5 stamina. But for millions of people with chronic illness, ADHD, or burnout, energy fluctuates unpredictably. This is SpoonFlow — an energy budgeting OS built on medical Spoon Theory."* |
| **0:20 - 0:45** | Click **"Maya (Long COVID)"** demo persona. Show the Morning Check-In slider at 3 spoons. | *"Let's look at Maya, a student managing Long COVID. She wakes up with only 3 spoons today — survival mode. SpoonFlow immediately recalibrates her workspace, prioritizing rest over arbitrary deadlines."* |
| **0:45 - 1:10** | Scroll down to show 6 spoons of tasks, triggering the glowing **Over-Capacity Shield**. Click **"Activate Rest & Rebalance"**. | *"Maya's planned tasks total 6 spoons — an energy deficit. Traditional tools would let her crash. SpoonFlow's Over-Capacity Shield steps in. With one click, it defers flexible tasks to tomorrow with zero guilt, preserving her health."* |
| **1:10 - 1:30** | Open **Boundary Shield** (`Alt+B`). Select Manager / Capacity, show the crafted response, click Copy. | *"Saying no is hard. SpoonFlow's Gentle Boundary Generator crafts warm, professional messages in seconds so Maya can decline or reschedule without over-explaining."* |
| **1:30 - 1:50** | Click **"Focus"** on a task to enter the **Single-Task Focus Rail**. Show the Box Breathing pacer and micro-step input. | *"When it's time to work, the Single-Track Focus Rail hides the entire dashboard. A 4-4-4-4 box breathing pacer calms the nervous system, with soft momentum timers and micro-step prompts for task paralysis."* |
| **1:50 - 2:00** | Toggle the **Dyslexia Font** and **High Contrast** buttons in the Accessibility bar. | *"With WCAG AAA compliance, dyslexia typography, and organic audio chimes, SpoonFlow proves that work should fit people — not force people to fit the tool. Thank you!"* |
