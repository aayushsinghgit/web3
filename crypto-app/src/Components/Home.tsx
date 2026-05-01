import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useTransaction } from '../Wallet/context/TransactionContext';

function AnimatedBackground() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial color="#6C63FF" wireframe opacity={0.1} transparent />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6C63FF" />
    </group>
  );
}

export function Home() {
  const { connectWallet, currentAccount } = useTransaction();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const titleWords = ["Own", "Your", "Crypto", "Future"];
  
  return (
    <div className="relative w-full h-screen bg-[--bg-primary] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <AnimatedBackground />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[--brand]/30 bg-[--brand]/10 text-[--brand] text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-4 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[--brand] rounded-full animate-ping" />
          Futuristic Web3 Interface
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-[--text-primary] tracking-tighter leading-[0.9] mb-4 md:mb-6">
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-2 md:mr-4 transition-all duration-1000 ease-out"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${i * 0.15}s`,
                color: i % 2 === 1 ? 'var(--brand)' : 'var(--text-primary)'
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p 
          className="text-base md:text-xl text-[--text-muted] max-w-sm md:max-w-xl mx-auto mb-8 md:mb-10 transition-all duration-1000 delay-700 leading-relaxed"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(20px)' }}
        >
          Secure. Self-custody. <br className="sm:hidden" /> On-chain.
        </p>

        <div 
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto transition-all duration-1000 delay-1000 w-full sm:w-auto px-10 sm:px-0"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? 'translateY(0)' : 'translateY(20px)' }}
        >
          {!currentAccount ? (
            <button
              onClick={connectWallet}
              className="w-full sm:w-auto px-8 py-4 bg-[--brand] hover:bg-[--brand-dim] text-white font-black rounded-2xl transition-all hover:scale-105 active:scale-95 text-sm md:text-base shadow-xl shadow-[--brand]/20"
            >
              Connect Wallet
            </button>
          ) : (
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-[--text-primary] font-black rounded-2xl border border-[--border] backdrop-blur-md transition-all text-sm md:text-base">
              Wallet Connected
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex flex-col items-center gap-2 md:gap-4 text-[--text-muted]/40 animate-bounce pointer-events-none z-20">
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-center w-full">Scroll</span>
        <div className="w-[18px] h-[30px] md:w-[22px] md:h-[36px] border border-current rounded-full flex justify-center p-1">
           <div className="w-0.5 h-1 md:w-1 md:h-2 bg-current rounded-full animate-scroll-pill" />
        </div>
      </div>
    </div>
  );
}
