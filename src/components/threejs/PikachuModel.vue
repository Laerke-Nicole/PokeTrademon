<template>
  <div ref="sceneContainer" class="model-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'


const sceneContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!sceneContainer.value) return

  const scene = new THREE.Scene()

  // camera position
  const camera = new THREE.PerspectiveCamera(
    75,
    sceneContainer.value.clientWidth / sceneContainer.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0.1, 0.9) // Adjust the camera to fit the scene

  // tilt the camera to look down 45 degrees
  camera.rotation.x = -Math.PI / 7

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(sceneContainer.value.clientWidth, sceneContainer.value.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  sceneContainer.value.appendChild(renderer.domElement)

  // ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7) // Increased intensity
  scene.add(ambientLight)

  // directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5) // Increased intensity
  directionalLight.position.set(5, 10, 5) // Adjusted position
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048  // Increased shadow map size for better quality
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.shadow.camera.near = 1
  directionalLight.shadow.camera.far = 20
  scene.add(directionalLight)

  // shadow catcher 
  const floorGeometry = new THREE.PlaneGeometry(10, 10)
  const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.3 }) // Slightly higher opacity for more visible shadows
  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -1
  floor.receiveShadow = true
  scene.add(floor)

  const loader = new GLTFLoader()

  // Load the model
  loader.load('/models/pikachu2.glb', (gltf: GLTF) => {
    const model = gltf.scene
    model.traverse((child: THREE.Object3D) => { // Using Object3D instead of Mesh directly
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).castShadow = true,
        (child as THREE.Mesh).receiveShadow = true // Ensure model receives shadows
      }
    })
    scene.add(model)
    model.position.set(0, -1, 0) // Position the model in the scene
  })

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()


  window.addEventListener('resize', () => {
    if (!sceneContainer.value) return
    camera.aspect = sceneContainer.value.clientWidth / sceneContainer.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(sceneContainer.value.clientWidth, sceneContainer.value.clientHeight)
  })
})
</script>

<style scoped>
.model-container {
  width: 100%;
  height: 400px;
}
</style>