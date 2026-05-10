-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2026 a las 03:57:18
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `formulario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro1`
--

CREATE TABLE `registro1` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `correo` text NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `clave` text NOT NULL,
  `Escuela` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro1`
--

INSERT INTO `registro1` (`id`, `nombre`, `correo`, `telefono`, `clave`, `Escuela`) VALUES
(10, 'Drake Hernandez Soto', 'davidtonio214@gmail.com', '7296921677', '$2y$10$A/rayM5PSbjm4rWJDjcH4.f5DIRiTqmVQsRf8URdCBX9eZrRu8sJW', 'Preparatoria Oficial de Tula'),
(11, 'Thomas', 'daanor22@cetis26.edu.mx', '7296921677', '$2y$10$djprplZ5vXE.O5kXm5Zbpui/XUvV5ezYZMvXoJ8wZTd4XcCnDqFpq', 'Preparatoria Oficial de Tula'),
(13, 'David Antonio Ordaz', 'davidtonio212@gmail.com', '7296921677', '$2y$10$tbfmXY2yk5z1rOorIec/7OMt2qMWqxG7XbgMTmnhR9MfeJ4gd71Oi', 'CETis No. 26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `Caree` text NOT NULL,
  `nombre` text NOT NULL,
  `Escuela` text NOT NULL,
  `correo` text NOT NULL,
  `id` int(11) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`Caree`, `nombre`, `Escuela`, `correo`, `id`, `telefono`, `fecha`) VALUES
('Química', 'David Antonio Ordaz', 'CETis No. 26', 'davidtonio212@gmail.com', 1, '7296921677', '2026-05-04 01:56:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `registro1`
--
ALTER TABLE `registro1`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `registro1`
--
ALTER TABLE `registro1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
