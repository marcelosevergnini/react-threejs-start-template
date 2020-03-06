import {number} from "prop-types";

export const sceneData = {
  grid: {
    size: 30000,
    dimensions: 60,
    color1: 0x7e7f80,
    color2: 0xafb2b5
  },
  tool_settings: {
    boxGeometry: {
      width: 500,
      height: 500,
      depth: 500,
    }
  },
  settings: {
    camera: {
      fov: 45,
      aspect: (800/600),
      near: 1,
      far: 50000,
      lookAt: {x : 0, y: 0, z: 0},
      position: {x : 2000, y: 1500, z: 1300}},
    controls: {
      enableDamping: true,
      dampingFactor: 1,
      screeSpacePanning: false,
      minDistance: 100,
      maxDistance: 50000,
      maxPolarAngle: 2.3,
    },
    lights: [{ color: 0xffffff, position: { x: 1, y: 0.75, z: 0.5 } }],
    renderer: {
      size: {
        width: 0,
        height: 0
      },
      updateStyle: false,
      useAntialias: true
    },
    scene: {
      backgroundColor: 0xf2f2f2
    }
  }
};

export const layoutControl = {
  showHeader: true
};
