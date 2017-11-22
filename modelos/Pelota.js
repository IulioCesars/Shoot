class Pelota extends THREE.Mesh{
  constructor() {
    super(  new THREE.SphereGeometry( 1, 32, 32 ), 
            new THREE.MeshPhongMaterial( {
              color: 0x156289,
              emissive: 0x072534,
              side: THREE.DoubleSide
            }) );
    this.castShadow = true;
    this.receiveShadow = false;
    this.scale.x = this.scale.y = this.scale.z = 0.1;
    this.direccion= new THREE.Vector3();
  }

  dibujar(delta){
    //this.position.z -= (8 * delta);
    this.translateZ(8 * delta);
    //if(this.position.x > this.direccion.x){
      //this.position.x -= (8 * delta);
    //  }
  }
}