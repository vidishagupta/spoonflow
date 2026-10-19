/**
 * SpoonFlow Application Entry Point
 * Initializes audio, stores, UI, and keyboard shortcuts
 */

import { ui } from './ui.js';
import { audio } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI controller
  ui.init();

  // Initialize Web Audio on first user interaction to comply with browser autoplay policies
  const initAudioOnGesture = () => {
    audio.init();
    window.removeEventListener('click', initAudioOnGesture);
    window.removeEventListener('keydown', initAudioOnGesture);
  };

  window.addEventListener('click', initAudioOnGesture, { once: true });
  window.addEventListener('keydown', initAudioOnGesture, { once: true });

  console.log('🥄 SpoonFlow initialized successfully. Work should fit people — not force people to fit the tool.');
});
