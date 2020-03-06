import AbstractEngine from "./AbstractEngine";

class EngineControl extends AbstractEngine {

  constructor(settings: any) {
    super(settings);
    this.registerRendererEvents();
  };
}
export default EngineControl;
