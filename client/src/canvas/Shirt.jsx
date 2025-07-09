// Mengimpor React agar dapat membuat komponen React
import React from "react";

// Mengimpor easing dari maath untuk interpolasi/animasi halus pada nilai numerik
import { easing } from "maath";

// Mengimpor useSnapshot dari valtio untuk mengakses state reaktif
import { useSnapshot } from "valtio";

// useFrame digunakan untuk membuat loop render atau animasi per frame
import { useFrame } from "@react-three/fiber";

// Mengimpor helper dari drei:
// - Decal: untuk menambahkan tekstur gambar di atas permukaan objek
// - useGLTF: untuk memuat file GLB/GLTF 3D model
// - useTexture: untuk memuat gambar sebagai tekstur
import { Decal, useGLTF, useTexture } from "@react-three/drei";

// Mengimpor state global dari file store.js atau store.ts
import state from "../store";

// Komponen utama Shirt untuk merender kaos 3D
const Shirt = () => {
  // Mengambil snapshot (salinan reaktif) dari state Valtio
  const snap = useSnapshot(state);

  // Memuat file model 3D kaos dari /shirt_baked.glb dan mendestrukturisasi nodes dan materials-nya
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  // Memuat tekstur logo dan tekstur penuh (fullTexture) berdasarkan path yang disimpan di state
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) =>
    easing.dampE(materials.lambert1.colorWrite.snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  // Komponen JSX yang dirender
  return (
    // render ulang ketika state berubah
    <group key={stateString}>
      {/* Mesh adalah objek 3D yang memiliki geometry (bentuk) dan material (warna/tekstur) */}
      <mesh
        castShadow // Membuat objek ini bisa memproyeksikan bayangan
        geometry={nodes.T_Shirt_male.geometry} // Menggunakan geometry dari node yang bernama T_Shirt_male
        material={materials.lambert1} // Menggunakan material yang bernama lambert1
        material-roughness={1} // Menentukan kekasaran material, 1 = sangat kasar (tidak memantulkan cahaya)
        dispose={null} // Mencegah auto-dispose saat mesh di-unmount
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16} // Meningkatkan kualitas tekstur pada sudut tertentu
            depthTest={false} // Menghindari pengujian kedalaman, sehingga decal selalu
            depthWrite={true} // Mengizinkan penulisan kedalaman, sehingga decal dapat terlihat di atas objek lain
          />
        )}
      </mesh>
    </group>
  );
};

// Mengekspor komponen agar bisa digunakan di file lain
export default Shirt;
