'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { coffeeDB } from '@/data';
import { CoffeeData } from '@/types';
import { useStore } from '@/store/useStore'; // Store import

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // UI Refs
  const introTextRef = useRef<HTMLDivElement>(null);
  const detailCardRef = useRef<HTMLDivElement>(null);
  
  // State
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeData>(coffeeDB[0]);

  const { language } = useStore(); // 언어 상태 가져오기

  // Three.js Refs
  const sceneRef = useRef<THREE.Scene>(null!);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const rendererRef = useRef<THREE.WebGLRenderer>(null!);
  const cupsRef = useRef<{ mesh: THREE.Group; data: CoffeeData; targetLineX: number }[]>([]);
  const trayRef = useRef<THREE.Group>(null!);
  
  const stateRef = useRef<'INTRO' | 'ANIMATING' | 'LINEAR' | 'DETAIL'>('INTRO');
  const rotateTweenRef = useRef<gsap.core.Tween>(null!);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, 10, 60);
    sceneRef.current = scene;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 12, 8); // Intro Position
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffeebb, 1.5);
    mainSpot.position.set(0, 15, 5);
    mainSpot.angle = 0.4;
    mainSpot.penumbra = 0.3;
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    const rimLight = new THREE.SpotLight(0x4455ff, 1);
    rimLight.position.set(0, 5, -10);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // 3. Objects
    const trayGroup = new THREE.Group();
    scene.add(trayGroup);
    trayRef.current = trayGroup;

    // Tray
    const trayGeo = new THREE.CylinderGeometry(4.5, 4.2, 0.3, 64);
    const trayMat = new THREE.MeshStandardMaterial({ color: 0x221100, roughness: 0.3, metalness: 0.1 });
    const tray = new THREE.Mesh(trayGeo, trayMat);
    tray.receiveShadow = true;
    trayGroup.add(tray);

    // Cups (8 types)
    const cups: any[] = [];
    const totalCups = coffeeDB.length;
    const spacing = 2.0; // 컵 사이 간격

    coffeeDB.forEach((data, i) => {
        const cupGroup = new THREE.Group();

        // Body
        const cupGeo = new THREE.CylinderGeometry(0.55, 0.5, 1.1, 32);
        const cupMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.1 });
        const cup = new THREE.Mesh(cupGeo, cupMat);
        cup.position.y = 0.55;
        cup.castShadow = true;
        cup.receiveShadow = true;

        // Liquid
        const liquidGeo = new THREE.CircleGeometry(0.48, 32);
        const liquidMat = new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.2 });
        const liquid = new THREE.Mesh(liquidGeo, liquidMat);
        liquid.rotation.x = -Math.PI / 2;
        liquid.position.y = 1.0;

        cupGroup.add(cup, liquid);

        // Circular Layout
        const angle = (i / totalCups) * Math.PI * 2;
        const radius = 2.5;
        cupGroup.position.set(Math.cos(angle) * radius, 0.15, Math.sin(angle) * radius);
        
        trayGroup.add(cupGroup);

        cups.push({
            mesh: cupGroup,
            data: data,
            // Linear Layout target position (Center aligned)
            targetLineX: (i - (totalCups - 1) / 2) * spacing
        });
    });
    cupsRef.current = cups;

    // 4. Intro Animation
    rotateTweenRef.current = gsap.to(trayGroup.rotation, { 
        y: Math.PI * 2, 
        duration: 20, 
        repeat: -1, 
        ease: "none" 
    });

    gsap.from(cups.map(c => c.mesh.scale), { 
        x: 0, y: 0, z: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "back.out(1.5)", 
        delay: 0.5 
    });

    // 5. Event Listeners & Loop
    const handleResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
  }, []);

  // --- Interaction Logic ---

  const transitionToLinear = () => {
    stateRef.current = 'ANIMATING';
    
    // Hide Intro Text
    if (introTextRef.current) {
        gsap.to(introTextRef.current, { opacity: 0, duration: 0.5, onComplete: () => {
            if(introTextRef.current) introTextRef.current.style.display = 'none';
        }});
    }

    // Stop Rotation & Move Tray
    if (rotateTweenRef.current) rotateTweenRef.current.kill();
    gsap.to(trayRef.current.position, { y: -5, duration: 1.5, ease: "power2.in" });

    // Rearrange Cups
    cupsRef.current.forEach((item) => {
        sceneRef.current.attach(item.mesh); // Parent change to Scene
        
        gsap.to(item.mesh.position, {
            x: item.targetLineX,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: "power3.inOut"
        });
        gsap.to(item.mesh.rotation, { y: 0, duration: 1 });
    });

    // Camera Move (Z축 거리를 넉넉하게 16으로 잡음)
    gsap.to(cameraRef.current.position, {
        x: 0, y: 3, z: 16, 
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => cameraRef.current.lookAt(0, 0, 0),
        onComplete: () => { stateRef.current = 'LINEAR'; }
    });
  };

  const showDetail = (index: number) => {
      stateRef.current = 'DETAIL';
      const selectedCup = cupsRef.current[index];
      setSelectedCoffee(selectedCup.data);

      if (detailCardRef.current) {
          gsap.to(detailCardRef.current, { autoAlpha: 1, x: 0, duration: 0.5 });
      }

      // Camera Focus on Cup
      gsap.to(cameraRef.current.position, {
          x: selectedCup.mesh.position.x, 
          y: 2, 
          z: 5, // Zoom In
          duration: 1.2,
          ease: "power3.out"
      });

      // Blur others
      cupsRef.current.forEach((c, i) => {
          if (i !== index) {
              gsap.to(c.mesh.position, { z: -3, duration: 1 });
          } else {
              gsap.to(c.mesh.position, { z: 1, duration: 1 });
              gsap.to(c.mesh.rotation, { y: -0.2, duration: 1 });
          }
      });
  };

  const handleBack = () => {
      stateRef.current = 'ANIMATING';
      if (detailCardRef.current) {
          gsap.to(detailCardRef.current, { autoAlpha: 0, x: 50, duration: 0.3 });
      }

      cupsRef.current.forEach(c => {
          gsap.to(c.mesh.position, { x: c.targetLineX, y: 0, z: 0, duration: 1, ease: "power2.out" });
          gsap.to(c.mesh.rotation, { y: 0, duration: 1 });
      });

      // Camera Reset
      gsap.to(cameraRef.current.position, {
          x: 0, y: 3, z: 16,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => { stateRef.current = 'LINEAR'; }
      });
  };

  // --- Pointer Events (More reliable than onClick) ---
  const handlePointerDown = (e: React.PointerEvent) => {
    // Ignore UI clicks
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('.detail-card')) return;

    if (stateRef.current === 'INTRO') {
        transitionToLinear();
    } else if (stateRef.current === 'LINEAR') {
        const rect = containerRef.current!.getBoundingClientRect();
        // Mouse coordinates relative to canvas container
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
        
        // Raycast against cups
        const cupMeshes = cupsRef.current.map(c => c.mesh);
        const intersects = raycaster.intersectObjects(cupMeshes, true);

        if (intersects.length > 0) {
            const selectedGroup = intersects[0].object.parent;
            const index = cupsRef.current.findIndex(c => c.mesh === selectedGroup);
            if (index !== -1) showDetail(index);
        }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (stateRef.current !== 'LINEAR') {
        document.body.style.cursor = 'default';
        return;
    }

    const rect = containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
    const cupMeshes = cupsRef.current.map(c => c.mesh);
    const intersects = raycaster.intersectObjects(cupMeshes, true);

    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        const parent = intersects[0].object.parent;
        if(parent) gsap.to(parent.position, { y: 0.3, duration: 0.3 });
    } else {
        document.body.style.cursor = 'default';
        cupsRef.current.forEach(c => {
             if (c.mesh.position.y !== 0) gsap.to(c.mesh.position, { y: 0, duration: 0.3 });
        });
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505] overflow-hidden">
      {/* 3D Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 pointer-events-auto"
        onPointerDown={handlePointerDown} 
        onMouseMove={handleMouseMove}
      />
      
      {/* Intro Text Layer */}
      <div ref={introTextRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center select-none">
        <h1 className="font-serif text-5xl md:text-7xl text-[#d4af37] tracking-widest mb-4 italic">THE ATELIER</h1>
        <p className="text-gray-400 tracking-[0.3em] uppercase text-xs md:text-sm mb-12">
          {language === 'KO' ? 'Premium Specialty Coffee Collection' : 'プレミアムスペシャルティコーヒーコレクション'}
        </p>
        <div className="border border-[#d4af37]/50 text-[#d4af37] px-8 py-3 rounded-full text-[10px] md:text-xs uppercase tracking-wider animate-pulse">
          {language === 'KO' ? 'Click Anywhere to Explore' : '画面をクリックして探索'}
        </div>
      </div>

      {/* Detail Card Layer */}
      <div 
        ref={detailCardRef} 
        className="detail-card absolute top-1/2 right-[5%] -translate-y-1/2 w-[320px] bg-[#141414]/90 backdrop-blur-md border-l-[3px] border-[#d4af37] p-8 text-white z-20 invisible opacity-0 translate-x-[50px] shadow-2xl pointer-events-auto rounded-sm"
      >
        <div className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em] mb-2">{selectedCoffee.subName}</div>
        <h2 className="font-serif text-3xl mb-6 leading-none">{selectedCoffee.name}</h2>
        
        <div className="text-[10px] text-gray-500 uppercase mb-2 tracking-wider">Tasting Notes</div>
        <div className="flex flex-wrap gap-2 mb-8">
            {selectedCoffee.tags.map((tag: string) => (
                <span key={tag} className="bg-white/10 px-3 py-1 rounded text-[10px] text-gray-300">
                    {tag}
                </span>
            ))}
        </div>
        
        <p className="text-xs text-gray-400 leading-relaxed mb-8 break-keep">
            {/* 언어에 따른 설명 표시 */}
            {language === 'KO' ? selectedCoffee.description : selectedCoffee.descriptionJP}
        </p>
        
        <button 
            onClick={(e) => { e.stopPropagation(); handleBack(); }}
            className="w-full px-6 py-3 border border-white/30 text-[10px] uppercase tracking-widest hover:border-[#d4af37] hover:text-[#d4af37] transition-colors bg-transparent cursor-pointer"
        >
            {language === 'KO' ? 'Back to Menu' : 'メニューに戻る'}
        </button>
      </div>
    </div>
  );
}