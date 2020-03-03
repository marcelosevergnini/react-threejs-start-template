import {
  Scene,
  WebGLRenderer,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  GridHelper, Mesh, Raycaster, Vector2, PlaneBufferGeometry, MeshBasicMaterial,
} from 'three';
import OrbitControls from 'three-orbitcontrols';
import Tool from "./Tool";

class RunEngine {
  scene: Scene;

  renderer: WebGLRenderer;

  camera: PerspectiveCamera;

  controls: OrbitControls;

  scroll: boolean = true;

  rayCaster: Raycaster;

  mouse: Vector2;

  area: PlaneBufferGeometry;

  areaObjects = [];

  cubeCounter: number = 1 ;


  constructor(useAntialias: boolean, color: number) {
    this.scene = new Scene();
    this.scene.background = new Color(color);
    this.renderer = new WebGLRenderer({ antialias: useAntialias });
    this.camera = new PerspectiveCamera(45, 800 / 600, 1, 50000);
    this.renderer.setSize(0, 0, false);
    this.camera.position.set(2000, 1500, 1300);
    this.camera.lookAt(0, 0, 0);
    this.mouse = new Vector2();
    this.rayCaster = new Raycaster();
  }

  setControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 1;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 20000;
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
      }, index: number) => {
        const directionalLight = new DirectionalLight(new Color(light.color));
        directionalLight.position
          .set(light.position.x, light.position.y, light.position.z)
          .normalize();
        directionalLight.name = "Light -> " + (++index)
        this.scene.add(directionalLight);
      },
    );
  };

  addGrid = (grid: { size: number; dimensions: number }) => {
    const gridHelper: GridHelper = new GridHelper(grid.size, grid.dimensions, 0x7e7f80, 0xafb2b5);
    gridHelper.name = "Scene Grid"
    this.add(gridHelper);
    this.area = new PlaneBufferGeometry( grid.size, grid.size );
    this.area.rotateX( - Math.PI / 2 );
    const plane = new Mesh( this.area, new MeshBasicMaterial( { visible: false } ) );
    plane.name = "Plane Objects"
    this.scene.add( plane );
    this.areaObjects.push(plane);
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

  addTool = (position: {width: number, height: number}) =>  {

    let tool: Tool = new Tool();

    const intersectItem = this.getIntersect(position);
    if ( intersectItem ) {
      console.log(intersectItem);
      const mesh: Mesh = tool.build(++this.cubeCounter);
      this.areaObjects.push(mesh);
      mesh.position.copy( intersectItem.point ).add( intersectItem.normal );
      mesh.position.divideScalar( 500 ).floor().multiplyScalar( 500 ).addScalar( 250 );
      this.add(mesh);
    }
  };

  private getIntersect = (position: {width: number, height: number}) => {
    this.mouse.set(position.width, position.height);
    this.rayCaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.rayCaster.intersectObjects(this.areaObjects);
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
export default RunEngine;
