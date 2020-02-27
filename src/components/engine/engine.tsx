import React, { Component } from 'react';
import { connect } from 'react-redux';
import RunEngine from "../../engine/engine";
import { testRedux } from "../../store/actions";
import  "./engine.css";
import {TEST} from "../../store/actions/types/types";

const style = {
    height: "calc(75vh)"
};

interface EngineProps {
    backgroundColor: number,
    lights: {color: number, position: {x: number, y: number, z: number}}[],
    grid: {size: number, dimensions: number }
}

export class Engine extends Component<EngineProps> {
    containerRef: any;
    props: EngineProps;
    scene: RunEngine;

    constructor(props: EngineProps) {
        super(props);
        this.props = props;
        this.containerRef = React.createRef();
        this.state = {width: 0, height: 0, mousePos: {x: 0,y: 0}};
        this.scene = new RunEngine(true, this.props.backgroundColor);
    }

    componentDidMount = () => {
        this.containerRef.appendChild(this.scene.renderer.domElement);
        const {offsetWidth, offsetHeight} = this.containerRef;
        this.setState({width: offsetWidth, height: offsetHeight});
        this.scene.updateRenderSize(offsetWidth, offsetHeight, true);
        this.scene.addLights(this.props.lights);
        this.scene.addGrid(this.props.grid);
        this.scene.setControls();
        window.addEventListener("resize", this.resizeCanvas, true);
        window.addEventListener('mousemove', this.onDocumentMouseMove);
        this.containerRef.addEventListener("mouseover", this.scene.enableControls, true);
        this.containerRef.addEventListener("mouseout", this.scene.disableControls, true);
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
        this.setState(() => {
            return {mousePos: {
                x: ((event.clientX / this.containerRef.offsetWidth) * 2 - 1),
                y: (-(event.clientY / this.containerRef.offsetHeight) * 2 + 1)
            }}
        });
    };

    render = () => {
        return (
            <div className={(this.scene.scroll ? 'scrollEnable' : 'scrollDisable')} style={style} ref={ref => (this.containerRef = ref)} />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    test: () => dispatch(TEST)
});

const withConnect = connect(
    null,
    mapDispatchToProps
);

export default withConnect((Engine));