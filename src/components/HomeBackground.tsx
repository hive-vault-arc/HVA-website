import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HomeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create a new geometry for the lines
    const lineGeometry = new THREE.BufferGeometry();
    const lineCount = 100;
    const positions = new Float32Array(lineCount * 3 * 2); // Two points per line
    const colors = new Float32Array(lineCount * 3 * 2); // Two colors per line

    const color1 = new THREE.Color(0x8B5CF6); // Purple
    const color2 = new THREE.Color(0x6366F1); // Indigo

    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;

      // Start point
      positions[i6 + 0] = (Math.random() - 0.5) * 5;
      positions[i6 + 1] = (Math.random() - 0.5) * 5;
      positions[i6 + 2] = (Math.random() - 0.5) * 5;

      // End point
      positions[i6 + 3] = positions[i6 + 0] + (Math.random() - 0.5) * 2;
      positions[i6 + 4] = positions[i6 + 1] + (Math.random() - 0.5) * 2;
      positions[i6 + 5] = positions[i6 + 2] + (Math.random() - 0.5) * 2;

      // Colors (linear interpolation between color1 and color2)
      const mixColor = new THREE.Color().lerpColors(color1, color2, Math.random());
      colors[i6 + 0] = mixColor.r;
      colors[i6 + 1] = mixColor.g;
      colors[i6 + 2] = mixColor.b;
      colors[i6 + 3] = mixColor.r;
      colors[i6 + 4] = mixColor.g;
      colors[i6 + 5] = mixColor.b;
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Material for the lines
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true, // Enable vertex colors
      transparent: true,
      opacity: 0.8,
      linewidth: 1 // This property might not work well on all platforms/renderers
    });

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normalize to -1 to +1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize to -1 to +1, invert Y
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Position camera
    camera.position.z = 5;

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.001;

      // Animate lines
      lineMesh.rotation.x = mouseY * 0.5;
      lineMesh.rotation.y = mouseX * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="home-canvas3d" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1, 
        pointerEvents: 'none',
        opacity: 0.4
      }} 
    />
  );
};

export default HomeBackground; 