var scene;
var sceneModelos;
var camera;
var renderer;
var lights = [];
var raycaster;

var mouseCoords;
var clock;
var delta;

var _pelota;
var pelotas = [];
var estantes = [];
var objetosColision = [];

var pause = false;
function IniciarGraficos(){
	scene = new THREE.Scene();
	sceneModelos = new THREE.Scene();
	clock = new THREE.Clock();
	grupoObj = [];

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 );
		camera.position.z = 10;
		camera.position.y = 4;

	renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( 0x000000, 1 );

	document.body.appendChild( renderer.domElement );
	lights = [];
		lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
		lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
		lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
		lights[ 0 ].position.set( 0, 200, 0 );
		lights[ 1 ].position.set( 100, 200, 100 );
		lights[ 2 ].position.set( - 100, - 200, - 100 );
	scene.add( lights[ 0 ] );
	scene.add( lights[ 1 ] );
	scene.add( lights[ 2 ] );

	raycaster = new THREE.Raycaster();
	mouseCoords = new THREE.Vector2();
}

function CargarEscenario(){
	_pelota = new Pelota();

	CargarOBJ(sceneModelos, "modelos/Pato/","Duck", "Pato");
	CargarOBJ(sceneModelos, "modelos/Gato/","Cat", "Gato", 0.5);
	CargarOBJ(sceneModelos, "modelos/GiftBox/","cs_gift", "Caja",0.05);
	CargarOBJ(sceneModelos, "modelos/Pollo/","Chicken", "Pollo", 0.02);

	var gridHelper = new THREE.GridHelper( 20, 20 );
	scene.add( gridHelper );

	estantes.push(new Fila(sceneModelos, scene, { x: 0, y: 6, z: 0 }));
	estantes.push(new Fila(sceneModelos, scene, { x: 0, y: 3, z: 0 }, "izq"));
	estantes.push(new Fila(sceneModelos, scene, { x: 0, y: 0, z: 0 },));
}

var Render = function () {
	requestAnimationFrame( Render );
	delta = clock.getDelta();

	if(!pause){
		estantes.forEach(it=>{ it.dibujar(delta, pelotas); });
		pelotas.forEach(it => { it.dibujar(delta); });
		renderer.render( scene, camera );

	}
};


function CargarOBJ(scene, path, obj, name, scale = 1){
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
			}, 
			()=>{}, 
			()=>{}
			);
	});
}

function CargarOBJSinTextura(scene, obj, name, scale = 1){
	var loader = new THREE.OBJLoader();
		loader.load(
			obj + ".obj",
			function ( object ) {
				object.scale.y = scale;
				object.scale.x = scale;
				object.scale.z = scale;
				object.name = name;
				scene.add( object );
			}
		);
}

window.addEventListener( 'resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

window.addEventListener( 'click', function( event ) {
	var pos = new THREE.Vector3();
	var quat = new THREE.Quaternion();
	mouseCoords.set(
		( event.clientX / window.innerWidth ) * 2 - 1,
		- ( event.clientY / window.innerHeight ) * 2 + 1
	);
	//Obtiene las cordenadas del mouse

	raycaster.setFromCamera( mouseCoords, camera );
	//Lo convierte a conrdenadas de la scene
	
	pos.copy( raycaster.ray.direction );
	console.clear();
	//alert("x: " + pos.x + "y: " + pos.y + "z: " + pos.z);
	console.log("Direccion: ");
	console.log(raycaster.ray.direction);
	console.log("Origen: ");
	console.log( raycaster.ray.origin );

	pos.add( raycaster.ray.origin );

	console.log("Origen: ");
	console.log( pos );
	
	quat.set( 0, 0, 0, 1 );

	var p = _pelota.clone();
	p.position.copy(pos);
	p.quaternion.copy(quat);
	p.scale.x = p.scale.y = p.scale.z = 0.5;
	//p.position.z =0;
	p.rays = [
		new THREE.Vector3(2,0,0),
		new THREE.Vector3(1,0,0),
		new THREE.Vector3(0,0,1),
		new THREE.Vector3(0,0,-3)
	];
	p.direccion.copy(raycaster.ray.direction);
	pelotas.push(p);
	scene.add(pelotas[pelotas.length - 1]);
	if(pelotas.length >= 10){
		scene.remove(pelotas[0]);
		pelotas.shift();
	}
}, false);

window.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        pause = !pause;
    }
});