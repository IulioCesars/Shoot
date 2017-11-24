//var imported = document.createElement('script');
//imported.src = '/Shoot/js/jquery-3.2.1.min.js';
//document.head.appendChild(imported);
class jsUtil{
        static constructor(){
            
        }
        

        static enviarPuntuacion(usuario, puntuacion) {
            var dataToSend = { action: "enviarPuntuacion", usuario: usuario, puntuacion: puntuacion };

            $.ajax({
                url: "wsShoot.php",
                async: true,
                type: "POST",
                data: dataToSend,
                //dataType: 'json',
                success: function(response) {
                },
                error: function(x, y, z){
                    alert("Error: " + x + y + z);
                }
            });
        }
}