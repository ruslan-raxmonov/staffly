"use client";

import { Html, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type AgentDef = {
  id: string;
  name: string;
  color: string;
  path: [number, number][];
  speed: number;
};

const AGENTS: AgentDef[] = [
  {
    id: "sales",
    name: "Sales",
    color: "#7C5CFF",
    path: [
      [-5.5, -2.5],
      [-3.2, -2.5],
      [-3.2, 0.5],
      [-5.5, 0.5],
    ],
    speed: 0.35,
  },
  {
    id: "support",
    name: "Support",
    color: "#22C55E",
    path: [
      [-1.2, -3.2],
      [1.5, -3.2],
      [1.5, -1],
      [-1.2, -1],
    ],
    speed: 0.4,
  },
  {
    id: "content",
    name: "Content",
    color: "#38BDF8",
    path: [
      [3.2, -2.8],
      [5.5, -2.8],
      [5.5, 0.2],
      [3.2, 0.2],
    ],
    speed: 0.32,
  },
  {
    id: "dev",
    name: "Dev",
    color: "#F472B6",
    path: [
      [3.5, 2],
      [5.6, 2],
      [5.6, 3.8],
      [3.5, 3.8],
    ],
    speed: 0.28,
  },
  {
    id: "jarvis",
    name: "Jarvis",
    color: "#A78BFA",
    path: [
      [-1, 1.5],
      [1.5, 1.5],
      [1.5, 3.5],
      [-2.5, 3.5],
      [-2.5, 1.5],
    ],
    speed: 0.45,
  },
];

function Desk({
  position,
  rotation = 0,
  color = "#2a2f3d",
}: {
  position: [number, number, number];
  rotation?: number;
  color?: string;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <RoundedBox args={[1.6, 0.08, 0.9]} radius={0.04} position={[0, 0.72, 0]}>
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.45} />
      </RoundedBox>
      <mesh position={[-0.65, 0.36, -0.32]}>
        <cylinderGeometry args={[0.05, 0.05, 0.72, 8]} />
        <meshStandardMaterial color="#1a1d27" />
      </mesh>
      <mesh position={[0.65, 0.36, -0.32]}>
        <cylinderGeometry args={[0.05, 0.05, 0.72, 8]} />
        <meshStandardMaterial color="#1a1d27" />
      </mesh>
      <mesh position={[-0.65, 0.36, 0.32]}>
        <cylinderGeometry args={[0.05, 0.05, 0.72, 8]} />
        <meshStandardMaterial color="#1a1d27" />
      </mesh>
      <mesh position={[0.65, 0.36, 0.32]}>
        <cylinderGeometry args={[0.05, 0.05, 0.72, 8]} />
        <meshStandardMaterial color="#1a1d27" />
      </mesh>
      {/* monitor */}
      <RoundedBox args={[0.7, 0.45, 0.04]} radius={0.02} position={[0, 1.1, -0.2]}>
        <meshStandardMaterial color="#11141c" metalness={0.4} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 1.1, -0.175]}>
        <planeGeometry args={[0.6, 0.35]} />
        <meshStandardMaterial
          color="#7C5CFF"
          emissive="#7C5CFF"
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh position={[0, 0.88, -0.2]}>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#1a1d27" />
      </mesh>
    </group>
  );
}

function Partition({
  position,
  args,
}: {
  position: [number, number, number];
  args: [number, number, number];
}) {
  return (
    <RoundedBox args={args} radius={0.03} position={position}>
      <meshStandardMaterial
        color="#171b26"
        transparent
        opacity={0.85}
        metalness={0.15}
        roughness={0.5}
      />
    </RoundedBox>
  );
}

function OfficeRoom() {
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#12151f" metalness={0.1} roughness={0.85} />
      </mesh>
      {/* floor grid glow */}
      <gridHelper args={[14, 28, "#2a2540", "#1a1d27"]} position={[0, 0.01, 0]} />

      {/* back wall */}
      <mesh position={[0, 1.6, -5]} receiveShadow>
        <boxGeometry args={[14, 3.2, 0.15]} />
        <meshStandardMaterial color="#0e1118" />
      </mesh>
      {/* left wall */}
      <mesh position={[-7, 1.6, 0]} receiveShadow>
        <boxGeometry args={[0.15, 3.2, 10]} />
        <meshStandardMaterial color="#0e1118" />
      </mesh>
      {/* right wall */}
      <mesh position={[7, 1.6, 0]} receiveShadow>
        <boxGeometry args={[0.15, 3.2, 10]} />
        <meshStandardMaterial color="#0e1118" />
      </mesh>

      {/* glass accent panels */}
      <mesh position={[-2.5, 1.4, -4.9]}>
        <planeGeometry args={[3.5, 1.8]} />
        <meshStandardMaterial
          color="#7C5CFF"
          emissive="#7C5CFF"
          emissiveIntensity={0.15}
          transparent
          opacity={0.25}
        />
      </mesh>
      <mesh position={[3.2, 1.4, -4.9]}>
        <planeGeometry args={[3.5, 1.8]} />
        <meshStandardMaterial
          color="#22C55E"
          emissive="#22C55E"
          emissiveIntensity={0.12}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* room partitions */}
      <Partition position={[-2.2, 0.7, -1.5]} args={[0.08, 1.4, 4.5]} />
      <Partition position={[2.2, 0.7, -1.2]} args={[0.08, 1.4, 4]} />
      <Partition position={[0, 0.7, 1.2]} args={[5.5, 1.4, 0.08]} />

      {/* desks */}
      <Desk position={[-5.2, 0, -2.8]} />
      <Desk position={[-3.5, 0, -0.2]} rotation={Math.PI / 2} />
      <Desk position={[-0.2, 0, -2.8]} />
      <Desk position={[1.4, 0, -1.2]} rotation={-0.4} />
      <Desk position={[4.2, 0, -2.5]} />
      <Desk position={[5.4, 0, 0]} rotation={Math.PI / 2} />
      <Desk position={[4.5, 0, 2.8]} rotation={Math.PI} />
      <Desk position={[-0.5, 0, 2.6]} />
      <Desk position={[1.2, 0, 3.4]} rotation={0.3} />

      {/* central hologram table */}
      <RoundedBox args={[2.2, 0.12, 1.2]} radius={0.06} position={[0, 0.55, 2.4]}>
        <meshStandardMaterial color="#1b2030" metalness={0.5} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 1.1, 2.4]}>
        <cylinderGeometry args={[0.01, 0.5, 1.1, 24, 1, true]} />
        <meshStandardMaterial
          color="#7C5CFF"
          emissive="#7C5CFF"
          emissiveIntensity={0.8}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ceiling lights */}
      {[
        [-4, -2],
        [0, -2],
        [4, -2],
        [-2, 2],
        [3, 2.5],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 3.05, z]}>
          <boxGeometry args={[1.2, 0.05, 0.35]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#c4b5fd"
            emissiveIntensity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function AgentAvatar({
  agent,
  active,
  onSelect,
}: {
  agent: AgentDef;
  active: boolean;
  onSelect: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const bob = useRef(0);

  const lengths = useMemo(() => {
    const segs: number[] = [];
    for (let i = 0; i < agent.path.length; i++) {
      const a = agent.path[i];
      const b = agent.path[(i + 1) % agent.path.length];
      segs.push(Math.hypot(b[0] - a[0], b[1] - a[1]));
    }
    return segs;
  }, [agent.path]);

  const total = useMemo(
    () => lengths.reduce((s, n) => s + n, 0),
    [lengths]
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = (state.clock.elapsedTime * agent.speed) % total;
    let acc = 0;
    let idx = 0;
    for (; idx < lengths.length; idx++) {
      if (acc + lengths[idx] >= t) break;
      acc += lengths[idx];
    }
    const local = (t - acc) / lengths[idx];
    const a = agent.path[idx];
    const b = agent.path[(idx + 1) % agent.path.length];
    const x = a[0] + (b[0] - a[0]) * local;
    const z = a[1] + (b[1] - a[1]) * local;
    const angle = Math.atan2(b[0] - a[0], b[1] - a[1]);

    bob.current = Math.sin(state.clock.elapsedTime * 6 + agent.speed) * 0.04;
    group.current.position.set(x, bob.current, z);
    group.current.rotation.y = angle;
  });

  return (
    <group ref={group} onClick={(e) => {
      e.stopPropagation();
      onSelect();
    }}>
      {/* body */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <capsuleGeometry args={[0.18, 0.45, 6, 12]} />
        <meshStandardMaterial
          color={agent.color}
          emissive={agent.color}
          emissiveIntensity={active ? 0.55 : 0.2}
          metalness={0.3}
          roughness={0.35}
        />
      </mesh>
      {/* head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#e8eaf0" metalness={0.1} roughness={0.4} />
      </mesh>
      {/* status ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[0.22, 0.3, 24]} />
        <meshStandardMaterial
          color={active ? "#22C55E" : agent.color}
          emissive={active ? "#22C55E" : agent.color}
          emissiveIntensity={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
      <Html position={[0, 1.55, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div
          style={{
            padding: "3px 8px",
            borderRadius: 8,
            background: active ? agent.color : "rgba(8,9,13,0.85)",
            border: `1px solid ${agent.color}88`,
            color: "#fff",
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: active ? `0 0 16px ${agent.color}66` : "none",
          }}
        >
          {agent.name}
        </div>
      </Html>
    </group>
  );
}

function Scene({
  active,
  setActive,
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  return (
    <>
      <color attach="background" args={["#08090d"]} />
      <fog attach="fog" args={["#08090d", 12, 28]} />
      <ambientLight intensity={0.45} />
      <directionalLight
        castShadow
        position={[6, 10, 4]}
        intensity={1.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, 3, -2]} intensity={0.8} color="#7C5CFF" />
      <pointLight position={[4, 3, 2]} intensity={0.55} color="#22C55E" />
      <spotLight
        position={[0, 6, 2]}
        angle={0.5}
        penumbra={0.6}
        intensity={1.1}
        color="#a78bfa"
      />

      <OfficeRoom />

      {AGENTS.map((agent) => (
        <AgentAvatar
          key={agent.id}
          agent={agent}
          active={active === agent.id}
          onSelect={() => setActive(agent.id)}
        />
      ))}

      <Html position={[0, 2.55, -4.85]} center style={{ pointerEvents: "none" }}>
        <div
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 1,
            textShadow: "0 0 20px rgba(124,92,255,0.6)",
            whiteSpace: "nowrap",
          }}
        >
          STɅFFLY 3D Office
        </div>
      </Html>

      <OrbitControls
        makeDefault
        enablePan={false}
        minPolarAngle={0.35}
        maxPolarAngle={1.35}
        minDistance={7}
        maxDistance={16}
        target={[0, 0.6, 0]}
      />
    </>
  );
}

export function VirtualOffice3D() {
  const [active, setActive] = useState("jarvis");
  const activeAgent = AGENTS.find((a) => a.id === active) ?? AGENTS[0];

  return (
    <div className="glass overflow-hidden rounded-[20px] p-4 shadow-[0_40px_100px_rgba(0,0,0,0.45)] md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">3D Virtual Office</h3>
          <p className="text-sm text-muted">
            Sichqoncha bilan aylantiring · AI agentlarga bosing
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald-soft px-3 py-1.5">
          <span className="pulse-dot h-2 w-2 rounded-full bg-emerald" />
          <span className="text-xs font-medium text-emerald">
            {AGENTS.length} agent online
          </span>
        </div>
      </div>

      <div className="relative h-[380px] overflow-hidden rounded-[20px] border border-white/10 bg-[#08090d] md:h-[480px]">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [9, 7, 9], fov: 42, near: 0.1, far: 60 }}
          gl={{ antialias: true, alpha: false }}
        >
          <Suspense fallback={null}>
            <Scene active={active} setActive={setActive} />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute left-3 top-3 rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-[11px] text-muted backdrop-blur">
          Faol: <span className="text-white">{activeAgent.name}</span>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-5">
        {AGENTS.map((agent) => (
          <button
            key={agent.id}
            type="button"
            onClick={() => setActive(agent.id)}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${
              active === agent.id
                ? "border-purple/40 bg-purple/10"
                : "border-white/5 bg-white/[0.02] hover:border-white/15"
            }`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: agent.color }}
            />
            <div>
              <p className="text-xs font-medium text-white">{agent.name}</p>
              <p className="text-[10px] text-muted">
                {active === agent.id ? "Tanlangan" : "Ishlamoqda"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
