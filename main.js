import confetti from 'canvas-confetti';
import { CARDS_DATA } from './src/data/cards.js';
import { DateDeckScene } from './src/scene/DateDeckScene.js';
import { sound } from './src/audio/soundManager.js';

// Application State
const state = {
  currentCard: null,
  currentIndex: -1,
  isFlipped: false,
  savedDates: JSON.parse(localStorage.getItem('duo_saved_dates') || '[]'),
  activeCategory: 'all',
  theme: localStorage.getItem('duo_theme') || 'light' // Default to light mode
};

// Set initial HTML theme attribute
document.documentElement.setAttribute('data-theme', state.theme);

// DOM Elements
const webglContainer = document.getElementById('webgl-container');
const railHint = document.getElementById('rail-hint');
const cardFocusHud = document.getElementById('card-focus-hud');
const hudCategoryPill = document.getElementById('hud-category-pill');
const hudTitle = document.getElementById('hud-title');
const hudSubtitle = document.getElementById('hud-subtitle');
const hudTagsRow = document.getElementById('hud-tags-row');
const btnExploreBlueprint = document.getElementById('btn-explore-blueprint');
const btnBackDeck = document.getElementById('btn-back-deck');
const btnLockIn = document.getElementById('btn-lock-in');
const lockBtnText = document.getElementById('lock-btn-text');

// Blueprint Scroll-Down Window Elements
const blueprintWindowBackdrop = document.getElementById('blueprint-window-backdrop');
const btnCloseBlueprint = document.getElementById('btn-close-blueprint');
const blueprintModalCategory = document.getElementById('blueprint-modal-category');
const blueprintModalBadge = document.getElementById('blueprint-modal-badge');
const blueprintModalEmoji = document.getElementById('blueprint-modal-emoji');
const blueprintModalTitle = document.getElementById('blueprint-modal-title');
const blueprintModalSubtitle = document.getElementById('blueprint-modal-subtitle');
const blueprintModalDesc = document.getElementById('blueprint-modal-desc');
const blueprintBulletsContainer = document.getElementById('blueprint-bullets-container');
const btnCopyBlueprint = document.getElementById('btn-copy-blueprint');
const btnConfirmBlueprint = document.getElementById('btn-confirm-blueprint');

// Header Actions & Theme Chooser
const themeChooser = document.getElementById('theme-chooser');
const themeLightBtn = document.getElementById('theme-light-btn');
const themeDarkBtn = document.getElementById('theme-dark-btn');
const btnSurpriseFate = document.getElementById('btn-surprise-fate');
const btnToggleSound = document.getElementById('btn-toggle-sound');
const soundIcon = document.getElementById('sound-icon');
const btnSavedDates = document.getElementById('btn-saved-dates');
const savedCount = document.getElementById('saved-count');
const categoryNav = document.getElementById('category-nav');

// Modal Elements
const modalBackdrop = document.getElementById('modal-backdrop');
const btnCloseModal = document.getElementById('btn-close-modal');
const modalEmoji = document.getElementById('modal-emoji');
const modalTitle = document.getElementById('modal-title');
const modalBadge = document.getElementById('modal-badge');
const modalDesc = document.getElementById('modal-desc');
const modalSteps = document.getElementById('modal-steps');
const btnCopyPlan = document.getElementById('btn-copy-plan');
const btnConfirmDate = document.getElementById('btn-confirm-date');

// Drawer Elements
const drawerBackdrop = document.getElementById('drawer-backdrop');
const btnCloseDrawer = document.getElementById('btn-close-drawer');
const savedDrawerList = document.getElementById('saved-drawer-list');

// Initialize Theme Chooser Active State
function updateThemeButtons(theme) {
  if (theme === 'light') {
    themeLightBtn.classList.add('active');
    themeDarkBtn.classList.remove('active');
  } else {
    themeDarkBtn.classList.add('active');
    themeLightBtn.classList.remove('active');
  }
}
updateThemeButtons(state.theme);

// Initialize 3D Scene with initial theme
const scene = new DateDeckScene(
  webglContainer,
  CARDS_DATA,
  (card, index, isZoomed) => {
    handleCardSelectionChange(card, index, isZoomed);
  },
  state.theme
);

function updateSavedCount() {
  savedCount.textContent = state.savedDates.length;
}
updateSavedCount();

// Theme Chooser Event
themeChooser.addEventListener('click', (e) => {
  const btn = e.target.closest('.theme-toggle-btn');
  if (!btn) return;
  const newTheme = btn.dataset.theme;
  if (newTheme === state.theme) return;

  state.theme = newTheme;
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('_theme', newTheme);
  updateThemeButtons(newTheme);
  sound.playClick();
  scene.setTheme(newTheme);
});

// Handle Selection Callback from 3D Scene
function handleCardSelectionChange(card, index, isZoomed) {
  state.currentCard = card;
  state.currentIndex = index;
  state.isFlipped = false;

  if (isZoomed && card) {
    document.body.classList.add('card-zoomed');
    if (hudCategoryPill) hudCategoryPill.textContent = (card.categoryLabel || 'COUPLE GOAL').toUpperCase();
    if (hudTitle) hudTitle.textContent = card.title;
    if (hudSubtitle) hudSubtitle.textContent = card.frontSubtitle;
    if (lockBtnText) lockBtnText.textContent = card.back.actionLabel || 'LOCK IT IN';

    if (hudTagsRow) {
      hudTagsRow.innerHTML = '';
      if (card.tags && card.tags.length) {
        card.tags.forEach(tag => {
          const chip = document.createElement('span');
          chip.className = 'hud-tag-chip';
          chip.innerHTML = `${tag.label}: <strong>${tag.value}</strong>`;
          hudTagsRow.appendChild(chip);
        });
      }
    }

    cardFocusHud.classList.remove('hidden');
    railHint.classList.add('hidden');
  } else {
    document.body.classList.remove('card-zoomed');
    cardFocusHud.classList.add('hidden');
    railHint.classList.remove('hidden');
    blueprintWindowBackdrop.classList.add('hidden');
  }
}

// Open Trendy Scroll-Down Blueprint Window with bullets
function openBlueprintWindow(card) {
  if (!card) return;
  sound.playClick();

  blueprintModalCategory.textContent = (card.categoryLabel || 'COUPLE GOAL').toUpperCase();
  blueprintModalBadge.textContent = card.back.badge || 'ACTION PROTOCOL';
  blueprintModalEmoji.textContent = card.frontArt.emoji || '✨';
  blueprintModalTitle.textContent = card.title;
  blueprintModalSubtitle.textContent = card.back.heading || card.frontSubtitle;
  blueprintModalDesc.textContent = card.back.description;

  // Trendy Classy Bullet Points
  blueprintBulletsContainer.innerHTML = '';
  (card.back.steps || []).forEach((step, idx) => {
    const item = document.createElement('div');
    item.className = 'blueprint-bullet-item';
    item.innerHTML = `
      <div class="blueprint-bullet-badge">${String(idx + 1).padStart(2, '0')}</div>
      <p class="blueprint-bullet-text">${step}</p>
    `;
    blueprintBulletsContainer.appendChild(item);
  });

  blueprintWindowBackdrop.classList.remove('hidden');
}

// Explore Blueprint Button Click
btnExploreBlueprint.addEventListener('click', () => {
  if (state.currentCard) {
    openBlueprintWindow(state.currentCard);
  }
});

// Close Blueprint Window
btnCloseBlueprint.addEventListener('click', () => {
  blueprintWindowBackdrop.classList.add('hidden');
});

blueprintWindowBackdrop.addEventListener('click', (e) => {
  if (e.target === blueprintWindowBackdrop) {
    blueprintWindowBackdrop.classList.add('hidden');
  }
});

// Copy Blueprint Mission from Scroll-Down Window
btnCopyBlueprint.addEventListener('click', () => {
  if (!state.currentCard) return;
  const card = state.currentCard;
  const textToCopy = `✨ THE DATE DECK · ${card.title} ✨\n${card.back.description}\n\n` +
    (card.back.steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n') +
    `\n\nLocked in with love ♥`;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = btnCopyBlueprint.innerHTML;
    btnCopyBlueprint.innerHTML = '<span>COPIED PROTOCOL! ✨</span>';
    setTimeout(() => {
      btnCopyBlueprint.innerHTML = originalText;
    }, 2000);
  });
});

// Accept and Lock In from Blueprint Window
btnConfirmBlueprint.addEventListener('click', () => {
  blueprintWindowBackdrop.classList.add('hidden');
  btnLockIn.click();
});

// Back to deck button
btnBackDeck.addEventListener('click', () => {
  sound.playClick();
  blueprintWindowBackdrop.classList.add('hidden');
  scene.zoomOut();
});

// Category Nav Filter
categoryNav.addEventListener('click', (e) => {
  const chip = e.target.closest('.nav-chip');
  if (!chip) return;

  document.querySelectorAll('.nav-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');

  const cat = chip.dataset.category;
  state.activeCategory = cat;
  sound.playClick();
  scene.filterByCategory(cat);
});

// "Surprise Us" Fate Button
btnSurpriseFate.addEventListener('click', () => {
  scene.surpriseUs();
});

// Sound Toggle
btnToggleSound.addEventListener('click', () => {
  const isMuted = sound.toggleMute();
  soundIcon.textContent = isMuted ? '🔇' : '🔊';
});

// Lock It In - Confetti & Modal Celebration
btnLockIn.addEventListener('click', () => {
  if (!state.currentCard) return;

  sound.playLock();

  // Burst celebratory fireworks
  confetti({
    particleCount: 85,
    spread: 70,
    origin: { y: 0.75 },
    colors: ['#e5b95f', '#f72585', '#2ec4b6', '#ffffff']
  });

  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#e5b95f', '#ff6b6b', '#f72585']
    });
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#2ec4b6', '#06d6a0', '#ffffff']
    });
  }, 200);

  // Populate Modal
  const card = state.currentCard;
  modalEmoji.textContent = card.frontArt.emoji;
  modalTitle.textContent = card.title;
  modalBadge.textContent = card.back.badge;
  modalDesc.textContent = card.back.description;

  modalSteps.innerHTML = '';
  card.back.steps.forEach((step, i) => {
    const item = document.createElement('div');
    item.className = 'step-item';
    item.innerHTML = `
      <div class="step-bullet">${i + 1}</div>
      <div>${step}</div>
    `;
    modalSteps.appendChild(item);
  });

  modalBackdrop.classList.remove('hidden');

  // Save to dates list if not already present
  if (!state.savedDates.some(d => d.id === card.id)) {
    state.savedDates.unshift({
      id: card.id,
      title: card.title,
      category: card.categoryLabel,
      emoji: card.frontArt.emoji,
      timestamp: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem('duo_saved_dates', JSON.stringify(state.savedDates));
    updateSavedCount();
  }
});

// Close Modal
btnCloseModal.addEventListener('click', () => {
  modalBackdrop.classList.add('hidden');
});
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) modalBackdrop.classList.add('hidden');
});

// Copy Plan to Clipboard
btnCopyPlan.addEventListener('click', () => {
  if (!state.currentCard) return;
  const card = state.currentCard;
  const textToCopy = `✨ THE DATE DECK · ${card.title} ✨\n${card.back.description}\n\n` +
    card.back.steps.map((s, i) => `${i + 1}. ${s}`).join('\n') +
    `\n\nLocked in with love ♥`;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = btnCopyPlan.innerHTML;
    btnCopyPlan.innerHTML = '<span>COPIED TO CLIPBOARD! ✨</span>';
    setTimeout(() => {
      btnCopyPlan.innerHTML = originalText;
    }, 2000);
  });
});

// Confirm Tonight's Date
btnConfirmDate.addEventListener('click', () => {
  modalBackdrop.classList.add('hidden');
});

// Saved Dates Drawer
btnSavedDates.addEventListener('click', () => {
  renderSavedDrawer();
  drawerBackdrop.classList.remove('hidden');
});

btnCloseDrawer.addEventListener('click', () => {
  drawerBackdrop.classList.add('hidden');
});

drawerBackdrop.addEventListener('click', (e) => {
  if (e.target === drawerBackdrop) drawerBackdrop.classList.add('hidden');
});

function renderSavedDrawer() {
  savedDrawerList.innerHTML = '';
  if (state.savedDates.length === 0) {
    savedDrawerList.innerHTML = `
      <div class="drawer-empty-state">
        <div class="drawer-empty-icon">🕯️</div>
        <p>No locked dates yet.<br>Inspect any cue card and click "Lock It In" to add it to your date vault!</p>
      </div>
    `;
    return;
  }

  state.savedDates.forEach((item) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'saved-item-card';
    cardEl.innerHTML = `
      <div class="saved-item-title">${item.emoji} ${item.title}</div>
      <div class="saved-item-meta">
        <span>${item.category}</span>
        <span>${item.timestamp}</span>
      </div>
    `;
    savedDrawerList.appendChild(cardEl);
  });
}
