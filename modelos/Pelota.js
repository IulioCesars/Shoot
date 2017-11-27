class Pelota extends THREE.Mesh{
  constructor() {

    
    var Smaterial = new THREE.ShaderMaterial( {
            uniforms: uniforms1,
            vertexShader: document.getElementById( 'vertexShader' ).textContent,
            fragmentShader: document.getElementById( 'fragment_shader4' ).textContent
            } );

    super(  new THREE.SphereGeometry( 1, 32, 32 ), Smaterial
            /*new THREE.MeshPhongMaterial( {
              color: 0x156289,
              emissive: 0x072534,
              side: THREE.DoubleSide
            })*/ );
    this.castShadow = true;
    this.receiveShadow = false;
    this.scale.x = this.scale.y = this.scale.z = 0.1;
    this.direccion= new THREE.Vector3();
  }

  dibujar(delta){
    //this.position.z -= (8 * delta);
    this.translateZ(15 * delta);
    uniforms1.time.value += delta * 5;
    //if(this.position.x > this.direccion.x){
      //this.position.x -= (8 * delta);
    //  }
  }
}