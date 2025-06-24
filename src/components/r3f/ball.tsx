'use client';

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  Points,
  Quaternion,
  RawShaderMaterial,
  Sprite,
  TextureLoader,
  Vector2,
  Vector3,
} from 'three';
import vs from '../../shaders/ball.vertex.glsl';
import fs from '../../shaders/ball.fragment.glsl';

type Badge = {
  logo: string;
  url: string;
  offset: number;
  color?: string;
};

const badges: Badge[] = [
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
    url: 'https://figma.com',
    offset: 0,
    color: '#000000',
  },
  {
    logo: 'https://static-00.iconduck.com/assets.00/react-original-wordmark-icon-421x512-6l3sw2sy.png',
    url: 'https://react.dev',
    offset: 2,
    color: '#61dafb',
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/910px-Logo_C_sharp.svg.png',
    url: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    offset: 4,
    color: '#512bd4',
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
    url: 'https://www.typescriptlang.org',
    offset: 6,
    color: '#512bd4',
  },
  {
    logo: 'https://images.icon-icons.com/2699/PNG/512/python_logo_icon_168886.png',
    url: 'https://www.python.org',
    offset: 8,
    color: '#512bd4',
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2503px-Blender_logo_no_text.svg.png',
    url: 'https://www.blender.org',
    offset: 10,
    color: '#512bd4',
  },
];

type OrbiterProps = Badge & {
  radius?: number;
  speed?: number;
};

function Orbiter({ logo, url, radius = 2, speed = 0.25, offset = 0 }: OrbiterProps) {
  const ref = useRef<Sprite>(null!);
  const texture = useLoader(TextureLoader, logo);
  const [hovered, setHovered] = useState(false);

  const angleRef = useRef(offset);
  const lastTime = useRef(0);

  // 📐 Orbit tilt axis (random but stable)
  const orbitAxis = useMemo(() => {
    const v = new Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    ).normalize();
    return v;
  }, []);

  // 🧭 Quaternion to rotate the base orbit path
  const rotationQuat = useMemo(() => {
    const q = new Quaternion();
    q.setFromAxisAngle(orbitAxis, Math.PI / 4); // max 45° tilt
    return q;
  }, [orbitAxis]);

  useFrame(({ clock }) => {
    const now = clock.getElapsedTime();
    const delta = now - lastTime.current;

    if (!hovered) {
      angleRef.current += delta * speed;
    }
    lastTime.current = now;

    const t = angleRef.current;

    // 🌐 Base orbit path in XZ plane
    const base = new Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius);

    // 🔄 Apply orbit tilt
    const tilted = base.clone().applyQuaternion(rotationQuat);

    // 🫧 Gentle bounce pattern
    const bounce = Math.sin(t * 2) * 0.3; // subtle bounce
    tilted.y += bounce;

    ref.current.position.copy(tilted);

    // 🔍 Smooth scale animation
    const targetScale = hovered ? 0.6 : 0.4;
    const currentScale = ref.current.scale.x;
    const lerpScale = currentScale + (targetScale - currentScale) * 0.2;
    ref.current.scale.setScalar(lerpScale);
  });

  return (
    <sprite
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        window.open(url, '_blank');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      <spriteMaterial map={texture} transparent />
    </sprite>
  );
}

function CentralSphere() {
  const { viewport } = useThree();
  const objRef = useRef<Points>(null);
  const matRef = useRef<RawShaderMaterial>(null);

  useFrame((state) => {
    if (matRef.current && objRef.current) {
      objRef.current.rotation.x += 0.001;
      objRef.current.rotation.y += 0.001;
      objRef.current.rotation.z += 0.001;
      matRef.current.uniforms.time.value += 0.01;
      matRef.current.uniforms.pointer.value.set(
        state.pointer.x * 0.5 + 0.5,
        state.pointer.y * 0.5 + 0.5,
      );
    }
  });

  return (
    <points ref={objRef}>
      <icosahedronGeometry args={[2, 4]} />

      <rawShaderMaterial
        ref={matRef}
        vertexShader={vs}
        fragmentShader={fs}
        uniforms={{
          resolution: { value: new Vector2(viewport.width, viewport.height) },
          pointer: { value: new Vector2(0.5, 0.5) },
          spotlightIntensity: { value: 0.3 },
          time: { value: 0 },
        }}
        transparent
        depthWrite={false}
        glslVersion="300 es"
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} />
      <CentralSphere />

      {badges.map((badge, index) => (
        <Orbiter key={index} {...badge} />
      ))}

      <OrbitControls enableZoom={false} />
    </>
  );
}

export default function Ball() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <Scene />
    </Canvas>
  );
}
