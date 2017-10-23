class simpleObj extends THREE.MTLLoader{
  
  constructor(path, obj, scene) {
    super();
    this.setBaseUrl( path );
			this.setPath( path );
			this.load( obj + ".mtl", function( materials ) {
					materials.preload();
					var objLoader = new THREE.OBJLoader();
					objLoader.setMaterials( materials );
					objLoader.setPath( path );
					objLoader.load( obj + ".obj", function ( object ) {
							scene.add(object);
					}, null, null );
			});
    
  }
  
}