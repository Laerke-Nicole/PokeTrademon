<template>
  <div ref="sceneContainer" class="model-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'

// components
import { createCamera } from './camera'
import { createLights } from './light'
import { createFloor } from './floor'
import { loadModelAndAnimation } from './model'

const sceneContainer = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  if (!sceneContainer.value) return
  const container = sceneContainer.value

  const scene = new THREE.Scene()
  const clock = new THREE.Clock()

  // component camera
  const camera = createCamera(container)

  // renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(sceneContainer.value.clientWidth, sceneContainer.value.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  sceneContainer.value.appendChild(renderer.domElement)

  // component light
  createLights(scene)

  // component floor
  createFloor(scene)

  // component model and animation
  const { mixer } = await loadModelAndAnimation(scene)

  // animation loop
  const animate = () => {
    requestAnimationFrame(animate)
    const delta = clock.getDelta()
    mixer.update(delta)
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<style scoped>
.model-container {
  width: 10%;
  height: 400px;
}
</style>
