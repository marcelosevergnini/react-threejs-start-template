import {
  Box3, Box3Helper,
  BoxBufferGeometry,
  GridHelper,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  Vector2,
  Vector3,
} from 'three';
import Tool from "./Tool";
import AbstractEngine from "./AbstractEngine";

class EngineControl extends AbstractEngine {

  scroll: boolean = true;

  area: PlaneBufferGeometry;

  areaObjects = [];

  cubeCounter: number = 1 ;

  constructor(settings: any) {
    super(settings);
    this.registerRendererEvents();
  };

  addGrid = (grid: { size: number; dimensions: number, color1: number, color2: number }) => {
    const gridHelper: GridHelper = new GridHelper(grid.size, grid.dimensions, grid.color1, grid.color2);
    gridHelper.name = "Scene Grid";
    this.add(gridHelper);
    // this.add(this.createBoxGrid(grid.size, grid.dimensions, grid.dimensions, 60, grid.color1));
    this.area = new PlaneBufferGeometry( grid.size, grid.size );
    this.area.rotateX( - Math.PI / 2 );
    const plane = new Mesh( this.area, new MeshBasicMaterial( { visible: false } ) );
    plane.name = "Plane Objects";
    this.scene.add( plane );
    this.areaObjects.push(plane);
  };


  createBoxGrid = (base, height, translateY, divisions, color) => {
    const boxGrid = new Group();
    boxGrid.name = "BoxGrid";
    let box3 = new Box3(new Vector3(-base / 2, 0, -base / 2), new Vector3(base / 2, height, base / 2));
    let box3Helper = new Box3Helper(box3, color);
    let gridHelper = new GridHelper(base, divisions, color, color);
    boxGrid.add(box3Helper);
    boxGrid.add(gridHelper);
    boxGrid.translateY(translateY);
    return boxGrid;
  };

  addTool = (position: {width: number, height: number}) =>  {
    const tool: Tool = new Tool();
    const targetPosition: Vector2 = new Vector2(position.width, position.height);
    const intersectItem = this.getIntersect(targetPosition, this.areaObjects)
    if ( intersectItem ) {
      const mesh: Mesh = tool.build(++this.cubeCounter);
      this.areaObjects.push(mesh);
      mesh.position.copy( intersectItem.point ).add( intersectItem.normal );
      mesh.position.divideScalar( 500 ).floor().multiplyScalar( 500 ).addScalar( 250 );
      this.add(mesh);
    }
  };

}
export default EngineControl;
