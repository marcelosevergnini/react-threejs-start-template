import * as React from 'react';
import EngineControl from './EngineControl';

const style = {
  height: 'calc(77vh)',
};

interface EngineProps {
    grid: { size: number; dimensions: number, color1: number, color2: number };
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

export class Engine extends React.Component<EngineProps, { width: 0, height: 0, mousePos: { x: 0, y: 0 } }> {
  containerRef: any;

  refs: {
    [key: string]: (Element);
    containerRef: (HTMLDivElement);
  };

  scene: EngineControl;

  mouseDown: boolean = false;

  constructor(props: EngineProps) {
    super(props);
    this.containerRef = React.createRef();

    const { settings } = this.props;
    this.scene = new EngineControl(settings);
  }

  componentDidMount = () => {

    this.containerRef.appendChild(this.scene.renderer.domElement);
    const { grid } = this.props;
    const { clientWidth, clientHeight } = this.containerRef;

    this.setState({ width: clientWidth, height: clientHeight });

    this.scene.updateRenderSize(clientWidth, clientHeight, true);
    this.scene.addGrid(grid);
    this.registerEngineEvents();

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
    event.preventDefault();
    if (!this.mouseDown) {
      return;
    }
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

  private registerEngineEvents = () => {
    window.addEventListener('resize', this.resizeCanvas, true);
    this.scene.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove);
    this.scene.renderer.domElement.addEventListener( 'mousedown', this.addTool, false );
    this.scene.renderer.domElement.addEventListener( 'mouseup', () => { this.mouseDown = false; }, false );
  };

  render = () => {
    return (
      <div className={(this.scene.scroll ? 'scrollEnable' : 'scrollDisable')} style={style} ref={ref => (this.containerRef = ref)} />
    )
  }
}
