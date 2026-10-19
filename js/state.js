/**
 * SpoonFlow State Management & Persona Presets
 * Full localStorage sync and reactive event dispatching
 */

const STORAGE_KEY = 'spoonflow_app_state_v1';

export const DEMO_PERSONAS = {
  maya: {
    id: 'maya',
    name: 'Maya — Student with Long COVID',
    bio: 'Low physical stamina, prone to post-exertional malaise. Needs strict 3-spoon pacing.',
    dailySpoons: 3,
    sleepQuality: 'poor',
    tasks: [
      {
        id: 'task-m1',
        title: 'Attend 9:00 AM Biology lecture',
        notes: 'Sit near the door; leave early if dizziness occurs',
        spoonCost: 2,
        drainType: 'cognitive',
        priority: 'essential',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 3600000
      },
      {
        id: 'task-m2',
        title: 'Review Chapter 4 summary notes',
        notes: 'Low energy reading only',
        spoonCost: 1,
        drainType: 'cognitive',
        priority: 'flexible',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 3000000
      },
      {
        id: 'task-m3',
        title: 'Draft biology lab discussion section',
        notes: 'Intense analytical writing',
        spoonCost: 2,
        drainType: 'cognitive',
        priority: 'flexible',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 2500000
      },
      {
        id: 'task-m4',
        title: 'Reply to group presentation group chat',
        notes: 'Negotiate slide responsibilities',
        spoonCost: 1,
        drainType: 'social',
        priority: 'flexible',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 2000000
      },
      {
        id: 'task-m5',
        title: 'Lie down in dark room for 20 minutes',
        notes: 'Zero screen time, gentle recovery',
        spoonCost: 1,
        drainType: 'restorative',
        priority: 'essential',
        completed: true,
        deferred: false,
        createdAt: Date.now() - 5000000
      }
    ]
  },

  alex: {
    id: 'alex',
    name: 'Alex — Dev with ADHD Burnout',
    bio: 'High friction starting complex tasks. Needs single-task focus and sensory boundaries.',
    dailySpoons: 6,
    sleepQuality: 'fair',
    tasks: [
      {
        id: 'task-a1',
        title: 'Debug race condition in payment webhook',
        notes: 'High complexity, requires deep mental flow',
        spoonCost: 3,
        drainType: 'cognitive',
        priority: 'essential',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 4000000
      },
      {
        id: 'task-a2',
        title: 'Quarterly performance 1-on-1 with manager',
        notes: 'High emotional tension and expectation management',
        spoonCost: 2,
        drainType: 'social',
        priority: 'essential',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 3200000
      },
      {
        id: 'task-a3',
        title: 'Clean up stale Jira ticket backlog',
        notes: 'Monotonous micro-actions',
        spoonCost: 1,
        drainType: 'micro',
        priority: 'flexible',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 2100000
      },
      {
        id: 'task-a4',
        title: '15-minute screen-free sunlight walk',
        notes: 'Reset dopamine receptors',
        spoonCost: 1,
        drainType: 'restorative',
        priority: 'essential',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 1000000
      },
      {
        id: 'task-a5',
        title: 'Catch up on 42 unread Slack threads',
        notes: 'Low priority messages',
        spoonCost: 2,
        drainType: 'social',
        priority: 'flexible',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 500000
      }
    ]
  },

  jordan: {
    id: 'jordan',
    name: 'Jordan — Freelance Designer (Chronic Fatigue)',
    bio: 'Balancing client deliverables while avoiding physical crash.',
    dailySpoons: 8,
    sleepQuality: 'good',
    tasks: [
      {
        id: 'task-j1',
        title: 'Finalize mobile wireframes for client app',
        notes: 'High visual precision work',
        spoonCost: 3,
        drainType: 'cognitive',
        priority: 'essential',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 4000000
      },
      {
        id: 'task-j2',
        title: 'Client design review video call',
        notes: 'Live presentation and feedback',
        spoonCost: 2,
        drainType: 'social',
        priority: 'essential',
        completed: true,
        deferred: false,
        createdAt: Date.now() - 6000000
      },
      {
        id: 'task-j3',
        title: 'Send monthly invoices',
        notes: 'Quick bookkeeping',
        spoonCost: 1,
        drainType: 'micro',
        priority: 'essential',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 1500000
      },
      {
        id: 'task-j4',
        title: 'Afternoon hydration & gentle stretching',
        notes: 'Release tension in neck and shoulders',
        spoonCost: 1,
        drainType: 'restorative',
        priority: 'essential',
        completed: false,
        deferred: false,
        createdAt: Date.now() - 800000
      }
    ]
  }
};

const DEFAULT_STATE = {
  dailySpoons: 6,
  sleepQuality: 'fair',
  activePersona: 'alex',
  spoonsPreservedByNo: 4,
  preferences: {
    soundEnabled: true,
    dyslexicFont: false,
    highContrast: false,
    reducedMotion: false,
    textScale: 'normal'
  },
  tasks: DEMO_PERSONAS.alex.tasks
};

class Store {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using defaults', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
    this.notify();
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  // State Mutators
  setDailySpoons(spoons) {
    this.state.dailySpoons = Math.max(1, Math.min(12, Number(spoons)));
    this.saveState();
  }

  setSleepQuality(quality) {
    this.state.sleepQuality = quality;
    this.saveState();
  }

  addTask(taskData) {
    const newTask = {
      id: 'task-' + Date.now(),
      title: taskData.title.trim(),
      notes: (taskData.notes || '').trim(),
      spoonCost: Number(taskData.spoonCost) || 1,
      drainType: taskData.drainType || 'cognitive',
      priority: taskData.priority || 'flexible',
      completed: false,
      deferred: false,
      createdAt: Date.now()
    };
    this.state.tasks.unshift(newTask);
    this.saveState();
    return newTask;
  }

  toggleTask(taskId) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveState();
    }
  }

  deleteTask(taskId) {
    this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
    this.saveState();
  }

  deferTask(taskId) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task) {
      task.deferred = true;
      this.state.spoonsPreservedByNo += task.spoonCost;
      this.saveState();
    }
  }

  deferAllFlexibleTasks() {
    let preserved = 0;
    this.state.tasks.forEach(task => {
      if (!task.completed && task.priority === 'flexible' && !task.deferred && task.drainType !== 'restorative') {
        task.deferred = true;
        preserved += task.spoonCost;
      }
    });
    this.state.spoonsPreservedByNo += preserved;
    this.saveState();
    return preserved;
  }

  loadPersona(personaKey) {
    const persona = DEMO_PERSONAS[personaKey];
    if (persona) {
      this.state.activePersona = personaKey;
      this.state.dailySpoons = persona.dailySpoons;
      this.state.sleepQuality = persona.sleepQuality;
      this.state.tasks = JSON.parse(JSON.stringify(persona.tasks));
      this.saveState();
    }
  }

  resetToBlank() {
    this.state.activePersona = null;
    this.state.dailySpoons = 5;
    this.state.tasks = [];
    this.saveState();
  }

  updatePreferences(prefKey, val) {
    this.state.preferences[prefKey] = val;
    this.saveState();
  }

  // Energy & Spoon Analytics
  getAnalytics() {
    const activeTasks = this.state.tasks.filter(t => !t.deferred);
    const regularTasks = activeTasks.filter(t => t.drainType !== 'restorative');
    const restorativeTasks = activeTasks.filter(t => t.drainType === 'restorative');

    // Total planned spoon cost from non-restorative tasks
    const totalCost = regularTasks.reduce((sum, t) => sum + (t.spoonCost || 0), 0);
    // Spoons spent on completed tasks
    const spentCost = regularTasks.filter(t => t.completed).reduce((sum, t) => sum + (t.spoonCost || 0), 0);
    // Spoons recovered through completed restorative tasks
    const restoredSpoons = restorativeTasks.filter(t => t.completed).reduce((sum, t) => sum + (t.spoonCost || 1), 0);

    const effectiveBudget = this.state.dailySpoons + restoredSpoons;
    const remainingSpoons = Math.max(0, effectiveBudget - spentCost);
    const isOverCapacity = totalCost > effectiveBudget;
    const overCapacityAmount = Math.max(0, totalCost - effectiveBudget);

    return {
      dailyBudget: this.state.dailySpoons,
      effectiveBudget,
      totalCost,
      spentCost,
      restoredSpoons,
      remainingSpoons,
      isOverCapacity,
      overCapacityAmount,
      totalTaskCount: activeTasks.length,
      completedTaskCount: activeTasks.filter(t => t.completed).length,
      deferredTaskCount: this.state.tasks.filter(t => t.deferred).length
    };
  }
}

export const store = new Store();
