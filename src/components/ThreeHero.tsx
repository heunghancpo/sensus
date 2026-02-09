"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

// --- 데이터 정의 (동일) ---
const COFFEE_DATA = [
  {
    name: "Esmeralda Geisha",
    variety: "Panama Geisha",
    notes: ["Jasmine", "Bergamot", "Honey"],
    desc: "세계 최고의 커피. 재스민의 우아한 꽃향기와 베르가못의 산미.",
    color: 0x6f4e37,
  },
  {
    name: "Pink Bourbon",
    variety: "Colombia Huila",
    notes: ["Grapefruit", "Melon", "Floral"],
    desc: "핑크 자몽의 상큼함과 멜론의 부드러운 단맛.",
    color: 0x8d6e63,
  },
  {
    name: "Kenya AA Top",
    variety: "SL28 / SL34",
    notes: ["Blackcurrant", "Tomato", "Winey"],
    desc: "강렬한 바디감과 와인 같은 풍미.",
    color: 0x3e2723,
  },
  {
    name: "Blue Mountain",
    variety: "Jamaica No.1",
    notes: ["Chocolate", "Spices", "Smooth"],
    desc: "영국 왕실이 사랑한 부드러운 밸런스.",
    color: 0x5d4037,
  },
];

export default function ThreeHero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const detailCardRef = useRef<HTMLDivElement>(null);
  
  const [selectedCoffee, setSelectedCoffee] = useState(COFFEE_DATA[0]);

  // Three.js Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cupsRef = useRef<any[]>([]);
  const stateRef = useRef<"INTRO" | "ANIMATING" | "LINEAR" | "DETAIL">("INTRO");
  const trayGroupRef = useRef<THREE.Group | null>(null);
  const rotateTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, 10, 60); // Fog 거리 조정
    sceneRef.current = scene;

    // 카메라 FOV 살짝 줄여서 제품 집중도 향상
    const camera = new THREE.PerspectiveCamera(35, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 100);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight); // 부모 크기 따름
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffeebb, 2);
    mainSpot.position.set(5, 10, 5);
    mainSpot.angle = 0.5;
    mainSpot.penumbra = 0.5;
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    const rimLight = new THREE.SpotLight(0x4455ff, 1.5);
    rimLight.position.set(-5, 5, -5);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // 3. Objects
    const trayGroup = new THREE.Group();
    scene.add(trayGroup);
    trayGroupRef.current = trayGroup;

    // Tray
    const trayGeo = new THREE.CylinderGeometry(4.5, 4.2, 0.2, 64);
    const trayMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.5 });
    const tray = new THREE.Mesh(trayGeo, trayMat);
    tray.receiveShadow = true;
    trayGroup.add(tray);

    // Cups
    const cups: any[] = [];
    COFFEE_DATA.forEach((data, i) => {
      const cupGroup = new THREE.Group();
      // ... 컵 생성 로직 동일 ...
      const cupGeo = new THREE.CylinderGeometry(0.55, 0.5, 1.1, 32);
      const cupMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 0.1 });
      const cup = new THREE.Mesh(cupGeo, cupMat);
      cup.position.y = 0.55;
      cup.castShadow = true;
      cup.receiveShadow = true;

      const liquidGeo = new THREE.CircleGeometry(0.48, 32);
      const liquidMat = new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.1 });
      const liquid = new THREE.Mesh(liquidGeo, liquidMat);
      liquid.rotation.x = -Math.PI / 2;
      liquid.position.y = 1.0;
      cupGroup.add(cup, liquid);

      const angle = (i / 4) * Math.PI * 2;
      const radius = 2.5;
      cupGroup.position.set(Math.cos(angle) * radius, 0.15, Math.sin(angle) * radius);
      trayGroup.add(cupGroup);

      cups.push({
        mesh: cupGroup,
        data: data,
        originalY: 0.15,
        targetLineX: (i - 1.5) * 1.8, // 간격 살짝 좁힘
      });
    });
    cupsRef.current = cups;

    // 4. Initial Camera Position (약간 더 멀리서 전체 조망)
    camera.position.set(0, 8, 12); 
    camera.lookAt(0, 0, 0);

    // Rotation Animation
    rotateTweenRef.current = gsap.to(trayGroup.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    gsap.from(cups.map((c) => c.mesh.scale), {
      x: 0, y: 0, z: 0,
      duration: 1,
      stagger: 0.1,
      ease: "elastic.out(1, 0.5)",
      delay: 0.2,
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvasRef.current && renderer.domElement) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // --- Interaction Logic (간소화) ---
  
  const transitionToLinear = () => {
    if (!sceneRef.current || !cameraRef.current || !trayGroupRef.current) return;
    stateRef.current = "ANIMATING";
    
    // Stop Rotation
    if (rotateTweenRef.current) rotateTweenRef.current.kill();
    gsap.to(trayGroupRef.current.position, { y: -5, duration: 1, ease: "power2.in" });

    // Cups Re-arrange
    cupsRef.current.forEach((item) => {
        sceneRef.current?.attach(item.mesh);
        gsap.to(item.mesh.position, { x: item.targetLineX, y: 0, z: 0, duration: 1.2, ease: "power3.inOut" });
        gsap.to(item.mesh.rotation, { y: 0, duration: 1 });
    });

    // Camera Move (정면 뷰)
    gsap.to(cameraRef.current.position, {
        x: 0, y: 2, z: 6, // 높이 낮춤
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => cameraRef.current?.lookAt(0,0.5,0), // 살짝 위를 보게
        onComplete: () => { stateRef.current = "LINEAR"; }
    });
  };

  const showDetail = (index: number) => {
    stateRef.current = "DETAIL";
    const selectedCup = cupsRef.current[index];
    setSelectedCoffee(selectedCup.data);

    if (detailCardRef.current) {
        detailCardRef.current.style.visibility = 'visible';
        gsap.to(detailCardRef.current, { opacity: 1, x: 0, duration: 0.5 });
    }

    if (cameraRef.current) {
        gsap.to(cameraRef.current.position, {
            x: selectedCup.mesh.position.x, y: 1.5, z: 3,
            duration: 1, ease: "power3.out"
        });
    }

    cupsRef.current.forEach((c, i) => {
        if (i !== index) {
            gsap.to(c.mesh.position, { z: -2, opacity: 0.3, duration: 0.5 });
            gsap.to(c.mesh.children[0].material, { opacity: 0.3, transparent: true, duration: 0.5});
        }
    });
  };

  const returnToLine = () => {
    stateRef.current = "ANIMATING";
    if (detailCardRef.current) {
        gsap.to(detailCardRef.current, { opacity: 0, x: 20, duration: 0.3, onComplete: () => {
             if(detailCardRef.current) detailCardRef.current.style.visibility = 'hidden';
        }});
    }
    cupsRef.current.forEach(c => {
        gsap.to(c.mesh.position, { x: c.targetLineX, y: 0, z: 0, duration: 0.8, ease: "power2.out" });
        gsap.to(c.mesh.children[0].material, { opacity: 1, transparent: false, duration: 0.5});
    });
    if (cameraRef.current) {
        gsap.to(cameraRef.current.position, {
            x: 0, y: 2, z: 6,
            duration: 0.8, ease: "power2.inOut",
            onComplete: () => { stateRef.current = "LINEAR"; }
        });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // 3D 캔버스 내 클릭만 처리
    e.preventDefault(); 
    
    if (stateRef.current === "INTRO") {
        transitionToLinear();
    } else if (stateRef.current === "LINEAR") {
        if (!cameraRef.current || !canvasRef.current) return;
        
        // Raycaster 좌표 계산 (부모 요소 기준 상대 좌표 사용)
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

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
    if (stateRef.current !== "LINEAR" || !cameraRef.current || !canvasRef.current) {
        if(canvasRef.current) canvasRef.current.style.cursor = 'default';
        return;
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
    const intersects = raycaster.intersectObjects(cupsRef.current.map(c => c.mesh), true);

    if (intersects.length > 0) {
        canvasRef.current.style.cursor = 'pointer';
        const parent = intersects[0].object.parent;
        gsap.to(parent.position, { y: 0.3, duration: 0.3 });
    } else {
        canvasRef.current.style.cursor = 'default';
        cupsRef.current.forEach(c => {
             if (c.mesh.position.y !== 0) gsap.to(c.mesh.position, { y: 0, duration: 0.3 });
        });
    }
  };

  return (
    // 중요: h-screen 제거 -> absolute inset-0으로 부모 크기 채움
    <div className="absolute inset-0 w-full h-full bg-[#050505] overflow-hidden">
      
      {/* 3D Canvas Container */}
      {/* 중요: pointer-events-auto 추가 */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-auto"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      />

      {/* Intro Text (클릭하면 사라짐) */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${stateRef.current !== 'INTRO' ? 'opacity-0' : 'opacity-100'}`}>
         {/* ... (기존 텍스트 생략, 필요시 추가) ... */}
      </div>

      {/* Detail Card (우측 상단 고정) */}
      <div 
        ref={detailCardRef}
        className="absolute top-10 right-10 w-[280px] bg-black/80 backdrop-blur-md border border-[#d4af37]/30 p-6 text-white opacity-0 invisible z-20 pointer-events-auto rounded-sm"
      >
        <div className="text-[10px] text-[#d4af37] uppercase tracking-widest mb-2">{selectedCoffee.variety}</div>
        <h2 className="font-serif text-2xl mb-4 text-white">{selectedCoffee.name}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCoffee.notes.map((note, i) => (
            <span key={i} className="bg-white/10 px-2 py-1 rounded text-[10px] text-gray-300">{note}</span>
          ))}
        </div>
        <p className="text-xs text-gray-400 leading-relaxed mb-6">{selectedCoffee.desc}</p>
        <button 
            onClick={(e) => { e.stopPropagation(); returnToLine(); }}
            className="w-full py-2 border border-white/20 text-[10px] uppercase hover:bg-white hover:text-black transition-colors"
        >
          Close Detail
        </button>
      </div>
    </div>
  );
}