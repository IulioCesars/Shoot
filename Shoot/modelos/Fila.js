class Fila{
    constructor(_sceneModelos, _scene, _posicion = null, _direccion = "der") {        
        this.sceneModelos = _sceneModelos;
        this.scene = _scene;
        this.grupo = [];
        this.agregar = true;
        this.posicion = new Object();
        this.posicion.x = _posicion != null ? _posicion.x : 0;
        this.posicion.y = _posicion != null ? _posicion.y : 0;
        this.posicion.z = _posicion != null ? _posicion.z : 0;
        this.limite = 10;
        this.direccion = _direccion;

        this.velocidad = this.direccion == "der" ? 4 : -4;
        this.inicio = this.direccion == "der" ? 10 : -10;

        this.dibujarBarra();
    }

    dibujarBarra(){
        var geometry = new THREE.BoxGeometry( 20, 0.2, 1 );
        var material = new THREE.MeshPhongMaterial( {
                  color: 0x663300,
                  emissive: 0x072534,
                  side: THREE.DoubleSide
                });
        var cube = new THREE.Mesh( geometry, material );
        cube.castShadow = true;
        cube.receiveShadow = false;
        cube.position.y = this.posicion.y;
        cube.position.y -= 0.2;
        this.scene.add( cube );

    }

    dibujar(delta){
        if(this.grupo.length<this.limite){
            if(this.agregar){
            var model = this.obtenerModelo();
                if(model != null){
                    this.grupo.push(model.clone());
                    this.grupo[this.grupo.length -1].position.x = -this.inicio;
                    this.grupo[this.grupo.length -1].position.y = this.posicion.y;
                    this.grupo[this.grupo.length -1].position.z = this.posicion.z;

                    this.scene.add(this.grupo[this.grupo.length -1]);
                    this.agregar = false;
                }
            }
        }
        this.grupo.forEach((it)=>{
            it.position.x += this.velocidad * delta;
            if(this.direccion == "der"){
                if(this.grupo.length==this.limite && this.grupo[0].position.x >= this.inicio){
                    this.scene.remove(this.grupo[0]);
                    this.grupo.shift();
                }
            }else if(this.direccion == "izq"){
                if(this.grupo.length==this.limite && this.grupo[0].position.x <= this.inicio){
                    this.scene.remove(this.grupo[0]);
                    this.grupo.shift();
                }
            }

        });
        if(this.grupo[this.grupo.length -1]!=null){
            if(this.direccion == "der"){
                if(this.grupo[this.grupo.length -1].position.x > (-this.inicio + (this.inicio / this.limite) * 2 )){
                    this.agregar= true;
                }
            }else if(this.direccion == "izq"){
                if(this.grupo[this.grupo.length -1].position.x < (-this.inicio + (this.inicio / this.limite) * 2 )){
                    this.agregar= true;
                }
            } 
        }
    }

    obtenerModelo(i = 0){
        var nombreModelo;
        if(i == 0)
            i = this.obtenerNumeroAleatorio(0,4);
        switch(i){
            case 0: { return null; break; }
            case 1: { nombreModelo = "Pato"; break; }
            case 2: { nombreModelo = "Gato"; break; }
            case 3: { nombreModelo = "Caja"; break; }
            case 4: { nombreModelo = "Pollo"; break; }
        }
        return this.sceneModelos.getObjectByName(nombreModelo);
    }

    obtenerNumeroAleatorio(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }
}