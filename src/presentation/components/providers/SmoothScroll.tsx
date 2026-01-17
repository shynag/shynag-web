"use client";

import { ReactLenis } from "lenis/react"; //
import { cancelFrame, frame } from "framer-motion"; //
import { useEffect, useRef } from "react"; //
import type { LenisRef } from "lenis/react"; //

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null); //

  useEffect(() => {
    // Fungsi update untuk sinkronisasi waktu
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    // Masukkan ke loop Framer Motion
    frame.update(update, true);

    // Bersihkan saat unmount
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root // Menggunakan scroll container html default
      ref={lenisRef} // Ref untuk akses instance
      options={{
        autoRaf: false, // WAJIB false karena kita handle manual via Framer Motion
        // Opsi tambahan sesuai preferensi 'berat' yang kamu mau:
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
