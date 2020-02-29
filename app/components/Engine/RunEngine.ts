import {
  Scene,
  WebGLRenderer,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  GridHelper,
} from 'three';
import OrbitControls from 'three-orbitcontrols';

class RunEngine {
  scene: Scene;

  renderer: WebGLRenderer;

  camera: PerspectiveCamera;

  controls: OrbitControls;

  scroll: boolean = true;

  constructor(useAntialias: boolean, color: number) {
    this.scene = new Scene();
    this.scene.background = new Color(color);
    this.renderer = new WebGLRenderer({ antialias: useAntialias });
    this.camera = new PerspectiveCamera(45, 800 / 600, 1, 10000);
    this.renderer.setSize(0, 0, false);
    this.camera.position.set(2000, 1500, 1300);
    this.camera.lookAt(0, 0, 0);
  }

  setControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 1;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 7000;
    this.controls.maxPolarAngle = Math.PI / 2.3;
    this.controls.addEventListener('change', this.updateControls);
  };

  updateRenderSize = (width: number, height: number, updateStyle: boolean) => {
    this.renderer.setSize(width, height, updateStyle);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  addLights = (
    lights: { color: number; position: { x: number; y: number; z: number } }[],
  ) => {
    lights.forEach(
      (light: {
        color: number;
        position: { x: number; y: number; z: number };
      }) => {
        const directionalLight = new DirectionalLight(new Color(light.color));
        directionalLight.position
          .set(light.position.x, light.position.y, light.position.z)
          .normalize();
        this.scene.add(directionalLight);
      },
    );
  };

  addGrid = (grid: { size: number; dimensions: number }) => {
    this.add(new GridHelper(grid.size, grid.dimensions, 0x7e7f80, 0xafb2b5));
  };

  add = (elementToAdd: any) => {
    this.scene.add(elementToAdd);
  };

  updateControls = () => {
    this.renderer.render(this.scene, this.camera);
  };

  disableControls = () => {
    this.controls.enabled = false;
    this.scroll = false;
  };

  enableControls = () => {
    this.controls.enabled = true;
    this.scroll = true;
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };
}
export default RunEngine;
