import {Color, DirectionalLight, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer,} from 'three';
import OrbitControls from 'three-orbitcontrols';

export interface EngineSettings {
  settings: {
    lights: { color: number; position: { x: number; y: number; z: number } }[];
    scene: {
      backgroundColor: number
    }

    renderer: {
      useAntialias: boolean,
      updateStyle: boolean | false,
      size: {
        width: number | 0,
        height: number | 0
      }
    }

    camera: {
      fov: number,
      aspect: number,
      near: number,
      far: number,
      position: { x: number; y: number; z: number },
      lookAt: { x: number; y: number; z: number }
    }

    controls: {
      enableDamping: boolean,
      dampingFactor: number,
      screeSpacePanning: boolean,
      minDistance: number,
      maxDistance: number,
      maxPolarAngle: number
    }
  }
}

abstract class AbstractEngine implements EngineSettings {
  scene: Scene;

  settings: any;

  renderer: WebGLRenderer;

  camera: PerspectiveCamera;

  controls: OrbitControls;

  rayCaster: Raycaster;

  mouse: Vector2;

  protected constructor(configuration: any) {
    this.buildScene(configuration.scene);
    this.buildCamera(configuration.camera);
    this.buildRenderer(configuration.renderer);
    this.buildControls(configuration.controls);
    this.buildLights(configuration.lights);
    this.buildMouse();
    this.buildRaycast();
  }

  private buildScene = (scene: { backgroundColor: number }) => {
    this.scene = new Scene();
    this.scene.background = new Color(scene.backgroundColor);
  };

  private buildCamera = (camera: {fov: number, aspect: number, near: number, far: number, position: { x: number; y: number; z: number }, lookAt: { x: number; y: number; z: number }}) => {
    this.camera = new PerspectiveCamera(camera.fov, camera.aspect, camera.near, camera.far);
    this.camera.position.set(camera.position.x, camera.position.y, camera.position.z);
    this.camera.lookAt(camera.lookAt.x, camera.lookAt.y, camera.lookAt.z);
  };

  private buildRenderer = (renderer: {useAntialias: boolean, size: {width: number | 0, height: number | 0}, updateStyle: boolean | false}) => {
    this.renderer = new WebGLRenderer({ antialias: renderer.useAntialias });
    this.renderer.setSize(renderer.size.width, renderer.size.height, renderer.updateStyle);
    this.renderer.render(this.scene, this.camera);
  };

  private buildControls = (control: {enableDamping: boolean, dampingFactor: number, screeSpacePanning: boolean, minDistance: number, maxDistance: number, maxPolarAngle: number}) => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = control.enableDamping;
    this.controls.dampingFactor = control.dampingFactor;
    this.controls.screenSpacePanning = control.screeSpacePanning;
    this.controls.minDistance = control.minDistance;
    this.controls.maxDistance = control.maxDistance;
    this.controls.maxPolarAngle = (Math.PI / control.maxPolarAngle);
  };

  private buildLights = (lights: { color: number; position: { x: number; y: number; z: number } }[]) => {
    lights.forEach(
      (light: {
        color: number;
        position: Vector3;
      }, index: number) => {
        const directionalLight = new DirectionalLight(new Color(light.color));
        directionalLight.position
          .set(light.position.x, light.position.y, light.position.z)
          .normalize();
        directionalLight.name = "Light Item-" + (++index);
        this.scene.add(directionalLight);
      },
    );
  };

  private buildMouse = () => {
    this.mouse = new Vector2();
  };

  private buildRaycast = () => {
    this.rayCaster = new Raycaster();
  };

  updateRenderSize = (width: number, height: number, updateStyle: boolean) => {
    this.renderer.setSize(width, height, updateStyle);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  registerRendererEvents = () => {
    this.renderer.domElement.addEventListener('mouseover', this.enableControls, true);
    this.renderer.domElement.addEventListener('mouseout', this.disableControls, true);
  };

  disableControls = () => {
    this.controls.enabled = false;
  };

  enableControls = () => {
    this.controls.enabled = true;
  };

  add = (elementToAdd: any) => {
    this.scene.add(elementToAdd);
  };

  getIntersect = (position: Vector2, target: any) => {
    this.mouse.set(position.x, position.y);
    this.rayCaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.rayCaster.intersectObjects(target);
    if (intersects.length > 0) {
      return {
        point: intersects[0].point,
        normal: intersects[0].face.normal
      };
    }
    return null;
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };
}
export default AbstractEngine;
