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
  }
}