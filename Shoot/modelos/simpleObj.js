class simpleObj{
  
  constructor(scene, path, obj, name, scale = 1) {
    this.completo=false;
    var m = this;
    this.mtlLoader = new THREE.MTLLoader();
	this.mtlLoader.setBaseUrl( path );
			this.mtlLoader.setPath( path );
			this.mtlLoader.load( obj + ".mtl", function( materials ) {
					materials.preload();
					parent.objLoader = new THREE.OBJLoader();
					parent.objLoader.setMaterials( materials );
					parent.objLoader.setPath( path );
					parent.objLoader.load( obj + ".obj", function ( object ) {
						object.scale.y = scale;
						object.scale.x = scale;
						object.scale.z = scale;
						object.name = name;
						scene.add(object)
					}, null, null );
			});
    
  }
  
}