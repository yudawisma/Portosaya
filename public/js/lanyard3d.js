import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

(() => {
    'use strict';

    const container = document.querySelector('#lanyard3d');
    if (!container) {
        console.warn('Lanyard: #lanyard3d tidak ditemukan.');
        return;
    }

    // ===== PENGATURAN =====
    const ANCHOR_X_RATIO = 0.88; // posisi gantung dari kiri layar (0 - 1)
    const PX_PER_UNIT = 58;      // skala: makin besar, kartu makin besar
    const MAX_STRETCH = 4;       // batas tali memanjang saat ditarik

    // ===== SCENE & CAMERA =====
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5, 5, 6, -6, 0.1, 100);
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;';
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(-3, 5, 10);
    scene.add(keyLight);

    // ===== CARD =====
    const cardWidth = 2.15;
    const cardHeight = 3.05;
    const attachLen = cardHeight / 2 + 0.28;

    const card = new THREE.Group();
    scene.add(card);

    card.add(new THREE.Mesh(
        new THREE.BoxGeometry(cardWidth, cardHeight, 0.12),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
    ));

    const photoMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff, side: THREE.DoubleSide
    });
    const photo = new THREE.Mesh(
        new THREE.PlaneGeometry(cardWidth - 0.14, cardHeight - 0.14),
        photoMaterial
    );
    photo.position.z = 0.066;
    card.add(photo);

    new THREE.TextureLoader().load(
        '/img/pas%20foto%20ijasah.jpeg',
        (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
            photoMaterial.map = texture;
            photoMaterial.needsUpdate = true;
        },
        undefined,
        () => console.error('Foto gagal dimuat. Periksa nama file di public/img/.')
    );

    const cardBack = new THREE.Mesh(
        new THREE.PlaneGeometry(cardWidth - 0.14, cardHeight - 0.14),
        new THREE.MeshStandardMaterial({ color: 0xe8eee9, side: THREE.DoubleSide })
    );
    cardBack.position.z = -0.066;
    card.add(cardBack);

    const clip = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.2, 0.15),
        new THREE.MeshStandardMaterial({ color: 0xb9c4bc, metalness: 0.65, roughness: 0.3 })
    );
    clip.position.set(0, cardHeight / 2 + 0.1, 0);
    card.add(clip);

    const connector = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.22, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x315e48 })
    );
    connector.position.set(0, cardHeight / 2 + 0.28, 0);
    card.add(connector);

    // ===== STRAP (PITA TALI) =====
    const SEG = 24;
    const ropeLength = 4.2;
    const baseSeg = ropeLength / SEG;
    const anchor = new THREE.Vector2(0, 6.3);

    function makeStrap(width, color, z) {
        const verts = new Float32Array((SEG + 1) * 2 * 3);
        const index = [];
        for (let i = 0; i < SEG; i++) {
            const a = i * 2;
            index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
        geo.setIndex(index);

        const mesh = new THREE.Mesh(
            geo,
            new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
        );
        mesh.frustumCulled = false;
        scene.add(mesh);

        return (pts) => {
            for (let i = 0; i <= SEG; i++) {
                const p0 = pts[Math.max(i - 1, 0)];
                const p1 = pts[Math.min(i + 1, SEG)];
                let tx = p1.x - p0.x, ty = p1.y - p0.y;
                const len = Math.hypot(tx, ty) || 1;
                tx /= len; ty /= len;
                const nx = -ty * width / 2, ny = tx * width / 2;
                const p = pts[i];
                verts.set([p.x + nx, p.y + ny, z, p.x - nx, p.y - ny, z], i * 6);
            }
            geo.attributes.position.needsUpdate = true;
            geo.computeBoundingSphere();
        };
    }

    const updateStrap = makeStrap(0.18, 0x315e48, 0.0);
    const updateStitch = makeStrap(0.04, 0x6f9f86, 0.01);

    // ===== VERLET PHYSICS =====
    class Particle {
        constructor(x, y) {
            this.pos = new THREE.Vector2(x, y);
            this.prev = this.pos.clone();
        }
    }

    const nodes = Array.from({ length: SEG + 1 }, (_, i) =>
        new Particle(anchor.x + (i / SEG) * 0.8, anchor.y - i * baseSeg)
    );
    const body = new Particle(anchor.x + 0.8, anchor.y - ropeLength - attachLen);

    let dragging = false;
    let activePointerId = null;
    let stretch = 1; // 1 = panjang normal, >1 = tali memanjang saat ditarik
    const dragTarget = new THREE.Vector2();
    const dragOffset = new THREE.Vector2();

    function solve(a, b, rest, aPinned, bPinned) {
        const dx = b.pos.x - a.pos.x;
        const dy = b.pos.y - a.pos.y;
        const dist = Math.hypot(dx, dy) || 1e-6;
        const diff = (dist - rest) / dist;
        const wa = aPinned ? 0 : 1;
        const wb = bPinned ? 0 : 1;
        const w = wa + wb;
        if (!w) return;
        a.pos.x += dx * diff * (wa / w);
        a.pos.y += dy * diff * (wa / w);
        b.pos.x -= dx * diff * (wb / w);
        b.pos.y -= dy * diff * (wb / w);
    }

    const GRAVITY = -30;
    const DAMPING = 0.996;

    function step(h) {
        // Tali memanjang mengikuti jarak tarikan, lalu kembali pelan saat dilepas
        if (dragging) {
            const need = Math.hypot(
                dragTarget.x - anchor.x,
                dragTarget.y - anchor.y
            ) - attachLen;
            const target = THREE.MathUtils.clamp(need / ropeLength, 1, MAX_STRETCH);
            stretch += (target - stretch) * 0.3;
        } else {
            stretch += (1 - stretch) * 0.02;
        }
        const segLen = baseSeg * stretch;

        // integrasi
        const all = [...nodes.slice(1), body];
        for (const p of all) {
            if (p === body && dragging) continue;
            const vx = (p.pos.x - p.prev.x) * DAMPING;
            const vy = (p.pos.y - p.prev.y) * DAMPING;
            p.prev.copy(p.pos);
            p.pos.x += vx;
            p.pos.y += vy + GRAVITY * h * h;
        }

        if (dragging) {
            body.prev.copy(body.pos);
            body.pos.lerp(dragTarget, 0.5);
        }

        // constraint jarak
        for (let it = 0; it < 14; it++) {
            nodes[0].pos.copy(anchor);
            for (let i = 0; i < SEG; i++) {
                solve(nodes[i], nodes[i + 1], segLen, i === 0, false);
            }
            solve(nodes[SEG], body, attachLen, false, dragging);
        }
        nodes[0].pos.copy(anchor);
    }

    // ===== POINTER (di window, supaya canvas tidak menghalangi halaman) =====
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    function canvasActive() {
        return container.style.visibility !== 'hidden' &&
            Number(container.style.opacity || 1) > 0.05;
    }

    function pointerToWorld(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const point = new THREE.Vector3();
        return raycaster.ray.intersectPlane(dragPlane, point) ? point : null;
    }

    function hitsCard(event) {
        if (!canvasActive()) return null;
        const point = pointerToWorld(event);
        if (!point) return null;
        return raycaster.intersectObject(card, true).length ? point : null;
    }

    function onPointerDown(event) {
        if (event.pointerType === 'mouse' && event.button !== 0) return;

        const point = hitsCard(event);
        if (!point) return;

        dragging = true;
        activePointerId = event.pointerId;
        dragOffset.set(body.pos.x - point.x, body.pos.y - point.y);
        dragTarget.copy(body.pos);

        container.classList.add('is-dragging');
        document.documentElement.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        event.preventDefault();
    }

    function onPointerMove(event) {
        if (!dragging) {
            // kursor "grab" saat di atas kartu
            document.documentElement.style.cursor =
                event.pointerType === 'mouse' && hitsCard(event) ? 'grab' : '';
            return;
        }
        if (event.pointerId !== activePointerId) return;

        const point = pointerToWorld(event);
        if (!point) return;

        dragTarget.set(point.x + dragOffset.x, point.y + dragOffset.y);

        // Batas = seluruh area canvas (kiri, kanan, bawah layar)
        dragTarget.x = THREE.MathUtils.clamp(
            dragTarget.x,
            camera.left + cardWidth / 2,
            camera.right - cardWidth / 2
        );
        dragTarget.y = THREE.MathUtils.clamp(
            dragTarget.y,
            camera.bottom + cardHeight / 2,
            camera.top - cardHeight / 2 - 0.5
        );

        event.preventDefault();
    }

    function onPointerUp(event) {
        if (!dragging || event.pointerId !== activePointerId) return;

        dragging = false;
        activePointerId = null;
        container.classList.remove('is-dragging');
        document.documentElement.style.cursor = '';
        document.body.style.userSelect = '';

        // batasi kecepatan lempar supaya tidak meledak
        const vel = body.pos.clone().sub(body.prev);
        if (vel.length() > 0.15) {
            vel.setLength(0.15);
            body.prev.copy(body.pos).sub(vel);
        }
    }

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Cegah halaman ikut scroll saat kartu di-drag di layar sentuh
    window.addEventListener('touchmove', (e) => {
        if (dragging && e.cancelable) e.preventDefault();
    }, { passive: false });

    // ===== RESIZE =====
    function resize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;

        const viewWidth = width / PX_PER_UNIT;
        const viewHeight = height / PX_PER_UNIT;

        camera.left = -viewWidth / 2;
        camera.right = viewWidth / 2;
        camera.top = viewHeight / 2;
        camera.bottom = -viewHeight / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);

        // pindahkan anchor, geser seluruh tali + kartu sebesar selisihnya
        const nx = camera.left + viewWidth * ANCHOR_X_RATIO;
        const ny = camera.top + 0.3;
        const dx = nx - anchor.x;
        const dy = ny - anchor.y;
        anchor.set(nx, ny);

        for (const p of [...nodes, body]) {
            p.pos.x += dx; p.pos.y += dy;
            p.prev.x += dx; p.prev.y += dy;
        }
    }

    new ResizeObserver(resize).observe(container);
    resize();

    // ===== RENDER =====
    const clock = new THREE.Clock();
    const H = 1 / 120;
    let acc = 0;

    function animate() {
        requestAnimationFrame(animate);

        acc += Math.min(clock.getDelta(), 0.05);
        let n = 0;
        while (acc >= H && n++ < 6) {
            step(H);
            acc -= H;
        }

        const top = nodes[SEG].pos;
        card.position.set(body.pos.x, body.pos.y, 0);
        card.rotation.z = Math.atan2(-(top.x - body.pos.x), top.y - body.pos.y);

        const pts = nodes.map((p) => p.pos);
        updateStrap(pts);
        updateStitch(pts);

        renderer.render(scene, camera);
    }

    animate();
})();

// blok 2
(() => {
    'use strict';

    const container = document.querySelector('#lanyard3d');
    const heroSection = document.querySelector('#home');
    if (!container || !heroSection) return;

    let ticking = false;

    function update() {
        const rect = heroSection.getBoundingClientRect();
        const fadeDistance = Math.min(220, window.innerHeight * 0.3);
        const opacity = Math.min(1, Math.max(0, rect.bottom / fadeDistance));

        container.style.opacity = String(opacity);
        container.style.visibility = opacity <= 0 ? 'hidden' : 'visible';

        ticking = false;
    }

    function requestUpdate() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    update();
})();