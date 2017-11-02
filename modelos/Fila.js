class Fila{
  constructor(_sceneModelos, _scene, _posicion = null) {
    this.limite = 15;
    this.velocidad = 0.05;
    this.inicio = 10;
    this.sceneModelos = _sceneModelos;
    this.scene = _scene;
    this.grupo = [];
    this.agregar = true;

    this.posicion = new Object();
    this.posicion.x = _posicion != null ? _posicion.x : 0;
    this.posicion.y = _posicion != null ? _posicion.y : 0;
    this.posicion.z = _posicion != null ? _posicion.z : 0;
  }

  dibujar(){
    if(this.grupo.length<this.limite){
        if(this.agregar){
        var model = this.sceneModelos.getObjectByName("Pato");
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
        it.position.x += this.velocidad;
        if(this.grupo.length==this.limite && this.grupo[0].position.x >= this.inicio){
            this.scene.remove(this.grupo[0]);
            this.grupo.shift();
        }
    });
    if(this.grupo[this.grupo.length -1]!=null){
        if(this.grupo[this.grupo.length -1].position.x > (-this.inicio + (this.inicio / this.limite) * 2 )){
            this.agregar= true;
        }
    }

  }
}