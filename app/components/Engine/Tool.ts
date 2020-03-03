import {BoxBufferGeometry, Mesh, MeshLambertMaterial, Vector3} from "three";


class Tool {
    geometry: BoxBufferGeometry;
    material: MeshLambertMaterial;

    constructor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      this.geometry = new BoxBufferGeometry(500, 500, 500  );
      for (let i = 0; i < 6; i++)
        color += letters[(Math.floor(Math.random() * 16))];
      this.material = new MeshLambertMaterial( { color: color} );
    };

    build(counter: number): Mesh {
        const mesh: Mesh = new Mesh( this.geometry, this.material );
        mesh.name = "Cube -> " + counter;
        return mesh;
    }
}
export default Tool;
