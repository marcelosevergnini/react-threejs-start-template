import * as React from 'react';
import RunEngine from './RunEngine';

const style = {
  height: 'calc(75vh)',
};

interface EngineProps {
  backgroundColor: number,
  lights: { color: number; position: { x: number; y: number; z: number } }[];
  grid: { size: number; dimensions: number };
}

export class Engine extends React.Component<EngineProps, { width: 0, height: 0, mousePos: { x: 0, y: 0 } }> {
  containerRef: any;

  refs: {
    [key: string]: (Element);
    containerRef: (HTMLDivElement);
  };

  scene: RunEngine;

  mouseDown: boolean = false;

  constructor(props: EngineProps) {
    super(props);
    this.containerRef = React.createRef();
    this.scene = new RunEngine(true, this.props.backgroundColor);
  }

  componentDidMount = () => {

    this.containerRef.appendChild(this.scene.renderer.domElement);
    const { lights, grid } = this.props;
    const { clientWidth, clientHeight } = this.containerRef;

    this.setState({ width: clientWidth, height: clientHeight });

    this.scene.updateRenderSize(clientWidth, clientHeight, true);
    this.scene.addLights(lights);
    this.scene.addGrid(grid);
    this.scene.setControls();

    window.addEventListener('resize', this.resizeCanvas, true);
    this.scene.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove);
    this.scene.renderer.domElement.addEventListener('mouseover', this.scene.enableControls, true);
    this.scene.renderer.domElement.addEventListener('mouseout', this.scene.disableControls, true);
    this.scene.renderer.domElement.addEventListener( 'mousedown', this.addTool, false );
    this.scene.renderer.domElement.addEventListener( 'mouseup', () => { this.mouseDown = false; }, false );

    this.animate();
  };

  animate = () => {
    window.requestAnimationFrame(this.animate);
    this.scene.controls.update();
    this.scene.render();
  };

  resizeCanvas = () => {
    const { clientWidth, clientHeight } = this.containerRef;
    this.scene.updateRenderSize(clientWidth, clientHeight, true);
    this.setState({width: clientWidth, height: clientHeight});
  };

  onDocumentMouseMove = (event: MouseEvent) => {

    if (!this.mouseDown) {
      return;
    }

    event.preventDefault();

    const mouseX: number = ( ( event.clientX - this.scene.renderer.domElement.offsetLeft ) / this.scene.renderer.domElement.clientWidth ) * 2 - 1;
    const mouseY: number = (- ( ( event.clientY - this.scene.renderer.domElement.offsetTop ) / this.scene.renderer.domElement.clientHeight ) * 2 + 1);
    const mousePosition: any = { x:  mouseX, y:  mouseY };
    this.setState( { width: 0, height: 0, mousePos: mousePosition });
  };

  addTool = (event: MouseEvent) => {
    event.preventDefault();
    const rect = this.scene.renderer.domElement.getBoundingClientRect();
    let positionWidth =  ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
    let positionHeight = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
    this.scene.addTool({width: positionWidth, height: positionHeight});
    this.mouseDown = true;
  };

  render = () => {
    return (
      <div className={(this.scene.scroll ? 'scrollEnable' : 'scrollDisable')} style={style} ref={ref => (this.containerRef = ref)} />
    )
  }
}
