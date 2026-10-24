import * as THREE from 'three';

/**
 * Creates ultra-sharp Canvas textures for Front, Tarot Sunburst Back, and Blueprint
 * Supports both 'light' and 'dark' themes
 */
export class CardTextureGenerator {
  /**
   * Intricate Radiant Sunburst Mandala Back (Exactly matching the reference image!)
   */
  static createTarotBackTexture(theme = 'light') {
    const isLight = theme === 'light';
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1500;
    const ctx = canvas.getContext('2d');

    // Romantic deep velvet wine / crimson noir base
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (isLight) {
      bgGradient.addColorStop(0, '#3e1022');
      bgGradient.addColorStop(0.5, '#280815');
      bgGradient.addColorStop(1, '#17040c');
    } else {
      bgGradient.addColorStop(0, '#2f0b19');
      bgGradient.addColorStop(0.5, '#1e0510');
      bgGradient.addColorStop(1, '#100208');
    }
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle romantic rose glow in the center
    const glowRad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 40, canvas.width / 2, canvas.height / 2, 480);
    glowRad.addColorStop(0, 'rgba(235, 90, 125, 0.28)');
    glowRad.addColorStop(0.6, 'rgba(180, 45, 80, 0.12)');
    glowRad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowRad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle edge vignette
    const vig = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 220, canvas.width / 2, canvas.height / 2, 750);
    vig.addColorStop(0, 'transparent');
    vig.addColorStop(1, 'rgba(15, 2, 8, 0.65)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Outer double rounded foil border (Romantic Rose Gold)
    const roseGold = '#f5c2c7';
    ctx.strokeStyle = 'rgba(245, 194, 199, 0.55)';
    ctx.lineWidth = 3;
    roundRect(ctx, 36, 36, canvas.width - 72, canvas.height - 72, 32);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 220, 228, 0.2)';
    ctx.lineWidth = 1;
    roundRect(ctx, 48, 48, canvas.width - 96, canvas.height - 96, 24);
    ctx.stroke();

    // Corner celestial romantic dots
    [
      [58, 58], [canvas.width - 58, 58],
      [58, canvas.height - 58], [canvas.width - 58, canvas.height - 58]
    ].forEach(([x, y]) => {
      ctx.fillStyle = roseGold;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // --- RADIANT SUNBURST RAYS (Romantic Rose Gold & Champagne) ---
    const numRays = 84;
    const innerRadius = 145;
    const outerRadius = 350;

    for (let i = 0; i < numRays; i++) {
      const angle = (i * Math.PI * 2) / numRays;
      const isMajor = i % 2 === 0;
      const rayLen = isMajor ? outerRadius : outerRadius * 0.78;
      const rInner = isMajor ? innerRadius : innerRadius + 15;

      const x1 = cx + Math.cos(angle) * rInner;
      const y1 = cy + Math.sin(angle) * rInner;
      const x2 = cx + Math.cos(angle) * rayLen;
      const y2 = cy + Math.sin(angle) * rayLen;

      ctx.strokeStyle = isMajor ? 'rgba(248, 206, 212, 0.85)' : 'rgba(225, 160, 172, 0.45)';
      ctx.lineWidth = isMajor ? 2.0 : 1.2;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // --- CONCENTRIC SACRED GEOMETRY CIRCLES ---
    const rings = [
      { r: 148, w: 2.5, alpha: 0.85, dash: [] },
      { r: 138, w: 1.5, alpha: 0.55, dash: [4, 6] },
      { r: 125, w: 1.5, alpha: 0.7, dash: [] },
      { r: 112, w: 3.0, alpha: 0.6, dash: [2, 5] },
      { r: 96, w: 2.0, alpha: 0.9, dash: [] },
      { r: 78, w: 1.5, alpha: 0.55, dash: [6, 6] },
      { r: 58, w: 2.0, alpha: 0.9, dash: [] },
      { r: 38, w: 1.5, alpha: 0.75, dash: [] }
    ];

    rings.forEach(ring => {
      ctx.setLineDash(ring.dash);
      ctx.strokeStyle = `rgba(248, 206, 212, ${ring.alpha})`;
      ctx.lineWidth = ring.w;
      ctx.beginPath();
      ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Solar tooth ring
    const teeth = 36;
    for (let t = 0; t < teeth; t++) {
      const a = (t * Math.PI * 2) / teeth;
      const tx = cx + Math.cos(a) * 87;
      const ty = cy + Math.sin(a) * 87;
      ctx.fillStyle = 'rgba(248, 206, 212, 0.9)';
      ctx.beginPath();
      ctx.arc(tx, ty, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Inner Radiant Star
    const starRays = 16;
    for (let s = 0; s < starRays; s++) {
      const sa = (s * Math.PI * 2) / starRays;
      const sx1 = cx + Math.cos(sa) * 12;
      const sy1 = cy + Math.sin(sa) * 12;
      const sx2 = cx + Math.cos(sa) * 35;
      const sy2 = cy + Math.sin(sa) * 35;
      ctx.strokeStyle = 'rgba(255, 225, 230, 0.95)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.lineTo(sx2, sy2);
      ctx.stroke();
    }

    // Center Romantic Core Eye
    ctx.fillStyle = '#f5c2c7';
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#260714';
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    return texture;
  }

  /**
   * Front Face (Artwork, Title, and Romantic Prompt)
   */
  static createFrontTexture(cardData, theme = 'light') {
    const isLight = theme === 'light';
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1500;
    const ctx = canvas.getContext('2d');

    // Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (isLight) {
      bgGradient.addColorStop(0, '#ffffff');
      bgGradient.addColorStop(0.5, '#f8f7f2');
      bgGradient.addColorStop(1, '#f1ede4');
    } else {
      bgGradient.addColorStop(0, '#181720');
      bgGradient.addColorStop(0.5, '#121118');
      bgGradient.addColorStop(1, '#0a0a0f');
    }
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Center subtle color glow
    const radial = ctx.createRadialGradient(canvas.width / 2, 490, 40, canvas.width / 2, 490, 420);
    radial.addColorStop(0, hexToRgba(cardData.themeColor, isLight ? 0.22 : 0.3));
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Double Foil Border
    const borderGold = isLight ? hexToRgba(cardData.accentColor || '#c29b38', 0.65) : hexToRgba(cardData.accentColor || '#e2b769', 0.55);
    ctx.strokeStyle = borderGold;
    ctx.lineWidth = 3.5;
    roundRect(ctx, 36, 36, canvas.width - 72, canvas.height - 72, 32);
    ctx.stroke();

    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, 48, 48, canvas.width - 96, canvas.height - 96, 24);
    ctx.stroke();

    // Top Category Badge
    const categoryText = (cardData.categoryLabel || 'COUPLE GOAL').toUpperCase();
    ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
    const textWidth = ctx.measureText(categoryText).width;
    const badgeW = textWidth + 56;
    const badgeH = 44;
    const badgeX = (canvas.width - badgeW) / 2;
    const badgeY = 85;

    ctx.fillStyle = isLight ? hexToRgba(cardData.themeColor, 0.18) : hexToRgba(cardData.themeColor, 0.25);
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 22);
    ctx.fill();

    ctx.strokeStyle = cardData.accentColor || (isLight ? '#222' : '#fff');
    ctx.lineWidth = 2;
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 22);
    ctx.stroke();

    ctx.fillStyle = isLight ? '#1a1924' : '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(categoryText, canvas.width / 2, badgeY + badgeH / 2);

    // Center Emblem Circle with Emoji/Symbol
    const cx = canvas.width / 2;
    const cy = 480;
    const radius = 150;

    // Glowing circle
    ctx.fillStyle = isLight ? '#ffffff' : '#171622';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = hexToRgba(cardData.accentColor, 0.9);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([6, 10]);
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 16, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Big Emoji / Icon
    ctx.font = '115px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(cardData.frontArt.emoji, cx, cy + 8);

    // Title Section
    ctx.fillStyle = isLight ? '#111018' : '#ffffff';
    ctx.font = '800 44px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';

    const words = cardData.title.split(' ');
    if (words.length > 2) {
      const mid = Math.ceil(words.length / 2);
      const line1 = words.slice(0, mid).join(' ');
      const line2 = words.slice(mid).join(' ');
      ctx.fillText(line1, cx, 750);
      ctx.fillText(line2, cx, 810);
    } else {
      ctx.fillText(cardData.title, cx, 780);
    }

    // Center Romantic Flourish Divider
    ctx.strokeStyle = hexToRgba(cardData.themeColor, 0.6);
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(cx - 120, 870);
    ctx.lineTo(cx + 120, 870);
    ctx.stroke();

    // Center jewel heart/star dot
    ctx.fillStyle = cardData.accentColor || '#f5c2c7';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('♥', cx, 870);

    // Front Secret Romantic Quote / Cue
    ctx.fillStyle = isLight ? '#444252' : '#d8d7e6';
    ctx.font = 'italic 500 28px "Playfair Display", Georgia, serif';
    wrapText(ctx, cardData.frontArt.quote, cx, 940, 620, 42);

    // Subtle romantic stars flourish
    const starColor = isLight ? 'rgba(210, 150, 165, 0.45)' : 'rgba(245, 194, 199, 0.4)';
    ctx.fillStyle = starColor;
    ctx.font = '22px sans-serif';
    ctx.fillText('✦', cx - 220, 940);
    ctx.fillText('✦', cx + 220, 940);

    // Romantic Footer stamp
    ctx.fillStyle = isLight ? 'rgba(120, 80, 95, 0.55)' : 'rgba(245, 194, 199, 0.5)';
    ctx.font = '600 16px "JetBrains Mono", monospace';
    ctx.fillText('✦ SECRET DATE QUEST · ' + cardData.id.toUpperCase().slice(0, 10) + ' ✦', cx, canvas.height - 110);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    return texture;
  }

  /**
   * Action Blueprint / Details (When flipped to the blueprint)
   */
  static createBlueprintTexture(cardData, theme = 'light') {
    const isLight = theme === 'light';
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1500;
    const ctx = canvas.getContext('2d');

    const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
    if (isLight) {
      bg.addColorStop(0, '#ffffff');
      bg.addColorStop(0.5, '#f8f7f2');
      bg.addColorStop(1, '#f1eee6');
    } else {
      bg.addColorStop(0, '#0e0d13');
      bg.addColorStop(0.5, '#15141c');
      bg.addColorStop(1, '#0a0a0f');
    }
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = isLight ? hexToRgba(cardData.accentColor || '#c29b38', 0.55) : hexToRgba(cardData.accentColor || '#ffffff', 0.4);
    ctx.lineWidth = 3;
    roundRect(ctx, 36, 36, canvas.width - 72, canvas.height - 72, 32);
    ctx.stroke();

    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, 48, 48, canvas.width - 96, canvas.height - 96, 24);
    ctx.stroke();

    // Top Header Badge
    const badgeText = cardData.back.badge || 'THE BLUEPRINT';
    ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
    const bw = ctx.measureText(badgeText).width + 56;
    const bh = 42;
    const bx = (canvas.width - bw) / 2;
    const by = 85;

    ctx.fillStyle = isLight ? hexToRgba(cardData.themeColor, 0.22) : hexToRgba(cardData.themeColor, 0.35);
    roundRect(ctx, bx, by, bw, bh, 21);
    ctx.fill();

    ctx.strokeStyle = cardData.accentColor;
    ctx.lineWidth = 2;
    roundRect(ctx, bx, by, bw, bh, 21);
    ctx.stroke();

    ctx.fillStyle = isLight ? '#1a1924' : '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, canvas.width / 2, by + bh / 2);

    // Main Heading
    ctx.fillStyle = isLight ? '#111018' : '#ffffff';
    ctx.font = '800 38px "Playfair Display", Georgia, serif';
    ctx.fillText(cardData.back.heading, canvas.width / 2, 190);

    // Description text
    ctx.fillStyle = isLight ? '#4c4b5a' : '#cfcfe0';
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    wrapText(ctx, cardData.back.description, canvas.width / 2, 245, 660, 32);

    // Steps container list
    let currentY = 320;
    const boxW = 680;
    const boxX = (canvas.width - boxW) / 2;

    cardData.back.steps.forEach((stepText, index) => {
      ctx.fillStyle = isLight ? 'rgba(0, 0, 0, 0.035)' : 'rgba(255, 255, 255, 0.04)';
      roundRect(ctx, boxX, currentY, boxW, 140, 18);
      ctx.fill();

      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      roundRect(ctx, boxX, currentY, boxW, 140, 18);
      ctx.stroke();

      const numX = boxX + 60;
      const numY = currentY + 70;
      ctx.fillStyle = hexToRgba(cardData.themeColor, 0.9);
      ctx.beginPath();
      ctx.arc(numX, numY, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = cardData.accentColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(numX, numY, 30, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((index + 1).toString(), numX, numY);

      ctx.fillStyle = isLight ? '#1c1b26' : '#e8e8f2';
      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      wrapText(ctx, stepText, boxX + 115, currentY + 45, 540, 30);

      currentY += 165;
    });

    // Bottom Action Prompt Banner
    const bannerH = 135;
    const bannerY = canvas.height - bannerH - 85;
    ctx.fillStyle = isLight ? hexToRgba(cardData.themeColor, 0.12) : hexToRgba(cardData.themeColor, 0.18);
    roundRect(ctx, boxX, bannerY, boxW, bannerH, 20);
    ctx.fill();

    ctx.strokeStyle = hexToRgba(cardData.accentColor, 0.6);
    ctx.lineWidth = 2;
    roundRect(ctx, boxX, bannerY, boxW, bannerH, 20);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = isLight ? '#111018' : '#ffffff';
    ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('♥ ' + cardData.back.actionPrompt, canvas.width / 2, bannerY + 48);

    ctx.fillStyle = isLight ? '#6b5825' : cardData.accentColor;
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText('CLICK [LOCK IT IN] BELOW TO ACCEPT', canvas.width / 2, bannerY + 92);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    return texture;
  }
}

// Utility functions
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(255, 255, 255, ${alpha})`;
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const r = parseInt(clean.substring(0, 2), 16) || 255;
  const g = parseInt(clean.substring(2, 4), 16) || 255;
  const b = parseInt(clean.substring(4, 6), 16) || 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
}
