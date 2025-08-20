// main.js
document.addEventListener("DOMContentLoaded", async () => {
  // Import MindARThree
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#app"),
    imageTargetSrc: "./targets.mind",   // <- ใส่ไฟล์ target ของคุณ
  });

  const { renderer, scene, camera } = mindarThree;

  // Anchor คือจุดที่จะผูกโมเดลเมื่อสแกน marker
  const anchor = mindarThree.addAnchor(0);

  // โหลดโมเดล GLB
  const loader = new THREE.GLTFLoader();
  loader.load("./model.glb", (gltf) => {
    gltf.scene.scale.set(0.5, 0.5, 0.5);   // ปรับขนาด
    gltf.scene.position.set(0, 0, 0);
    anchor.group.add(gltf.scene);
  });

  // ปุ่ม "เริ่ม AR"
  const startBtn = document.querySelector("#startBtn");
  const statusText = document.querySelector("#status");

  startBtn.addEventListener("click", async () => {
    await mindarThree.start();   // ✅ เริ่มกล้อง + ระบบ AR
    statusText.innerText = "กำลังทำงาน... ส่องกล้องไปที่ Marker";
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  });

  // ปุ่ม Debug (เช่น แสดง bounding box)
  document.querySelector("#dbgBtn").addEventListener("click", () => {
    console.log("Scene objects:", scene.children);
  });
});
