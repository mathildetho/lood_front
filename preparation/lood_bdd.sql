-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: lood
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `image` varchar(450) DEFAULT NULL,
  `description` varchar(450) DEFAULT NULL,
  `origine` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,'Makis','http://localhost:5000/foods/maki.jpg','Les makis sont la première chose à laquelle pensent les non-japonais lorsqu\'on parle de sushis. Ils sont composés de riz enrobé d\'algues nori et fourrés de différentes garnitures.','http://localhost:5000/foods/japan.png'),(2,'Burger','http://localhost:5000/foods/burger.jpg','Un burger est un sandwich d\'origine allemande, composé de deux pains de forme ronde (bun) généralement garnis de steak haché et de crudités, salade, tomate, oignon, cornichon, et de sauce…','http://localhost:5000/foods/allemagne.png'),(3,'Poutine','http://localhost:5000/foods/poutine.jpeg','La poutine est une spécialité culinaire typiquement québécoise. C\'est sûrement le plat de restauration rapide le plus populaire et le plus emblématique du Québec. Il est composé de frites et de fromage, le tout nappé d\'une sauce (barbecue ou poulet en général).','http://localhost:5000/foods/canada.png'),(4,'Couscous','http://localhost:5000/foods/couscous.jpg','Plat d\'origine nord-africaine, formé de semoule de blé avec des légumes et une sauce épicée, pouvant être servi avec de la viande de poulet, de mouton, d\'agneau ou de bœuf. ','http://localhost:5000/foods/tunisie.png'),(5,'Hot-dog','http://localhost:5000/foods/hotdog.jpg','Un hot-dog, hotdog ou hot dog1, est un type de sandwich composé d\'un pain allongé fourré d’une saucisse cuite. Il est accompagné de divers ingrédients et condiments très variés comme de la moutarde, du ketchup, de la relish, des oignons, et toutes sortes de sauces (mayonnaise, barbecue, chutney…).','http://localhost:5000/foods/usa.png'),(6,'Pâtes à la carbonara','http://localhost:5000/foods/carbo.jpg','Les pâtes à la carbonara sont une recette de pâtes d\'origine romaine et très populaire en Italie. Les bases de ce plat sont toujours les œufs, les lardons, le pecorino romano et du poivre noir fraîchement moulu.','http://localhost:5000/foods/italie.png'),(7,'Fish and chips\n','http://localhost:5000/foods/fish.jpg','Le fish and chips est un plat de restauration rapide, d’origine britannique, à emporter ou à consommer sur place, consistant en un poisson frit dans de la pâte, ou de la chapelure, et servi avec des frites.','http://localhost:5000/foods/england.png'),(8,'Boeuf bourguignon','http://localhost:5000/foods/boeuf.jpg','Le bœuf bourguignon est une recette de cuisine d\'estouffade de bœuf, traditionnelle de la cuisine bourguignonne, cuisinée au vin rouge de Bourgogne, avec une garniture de champignons, de petits oignons et de lardons.','http://localhost:5000/foods/france.png');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match` (
  `id_user` int(11) NOT NULL,
  `id_food` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_food`),
  KEY `fk_fooduser_1_idx` (`id_food`),
  CONSTRAINT `fk_fooduser_1` FOREIGN KEY (`id_food`) REFERENCES `food` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fooduser_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` VALUES (2,1),(6,1),(7,1),(9,1),(14,1),(2,2),(7,2),(14,2),(15,2),(16,2),(6,3),(15,3),(16,3),(9,4),(16,4),(6,5),(7,5),(16,5),(2,6),(6,6),(7,6),(9,6),(14,6),(6,7),(15,7),(16,7),(2,8),(9,8);
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nomatch`
--

DROP TABLE IF EXISTS `nomatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nomatch` (
  `id_user` int(11) NOT NULL,
  `id_food` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_food`),
  KEY `fk_nomatch_1_idx` (`id_food`),
  CONSTRAINT `fk_nomatch_1` FOREIGN KEY (`id_food`) REFERENCES `food` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_nomatch_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nomatch`
--

LOCK TABLES `nomatch` WRITE;
/*!40000 ALTER TABLE `nomatch` DISABLE KEYS */;
INSERT INTO `nomatch` VALUES (15,1),(16,1),(6,2),(9,2),(2,3),(6,3),(7,3),(9,3),(14,3),(2,4),(6,4),(7,4),(14,4),(15,4),(2,5),(9,5),(14,5),(15,5),(15,6),(16,6),(2,7),(7,7),(9,7),(14,7),(6,8),(7,8),(14,8),(15,8),(16,8);
/*!40000 ALTER TABLE `nomatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(45) DEFAULT NULL,
  `description` varchar(450) DEFAULT NULL,
  `image` varchar(450) DEFAULT NULL,
  `sexe` tinyint(4) DEFAULT NULL,
  `password` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'mathilde','Accro de sushi, recherche son partner in crime de la bouffe','http://localhost:5000/mathilde.jpg',1,'$2b$10$zxjcFSOaUqk1aezWEAPnYe1gneMjEf1hYN67ZbvGX5o5011U7IacO'),(6,'maxime33','Bordelais qui aime aller au restaurant, ensemble nous serons les Bonnie & Clyde de la food !','http://localhost:5000/maxime.jpg',0,'$2b$10$i9ZaSUbAcG7E94svCWVT1u.kk4DPZy9SXcI5dg8OO4ZSpZUNJ2f5S'),(7,'paulpb','Cuisinier dans l\'âme, j\'aime faire de bons plats pour mon entourage, à qui le tour ?','http://localhost:5000/paul.jpg',0,'$2b$10$5JrH.mHEtTkVcttzSzKeqOhV6sOW3BARowwJNLC8PIG4tMWXnmtmO'),(9,'alexandro','Aime la food locale et vegan !','http://localhost:5000/Alex.jpg',0,'$2b$10$eho4kjdXpPvmyp969MbwBOdelhk37DASlzqs/V7r9UqaGqe140fHi'),(14,'titibdx','hello, la cuisine asiatique est mon point faible, j\'adore ça, si toi aussi, mangeons ensemble !','http://localhost:5000/titouan.jpeg',0,'$2b$10$xj5k01yzdqNAPeWCK2qvreFAuFoyrT4vytI/QFw3Xcaz0iMPB6njK'),(15,'salome21','j\'adore voyager et découvrir les produits locaux','http://localhost:5000/salome.jpg',1,'$2b$10$w9BEjQjgrh.pZvcOq7fuZObulsvjPWKnwn16WvviCNvPQ4mvpQKfG'),(16,'emilielv','j\'adore la junk food!','http://localhost:5000/emilie.jpeg',1,'$2b$10$A7J1LSMga5irSCv4QD7QpO/LlFDiNHOaSSG9xRzV/JI90a1/jrtt.');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-24 12:47:06
