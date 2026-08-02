import { useRef, Suspense, useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "./ModelViewer.css";

/**
 * Traverse scene and hide objects that look like floor/ground planes.
 */
function removeFloor(scene: THREE.Group): THREE.Group {
  scene.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const name = (child.name || "").toLowerCase();
    const geo = child.geometry;

    const nameMatch =
      name.includes("floor") ||
      name.includes("ground") ||
      name.includes("plane") ||
      name.includes("grid") ||
      name.includes("shadow");

    let geoMatch = false;
    if (geo && "computeBoundingBox" in geo && !nameMatch) {
      geo.computeBoundingBox();
      const bbox = geo.boundingBox;
      if (bbox) {
        const sx = bbox.max.x - bbox.min.x;
        const sy = bbox.max.y - bbox.min.y;
        const sz = bbox.max.z - bbox.min.z;
        const maxDim = Math.max(sx, sz);
        if (maxDim > 1 && sy < maxDim * 0.05) {
          geoMatch = true;
        }
      }
    }

    if (nameMatch || geoMatch) {
      child.visible = false;
    }
  });
  return scene;
}

function Model() {
  const { scene } = useGLTF("/cao-ying.glb", true);
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    removeFloor(clone);
    return clone;
  }, [scene]);

  const transform = useMemo(() => {
    clonedScene.updateMatrixWorld();
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const targetHeight = 1.5;
    const s = targetHeight / size.y;

    return {
      pos: [-center.x * s, -center.y * s + 0.05, -center.z * s] as [
        number,
        number,
        number,
      ],
      scl: s,
    };
  }, [clonedScene]);

  return (
    <primitive
      ref={groupRef}
      object={clonedScene}
      position={transform.pos}
      scale={transform.scl}
    />
  );
}

export default function ModelViewer() {
  const [loading, setLoading] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const closePhoto = () => {
    setShowPhoto(false);
  };

  // Toggle photo on double-click
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => {
      setHintDismissed(true);
      if (showPhoto) {
        closePhoto();
      } else {
        setShowPhoto(true);
      }
    };
    el.addEventListener("dblclick", handler);
    return () => el.removeEventListener("dblclick", handler);
  }, [showPhoto]);

  // Close on Esc
  useEffect(() => {
    if (!showPhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePhoto();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPhoto]);

  return (
    <>
    <div className="model-viewer" ref={containerRef}>
      {loading && (
        <div className="model-loading">
          <span>Loading 3D model...</span>
        </div>
      )}

      {/* Hover hint — disappears after first double-click */}
      {!hintDismissed && <span className="model-hover-hint">双击试试</span>}

      <Canvas
        className="model-canvas"
        camera={{ position: [0, 0.15, 3.0], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={() => setLoading(false)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.0} />
          <directionalLight position={[-2, 2.5, 3]} intensity={2.5} />
          <directionalLight position={[1.5, 0.5, -1]} intensity={0.8} />
          <directionalLight position={[0, -0.3, -2]} intensity={0.4} />
          <Model />
          <OrbitControls
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.06}
            minPolarAngle={Math.PI * 0.2}
            maxPolarAngle={Math.PI * 0.8}
            minDistance={1.8}
            maxDistance={5.0}
            enableZoom={true}
            autoRotate={true}
            autoRotateSpeed={0.8}
          />
        </Suspense>
      </Canvas>

    </div>

    {/* Polaroid photo popup — portal to body for top-level z-index */}
    {showPhoto &&
      createPortal(
        <div className="photo-popup" onClick={(e) => e.stopPropagation()}>
          <div className="photo-popup-inner">
            <img
              src="/照片是这个.jpg"
              alt="My photo"
              draggable={false}
            />
          </div>
          <span className="photo-popup-hint">双击收起</span>
        </div>,
        document.body
      )}
    </>
  );
}
