import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D Spatial Constellation & Network Environment
 * 
 * - Camera positioned INSIDE an expansive 3D point cloud for genuine depth and parallax.
 * - Dynamic interconnected thin lines and subtle translucent triangular facets.
 * - Glowing nodes with neon-lime (#82ff3f) accent highlights and soft neutral silver tones.
 * - Smooth cursor-driven camera rotation and scroll-reactive depth.
 */
export default function VantaNetBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // --- Three.js Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xe2e6eb, 0.0009);

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 3000);
    // Camera is positioned INSIDE the cloud
    camera.position.set(0, 0, 220);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0xe2e6eb, 1);

    container.appendChild(renderer.domElement);

    // --- Particle System & Constellation Graph Data ---
    const POINT_COUNT = isMobile ? 110 : 230;
    const CONNECT_DIST = isMobile ? 140 : 170;
    const BOUNDS_X = 850;
    const BOUNDS_Y = 650;
    const BOUNDS_Z = 500;

    interface NodePoint {
      pos: THREE.Vector3;
      vel: THREE.Vector3;
      origPos: THREE.Vector3;
      isAccent: boolean;
      phase: number;
      speed: number;
    }

    const nodes: NodePoint[] = [];

    for (let i = 0; i < POINT_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS_X * 2,
        (Math.random() - 0.5) * BOUNDS_Y * 2,
        (Math.random() - 0.5) * BOUNDS_Z * 2
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.22,
        (Math.random() - 0.5) * 0.22,
        (Math.random() - 0.5) * 0.18
      );
      const isAccent = Math.random() < 0.20; // 20% accent nodes

      nodes.push({
        pos,
        vel,
        origPos: pos.clone(),
        isAccent,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      });
    }

    // --- Create Point Sprites (Circular antialiased dot texture) ---
    const createDotTexture = (isAccent: boolean) => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Texture();

      const center = 32;
      const radius = 26;

      const grad = ctx.createRadialGradient(center, center, 0, center, center, radius);
      if (isAccent) {
        grad.addColorStop(0, "rgba(130, 255, 63, 1)");
        grad.addColorStop(0.35, "rgba(130, 255, 63, 0.85)");
        grad.addColorStop(0.7, "rgba(130, 255, 63, 0.25)");
        grad.addColorStop(1, "rgba(130, 255, 63, 0)");
      } else {
        grad.addColorStop(0, "rgba(90, 105, 125, 0.95)");
        grad.addColorStop(0.35, "rgba(120, 135, 155, 0.7)");
        grad.addColorStop(0.7, "rgba(160, 175, 195, 0.2)");
        grad.addColorStop(1, "rgba(200, 210, 225, 0)");
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fill();

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const dotTexAccent = createDotTexture(true);
    const dotTexNeutral = createDotTexture(false);

    // Accent Points Geometry & Material
    const accentPositions: number[] = [];
    const neutralPositions: number[] = [];

    nodes.forEach((n) => {
      if (n.isAccent) {
        accentPositions.push(n.pos.x, n.pos.y, n.pos.z);
      } else {
        neutralPositions.push(n.pos.x, n.pos.y, n.pos.z);
      }
    });

    const accentGeom = new THREE.BufferGeometry();
    accentGeom.setAttribute("position", new THREE.Float32BufferAttribute(accentPositions, 3));
    const accentMat = new THREE.PointsMaterial({
      size: isMobile ? 8 : 11,
      map: dotTexAccent,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const accentPoints = new THREE.Points(accentGeom, accentMat);
    scene.add(accentPoints);

    const neutralGeom = new THREE.BufferGeometry();
    neutralGeom.setAttribute("position", new THREE.Float32BufferAttribute(neutralPositions, 3));
    const neutralMat = new THREE.PointsMaterial({
      size: isMobile ? 6 : 8,
      map: dotTexNeutral,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const neutralPoints = new THREE.Points(neutralGeom, neutralMat);
    scene.add(neutralPoints);

    // --- Dynamic Line Segments Geometry ---
    const MAX_LINE_SEGMENTS = POINT_COUNT * 24;
    const linePositions = new Float32Array(MAX_LINE_SEGMENTS * 6);
    const lineColors = new Float32Array(MAX_LINE_SEGMENTS * 6);

    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeom.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      opacity: 0.85,
    });
    const lineSegments = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lineSegments);

    // --- Dynamic Polygon Faces Geometry (Translucent Web Triangles) ---
    const MAX_TRIANGLES = 120;
    const triPositions = new Float32Array(MAX_TRIANGLES * 9);
    const triGeom = new THREE.BufferGeometry();
    triGeom.setAttribute("position", new THREE.BufferAttribute(triPositions, 3));

    const triMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const triMesh = new THREE.Mesh(triGeom, triMat);
    scene.add(triMesh);

    // --- Interaction & Tracking ---
    let mouseNormX = 0;
    let mouseNormY = 0;
    let targetCamX = 0;
    let targetCamY = 0;
    let targetCamZ = 220;
    let targetRotX = 0;
    let targetRotY = 0;

    let currentCamX = 0;
    let currentCamY = 0;
    let currentCamZ = 220;
    let currentRotX = 0;
    let currentRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseNormX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      mouseNormY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      targetCamX = mouseNormX * 190;
      targetCamY = -mouseNormY * 140;
      targetRotY = -mouseNormX * 0.16;
      targetRotX = mouseNormY * 0.12;
    };

    const onScroll = () => {
      if (prefersReducedMotion) return;
      const scrollY = window.scrollY || window.pageYOffset;
      targetCamZ = 220 + scrollY * 0.12;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // --- Animation Loop ---
    let animId = 0;
    let clock = new THREE.Clock();

    const neutralBaseColor = new THREE.Color(0x94a3b8);
    const accentBaseColor = new THREE.Color(0x82ff3f);

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Camera lerp towards cursor & scroll
      currentCamX += (targetCamX - currentCamX) * 0.045;
      currentCamY += (targetCamY - currentCamY) * 0.045;
      currentCamZ += (targetCamZ - currentCamZ) * 0.045;
      currentRotX += (targetRotX - currentRotX) * 0.045;
      currentRotY += (targetRotY - currentRotY) * 0.045;

      camera.position.x = currentCamX;
      camera.position.y = currentCamY;
      camera.position.z = currentCamZ;
      camera.rotation.x = currentRotX;
      camera.rotation.y = currentRotY;

      // Update Node Positions (Organic 3D breathing + gentle drift)
      let accentIdx = 0;
      let neutralIdx = 0;
      const accentPosAttr = accentGeom.attributes.position as THREE.BufferAttribute;
      const neutralPosAttr = neutralGeom.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!prefersReducedMotion) {
          n.pos.addScaledVector(n.vel, delta * 60);

          // Subtle organic oscillation
          const oscX = Math.sin(time * n.speed + n.phase) * 0.35;
          const oscY = Math.cos(time * n.speed * 0.8 + n.phase) * 0.35;
          const oscZ = Math.sin(time * n.speed * 0.6 + n.phase) * 0.25;

          n.pos.x += oscX;
          n.pos.y += oscY;
          n.pos.z += oscZ;

          // Boundary bouncing
          if (n.pos.x < -BOUNDS_X || n.pos.x > BOUNDS_X) n.vel.x *= -1;
          if (n.pos.y < -BOUNDS_Y || n.pos.y > BOUNDS_Y) n.vel.y *= -1;
          if (n.pos.z < -BOUNDS_Z || n.pos.z > BOUNDS_Z) n.vel.z *= -1;
        }

        if (n.isAccent) {
          accentPosAttr.setXYZ(accentIdx++, n.pos.x, n.pos.y, n.pos.z);
        } else {
          neutralPosAttr.setXYZ(neutralIdx++, n.pos.x, n.pos.y, n.pos.z);
        }
      }

      accentPosAttr.needsUpdate = true;
      neutralPosAttr.needsUpdate = true;

      // Update Dynamic Connections & Triangle Facets
      let lineIndex = 0;
      let triIndex = 0;

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        let connectedNeighbors: number[] = [];

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dist = nodeA.pos.distanceTo(nodeB.pos);

          if (dist < CONNECT_DIST && lineIndex < MAX_LINE_SEGMENTS) {
            connectedNeighbors.push(j);

            const ptr = lineIndex * 6;
            // Vertex A
            linePositions[ptr] = nodeA.pos.x;
            linePositions[ptr + 1] = nodeA.pos.y;
            linePositions[ptr + 2] = nodeA.pos.z;
            // Vertex B
            linePositions[ptr + 3] = nodeB.pos.x;
            linePositions[ptr + 4] = nodeB.pos.y;
            linePositions[ptr + 5] = nodeB.pos.z;

            // Distance & Depth Alpha
            const alphaFactor = Math.max(0, 1 - dist / CONNECT_DIST);
            const isAccentLink = nodeA.isAccent || nodeB.isAccent;

            const col = isAccentLink ? accentBaseColor : neutralBaseColor;
            const intensity = isAccentLink ? 0.9 * alphaFactor : 0.45 * alphaFactor;

            lineColors[ptr] = col.r * intensity;
            lineColors[ptr + 1] = col.g * intensity;
            lineColors[ptr + 2] = col.b * intensity;

            lineColors[ptr + 3] = col.r * intensity;
            lineColors[ptr + 4] = col.g * intensity;
            lineColors[ptr + 5] = col.b * intensity;

            lineIndex++;
          }
        }

        // Form occasional triangles between mutual neighbors
        if (connectedNeighbors.length >= 2 && triIndex < MAX_TRIANGLES) {
          const n1 = nodes[connectedNeighbors[0]];
          const n2 = nodes[connectedNeighbors[1]];
          if (n1.pos.distanceTo(n2.pos) < CONNECT_DIST) {
            const tPtr = triIndex * 9;
            triPositions[tPtr] = nodeA.pos.x;
            triPositions[tPtr + 1] = nodeA.pos.y;
            triPositions[tPtr + 2] = nodeA.pos.z;

            triPositions[tPtr + 3] = n1.pos.x;
            triPositions[tPtr + 4] = n1.pos.y;
            triPositions[tPtr + 5] = n1.pos.z;

            triPositions[tPtr + 6] = n2.pos.x;
            triPositions[tPtr + 7] = n2.pos.y;
            triPositions[tPtr + 8] = n2.pos.z;

            triIndex++;
          }
        }
      }

      lineGeom.setDrawRange(0, lineIndex * 2);
      (lineGeom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeom.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      triGeom.setDrawRange(0, triIndex * 3);
      (triGeom.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (animId) cancelAnimationFrame(animId);

      renderer.dispose();
      accentGeom.dispose();
      neutralGeom.dispose();
      lineGeom.dispose();
      triGeom.dispose();
      accentMat.dispose();
      neutralMat.dispose();
      lineMat.dispose();
      triMat.dispose();
      dotTexAccent.dispose();
      dotTexNeutral.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Constellation Canvas */}
      <div
        ref={containerRef}
        className="fixed inset-0 -z-20 h-full w-full"
        style={{ background: "#e2e6eb" }}
        aria-hidden="true"
      />
      {/* 70% White Translucent Sheet Overlay — PRESERVED EXACTLY AS REQUESTED */}
      <div
        className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
        style={{ background: "rgba(255, 255, 255, 0.70)" }}
        aria-hidden="true"
      />
    </>
  );
}