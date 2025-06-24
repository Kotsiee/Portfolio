'use client';

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mesh, ShaderMaterial, Vector2 } from 'three';
import vs from '../../shaders/background.vertex.glsl';
import fs from '../../shaders/background.fragment.glsl';

export function Plane() {
  const meshRef = useRef<Mesh>(null);
  const matRef = useRef<ShaderMaterial>(null);
  const smoothedPointer = useRef(new Vector2(0.5, 0.5));
  const pointer = useRef(new Vector2(0.5, 0.5));
  const lastPointer = useRef(new Vector2(0.5, 0.5));
  const movementIntensity = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointer.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!matRef.current) return;

    smoothedPointer.current.lerp(pointer.current, 0.1);

    const material = matRef.current;
    const time = state.clock.getElapsedTime();

    material.uniforms.time.value = time;
    material.uniforms.pointer.value.copy(smoothedPointer.current);
    material.uniforms.resolution.value.set(viewport.width, viewport.height);

    const now = pointer.current.clone();
    const last = lastPointer.current;
    const velocity = now.distanceTo(last);

    lastPointer.current.copy(now);
    const targetIntensity = Math.min(velocity * 50.0, 1.0);
    movementIntensity.current += (targetIntensity - movementIntensity.current) * 0.1;

    material.uniforms.spotlightIntensity.value = 0.2 + movementIntensity.current * 0.7;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vs}
        fragmentShader={fs}
        uniforms={{
          resolution: { value: new Vector2(viewport.width, viewport.height) },
          time: { value: 0 },
          pointer: { value: new Vector2(0.5, 0.5) },
          spotlightIntensity: { value: 0.2 },
        }}
        transparent={true}
        depthWrite={false}
        side={2}
        glslVersion={'300 es'}
      />
    </mesh>
  );
}

export default function Background() {
  return (
    <Canvas frameloop="always" orthographic camera={{ zoom: 100, position: [0, 0, 5] }}>
      <Plane />
    </Canvas>
  );
}
