-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2022 at 06:41 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `criminal-investigation-database`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `type` varchar(10) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `type` varchar(10) NOT NULL,
  `district` varchar(20) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `agent_type`
--

CREATE TABLE `agent_type` (
  `agent_type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cctv_camera`
--

CREATE TABLE `cctv_camera` (
  `id` int(10) NOT NULL,
  `district` varchar(20) NOT NULL,
  `location` varchar(50) NOT NULL,
  `criminal_identity` int(16) NOT NULL,
  `criminal_name` varchar(50) NOT NULL,
  `criminal_gender` varchar(10) NOT NULL,
  `criminal_photo` varchar(100) NOT NULL,
  `accuracy` int(10) NOT NULL,
  `distance` varchar(10) NOT NULL,
  `time` varchar(30) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `criminals`
--

CREATE TABLE `criminals` (
  `identity` int(16) NOT NULL,
  `name` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detections`
--

CREATE TABLE `detections` (
  `id` int(10) NOT NULL,
  `criminal_identity` int(16) NOT NULL,
  `criminal_name` varchar(50) NOT NULL,
  `criminal_gender` varchar(10) NOT NULL,
  `criminal_photo` varchar(100) NOT NULL,
  `accuracy` int(100) NOT NULL,
  `time` varchar(30) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `district_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`),
  ADD KEY `district` (`district`);

--
-- Indexes for table `agent_type`
--
ALTER TABLE `agent_type`
  ADD UNIQUE KEY `agent_type` (`agent_type`);

--
-- Indexes for table `cctv_camera`
--
ALTER TABLE `cctv_camera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `criminal_identity` (`criminal_identity`),
  ADD KEY `criminal_photo` (`criminal_photo`),
  ADD KEY `criminal_gender` (`criminal_gender`),
  ADD KEY `criminal_name` (`criminal_name`),
  ADD KEY `district` (`district`),
  ADD KEY `accuracy` (`accuracy`);

--
-- Indexes for table `criminals`
--
ALTER TABLE `criminals`
  ADD PRIMARY KEY (`identity`),
  ADD UNIQUE KEY `identity` (`identity`),
  ADD KEY `photo` (`photo`),
  ADD KEY `name` (`name`),
  ADD KEY `gender` (`gender`);

--
-- Indexes for table `detections`
--
ALTER TABLE `detections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accuracy` (`accuracy`),
  ADD KEY `criminal_identity` (`criminal_identity`),
  ADD KEY `criminal_name` (`criminal_name`),
  ADD KEY `criminal_gender` (`criminal_gender`),
  ADD KEY `criminal_photo` (`criminal_photo`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD UNIQUE KEY `district_name` (`district_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cctv_camera`
--
ALTER TABLE `cctv_camera`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detections`
--
ALTER TABLE `detections`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agents`
--
ALTER TABLE `agents`
  ADD CONSTRAINT `agents_district` FOREIGN KEY (`district`) REFERENCES `districts` (`district_name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `agents_type` FOREIGN KEY (`type`) REFERENCES `agent_type` (`agent_type`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `cctv_camera`
--
ALTER TABLE `cctv_camera`
  ADD CONSTRAINT `cctv_camera_criminal_gender` FOREIGN KEY (`criminal_gender`) REFERENCES `criminals` (`gender`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `cctv_camera_criminal_identity` FOREIGN KEY (`criminal_identity`) REFERENCES `criminals` (`identity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `cctv_camera_criminal_name` FOREIGN KEY (`criminal_name`) REFERENCES `criminals` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `cctv_camera_criminal_photo` FOREIGN KEY (`criminal_photo`) REFERENCES `criminals` (`photo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `cctv_camera_district` FOREIGN KEY (`district`) REFERENCES `districts` (`district_name`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `detections`
--
ALTER TABLE `detections`
  ADD CONSTRAINT `detections_accuracy` FOREIGN KEY (`accuracy`) REFERENCES `cctv_camera` (`accuracy`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detections_criminal_gender` FOREIGN KEY (`criminal_gender`) REFERENCES `criminals` (`gender`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detections_criminal_identity` FOREIGN KEY (`criminal_identity`) REFERENCES `criminals` (`identity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detections_criminal_name` FOREIGN KEY (`criminal_name`) REFERENCES `criminals` (`name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detections_criminal_photo` FOREIGN KEY (`criminal_photo`) REFERENCES `criminals` (`photo`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
