<?php
	$action = $_POST['action'];
	if ($action == "enviarPuntuacion") 
		enviarPuntuacion();
	else if ($action == "obtenerPuntuacion")
		obtenerPuntuacion();

	function connect() {
		$databasehost = "twicky.com.mx";
		$databasename = "DB_TWICKYTUBE";
		$databaseuser = "twickytube";
		$databasepass = "twickytube";

		$mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
		if ($mysqli->connect_errno) {
			echo "Problema con la conexion a la base de datos";
		}
		return $mysqli;
	}

	function disconnect() {
		mysqli_close();
	}

	function enviarPuntuacion() {
		$usuario = $_POST["usuario"];
		$puntuacion = $_POST["puntuacion"];
		$mysqli = connect();

		$result = $mysqli->query("call nuevaPuntuacion('".$usuario."',".$puntuacion.");");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			echo "Todo salio bien";		
		}
		mysqli_close($mysqli);
	}

	function obtenerPuntuacion() {
		$mysqli = connect();

		$result = $mysqli->query("select * from puntuacion;");	
		
		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;
			}			
			echo json_encode($rows);
		}
		mysqli_close($mysqli);
	}
?>