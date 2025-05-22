import * as THREE from 'three'

export const createCamera = (container: HTMLDivElement) => {
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  )
  camera.position.set(0.02, 0.1, 0.9)
  camera.rotation.x = -Math.PI / 7
  return camera
}
