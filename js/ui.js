/**
 * SpoonFlow UI Controller
 * High-craft rendering, accessible event binding, and micro-interactions
 */

import { store, DEMO_PERSONAS } from './state.js';
import { audio } from './audio.js';
import { getBoundaryMessage } from './boundaryGenerator.js';

class UIController {
  constructor() {
    this.currentFilter = 'all';
    this.focusTimerInterval = null;
    this.focusSecondsRemaining = 15 * 60;
    this.isFocusTimerRunning = false;
    this.activeFocusTask = null;
    this.breathingInterval = null;
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.applyPreferences();
    this.render();

    // Subscribe to state updates
    store.subscribe(() => {
      this.render();
    });
  }

  cacheDom() {
    // Accessibility controls
    this.btnDyslexic = document.getElementById('btn-dyslexic');
    this.btnContrast = document.getElementById('btn-contrast');
    this.btnMotion = document.getElementById('btn-motion');
    this.btnSound = document.getElementById('btn-sound');
    this.btnTextScale = document.getElementById('btn-text-scale');

    // Personas
    this.personaButtons = document.querySelectorAll('.btn-persona');

    // Hero / Reservoir
    this.spoonArray = document.getElementById('spoon-array');
    this.reservoirStatusTag = document.getElementById('reservoir-status-tag');
    this.reservoirTitle = document.getElementById('reservoir-title');
    this.reservoirDesc = document.getElementById('reservoir-desc');
    this.metricBudget = document.getElementById('metric-budget');
    this.metricSpent = document.getElementById('metric-spent');
    this.metricRemaining = document.getElementById('metric-remaining');
    this.metricRestored = document.getElementById('metric-restored');
    this.metricPreserved = document.getElementById('metric-preserved');
    this.progressBarFill = document.getElementById('progress-bar-fill');

    // Shield Banner
    this.shieldBanner = document.getElementById('shield-alert-banner');
    this.shieldText = document.getElementById('shield-text-detail');
    this.btnTriggerRebalance = document.getElementById('btn-trigger-rebalance');

    // Task Board
    this.tasksContainer = document.getElementById('tasks-container');
    this.taskCountPill = document.getElementById('task-count-pill');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.btnOpenNewTask = document.getElementById('btn-open-new-task');

    // Modals
    this.modalNewTask = document.getElementById('modal-new-task');
    this.modalCheckin = document.getElementById('modal-checkin');
    this.modalRebalance = document.getElementById('modal-rebalance');
    this.modalBoundary = document.getElementById('modal-boundary');

    // Forms
    this.formNewTask = document.getElementById('form-new-task');
    this.inputSpoonCost = document.getElementById('input-spoon-cost');
    this.spoonPickerButtons = document.querySelectorAll('.spoon-option-btn');
    this.sliderDailySpoons = document.getElementById('slider-daily-spoons');
    this.sliderSpoonDisplay = document.getElementById('slider-spoon-display');
    this.checkinDescriptor = document.getElementById('checkin-descriptor');

    // Focus Rail
    this.focusRail = document.getElementById('focus-rail');
    this.focusTaskTitle = document.getElementById('focus-task-title');
    this.focusTaskPill = document.getElementById('focus-task-pill');
    this.focusTimerDisplay = document.getElementById('focus-timer-display');
    this.btnFocusTimerToggle = document.getElementById('btn-focus-timer-toggle');
    this.btnFocusTimerReset = document.getElementById('btn-focus-timer-reset');
    this.btnFocusComplete = document.getElementById('btn-focus-complete');
    this.btnFocusExit = document.getElementById('btn-focus-exit');
    this.breathingPrompt = document.getElementById('breathing-prompt');
    this.inputMicroStep = document.getElementById('input-micro-step');
    this.btnSaveMicroStep = document.getElementById('btn-save-micro-step');

    // Boundary Generator
    this.boundaryScenarioSelect = document.getElementById('boundary-scenario-select');
    this.boundaryRecipientSelect = document.getElementById('boundary-recipient-select');
    this.boundaryToneButtons = document.querySelectorAll('.boundary-tone-btn');
    this.boundaryOutput = document.getElementById('boundary-output');
    this.btnCopyBoundary = document.getElementById('btn-copy-boundary');

    // Global Action Buttons
    this.btnOpenCheckin = document.getElementById('btn-open-checkin');
    this.btnOpenBoundary = document.getElementById('btn-open-boundary');
    this.toastContainer = document.getElementById('toast-container');
  }

  bindEvents() {
    // Accessibility Toggles
    this.btnDyslexic?.addEventListener('click', () => this.toggleA11y('dyslexicFont', this.btnDyslexic, 'theme-dyslexic'));
    this.btnContrast?.addEventListener('click', () => this.toggleA11y('highContrast', this.btnContrast, 'theme-high-contrast'));
    this.btnMotion?.addEventListener('click', () => this.toggleA11y('reducedMotion', this.btnMotion, 'theme-reduced-motion'));
    this.btnSound?.addEventListener('click', () => this.toggleSound());
    this.btnTextScale?.addEventListener('click', () => this.cycleTextScale());

    // Persona Selector
    this.personaButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        const personaKey = btn.dataset.persona;
        if (personaKey === 'blank') {
          store.resetToBlank();
          this.showToast('Workspace cleared for custom planning.', 'rest');
        } else {
          store.loadPersona(personaKey);
          audio.playPop();
          this.showToast(`Loaded ${DEMO_PERSONAS[personaKey].name}`, 'success');
        }
      });
    });

    // Task Filter
    this.filterButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        audio.playPop();
        this.renderTasks();
      });
    });

    // Modal Open Buttons
    this.btnOpenNewTask?.addEventListener('click', () => this.openModal(this.modalNewTask));
    this.btnOpenCheckin?.addEventListener('click', () => this.openModal(this.modalCheckin));
    this.btnOpenBoundary?.addEventListener('click', () => this.openBoundaryModal());
    this.btnTriggerRebalance?.addEventListener('click', () => this.openRebalanceModal());

    // Close Modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) this.closeModal(modal);
      });
    });

    // Modal backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.closeModal(backdrop);
      });
    });

    // Spoon Picker inside New Task
    this.spoonPickerButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        this.spoonPickerButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.inputSpoonCost.value = btn.dataset.spoons;
        audio.playPop();
      });
    });

    // Form: New Task Submit
    this.formNewTask?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('input-task-title').value;
      const notes = document.getElementById('input-task-notes').value;
      const spoonCost = this.inputSpoonCost.value;
      const drainType = document.getElementById('input-drain-type').value;
      const priority = document.getElementById('input-task-priority').value;

      store.addTask({ title, notes, spoonCost, drainType, priority });
      audio.playPop();
      this.closeModal(this.modalNewTask);
      this.formNewTask.reset();
      this.inputSpoonCost.value = '1';
      this.spoonPickerButtons.forEach((b, i) => b.classList.toggle('selected', i === 0));
      this.showToast('Task added to your energy plan', 'success');
    });

    // Morning Check-In Slider
    this.sliderDailySpoons?.addEventListener('input', (e) => {
      const val = e.target.value;
      this.sliderSpoonDisplay.textContent = `${val} ${val === '1' ? 'Spoon' : 'Spoons'}`;
      this.updateCheckinDescriptor(val);
      audio.playPop();
    });

    document.getElementById('form-checkin')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const spoons = this.sliderDailySpoons.value;
      const quality = document.getElementById('select-sleep-quality').value;
      store.setDailySpoons(spoons);
      store.setSleepQuality(quality);
      this.closeModal(this.modalCheckin);
      audio.playPop();
      this.showToast(`Daily budget calibrated to ${spoons} spoons`, 'success');
    });

    // Rebalance Modal Actions
    document.getElementById('btn-confirm-rebalance')?.addEventListener('click', () => {
      const preserved = store.deferAllFlexibleTasks();
      audio.playChime();
      this.closeModal(this.modalRebalance);
      this.showToast(`Protected your health! Deferred ${preserved} spoons with zero guilt.`, 'success');
      // Proactively open boundary modal
      setTimeout(() => {
        this.openBoundaryModal('capacity', 'colleague');
      }, 500);
    });

    // Focus Rail Actions
    this.btnFocusExit?.addEventListener('click', () => this.exitFocusRail());
    this.btnFocusTimerToggle?.addEventListener('click', () => this.toggleFocusTimer());
    this.btnFocusTimerReset?.addEventListener('click', () => this.resetFocusTimer());
    this.btnFocusComplete?.addEventListener('click', () => {
      if (this.activeFocusTask) {
        store.toggleTask(this.activeFocusTask.id);
        audio.playChime();
        this.showToast('Task completed! Great job.', 'success');
      }
      this.exitFocusRail();
    });

    this.btnSaveMicroStep?.addEventListener('click', () => {
      const stepText = this.inputMicroStep.value.trim();
      if (stepText) {
        this.focusTaskTitle.textContent = stepText;
        this.inputMicroStep.value = '';
        audio.playPop();
        this.showToast('Active focus shifted to micro-step!', 'rest');
      }
    });

    // Boundary Generator controls
    this.boundaryScenarioSelect?.addEventListener('change', () => this.updateBoundaryOutput());
    this.boundaryRecipientSelect?.addEventListener('change', () => this.updateBoundaryOutput());
    this.boundaryToneButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        this.boundaryToneButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.updateBoundaryOutput();
      });
    });

    this.btnCopyBoundary?.addEventListener('click', () => {
      const text = this.boundaryOutput.value;
      navigator.clipboard.writeText(text).then(() => {
        audio.playPop();
        this.showToast('Boundary message copied to clipboard!', 'success');
      });
    });

    // Global Accessible Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => this.closeModal(m));
        if (this.focusRail.classList.contains('open')) {
          this.exitFocusRail();
        }
      } else if (e.altKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        this.openModal(this.modalNewTask);
      } else if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        this.openModal(this.modalCheckin);
      } else if (e.altKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        this.openBoundaryModal();
      }
    });
  }

  // ------------------------------------------------------------------------
  // Accessibility Helpers
  // ------------------------------------------------------------------------
  toggleA11y(prefKey, button, bodyClass) {
    const state = store.getState();
    const current = !state.preferences[prefKey];
    store.updatePreferences(prefKey, current);
    document.body.classList.toggle(bodyClass, current);
    button.setAttribute('aria-pressed', current ? 'true' : 'false');
    button.classList.toggle('active', current);
    audio.playPop();
  }

  toggleSound() {
    const state = store.getState();
    const current = !state.preferences.soundEnabled;
    store.updatePreferences('soundEnabled', current);
    audio.setMuted(!current);
    this.btnSound.setAttribute('aria-pressed', current ? 'true' : 'false');
    this.btnSound.classList.toggle('active', current);
    this.btnSound.innerHTML = current ? '🔊 Sound: On' : '🔇 Sound: Off';
    if (current) audio.playPop();
  }

  cycleTextScale() {
    const scales = ['normal', 'medium', 'large'];
    const state = store.getState();
    const currIdx = scales.indexOf(state.preferences.textScale || 'normal');
    const nextScale = scales[(currIdx + 1) % scales.length];
    store.updatePreferences('textScale', nextScale);

    if (nextScale === 'normal') {
      document.documentElement.style.setProperty('--font-scale', '1');
      this.btnTextScale.textContent = 'Aa Text: 100%';
    } else if (nextScale === 'medium') {
      document.documentElement.style.setProperty('--font-scale', '1.15');
      this.btnTextScale.textContent = 'Aa Text: 115%';
    } else {
      document.documentElement.style.setProperty('--font-scale', '1.3');
      this.btnTextScale.textContent = 'Aa Text: 130%';
    }
    audio.playPop();
  }

  applyPreferences() {
    const prefs = store.getState().preferences;
    if (prefs.dyslexicFont) {
      document.body.classList.add('theme-dyslexic');
      this.btnDyslexic?.classList.add('active');
      this.btnDyslexic?.setAttribute('aria-pressed', 'true');
    }
    if (prefs.highContrast) {
      document.body.classList.add('theme-high-contrast');
      this.btnContrast?.classList.add('active');
      this.btnContrast?.setAttribute('aria-pressed', 'true');
    }
    if (prefs.reducedMotion) {
      document.body.classList.add('theme-reduced-motion');
      this.btnMotion?.classList.add('active');
      this.btnMotion?.setAttribute('aria-pressed', 'true');
    }
    audio.setMuted(!prefs.soundEnabled);
    if (!prefs.soundEnabled && this.btnSound) {
      this.btnSound.classList.remove('active');
      this.btnSound.innerHTML = '🔇 Sound: Off';
    }
  }

  // ------------------------------------------------------------------------
  // Render Engine
  // ------------------------------------------------------------------------
  render() {
    const state = store.getState();
    const analytics = store.getAnalytics();

    // Render Metrics
    if (this.metricBudget) this.metricBudget.textContent = analytics.dailyBudget;
    if (this.metricSpent) this.metricSpent.textContent = analytics.spentCost;
    if (this.metricRemaining) this.metricRemaining.textContent = analytics.remainingSpoons;
    if (this.metricRestored) this.metricRestored.textContent = `+${analytics.restoredSpoons}`;
    if (this.metricPreserved) this.metricPreserved.textContent = `${state.spoonsPreservedByNo} Spoons`;

    // Render Spoon Array (Visual tokens)
    this.renderSpoonArray(analytics);

    // Render Progress Bar
    const percent = Math.min(100, Math.round((analytics.spentCost / Math.max(1, analytics.effectiveBudget)) * 100));
    if (this.progressBarFill) {
      this.progressBarFill.style.width = `${percent}%`;
      this.progressBarFill.classList.toggle('fill-overcapacity', analytics.isOverCapacity);
    }

    // Render Status Headline
    this.renderStatusHeadline(analytics);

    // Render Capacity Shield Alert
    if (this.shieldBanner) {
      if (analytics.isOverCapacity) {
        this.shieldBanner.style.display = 'flex';
        this.shieldText.textContent = `You have planned ${analytics.totalCost} spoons on a ${analytics.effectiveBudget}-spoon budget (+${analytics.overCapacityAmount} spoon deficit). Avoid the crash cycle!`;
      } else {
        this.shieldBanner.style.display = 'none';
      }
    }

    // Render Tasks
    this.renderTasks();

    // Update Persona Button active states
    this.personaButtons?.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.persona === state.activePersona);
    });
  }

  renderSpoonArray(analytics) {
    if (!this.spoonArray) return;
    this.spoonArray.innerHTML = '';

    const total = Math.max(analytics.effectiveBudget, analytics.totalCost);
    const spoonSvg = `
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C8.686 2 6 4.686 6 8c0 2.5 1.5 4.5 3.5 5.3V21a1 1 0 001 1h3a1 1 0 001-1v-7.7c2-.8 3.5-2.8 3.5-5.3 0-3.314-2.686-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
      </svg>
    `;

    for (let i = 0; i < total; i++) {
      const token = document.createElement('div');
      token.className = 'spoon-token anim-spoon-in';
      token.innerHTML = spoonSvg;

      if (i < analytics.spentCost) {
        token.classList.add('state-depleted');
        token.setAttribute('title', `Spoon #${i + 1} - Spent`);
      } else if (i < analytics.effectiveBudget) {
        if (i >= analytics.dailyBudget) {
          token.classList.add('state-restored');
          token.setAttribute('title', `Spoon #${i + 1} - Restored through rest!`);
        } else {
          token.classList.add('state-available');
          token.setAttribute('title', `Spoon #${i + 1} - Available`);
        }
      } else {
        token.classList.add('state-allocated');
        token.setAttribute('title', `Spoon #${i + 1} - Exceeding Capacity`);
      }

      this.spoonArray.appendChild(token);
    }
  }

  renderStatusHeadline(analytics) {
    if (!this.reservoirStatusTag || !this.reservoirTitle || !this.reservoirDesc) return;

    if (analytics.isOverCapacity) {
      this.reservoirStatusTag.className = 'reservoir-status-tag tag-warning';
      this.reservoirStatusTag.innerHTML = '⚠️ Over-Capacity Warning';
      this.reservoirTitle.textContent = 'Protect Your Energy Reserve';
      this.reservoirDesc.textContent = 'Your daily tasks exceed your spoon budget. Traditional apps force you to push through; SpoonFlow empowers you to defer flexible items and breathe.';
    } else if (analytics.dailyBudget <= 3) {
      this.reservoirStatusTag.className = 'reservoir-status-tag tag-rest';
      this.reservoirStatusTag.innerHTML = '🛌 Survival & Rest Mode';
      this.reservoirTitle.textContent = 'Gentle Pacing Day';
      this.reservoirDesc.textContent = 'Today is about preservation. Keep expectations minimal, celebrate tiny steps, and take abundant quiet recovery breaks.';
    } else {
      this.reservoirStatusTag.className = 'reservoir-status-tag tag-optimal';
      this.reservoirStatusTag.innerHTML = '✨ Optimal Energy Flow';
      this.reservoirTitle.textContent = 'Mindful Productivity';
      this.reservoirDesc.textContent = 'Your workload aligns with your biological energy capacity. Pace steadily and honor your restoration tasks.';
    }
  }

  renderTasks() {
    if (!this.tasksContainer) return;
    const state = store.getState();

    let filtered = state.tasks;
    if (this.currentFilter !== 'all') {
      if (this.currentFilter === 'active') {
        filtered = state.tasks.filter(t => !t.completed && !t.deferred);
      } else if (this.currentFilter === 'completed') {
        filtered = state.tasks.filter(t => t.completed);
      } else if (this.currentFilter === 'deferred') {
        filtered = state.tasks.filter(t => t.deferred);
      } else {
        filtered = state.tasks.filter(t => t.drainType === this.currentFilter);
      }
    }

    if (this.taskCountPill) {
      const activeCount = state.tasks.filter(t => !t.completed && !t.deferred).length;
      this.taskCountPill.textContent = `${activeCount} Active`;
    }

    if (filtered.length === 0) {
      this.tasksContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          <h3>No tasks in this view</h3>
          <p>Your mental workspace is clear. Take a breath or add a gentle task.</p>
        </div>
      `;
      return;
    }

    this.tasksContainer.innerHTML = '';
    filtered.forEach(task => {
      const card = document.createElement('article');
      card.className = `task-card ${task.completed ? 'is-completed' : ''} ${task.drainType === 'restorative' ? 'is-restorative' : ''}`;
      card.setAttribute('aria-label', `${task.title}, ${task.spoonCost} spoons`);

      const drainEmoji = {
        cognitive: '🧠 Mental',
        social: '🗣️ Social',
        micro: '⚡ Micro',
        restorative: '🌿 Restorative (+1 Spoon)'
      }[task.drainType] || '📋 General';

      const spoonBadgeHtml = task.drainType === 'restorative'
        ? `<span class="badge-spoon badge-spoon-restore">+${task.spoonCost} Spoon Recovery</span>`
        : `<span class="badge-spoon badge-spoon-cost">🥄 ${task.spoonCost} ${task.spoonCost === 1 ? 'Spoon' : 'Spoons'}</span>`;

      card.innerHTML = `
        <div class="task-card-left">
          <button class="task-checkbox-btn ${task.completed ? 'checked' : ''}" 
                  aria-label="${task.completed ? 'Mark task as incomplete' : 'Complete task'}" 
                  data-action="toggle" data-id="${task.id}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </button>
          <div class="task-content">
            <h4 class="task-title">${this.escapeHtml(task.title)}</h4>
            ${task.notes ? `<p class="form-hint">${this.escapeHtml(task.notes)}</p>` : ''}
            <div class="task-meta">
              ${spoonBadgeHtml}
              <span class="badge-drain">${drainEmoji}</span>
              <span class="badge-priority priority-${task.priority}">${task.priority === 'essential' ? '⭐ Essential' : 'Flexible'}</span>
              ${task.deferred ? '<span class="badge-priority" style="color:var(--spoon-amber); background:rgba(245,158,11,0.15)">⏸️ Deferred With Grace</span>' : ''}
            </div>
          </div>
        </div>
        <div class="task-actions">
          ${!task.completed ? `
            <button class="btn-secondary btn-sm" data-action="focus" data-id="${task.id}" title="Enter single-task focus rail">
              🎯 Focus
            </button>
            ${!task.deferred ? `
              <button class="btn-icon" data-action="defer" data-id="${task.id}" title="Defer to tomorrow without guilt">
                ⏸️
              </button>
            ` : ''}
          ` : ''}
          <button class="btn-icon" data-action="delete" data-id="${task.id}" title="Delete task">
            🗑️
          </button>
        </div>
      `;

      // Event delegation for card actions
      card.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          const id = btn.dataset.id;
          if (action === 'toggle') {
            store.toggleTask(id);
            if (!task.completed) {
              if (task.drainType === 'restorative') {
                audio.playRestTone();
                this.showToast('Rest completed! Reclaimed +1 spoon.', 'rest');
              } else {
                audio.playChime();
                this.showToast('Task complete! Energy well spent.', 'success');
              }
            }
          } else if (action === 'focus') {
            this.enterFocusRail(task);
          } else if (action === 'defer') {
            store.deferTask(id);
            audio.playPop();
            this.showToast('Task deferred to tomorrow. Energy protected!', 'warning');
          } else if (action === 'delete') {
            store.deleteTask(id);
            audio.playPop();
          }
        });
      });

      this.tasksContainer.appendChild(card);
    });
  }

  // ------------------------------------------------------------------------
  // Focus Rail & Breathing Engine
  // ------------------------------------------------------------------------
  enterFocusRail(task) {
    this.activeFocusTask = task;
    this.focusTaskTitle.textContent = task.title;
    this.focusTaskPill.textContent = `🥄 Allocated: ${task.spoonCost} ${task.spoonCost === 1 ? 'Spoon' : 'Spoons'}`;
    this.focusRail.classList.add('open');
    this.focusSecondsRemaining = 15 * 60;
    this.updateFocusTimerDisplay();
    this.startBreathingCycle();
    audio.playPop();
  }

  exitFocusRail() {
    this.focusRail.classList.remove('open');
    this.pauseFocusTimer();
    this.stopBreathingCycle();
    this.activeFocusTask = null;
  }

  startBreathingCycle() {
    this.stopBreathingCycle();
    const phases = [
      { text: 'Inhale Gently', duration: 4000 },
      { text: 'Hold Softly', duration: 4000 },
      { text: 'Exhale Slowly', duration: 4000 },
      { text: 'Rest & Pause', duration: 4000 }
    ];
    let phaseIdx = 0;

    const runPhase = () => {
      if (!this.breathingPrompt) return;
      this.breathingPrompt.textContent = phases[phaseIdx].text;
      phaseIdx = (phaseIdx + 1) % phases.length;
    };

    runPhase();
    this.breathingInterval = setInterval(runPhase, 4000);
  }

  stopBreathingCycle() {
    if (this.breathingInterval) {
      clearInterval(this.breathingInterval);
      this.breathingInterval = null;
    }
  }

  toggleFocusTimer() {
    if (this.isFocusTimerRunning) {
      this.pauseFocusTimer();
    } else {
      this.startFocusTimer();
    }
  }

  startFocusTimer() {
    this.isFocusTimerRunning = true;
    this.btnFocusTimerToggle.innerHTML = '⏸️ Pause';
    audio.playPop();
    this.focusTimerInterval = setInterval(() => {
      this.focusSecondsRemaining--;
      this.updateFocusTimerDisplay();
      if (this.focusSecondsRemaining <= 0) {
        this.pauseFocusTimer();
        audio.playChime();
        this.showToast('Momentum block complete! Take a stretch.', 'success');
      }
    }, 1000);
  }

  pauseFocusTimer() {
    this.isFocusTimerRunning = false;
    if (this.btnFocusTimerToggle) this.btnFocusTimerToggle.innerHTML = '▶️ Start';
    if (this.focusTimerInterval) {
      clearInterval(this.focusTimerInterval);
      this.focusTimerInterval = null;
    }
  }

  resetFocusTimer() {
    this.pauseFocusTimer();
    this.focusSecondsRemaining = 15 * 60;
    this.updateFocusTimerDisplay();
    audio.playPop();
  }

  updateFocusTimerDisplay() {
    if (!this.focusTimerDisplay) return;
    const mins = Math.floor(this.focusSecondsRemaining / 60);
    const secs = this.focusSecondsRemaining % 60;
    this.focusTimerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // ------------------------------------------------------------------------
  // Modal Utilities
  // ------------------------------------------------------------------------
  openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    const firstInput = modal.querySelector('input, select, button');
    firstInput?.focus();
    audio.playPop();
  }

  closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  openCheckinModal() {
    const state = store.getState();
    this.sliderDailySpoons.value = state.dailySpoons;
    this.sliderSpoonDisplay.textContent = `${state.dailySpoons} Spoons`;
    this.updateCheckinDescriptor(state.dailySpoons);
    this.openModal(this.modalCheckin);
  }

  openRebalanceModal() {
    const analytics = store.getAnalytics();
    document.getElementById('rebalance-deficit-num').textContent = `${analytics.overCapacityAmount} Spoons`;
    this.openModal(this.modalRebalance);
  }

  openBoundaryModal(scenario = 'capacity', recipient = 'colleague') {
    if (this.boundaryScenarioSelect) this.boundaryScenarioSelect.value = scenario;
    if (this.boundaryRecipientSelect) this.boundaryRecipientSelect.value = recipient;
    this.updateBoundaryOutput();
    this.openModal(this.modalBoundary);
  }

  updateBoundaryOutput() {
    if (!this.boundaryOutput) return;
    const scenario = this.boundaryScenarioSelect?.value || 'capacity';
    const recipient = this.boundaryRecipientSelect?.value || 'colleague';
    const activeToneBtn = document.querySelector('.boundary-tone-btn.active');
    const tone = activeToneBtn?.dataset.tone || 'professional';
    this.boundaryOutput.value = getBoundaryMessage(scenario, recipient, tone);
  }

  updateCheckinDescriptor(spoons) {
    const s = Number(spoons);
    if (!this.checkinDescriptor) return;

    if (s <= 3) {
      this.checkinDescriptor.innerHTML = `
        <strong style="color:var(--spoon-rose)">Survival Mode (1-3 Spoons)</strong><br>
        Physical or mental reserves are deeply depleted. Focus exclusively on survival necessities, hydration, and restful pauses. Defer everything else.
      `;
    } else if (s <= 7) {
      this.checkinDescriptor.innerHTML = `
        <strong style="color:var(--spoon-amber)">Moderate Capacity (4-7 Spoons)</strong><br>
        Balanced day. Best suited for 1-2 core priorities accompanied by regular restorative breaks. Protect boundaries against extra meetings.
      `;
    } else {
      this.checkinDescriptor.innerHTML = `
        <strong style="color:var(--spoon-emerald)">High Stamina Day (8-12 Spoons)</strong><br>
        Great cognitive reserve! Ideal for complex creative work or multi-step execution. Remember to still schedule recovery to avoid boom-and-bust crashes.
      `;
    }
  }

  showToast(message, type = 'normal') {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✨' : type === 'warning' ? '🛡️' : '🌿'}</span>
      <span>${this.escapeHtml(message)}</span>
    `;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

export const ui = new UIController();
