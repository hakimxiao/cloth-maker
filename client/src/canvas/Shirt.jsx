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

  // Komponen JSX yang dirender
  return (
    // Group adalah wadah (seperti <div> di HTML) untuk mengelompokkan objek 3D
    <group>
      {/* Mesh adalah objek 3D yang memiliki geometry (bentuk) dan material (warna/tekstur) */}
      <mesh
        castShadow // Membuat objek ini bisa memproyeksikan bayangan
        geometry={nodes.T_Shirt_male.geometry} // Menggunakan geometry dari node yang bernama T_Shirt_male
        material={materials.lambert1} // Menggunakan material yang bernama lambert1
        material-roughness={1} // Menentukan kekasaran material, 1 = sangat kasar (tidak memantulkan cahaya)
        dispose={null} // Mencegah auto-dispose saat mesh di-unmount
      >
        {/* Mesh ditutup tanpa konten tambahan */}
      </mesh>
    </group>
  );
};

// Mengekspor komponen agar bisa digunakan di file lain
export default Shirt;
