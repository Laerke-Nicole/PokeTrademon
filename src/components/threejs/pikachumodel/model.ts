import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function loadModelAndAnimation(scene: THREE.Scene): Promise<{
  model: THREE.Object3D
  mixer: THREE.AnimationMixer }> {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()

    loader.load('/models/pikachu.glb', (gltf: GLTF) => {
      const model = gltf.scene
      model.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.castShadow = true
          mesh.receiveShadow = true
        }
      })

      model.position.set(0, -1, 0)
      scene.add(model)

      const mixer = new THREE.AnimationMixer(model)
      const idleClip = gltf.animations.find(clip => clip.name === 'Idle')

      if (!idleClip) {
        return reject(new Error('Idle animation isnt found'))
      }

      const action = mixer.clipAction(idleClip)
      action.play()

      resolve({ model, mixer })
    }, undefined, (error) => reject(error))
  })
}