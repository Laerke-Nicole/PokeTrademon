import * as THREE from 'three'

export const createLights = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  directionalLight.position.set(5, 10, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.shadow.camera.near = 1
  directionalLight.shadow.camera.far = 20
  directionalLight.shadow.bias = -0.01
  directionalLight.shadow.radius = 4

  scene.add(directionalLight)
}
