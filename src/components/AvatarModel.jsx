// src/components/AvatarModel.jsx

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";

const Avatar = ({ texturePath }) => {
  const { scene } = useGLTF("/wewal-pot/wicker_basket_02_4k.gltf"); // Load your model
  const texture = useTexture(texturePath); // Load texture based on user selection

  // Apply the texture to the avatar model's materials
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = texture; // Apply the selected texture
      child.material.needsUpdate = true; // Update the material with the new texture
    }
  });

  return <primitive object={scene} scale={10} />;
};

const AvatarModel = () => {
  const [selectedTexture, setSelectedTexture] = useState("/wewal-pot/textures/wicker_basket_02_arm_4k.jpg"); // Default texture

  // UI handler to update the selected texture
  const handleTextureChange = (texture) => {
    setSelectedTexture(texture);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>3D Avatar Customizer</h1>

      {/* Texture selection buttons */}
      <div>
        <button onClick={() => handleTextureChange("/wewal-pot/textures/wicker_basket_02_arm_4k.jpg")}>Body Texture</button>
        <button onClick={() => handleTextureChange("/wewal-pot/textures/wicker_basket_02_diff_4k.jpg")}>Clothes Texture</button>
        <button onClick={() => handleTextureChange("/wewal-pot/textures/wicker_basket_02_nor_gl_4k.jpg")}>Hair Texture</button>
      </div>

      {/* 3D Avatar Canvas */}
      <Canvas style={{ width: "100%", height: "80vh" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Avatar texturePath={selectedTexture} />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
};

export default AvatarModel;
