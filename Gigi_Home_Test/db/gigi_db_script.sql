CREATE DATABASE  IF NOT EXISTS `gigi_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gigi_db`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: gigi_db
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `sku` varchar(45) NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku_UNIQUE` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'jeans','hard-wearing casual trousers made of denim or other cotton fabric',50.00,'jeans.jpg','J1001','bottoms'),(2,'scarf','a length or square of fabric worn around the neck or head',30.00,'scarf.jpg','S1001','miscellaneous'),(3,'shorts','short trousers that reach only to the knees or thighs',20.50,'shorts.jpg','S2001','bottoms'),(4,'tracksuit','a loose, warm set of clothes consisting of a sweatshirt and trousers with an elasticated or drawstring waist, worn when exercising or as casual wear',50.90,'track.jpg','T1001','tops'),(5,'sweatshirt','a loose, warm sweater, typically made of cotton, worn when exercising or as leisurewear',99.99,'sweatshirt.jpg','S3001','tops'),(6,'dress','a one-piece garment worn by women and girls that covers the body and extends down over the legs',55.00,'dress.jpg','D1001','tops'),(7,'blouse','a woman\'s upper garment resembling a shirt, typically with a collar, buttons, and sleeves',25.00,'blouse.jpg','B1001','tops'),(8,'bikini','a two-piece swimming costume for women',15.00,'bikini.jpg','B2001','beachwear'),(11,'socks','warms the feet',5.00,'socks.jpg','S4001','footwear'),(12,'long socks','warms the feet',6.00,'socks_long.jpg','S4002','footwear'),(20,'slipper','a comfortable slip-on shoe that is worn indoors.',5.00,'slippers.jpg','S5001','footwear'),(23,'high heels','women\'s shoes with tall, thin heels.',55.00,'highheels.jpg','H1001','footwear'),(33,'high heels','women\'s shoes with tall, thin heels.',12.10,'highheels.jpg','H10012','footwear');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-30 22:48:07
