import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import PropertyPhoto from "./PropertyPhoto";

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // Keep the hotel photograph visible when WebGL is unavailable.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    // ---------- lights ----------
    scene.add(new THREE.AmbientLight(0xfff1d0, 1.35));
    const sun = new THREE.DirectionalLight(0xffe2a0, 2.8);
    sun.position.set(5, 9, 6);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x5fc4d8, 1.1);
    rim.position.set(-6, 4, -5);
    scene.add(rim);
    const glow = new THREE.PointLight(0xffd797, 10, 12);
    glow.position.set(0, 1.5, 3.5);
    scene.add(glow);

    // ---------- materials ----------
    const tealDark = new THREE.MeshStandardMaterial({ color: 0x173b44, roughness: 0.45, metalness: 0.25 });
    const teal = new THREE.MeshStandardMaterial({ color: 0x387c8b, roughness: 0.35, metalness: 0.3 });
    const cream = new THREE.MeshStandardMaterial({ color: 0xe9dfcc, roughness: 0.8 });
    const stone = new THREE.MeshStandardMaterial({ color: 0xc4b49c, roughness: 0.9 });
    const wood = new THREE.MeshStandardMaterial({ color: 0x725035, roughness: 0.75 });
    const foliage = new THREE.MeshStandardMaterial({ color: 0x386d4d, roughness: 0.9 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x78aebc, metalness: 0.55, roughness: 0.18 });
    const gold = new THREE.MeshStandardMaterial({
      color: 0xcda554,
      metalness: 0.65,
      roughness: 0.3,
      emissive: 0x231a09,
    });
    const crane = new THREE.MeshStandardMaterial({ color: 0xe9b43a, roughness: 0.5, metalness: 0.3 });
    const windows = [0, 1, 2].map(
      (i) =>
        new THREE.MeshStandardMaterial({
          color: i === 0 ? 0x80a8b6 : 0xe1d5b5,
          emissive: i === 0 ? 0x254f61 : 0xffd08b,
          emissiveIntensity: i === 0 ? 0.25 : 0.5,
          metalness: 0.35,
          roughness: 0.2,
        })
    );

    const world = new THREE.Group();
    scene.add(world);

    const add = (
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
      parent: THREE.Object3D = world
    ) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    };

    // ---------- ground ----------
    add(new THREE.CylinderGeometry(4.5, 4.7, 0.3, 64), new THREE.MeshStandardMaterial({ color: 0x0a3a47, roughness: 0.8 }), 0, -0.15, 0);
    const ring = add(new THREE.TorusGeometry(4.55, 0.05, 8, 96), gold, 0, 0.01, 0);
    ring.rotation.x = Math.PI / 2;

    // Modern hotel massing; the traditional character stays in the outer frame.
    add(new THREE.BoxGeometry(6.2, 0.25, 4.2), cream, 0, 0.125, 0);
    add(new THREE.BoxGeometry(5.6, 0.2, 3.7), cream, 0, 0.35, 0);
    add(new THREE.BoxGeometry(5, 5.3, 3), cream, 0, 3.1, 0);
    add(new THREE.BoxGeometry(5.2, 0.14, 3.2), tealDark, 0, 5.83, 0);
    add(new THREE.BoxGeometry(5.2, 0.035, 3.2), gold, 0, 5.92, 0);
    add(new THREE.BoxGeometry(2, 0.4, 2.1), stone, 0.7, 6.1, -0.1);
    add(new THREE.BoxGeometry(2.15, 0.09, 2.25), tealDark, 0.7, 6.35, -0.1);
    [-0.75, 0.15].forEach((x) => add(new THREE.BoxGeometry(0.55, 0.26, 0.6), tealDark, x, 6.05, -0.6));

    // Curtain-wall corner, floor bands and a sheltered glass-lobby entrance.
    add(new THREE.BoxGeometry(0.78, 5.12, 0.13), glass, -2.02, 3.13, 1.53);
    [1.78, 2.65, 3.52, 4.39, 5.26].forEach((y) => {
      add(new THREE.BoxGeometry(5.06, 0.07, 3.06), stone, 0, y, 0);
      add(new THREE.BoxGeometry(0.8, 0.03, 0.16), tealDark, -2.02, y, 1.59);
    });
    add(new THREE.BoxGeometry(3.75, 1.23, 0.08), glass, 0.42, 1.08, 1.54);
    add(new THREE.BoxGeometry(0.035, 1.23, 0.1), gold, 0.42, 1.08, 1.6);
    add(new THREE.BoxGeometry(2.75, 0.12, 1.25), tealDark, 0.5, 1.8, 1.95);
    add(new THREE.BoxGeometry(2.75, 0.025, 1.25), gold, 0.5, 1.73, 1.95);
    [-0.73, 1.73].forEach((x) => add(new THREE.BoxGeometry(0.06, 1.3, 0.06), gold, x, 1.05, 2.49));
    for (let i = 0; i < 7; i++) {
      add(new THREE.BoxGeometry(0.035, 5.18, 0.12), wood, 2.09 + i * 0.055, 3.1, 1.56);
    }

    // windows
    const wFront = new THREE.BoxGeometry(0.44, 0.54, 0.045);
    const wSide = new THREE.BoxGeometry(0.045, 0.54, 0.44);
    let wi = 0;
    const win = (g: THREE.BufferGeometry, x: number, y: number, z: number) => {
      add(g, windows[wi++ % 3], x, y, z);
    };
    for (let i = 0; i < 5; i++) {
      const x = -1.13 + i * 0.68;
      [2.18, 3.05, 3.92, 4.79, 5.5].forEach((y) => {
        win(wFront, x, y, 1.54);
        win(wFront, x, y, -1.54);
      });
    }
    [-0.95, -0.3, 0.35, 1].forEach((z) =>
      [1.12, 2.18, 3.05, 3.92, 4.79, 5.5].forEach((y) => {
        win(wSide, 2.54, y, z);
        win(wSide, -2.54, y, z);
      })
    );

    // Small planters bring a contemporary arrival court into the model.
    [-2.42, 2.42].forEach((x) => {
      add(new THREE.BoxGeometry(0.42, 0.38, 0.48), stone, x, 0.61, 2.04);
      add(new THREE.CylinderGeometry(0.025, 0.04, 0.5, 8), wood, x, 0.98, 2.04);
      const tree = add(new THREE.SphereGeometry(0.28, 16, 12), foliage, x, 1.27, 2.04);
      tree.scale.y = 1.35;
    });

    // ---------- tower crane ----------
    const cx = 3.5;
    const cz = -1.5;
    add(new THREE.BoxGeometry(0.22, 7.2, 0.22), crane, cx, 3.6, cz);
    for (let y = 0.6; y < 7; y += 0.9) add(new THREE.BoxGeometry(0.34, 0.04, 0.34), crane, cx, y, cz);
    const jibPivot = new THREE.Group();
    jibPivot.position.set(cx, 7.3, cz);
    world.add(jibPivot);
    add(new THREE.BoxGeometry(4.6, 0.14, 0.14), crane, -1.4, 0, 0, jibPivot);
    add(new THREE.BoxGeometry(0.6, 0.45, 0.45), cream, 1.2, -0.15, 0, jibPivot);
    add(new THREE.BoxGeometry(0.4, 0.4, 0.4), tealDark, 0.1, 0.25, 0, jibPivot);
    add(new THREE.CylinderGeometry(0.01, 0.01, 1.7, 6), gold, -3.0, -0.85, 0, jibPivot);
    const hook = add(new THREE.BoxGeometry(0.28, 0.2, 0.28), teal, -3.0, -1.8, 0, jibPivot);

    // ---------- orbit ring & particles ----------
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(4.2, 0.02, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xecd079, transparent: true, opacity: 0.35 })
    );
    halo.position.y = 3.6;
    halo.rotation.x = Math.PI / 2.4;
    world.add(halo);
    const diamond = add(new THREE.OctahedronGeometry(0.16), gold, 4.2, 0, 0, halo);
    diamond.rotation.x = -Math.PI / 2;

    const N = 80;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 3.5;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.random() * 8;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0xf7dc84, size: 0.045, transparent: true, opacity: 0.65 })
    );
    scene.add(particles);

    // ---------- sizing ----------
    let needsRender = true;
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      const visibleH = Math.max(11, 10.6 / camera.aspect);
      const dist = visibleH / (2 * Math.tan((camera.fov * Math.PI) / 360));
      camera.position.set(0, 7.5, dist);
      camera.lookAt(0, 3.3, 0);
      camera.updateProjectionMatrix();
      needsRender = true;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---------- interaction ----------
    const mouse = { x: 0, y: 0 };
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMove = (e: PointerEvent) => {
      if (motionPreference.matches) return;
      const bounds = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - bounds.left) / bounds.width - 0.5) * 2;
      mouse.y = ((e.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const onLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };
    mount.addEventListener("pointermove", onMove);
    mount.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(mount);

    // ---------- loop ----------
    const clock = new THREE.Clock();
    let raf = 0;
    let tiltX = 0;
    let pointerRotation = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || (motionPreference.matches && !needsRender)) return;
      const t = motionPreference.matches ? 0 : clock.getElapsedTime();
      pointerRotation += (mouse.x * 0.38 - pointerRotation) * 0.06;
      world.rotation.y = -0.5 + t * 0.13 + pointerRotation;
      tiltX += (mouse.y * 0.06 - tiltX) * 0.05;
      world.rotation.x = tiltX;
      world.position.y = Math.sin(t * 0.8) * 0.06;
      jibPivot.rotation.y = Math.sin(t * 0.45) * 0.55;
      hook.position.y = -1.8 + Math.sin(t * 0.8) * 0.15;
      halo.rotation.z = t * 0.18;
      particles.rotation.y = t * 0.035;
      particles.position.y = Math.sin(t * 0.4) * 0.12;
      windows.forEach((material, i) => {
        material.emissiveIntensity = (i === 0 ? 0.25 : 0.5) + Math.sin(t * 0.5 + i * 2.1) * 0.04;
      });
      renderer.render(scene, camera);
      needsRender = false;
    };
    loop();
    setReady(true);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mount.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerleave", onLeave);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
          geometries.add(o.geometry);
          const objectMaterials = Array.isArray(o.material) ? o.material : [o.material];
          objectMaterials.forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      {!ready && <PropertyPhoto propertyId="bliss-kokomo" loading="eager" className="absolute inset-0" imageClassName="h-full w-full" allowRepresentativeFallback={false} />}
      <div ref={mountRef} className="absolute inset-0" role="img" aria-label="Animated 3D concept of a modern glass-and-stone hotel with a construction crane" />
    </>
  );
}
