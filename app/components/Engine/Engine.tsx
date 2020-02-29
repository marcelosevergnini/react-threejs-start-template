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

  constructor(props: EngineProps) {
    super(props);
    this.containerRef = React.createRef();
    this.scene = new RunEngine(true, this.props.backgroundColor);
  }

  componentDidMount = () => {
    this.containerRef.appendChild(this.scene.renderer.domElement);
    const { offsetWidth, offsetHeight } = this.containerRef;
    this.setState({ width: offsetWidth, height: offsetHeight });
    this.scene.updateRenderSize(offsetWidth, offsetHeight, true);
    this.scene.addLights(this.props.lights);
    this.scene.addGrid(this.props.grid);
    this.scene.setControls();
    window.addEventListener('resize', this.resizeCanvas, true);
    window.addEventListener('mousemove', this.onDocumentMouseMove);
    this.containerRef.addEventListener('mouseover', this.scene.enableControls, true);
    this.containerRef.addEventListener('mouseout', this.scene.disableControls, true);
    this.animate();
  };

  animate = () => {
    window.requestAnimationFrame(this.animate);
    this.scene.controls.update();
    this.scene.render();
  };

  resizeCanvas = () => {
    const {offsetWidth, offsetHeight} = this.containerRef;
    this.scene.updateRenderSize(offsetWidth, offsetHeight, true);
    this.setState({width: offsetWidth, height: offsetHeight});
  };

  onDocumentMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    const mousePosition: any = {
      x: ((event.clientX / this.containerRef.offsetWidth) * 2 - 1),
      y: (-(event.clientY / this.containerRef.offsetHeight) * 2 + 1)
    };
    this.setState( {
      height: 0, mousePos: mousePosition, width: 0});
  };

  render = () => {
    return (
      <div className={(this.scene.scroll ? 'scrollEnable' : 'scrollDisable')} style={style} ref={ref => (this.containerRef = ref)} />
    )
  }
}
