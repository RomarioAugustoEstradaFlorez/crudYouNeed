-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-09-2019 a las 13:38:25
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_crud`
--
CREATE DATABASE IF NOT EXISTS `prueba_crud` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `prueba_crud`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bills`
--

CREATE TABLE `bills` (
  `idbill` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` int(11) NOT NULL,
  `iva` int(3) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bill_has_categories`
--

CREATE TABLE `bill_has_categories` (
  `idbill` int(11) NOT NULL,
  `idcategory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `idcategory` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`idcategory`, `name`, `description`) VALUES
(2, 'Zapatos', 'Esá creada para enlazarla a las facturas que llevan venta solo de zapatos.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`idbill`);

--
-- Indices de la tabla `bill_has_categories`
--
ALTER TABLE `bill_has_categories`
  ADD KEY `bills` (`idbill`),
  ADD KEY `categories` (`idcategory`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`idcategory`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bills`
--
ALTER TABLE `bills`
  MODIFY `idbill` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `idcategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bill_has_categories`
--
ALTER TABLE `bill_has_categories`
  ADD CONSTRAINT `bills` FOREIGN KEY (`idbill`) REFERENCES `bills` (`idbill`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `categories` FOREIGN KEY (`idcategory`) REFERENCES `categories` (`idcategory`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
