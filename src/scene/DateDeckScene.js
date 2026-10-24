import * as THREE from 'three';
import gsap from 'gsap';
import { CardTextureGenerator } from './cardTextureGenerator.js';
import { sound } from '../audio/soundManager.js';

export class DateDeckScene {
  constructor(canvasContainer, cardsData, onCardSelectChange, initialTheme = 'light', onFlipChange = null) {
    this.container = canvasContainer;
    this.cardsData = cardsData;
    this.onCardSelectChange = onCardSelectChange;
    this.onFlipChange = onFlipChange;
    this.theme = initialTheme;

    // Slender tarot proportion matching reference image
    this.cardWidth = 2.85;
    this.cardHeight = 5.7;
    // Overlapping spacing matching reference image (~78% overlap for 22 cards)
    this.cardSpacing = 0.58;

    this.deckX = 0;
    this.targetDeckX = 0;
    this.deckVelocity = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartDeckX = 0;

    this.focusedIndex = -1;
    this.hoveredIndex = -1;
    this.isZoomed = false;
    this.isFlipped = false; // false = front, true = blueprint

    // Double tap / double click detection
    this.lastTapTime = 0;
    this.lastTapIndex = -1;

    this.cardMeshes = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);

    this.initScene();
    this.buildDeck();
    this.bindEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initScene() {
    this.scene = new THREE.Scene();
    const isLight = this.theme === 'light';

    const bgColor = isLight ? '#f5f4ef' : '#0d0c12';
    this.scene.background = new THREE.Color(bgColor);
    this.scene.fog = new THREE.FogExp2(bgColor, 0.012);

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.cameraDefaultPos = new THREE.Vector3(0, 0.1, 12.8);
    this.camera.position.copy(this.cameraDefaultPos);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = isLight ? 1.05 : 1.1;

    this.container.appendChild(this.renderer.domElement);

    // Studio Ambient & Key Lighting
    this.ambientLight = new THREE.AmbientLight(isLight ? '#ffffff' : '#fbf4eb', isLight ? 1.15 : 0.9);
    this.scene.add(this.ambientLight);

    // Main Key Light casting soft contact shadow
    this.keyLight = new THREE.DirectionalLight(isLight ? '#fffdfa' : '#ffe9d6', isLight ? 2.2 : 1.8);
    this.keyLight.position.set(4, 10, 10);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 2048;
    this.keyLight.shadow.mapSize.height = 2048;
    this.keyLight.shadow.camera.near = 0.5;
    this.keyLight.shadow.camera.far = 30;
    this.keyLight.shadow.camera.left = -16;
    this.keyLight.shadow.camera.right = 16;
    this.keyLight.shadow.camera.top = 16;
    this.keyLight.shadow.camera.bottom = -16;
    this.keyLight.shadow.bias = -0.0004;
    this.scene.add(this.keyLight);

    // Soft Rim Light
    this.rimLight = new THREE.DirectionalLight(isLight ? '#ffe5ec' : '#d8b4e2', isLight ? 0.6 : 0.8);
    this.rimLight.position.set(-8, 5, -5);
    this.scene.add(this.rimLight);

    // Ground Plane for soft contact shadow under floating deck
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    this.floorMat = new THREE.ShadowMaterial({ opacity: isLight ? 0.12 : 0.25 });
    const floor = new THREE.Mesh(floorGeo, this.floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.8;
    floor.receiveShadow = true;
    this.scene.add(floor);
  }

  createShineMaterial(isLight) {
    const shineColor = new THREE.Color(isLight ? '#fff1cc' : '#ffe49e');
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uProgress: { value: -0.5 },
        uIntensity: { value: 0.0 },
        uColor: { value: shineColor }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uProgress;
        uniform float uIntensity;
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          float diag = (vUv.x * 0.7 + vUv.y * 0.7);
          float beam = smoothstep(0.0, 0.12, 0.12 - abs(diag - uProgress));
          float broad = smoothstep(0.0, 0.30, 0.30 - abs(diag - uProgress)) * 0.35;
          float alpha = (beam + broad) * uIntensity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `
    });
  }

  createRoundedCardGeometry(width, height, depth, radius = 0.14, smoothness = 10) {
    const shape = new THREE.Shape();
    const w = width / 2;
    const h = height / 2;
    const r = Math.min(radius, w, h);

    // CCW circular arc corners: top-right -> top-left -> bottom-left -> bottom-right
    shape.absarc(w - r, h - r, r, 0, Math.PI / 2, false);
    shape.absarc(-w + r, h - r, r, Math.PI / 2, Math.PI, false);
    shape.absarc(-w + r, -h + r, r, Math.PI, Math.PI * 1.5, false);
    shape.absarc(w - r, -h + r, r, Math.PI * 1.5, Math.PI * 2, false);

    const points = shape.getPoints(smoothness * 4);
    if (points.length > 1 && points[0].distanceTo(points[points.length - 1]) < 0.0001) {
      points.pop();
    }

    const numPoints = points.length;
    const halfDepth = depth / 2;

    const positions = [];
    const normals = [];
    const uvs = [];

    // --- 1. SIDES / EDGES (Material index 0) ---
    const edgeStartIndex = 0;
    for (let i = 0; i < numPoints; i++) {
      const next = (i + 1) % numPoints;
      const p1 = points[i];
      const p2 = points[next];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = dy / len;
      const ny = -dx / len;

      positions.push(
        p1.x, p1.y, halfDepth,
        p2.x, p2.y, -halfDepth,
        p2.x, p2.y, halfDepth,

        p1.x, p1.y, halfDepth,
        p1.x, p1.y, -halfDepth,
        p2.x, p2.y, -halfDepth
      );

      for (let k = 0; k < 6; k++) {
        normals.push(nx, ny, 0);
        uvs.push(i / numPoints, (k % 2 === 0) ? 1 : 0);
      }
    }
    const edgeCount = numPoints * 6;

    // --- 2. FRONT FACE (+Z, Material index 4) ---
    const frontStartIndex = edgeCount;
    for (let i = 0; i < numPoints; i++) {
      const next = (i + 1) % numPoints;
      const p1 = points[i];
      const p2 = points[next];

      positions.push(
        0, 0, halfDepth,
        p1.x, p1.y, halfDepth,
        p2.x, p2.y, halfDepth
      );

      for (let k = 0; k < 3; k++) {
        normals.push(0, 0, 1);
      }

      uvs.push(
        0.5, 0.5,
        (p1.x + w) / width, (p1.y + h) / height,
        (p2.x + w) / width, (p2.y + h) / height
      );
    }
    const frontCount = numPoints * 3;

    // --- 3. BACK FACE (-Z, Material index 5) ---
    const backStartIndex = frontStartIndex + frontCount;
    for (let i = 0; i < numPoints; i++) {
      const next = (i + 1) % numPoints;
      const p1 = points[i];
      const p2 = points[next];

      positions.push(
        0, 0, -halfDepth,
        p2.x, p2.y, -halfDepth,
        p1.x, p1.y, -halfDepth
      );

      for (let k = 0; k < 3; k++) {
        normals.push(0, 0, -1);
      }

      uvs.push(
        0.5, 0.5,
        (w - p2.x) / width, (p2.y + h) / height,
        (w - p1.x) / width, (p1.y + h) / height
      );
    }
    const backCount = numPoints * 3;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

    // Groups matching standard card mesh material slots
    geo.addGroup(edgeStartIndex, edgeCount, 0);
    geo.addGroup(frontStartIndex, frontCount, 4);
    geo.addGroup(backStartIndex, backCount, 5);

    return geo;
  }

  buildDeck() {
    this.deckGroup = new THREE.Group();
    this.scene.add(this.deckGroup);

    // Curved/rounded 3D card geometry for classy, premium aesthetic
    const cardGeo = this.createRoundedCardGeometry(this.cardWidth, this.cardHeight, 0.035, 0.14, 10);
    const shineGeo = new THREE.PlaneGeometry(this.cardWidth * 0.98, this.cardHeight * 0.98);
    this.tarotBackTex = CardTextureGenerator.createTarotBackTexture(this.theme);

    const isLight = this.theme === 'light';
    const edgeColor = isLight ? '#380e1c' : '#230611';

    this.cardsData.forEach((cardData, idx) => {
      const cardAssembly = new THREE.Group();

      const initialX = (idx - (this.cardsData.length - 1) / 2) * this.cardSpacing;
      const initialZ = idx * 0.008;

      cardAssembly.position.set(initialX, 0, initialZ);
      cardAssembly.rotation.y = Math.PI; // Resting sunburst cover

      const frontTex = CardTextureGenerator.createFrontTexture(cardData, this.theme);
      const frontMat = new THREE.MeshStandardMaterial({
        map: frontTex,
        roughness: 0.45,
        metalness: 0.1
      });

      // INDEPENDENT unique back material instance for every card
      const backMat = new THREE.MeshStandardMaterial({
        map: this.tarotBackTex,
        roughness: 0.35,
        metalness: 0.2
      });

      const edgeMat = new THREE.MeshStandardMaterial({
        color: edgeColor,
        metalness: 0.3,
        roughness: 0.5
      });

      // Box materials: [+x, -x, +y, -y, +z (front), -z (back)]
      const materials = [
        edgeMat.clone(),
        edgeMat.clone(),
        edgeMat.clone(),
        edgeMat.clone(),
        frontMat,
        backMat
      ];

      const cardMesh = new THREE.Mesh(cardGeo, materials);
      cardMesh.castShadow = true;
      cardMesh.receiveShadow = true;
      cardMesh.userData = { index: idx, cardData: cardData };
      cardAssembly.add(cardMesh);

      const shineBackMat = this.createShineMaterial(isLight);
      const shineBackMesh = new THREE.Mesh(shineGeo, shineBackMat);
      shineBackMesh.position.set(0, 0, -0.02);
      shineBackMesh.rotation.y = Math.PI;
      cardAssembly.add(shineBackMesh);

      const shineFrontMat = this.createShineMaterial(isLight);
      const shineFrontMesh = new THREE.Mesh(shineGeo, shineFrontMat);
      shineFrontMesh.position.set(0, 0, 0.02);
      cardAssembly.add(shineFrontMesh);

      this.deckGroup.add(cardAssembly);

      this.cardMeshes.push({
        assembly: cardAssembly,
        cardMesh: cardMesh,
        shineBackMat: shineBackMat,
        shineFrontMat: shineFrontMat,
        baseX: initialX,
        baseZ: initialZ,
        data: cardData
      });
    });
  }

  setTheme(newTheme) {
    if (this.theme === newTheme) return;
    this.theme = newTheme;
    const isLight = newTheme === 'light';

    const targetBg = new THREE.Color(isLight ? '#f5f4ef' : '#0d0c12');
    gsap.to(this.scene.background, {
      r: targetBg.r,
      g: targetBg.g,
      b: targetBg.b,
      duration: 0.5
    });
    gsap.to(this.scene.fog.color, {
      r: targetBg.r,
      g: targetBg.g,
      b: targetBg.b,
      duration: 0.5
    });

    this.ambientLight.intensity = isLight ? 1.15 : 0.9;
    this.keyLight.intensity = isLight ? 2.2 : 1.8;
    this.floorMat.opacity = isLight ? 0.12 : 0.25;

    this.tarotBackTex = CardTextureGenerator.createTarotBackTexture(newTheme);

    this.cardMeshes.forEach(item => {
      const frontTex = CardTextureGenerator.createFrontTexture(item.data, newTheme);

      if (item.cardMesh.material[4].map) item.cardMesh.material[4].map.dispose();
      item.cardMesh.material[4].map = frontTex;
      item.cardMesh.material[4].needsUpdate = true;

      // Update back cover to theme's tarot back
      item.cardMesh.material[5].map = this.tarotBackTex;
      item.cardMesh.material[5].needsUpdate = true;

      const edgeColor = isLight ? '#380e1c' : '#230611';
      item.cardMesh.material[0].color.set(edgeColor);
      item.cardMesh.material[1].color.set(edgeColor);
      item.cardMesh.material[2].color.set(edgeColor);
      item.cardMesh.material[3].color.set(edgeColor);

      const shineColor = new THREE.Color(isLight ? '#ffd6dc' : '#f5c2c7');
      item.shineBackMat.uniforms.uColor.value = shineColor;
      item.shineFrontMat.uniforms.uColor.value = shineColor;
    });
  }

  bindEvents() {
    const el = this.container;

    el.addEventListener('wheel', (e) => {
      if (this.isZoomed) return;
      const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      this.targetDeckX -= delta * 0.007;
      this.clampDeckX();
      sound.playWhoosh(Math.abs(delta) * 0.01);
    }, { passive: true });

    el.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartDeckX = this.deckX;
      this.lastPointerX = e.clientX;
      this.lastPointerTime = performance.now();
      this.hasDraggedMeaningfully = false;
    });

    window.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!this.isDragging) {
        if (!this.isZoomed) {
          this.checkHover();
        }
        return;
      }

      const diffX = (e.clientX - this.dragStartX) * 0.015;
      if (Math.abs(diffX) > 0.04) {
        this.hasDraggedMeaningfully = true;
      }

      if (!this.isZoomed) {
        this.targetDeckX = this.dragStartDeckX + diffX;
        this.clampDeckX();

        const now = performance.now();
        const dt = Math.max(now - this.lastPointerTime, 1);
        const vx = (e.clientX - this.lastPointerX) / dt;
        this.deckVelocity = vx * 0.12;
        this.lastPointerX = e.clientX;
        this.lastPointerTime = now;

        sound.playWhoosh(Math.abs(vx) * 0.4);
      }
    });

    window.addEventListener('pointerup', () => {
      if (this.isDragging && !this.hasDraggedMeaningfully) {
        const now = performance.now();
        const timeSinceLastTap = now - this.lastTapTime;

        if (this.isZoomed && timeSinceLastTap < 380 && timeSinceLastTap > 30) {
          // Double-tap while open: flip back and return to all cards
          this.lastTapTime = 0;
          sound.playFlip();
          this.zoomOut();
        } else {
          this.lastTapTime = now;
          this.handleCardClick();
        }
      }
      this.isDragging = false;
    });

    // Native desktop double-click to flip back and return to all cards
    this.container.addEventListener('dblclick', () => {
      if (this.isZoomed) {
        sound.playFlip();
        this.zoomOut();
      }
    });

    window.addEventListener('resize', () => {
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  checkHover() {
    if (this.isZoomed || this.isDragging) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.cardMeshes.map(c => c.cardMesh);
    const intersects = this.raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const hitIndex = intersects[0].object.userData.index;
      this.container.style.cursor = 'pointer';
      if (this.hoveredIndex !== hitIndex) {
        this.setHoveredCard(hitIndex);
      }
    } else {
      this.container.style.cursor = 'grab';
      if (this.hoveredIndex !== -1) {
        this.setHoveredCard(-1);
      }
    }
  }

  setHoveredCard(index) {
    if (this.hoveredIndex !== -1 && this.hoveredIndex !== this.focusedIndex) {
      const prev = this.cardMeshes[this.hoveredIndex];
      gsap.to(prev.assembly.position, {
        y: 0,
        z: prev.baseZ,
        duration: 0.38,
        ease: 'power2.out'
      });
      gsap.to(prev.shineBackMat.uniforms.uIntensity, {
        value: 0.0,
        duration: 0.25
      });
    }

    this.hoveredIndex = index;

    if (index !== -1 && index !== this.focusedIndex) {
      const target = this.cardMeshes[index];

      gsap.to(target.assembly.position, {
        y: 0.58,
        z: target.baseZ + 0.15,
        duration: 0.35,
        ease: 'power2.out'
      });

      target.shineBackMat.uniforms.uIntensity.value = 0.95;
      gsap.fromTo(
        target.shineBackMat.uniforms.uProgress,
        { value: -0.35 },
        { value: 1.35, duration: 0.7, ease: 'power1.out' }
      );

      sound.playClick();
    }
  }

  handleCardClick() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.cardMeshes.map(c => c.cardMesh);
    const intersects = this.raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const hitIndex = intersects[0].object.userData.index;
      if (this.isZoomed && hitIndex === this.focusedIndex) {
        return;
      }
      sound.playClick();
      this.focusCard(hitIndex);
    }
  }

  clampDeckX() {
    const maxBound = ((this.cardsData.length - 1) / 2) * this.cardSpacing;
    this.targetDeckX = Math.max(-maxBound - 1.5, Math.min(maxBound + 1.5, this.targetDeckX));
  }

  focusCard(index, onComplete) {
    if (index < 0 || index >= this.cardsData.length) return;

    this.focusedIndex = index;
    this.hoveredIndex = -1;
    this.isZoomed = true;
    this.isFlipped = false;

    const selectedCard = this.cardMeshes[index];
    const targetX = -selectedCard.baseX;

    // Focused card moves to center-front and faces front (y = 0)
    gsap.to(selectedCard.assembly.rotation, {
      y: 0,
      duration: 0.75,
      ease: 'back.out(1.2)'
    });
    gsap.to(selectedCard.assembly.position, {
      y: 0,
      z: 0.6,
      duration: 0.6,
      ease: 'power2.out'
    });

    selectedCard.shineFrontMat.uniforms.uIntensity.value = 0.9;
    gsap.fromTo(
      selectedCard.shineFrontMat.uniforms.uProgress,
      { value: -0.3 },
      { value: 1.3, duration: 0.8, ease: 'power1.out' }
    );

    // Center deck on this card
    gsap.to(this, {
      deckX: targetX,
      targetDeckX: targetX,
      duration: 1.1,
      ease: 'power3.inOut'
    });

    // Dolly camera in
    gsap.to(this.camera.position, {
      x: 0,
      y: -0.2,
      z: 7.8,
      duration: 1.1,
      ease: 'power3.inOut',
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // All background cards STAY at their resting positions showing the sunburst cover
    this.cardMeshes.forEach((item, i) => {
      if (i !== index) {
        gsap.to(item.assembly.rotation, {
          y: Math.PI,
          duration: 0.7,
          ease: 'power2.out'
        });
        gsap.to(item.assembly.position, {
          y: 0,
          z: item.baseZ,
          duration: 0.7,
          ease: 'power2.out'
        });
        gsap.to(item.assembly.scale, {
          x: 0.88,
          y: 0.88,
          z: 0.88,
          duration: 0.7,
          ease: 'power2.out'
        });
      } else {
        gsap.to(item.assembly.scale, {
          x: 1.05,
          y: 1.05,
          z: 1.05,
          duration: 0.7,
          ease: 'power2.out'
        });
      }
    });

    if (this.onCardSelectChange) {
      this.onCardSelectChange(this.cardsData[index], index, true);
    }
  }

  showBack() {
    if (!this.isZoomed || this.focusedIndex === -1) return;
    this.isFlipped = true;
    sound.playFlip();

    const card = this.cardMeshes[this.focusedIndex];

    // Switch ONLY this selected card's back material to detailed action blueprint
    const blueprintTex = CardTextureGenerator.createBlueprintTexture(card.data, this.theme);
    card.cardMesh.material[5].map = blueprintTex;
    card.cardMesh.material[5].needsUpdate = true;

    // Flip ONLY the focused card to show back blueprint
    gsap.to(card.assembly.rotation, {
      y: Math.PI,
      duration: 0.75,
      ease: 'back.out(1.3)'
    });
  }

  showFront() {
    if (!this.isZoomed || this.focusedIndex === -1) return;
    this.isFlipped = false;
    sound.playFlip();

    const card = this.cardMeshes[this.focusedIndex];

    // Flip ONLY the focused card back to front
    gsap.to(card.assembly.rotation, {
      y: 0,
      duration: 0.75,
      ease: 'back.out(1.3)'
    });
  }

  toggleFlip() {
    if (this.isFlipped) {
      this.showFront();
    } else {
      this.showBack();
    }
  }

  zoomOut() {
    if (this.focusedIndex !== -1) {
      // Restore this card's back cover to the tarotBackTex so it matches the spread
      const focusedCard = this.cardMeshes[this.focusedIndex];
      if (focusedCard && focusedCard.cardMesh && focusedCard.cardMesh.material[5]) {
        focusedCard.cardMesh.material[5].map = this.tarotBackTex;
        focusedCard.cardMesh.material[5].needsUpdate = true;
      }
    }

    this.isZoomed = false;
    this.focusedIndex = -1;
    this.hoveredIndex = -1;
    this.isFlipped = false;

    // Return all cards to resting baseline with sunburst backs
    this.cardMeshes.forEach((item) => {
      gsap.to(item.assembly.rotation, {
        y: Math.PI,
        duration: 0.7,
        ease: 'power2.out'
      });
      gsap.to(item.assembly.position, {
        y: 0,
        z: item.baseZ,
        duration: 0.7,
        ease: 'power2.out'
      });
      gsap.to(item.assembly.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.7,
        ease: 'power2.out'
      });
      item.shineBackMat.uniforms.uIntensity.value = 0.0;
      item.shineFrontMat.uniforms.uIntensity.value = 0.0;
    });

    gsap.to(this.camera.position, {
      x: this.cameraDefaultPos.x,
      y: this.cameraDefaultPos.y,
      z: this.cameraDefaultPos.z,
      duration: 1.0,
      ease: 'power3.inOut'
    });

    if (this.onCardSelectChange) {
      this.onCardSelectChange(null, -1, false);
    }
  }

  filterByCategory(categoryId) {
    if (categoryId === 'all') {
      this.zoomOut();
      gsap.to(this, { deckX: 0, targetDeckX: 0, duration: 1.0, ease: 'power3.out' });
      return;
    }

    const firstMatchIdx = this.cardsData.findIndex(c => c.category === categoryId);
    if (firstMatchIdx !== -1) {
      this.focusCard(firstMatchIdx);
    }
  }

  surpriseUs() {
    sound.playClick();
    this.isZoomed = false;

    const randomIndex = Math.floor(Math.random() * this.cardsData.length);
    const targetCard = this.cardMeshes[randomIndex];
    const finalDeckX = -targetCard.baseX;

    const spinOffset = (Math.random() > 0.5 ? 1 : -1) * (this.cardSpacing * 5);

    const tl = gsap.timeline();
    tl.to(this.camera.position, {
      z: 12.8,
      duration: 0.4,
      ease: 'power2.out'
    });
    tl.to(this, {
      deckX: finalDeckX + spinOffset,
      targetDeckX: finalDeckX + spinOffset,
      duration: 1.1,
      ease: 'power2.in',
      onUpdate: () => sound.playWhoosh(1.3)
    });
    tl.to(this, {
      deckX: finalDeckX,
      targetDeckX: finalDeckX,
      duration: 1.0,
      ease: 'elastic.out(1, 0.65)',
      onComplete: () => {
        this.focusCard(randomIndex);
      }
    });
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (!this.isZoomed) {
      this.targetDeckX += this.deckVelocity;
      this.deckVelocity *= 0.88;
      this.clampDeckX();
    }

    const diff = (this.targetDeckX - this.deckX);
    this.deckX += diff * 0.12;
    this.deckGroup.position.x = this.deckX;

    const time = performance.now() * 0.0015;
    this.cardMeshes.forEach((item, idx) => {
      if (this.focusedIndex !== idx && this.hoveredIndex !== idx) {
        item.assembly.position.y = Math.sin(time + idx * 0.3) * 0.03;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}
