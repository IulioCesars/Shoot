class pelota extends THREE.Mesh{
  constructor() {
    super(  new THREE.SphereGeometry( 1, 32, 32 ), 
            new THREE.MeshPhongMaterial( {
              color: 0x156289,
              emissive: 0x072534,
              side: THREE.DoubleSide
            }) );
    this.castShadow = true;
    this.receiveShadow = false;
  }
  /*get area() {
    return this.calcArea();
  }

  calcArea() {
    return this.height * this.width;
  }*/
}