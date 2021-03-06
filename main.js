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
var oportunidades = 10;
var puntos = 0;
var pause = false;
var acerto = false;

var cuboTextura;
var cuboMaterial;
var uniforms1;
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
		lights[ 3 ] = new THREE.PointLight( 0xFF0000, 0.8, 0 );
		lights[ 0 ].position.set( 0, 200, 0 );
		lights[ 1 ].position.set( 100, 200, 100 );
		lights[ 2 ].position.set( - 100, - 200, - 100 );
		lights[ 3 ].position.set( 0, 0, 0 );
	scene.add( lights[ 0 ] );
	scene.add( lights[ 1 ] );
	scene.add( lights[ 2 ] );
	scene.add( lights[ 3 ] );

	raycaster = new THREE.Raycaster();
	mouseCoords = new THREE.Vector2();
	uniforms1 = {
          time: { value: 1.0 }
        };
}

function CargarEscenario(){
	_pelota = new Pelota();

	CargarOBJ(sceneModelos, "modelos/Pato/","Duck", "Pato");
	CargarOBJ(sceneModelos, "modelos/Gato/","Cat", "Gato", 0.5);
	CargarOBJ(sceneModelos, "modelos/GiftBox/","cs_gift", "Caja",0.05);
	CargarOBJ(sceneModelos, "modelos/Pollo/","Chicken", "Pollo", 0.02);

	var gridHelper = new THREE.GridHelper( 20, 20 );
	scene.add( gridHelper );


	//CargarOBJ(scene, "modelos/Puesto/","canopy-carnival-tent", "Puesto",0.2);
	//CargarOBJSinTextura(scene, "modelos/Puesto/canopy-carnival-tent", "Puesto",0.2);


	estantes.push(new Fila(sceneModelos, scene, { x: 0, y: 7, z: 0 }));
	estantes.push(new Fila(sceneModelos, scene, { x: 0, y: 4, z: 0 }, "izq"));
	estantes.push(new Fila(sceneModelos, scene, { x: 0, y: 1, z: 0 },));

	var cuboTextura = new THREE.ImageUtils.loadTexture("img/madera.jpg");
	var cuboMaterial = new THREE.MeshBasicMaterial({ map:cuboTextura, side:THREE.DoubleSide });

	dibujarMuroY(0, cuboMaterial);
	dibujarMuroY(10, cuboMaterial);
	dibujarMuroX(-10, cuboMaterial);
	dibujarMuroX(10, cuboMaterial);
	dibujarMuroZ(-2, cuboMaterial);
}

var Render = function () {
	requestAnimationFrame( Render );
	delta = clock.getDelta();

	if(!pause){
		estantes.forEach(it=>{ it.dibujar(delta, pelotas); });
		pelotas.forEach(it => 
				{ 
					it.dibujar(delta); 
					if(it.position.z <= -1){
						scene.remove(it);
					}
				});
		if(acerto){
			//puntos += 10;
			acerto = false;
		}

		$("#info").html("Puntos: "+ puntos + "<br> Oportunidades: " + oportunidades);
	}
	renderer.render( scene, camera );
};


function dibujarMuroY(y, material){
    var geometry = new THREE.BoxGeometry( 20, 0.2, 10 );
    var cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    cube.receiveShadow = false;
    cube.position.y = y;
    this.scene.add( cube );
}

function dibujarMuroX(x,material){
    var geometry = new THREE.BoxGeometry( 0.2, 20, 10 );
    var cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    cube.receiveShadow = false;
    cube.position.x = x;
    this.scene.add( cube );
}

function dibujarMuroZ(z,material){
    var geometry = new THREE.BoxGeometry( 20, 20, 0.2 );
    var cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true;
    cube.receiveShadow = false;
    cube.position.z = z;
    this.scene.add( cube );
}

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
	if(oportunidades <= 0) { 
		window.top.location.href = "puntuacion.html?s=" + puntos;
		return; 
	}
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
	pos.add( raycaster.ray.origin );
	quat.set( 0, 0, 0, 1 );

	var p = _pelota.clone();
	p.position.copy(raycaster.ray.origin);
	p.setRotationFromQuaternion(quat);
	p.scale.x = p.scale.y = p.scale.z = 0.5;
	//p.position.z =0;
	p.rays = [
		new THREE.Vector3(2,0,0),
		new THREE.Vector3(1,0,0),
		new THREE.Vector3(0,0,1),
		new THREE.Vector3(0,0,-3)
	];
	var o = raycaster.ray.origin;
	var d = pos;


	p.rotation.y = -(3.1416 + Math.atan2(d.x - o.x, d.z - o.z));
	p.rotation.x = -Math.atan2(d.y - o.y, d.z - o.z);
	//p.direccion.copy(raycaster.ray.direction);



	pelotas.push(p);
	scene.add(pelotas[pelotas.length - 1]);
	if(pelotas.length >= 10){
		scene.remove(pelotas[0]);
		pelotas.shift();
	}
	oportunidades--;
}, false);

window.addEventListener('keydown', function(event) {
    if(event.keyCode == 32) {
        pause = !pause;
    }
});