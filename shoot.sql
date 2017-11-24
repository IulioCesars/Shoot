-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.18-log - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para shoot
DROP DATABASE IF EXISTS `shoot`;
CREATE DATABASE IF NOT EXISTS `shoot` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `shoot`;

-- Volcando estructura para procedimiento shoot.nuevaPuntuacion
DROP PROCEDURE IF EXISTS `nuevaPuntuacion`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevaPuntuacion`(
	IN `pUsuario` VARCHAR(50),
	IN `pPuntuacion` INT
)
BEGIN
	insert into puntuacion (usuario, puntuacion) values(pUsuario,pPuntuacion);
END//
DELIMITER ;

-- Volcando estructura para tabla shoot.puntuacion
DROP TABLE IF EXISTS `puntuacion`;
CREATE TABLE IF NOT EXISTS `puntuacion` (
  `id_puntuacion` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(80) DEFAULT '0',
  `puntuacion` int(11) DEFAULT '0',
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `id` (`id_puntuacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
