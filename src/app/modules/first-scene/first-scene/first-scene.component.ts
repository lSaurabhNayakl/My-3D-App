import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-first-scene',
  templateUrl: './first-scene.component.html',
  styleUrls: ['./first-scene.component.scss']
})
export class FirstSceneComponent implements OnInit {

  // private scene!: THREE.Scene;
  // private camera!: THREE.PerspectiveCamera;
  // private renderer!: THREE.WebGLRenderer;
  // private geometry!: THREE.BoxGeometry;

  constructor() { }

  ngOnInit(): void {
    this.setupScene();
  }

  setupScene(){
    const canvas: any = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const scene = new THREE.Scene();

    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(0, 10, 0);
    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(-5, 4, -5);
    light2.castShadow = true;
    const light3 = new THREE.DirectionalLight(0xffffff, 0.8);
    light3.position.set(10, 4, 10);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeCube(geometry: any, color: any, x: any) {
      const material = new THREE.MeshPhongMaterial({ color });

      const cube = new THREE.Mesh(geometry, material);
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);

      cube.position.x = x;

      return cube;
    }

    const cubes = [
      makeCube(geometry, 'yellow', 0),
      makeCube(geometry, 'red', 3),
    ];

    function resizeRenderer(renderer:any) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    let renderRequested: any = false;

    function render() {
      console.log('renderRequested', renderRequested);
      renderRequested = null;

      console.log("resizeRenderer(renderer)", resizeRenderer(renderer));
      if (resizeRenderer(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      controls.update();
      renderer.render(scene, camera);
    }

    render();

    function requestRenderIfNotRequested() {
      if (!renderRequested) {
        renderRequested = true;
        requestAnimationFrame(render);
      }
    }

    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);
  }
}


