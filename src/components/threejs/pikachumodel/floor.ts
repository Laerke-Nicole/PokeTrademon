import * as THREE from 'three'

export const createFloor = (scene: THREE.Scene) => {
  const floorGeometry = new THREE.PlaneGeometry(10, 10)
  const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.3 })
  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -1
  floor.receiveShadow = true
  scene.add(floor)
}
