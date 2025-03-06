-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 03. 10:35
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `driveus_database`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `arlista`
--

CREATE TABLE `arlista` (
  `arId` int(11) NOT NULL,
  `jarmuAz` int(11) DEFAULT NULL,
  `kezdet` datetime DEFAULT NULL,
  `vege` datetime DEFAULT NULL,
  `ar` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berlok`
--

CREATE TABLE `berlok` (
  `felhAz` char(8) NOT NULL,
  `nev` text NOT NULL,
  `szemelyiigszam` varchar(8) NOT NULL,
  `jogostivanyszam` varchar(8) NOT NULL,
  `kibereltautok` varchar(100) NOT NULL,
  `foglalas_kezdete` datetime NOT NULL,
  `foglalas_vege` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `foglaltautok`
--

CREATE TABLE `foglaltautok` (
  `foglalt_auto` int(11) NOT NULL,
  `foglalo` char(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `karbantartas`
--

CREATE TABLE `karbantartas` (
  `utolso_szervizeles` datetime NOT NULL,
  `jarmuAZ` int(11) DEFAULT NULL,
  `allapota` text DEFAULT NULL,
  `muszaki_vizsga_lejarat` datetime DEFAULT NULL,
  `biztositas` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kolcsonozhetoautok`
--

CREATE TABLE `kolcsonozhetoautok` (
  `jarmuAz` int(11) NOT NULL,
  `rendszam` varchar(10) NOT NULL,
  `marka` varchar(255) NOT NULL,
  `modell` varchar(255) NOT NULL,
  `evjarat` int(4) NOT NULL,
  `uzemanyag` varchar(20) NOT NULL,
  `szin` varchar(20) DEFAULT NULL,
  `hengerur` double NOT NULL,
  `kolcsonzesiAr` double NOT NULL,
  `telephelyId` int(11) DEFAULT NULL,
  `statusz` enum('szabad','foglalt','karbantartas') DEFAULT 'szabad'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `regisztraltfelhasznalok`
--

CREATE TABLE `regisztraltfelhasznalok` (
  `felhAz` char(8) NOT NULL,
  `nev` text NOT NULL,
  `jelszo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `telephelyek`
--

CREATE TABLE `telephelyek` (
  `telephelyId` int(11) NOT NULL,
  `nev` varchar(255) DEFAULT NULL,
  `cim` varchar(255) DEFAULT NULL,
  `telefonszam` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `arlista`
--
ALTER TABLE `arlista`
  ADD PRIMARY KEY (`arId`),
  ADD KEY `jarmuAz` (`jarmuAz`);

--
-- A tábla indexei `berlok`
--
ALTER TABLE `berlok`
  ADD PRIMARY KEY (`felhAz`);

--
-- A tábla indexei `foglaltautok`
--
ALTER TABLE `foglaltautok`
  ADD KEY `foglalt_auto` (`foglalt_auto`),
  ADD KEY `fk_foglaltautok_berlok` (`foglalo`);

--
-- A tábla indexei `karbantartas`
--
ALTER TABLE `karbantartas`
  ADD KEY `jarmuAZ` (`jarmuAZ`);

--
-- A tábla indexei `kolcsonozhetoautok`
--
ALTER TABLE `kolcsonozhetoautok`
  ADD PRIMARY KEY (`jarmuAz`),
  ADD KEY `telephelyId` (`telephelyId`);

--
-- A tábla indexei `regisztraltfelhasznalok`
--
ALTER TABLE `regisztraltfelhasznalok`
  ADD PRIMARY KEY (`felhAz`);

--
-- A tábla indexei `telephelyek`
--
ALTER TABLE `telephelyek`
  ADD PRIMARY KEY (`telephelyId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `arlista`
--
ALTER TABLE `arlista`
  MODIFY `arId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kolcsonozhetoautok`
--
ALTER TABLE `kolcsonozhetoautok`
  MODIFY `jarmuAz` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `telephelyek`
--
ALTER TABLE `telephelyek`
  MODIFY `telephelyId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `arlista`
--
ALTER TABLE `arlista`
  ADD CONSTRAINT `arlista_ibfk_1` FOREIGN KEY (`jarmuAz`) REFERENCES `kolcsonozhetoautok` (`jarmuAz`);

--
-- Megkötések a táblához `berlok`
--
ALTER TABLE `berlok`
  ADD CONSTRAINT `fk_berlok_felhasznalo` FOREIGN KEY (`felhAz`) REFERENCES `regisztraltfelhasznalok` (`felhAz`);

--
-- Megkötések a táblához `foglaltautok`
--
ALTER TABLE `foglaltautok`
  ADD CONSTRAINT `fk_foglaltautok_berlok` FOREIGN KEY (`foglalo`) REFERENCES `berlok` (`felhAz`),
  ADD CONSTRAINT `foglaltautok_ibfk_1` FOREIGN KEY (`foglalt_auto`) REFERENCES `kolcsonozhetoautok` (`jarmuAz`),
  ADD CONSTRAINT `foglaltautok_ibfk_2` FOREIGN KEY (`foglalo`) REFERENCES `berlok` (`felhAz`);

--
-- Megkötések a táblához `karbantartas`
--
ALTER TABLE `karbantartas`
  ADD CONSTRAINT `karbantartas_ibfk_1` FOREIGN KEY (`jarmuAZ`) REFERENCES `kolcsonozhetoautok` (`jarmuAz`);

--
-- Megkötések a táblához `kolcsonozhetoautok`
--
ALTER TABLE `kolcsonozhetoautok`
  ADD CONSTRAINT `kolcsonozhetoautok_ibfk_1` FOREIGN KEY (`telephelyId`) REFERENCES `telephelyek` (`telephelyId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
