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

    // Create gradient material
    const createGradientMaterial = (color1: number, color2: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 2;
      canvas.height = 2;
      const context = canvas.getContext('2d');
      if (context) {
        const gradient = context.createLinearGradient(0, 0, 2, 2);
        gradient.addColorStop(0, `#${color1.toString(16).padStart(6, '0')}`);
        gradient.addColorStop(1, `#${color2.toString(16).padStart(6, '0')}`);
        context.fillStyle = gradient;
        context.fillRect(0, 0, 2, 2);
      }
      const texture = new THREE.CanvasTexture(canvas);
      return new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.15,
        wireframe: true
      });
    };

    // Create shapes with gradient materials
    const shapes = [
      {
        geometry: new THREE.IcosahedronGeometry(2, 1),
        material: createGradientMaterial(0x8B5CF6, 0x6366F1), // Purple to Indigo
        scale: 1.2
      },
      {
        geometry: new THREE.OctahedronGeometry(1.8, 2),
        material: createGradientMaterial(0x6366F1, 0x4F46E5), // Indigo to Deep Purple
        scale: 1
      },
      {
        geometry: new THREE.TetrahedronGeometry(1.5, 3),
        material: createGradientMaterial(0x4F46E5, 0x3730A3), // Deep Purple to Darker Purple
        scale: 0.8
      }
    ];

    const meshes = shapes.map(({ geometry, material, scale }) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);
      return mesh;
    });

    // Add floating particles
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 20;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 20;
      particleSizes[i] = Math.random() * 0.5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8B5CF6,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Position camera
    camera.position.z = 12;

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.001;

      // Animate shapes
      meshes.forEach((mesh, index) => {
        const speed = 0.2 + index * 0.1;
        mesh.rotation.x = Math.sin(time * speed) * 0.2;
        mesh.rotation.y = Math.cos(time * speed) * 0.2;
        
        // Scroll-based movement
        const scrollY = window.scrollY;
        const scrollProgress = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        mesh.position.x = Math.sin(scrollProgress * Math.PI * 2 + index) * 2;
        mesh.position.y = Math.cos(scrollProgress * Math.PI * 2 + index) * 2;
      });

      // Animate particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(time + i) * 0.01;
        positions[i3 + 1] += Math.cos(time + i) * 0.01;
        positions[i3 + 2] += Math.sin(time * 0.5 + i) * 0.01;
      }
      particleGeometry.attributes.position.needsUpdate = true;

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
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      shapes.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
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
        zIndex: 10, 
        pointerEvents: 'none',
        opacity: 0.8
      }} 
    />
  );
};

export default HomeBackground; 