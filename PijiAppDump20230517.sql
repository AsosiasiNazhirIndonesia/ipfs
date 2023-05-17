CREATE DATABASE  IF NOT EXISTS `piji` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `piji`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: piji
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `referrals`
--

DROP TABLE IF EXISTS `referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referrals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId_fk_idx` (`userId`),
  CONSTRAINT `userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referrals`
--

LOCK TABLES `referrals` WRITE;
/*!40000 ALTER TABLE `referrals` DISABLE KEYS */;
INSERT INTO `referrals` VALUES (1,10010,'rika@gmail.com','2023-05-04 06:29:28','2023-05-04 06:29:28'),(2,10010,'rika@gmail.com','2023-05-14 09:26:20','2023-05-14 09:26:20'),(3,10010,'rika@gmail.com','2023-05-14 09:26:22','2023-05-14 09:26:22'),(4,10010,'rika@gmail.com','2023-05-14 09:26:24','2023-05-14 09:26:24'),(5,10010,'rika@gmail.com','2023-05-14 09:27:00','2023-05-14 09:27:00');
/*!40000 ALTER TABLE `referrals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20221027161001-create-user.js'),('20221027175809-create-voucher.js'),('20221027183022-create-trx-redeem-voucher.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trxredeemvouchers`
--

DROP TABLE IF EXISTS `trxredeemvouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trxredeemvouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `voucherId` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `transactionHash` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `trxredeemvouchers_ibfk_1_idx` (`userId`),
  KEY `fk2_idx` (`voucherId`),
  CONSTRAINT `fk1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `fk2` FOREIGN KEY (`voucherId`) REFERENCES `vouchers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trxredeemvouchers`
--

LOCK TABLES `trxredeemvouchers` WRITE;
/*!40000 ALTER TABLE `trxredeemvouchers` DISABLE KEYS */;
/*!40000 ALTER TABLE `trxredeemvouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `blockchain_public` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `blockchain_private` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `score1` int DEFAULT '0',
  `score2` int DEFAULT '0',
  `score3` int DEFAULT '0',
  `score4` int DEFAULT '0',
  `score5` int DEFAULT '0',
  `score6` int DEFAULT '0',
  `score7` int DEFAULT '0',
  `score8` int DEFAULT '0',
  `score9` int DEFAULT '0',
  `score10` int DEFAULT '0',
  `forgot_password_code` int DEFAULT '0',
  `done_referring` tinyint DEFAULT '0',
  `done_verified` tinyint DEFAULT '0',
  `my_referral_code` int DEFAULT NULL,
  `email_verif_code` int DEFAULT '0',
  `referred_by` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21475 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'andri','piji2@gmail.com','no_image.jpg','$2a$08$XEbQc916fDeNxvTbBEIpJuB2Ltw7/7J5m4hb0SJ8cst5w54k0HTee','0x0e50ABC7bE55295C653815b4B7f054F2a7FB38bf','0xb621c6d84ac9634c5e4aac3b5e6088f4478297560d370cc00cce0ec5fe398bdd',NULL,'2022-12-03 03:05:46','2023-04-04 12:56:42',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(3,'Dimas Tomaru','piji3@gmail.com','no_image.jpg','$2a$08$hMyAresBFNHassaw/J5cSuSgRjBblQaHZo.MU86Ndcq6davZk9LcW','0xf69955094bd2f0BC17293AC9Be0053da6da4392E','0xdaf8edfd708ebfbb0083a2c5b17acbb8d53f30c8ee3ddfa2dc324a5d2dee1def',NULL,'2022-12-12 04:48:45','2022-12-12 18:10:29',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(4,'Diki Sarto','piji4@gmail.com','no_image.jpg','$2a$08$A88mnWiYgXXloUAb0Gkz3.0CI.i5QIPRHohfMT7Ch3/P9L1T69fI.','0x4698298BF116867B4088C345bD4Fd5932D7C4c36','0xdeaadc55b0a44529fb3c25df0d23931cdd8f78404f9b01aee832d313de9ab150',NULL,'2022-12-12 18:19:23','2022-12-12 18:45:43',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(5,'Joko Andika','piji5@gmail.com','no_image.jpg','$2a$08$VpH2lamui0MOa.XBayzWXOHZgON0CLxLdDgHvDcGBhz1YTRAzTNzi','0x1fDEDF448CF4E1F5640013F55b1C3cd5fD73F101','0xb9d8a765395a13008ba28c2c23a9d2f0b52a9816f4c8d7c8ee46759c33ed052f',NULL,'2022-12-13 02:31:36','2022-12-14 01:46:20',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(6,'Tri Sudarso','piji6@gmail.com','no_image.jpg','$2a$08$TzKTOdjhJq4zbDh8rDbUwubisR.JUCr4xOC76OnI.k3Qakp4zCMVy','0xc65377a9f8eC343A7CFb72E2c01FAab6bB87ef0c','0x7683697592e4710b20196be98761e900a09469aba266c329a9d7f1769da6028b',NULL,'2022-12-13 02:31:37','2022-12-13 02:31:37',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(7,'Sarto Supeno','piji7@gmail.com','no_image.jpg','$2a$08$9Lk4.6IXO6INu0Y22WrjnenI1/CzxMlShuXMcE9JczJt.7bRplsEq','0xFc6EC16E4345F0Aa360bac2a4FFccFaBe40C2E4C','0x5a08a80043d8743dae530d36babf556924330d5c94a44e6bc29653ccf8b56ac0',NULL,'2022-12-13 05:17:15','2022-12-13 05:17:15',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(8,'Bagus Candra','piji8@gmail.com','no_image.jpg','$2a$08$4wJbl6zPAooGB0VNJGXD0Odc/eHScLdgaT4UVSZm9YA1/SWiZr6iK','0xCE89e0c1f4c0d6792D22371f5C3553BFa5aa8481','0x7150976a4a2892ac879237e786b60c22831b8264966f9f96efa1894c27cc28aa',NULL,'2022-12-13 09:08:13','2022-12-14 04:40:17',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(9,'Toni Agung','piji9@gmail.com','no_image.jpg','$2a$08$OL3HBnzjL/RnEG1SHzQhOu.6LRHLqBvs691Ur6pfaBCQDO4F5I52y','0xe95c5943cC19516eC0e3038ED5f9F08f3F6876C7','0x13c6324742782075796b286f543335337e3515e9f685796543f66145414ba32d',NULL,'2022-12-13 09:19:49','2022-12-13 09:19:49',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10,'Asep Sumantri','piji10@gmail.com','no_image.jpg','$2a$08$1zgEzXwtOa1wmZkGkiOhEepegAk1D8iFQjHjQ7RCk/6K3l56UxmNS','0x530922c78e04DaE81e6ABB96B8d5a7b25e54F53C','0xb0279945fbc72b74e18e4a3caa142a244ec7a3d31d7201f6b24ab7965fa51a9b',NULL,'2022-12-13 09:52:29','2022-12-14 07:06:44',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(11,'Ridwal Aceng','piji11@gmail.com','no_image.jpg','$2a$08$6DeZBeXO8qxhO3SCzu6dpOZ1xUqmeS7t0Euqb2ZWwVxXCfnh4OPkC','0xd8875350432bc2e616AbFEcEE007A369D048B5c5','0x39e9b67f56f96e26fdbcae1d5a18b4520c9dbd48d30433f9042679cca338ab25',NULL,'2022-12-14 04:01:19','2022-12-14 04:01:19',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(12,'Damaris Putra','piji12@gmail.com','no_image.jpg','$2a$08$LGDMNiWxDLK/O0fRDGx5jOlNWYJPmnTLN1YLTOLaddnIfqtRmkFl.','0x108B4969c9cC20aEE41E85570b3f48afDAa62D70','0x3fb8fee20235d29198ff03ec7d17461c4bf371bf4aea692ecb927f11bb5e846d',NULL,'2022-12-14 06:05:24','2022-12-14 06:05:24',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(13,'Krisna Jaya Purnomo','piji13@gmail.com','no_image.jpg','$2a$08$DGs.2mInSAs.jRzQ6E1vX.lCmOYEQC7uINGERrLpsnqjZ464hnLMa','0xa27abfD00d069011707c570f005e2e78462AD08a','0x62382cae4e3523c69f43dd573016aaa2eb39f2d018b93b19e04d9d6cd718fc9d',NULL,'2022-12-14 12:51:52','2022-12-14 12:52:25',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10001,'Andri','woydri@gmail.com',NULL,'P@ssw0rd',NULL,NULL,NULL,'2023-03-28 01:00:03','2023-05-16 06:58:21',0,0,0,0,0,0,0,0,0,0,967420,0,1,100000,714727,NULL),(10002,'Andri 2','woydri2@gmail.com',NULL,'P@ssw0rd',NULL,NULL,NULL,'2023-03-28 01:06:02','2023-03-28 01:06:02',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10003,'Andri 2','woy1dri@gmail.com',NULL,'P@ssw0rd',NULL,NULL,NULL,'2023-04-04 09:21:01','2023-04-04 09:21:01',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10004,'Andri 2','woy21dri3@gmail.com',NULL,'P@ssw0rd',NULL,NULL,NULL,'2023-04-11 05:04:01','2023-04-11 05:04:01',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10005,'Andri 2','woy221dri4@gmail.com\r ',NULL,'P@ssw0rd',NULL,NULL,NULL,'2023-04-11 05:04:11','2023-04-11 05:04:11',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10006,'Andri 2','woy221dri5@gmail.com\r ',NULL,'P@ssw0rd',NULL,NULL,NULL,'2023-04-11 05:04:23','2023-04-11 05:04:23',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10007,'Andri 2','woy221dri6@gmail.com',NULL,'P@ssw0rd',NULL,NULL,NULL,'2023-04-11 05:04:25','2023-04-11 05:04:25',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10008,'Andri 4','woy3231dri@gmail.com',NULL,'P@ssw0rd1',NULL,NULL,NULL,'2023-04-27 10:14:50','2023-04-27 10:14:50',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10009,'Andri Handoko','testingtest@gmail.com',NULL,'P@ssw0rd1',NULL,NULL,NULL,'2023-05-01 06:31:10','2023-05-01 12:51:45',100,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10010,'Alvin Pinewalker','alvin.pinewalker@gmail.com',NULL,'P@ssw0rdP@ssw0rd','','',NULL,'2023-05-01 06:41:12','2023-05-04 01:41:02',100,200,300,0,0,0,0,0,0,0,0,0,1,100000,0,NULL),(10011,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-05-02 11:03:39','2023-05-02 11:03:39',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10012,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-05-02 11:07:38','2023-05-02 11:07:38',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10013,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2023-05-02 11:07:38','2023-05-02 11:07:38',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10014,'naruto','naruto@yopmail.com',NULL,'password',NULL,NULL,NULL,'2023-05-02 11:08:14','2023-05-02 11:08:14',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10015,'Naruto','naruto1@yopmail.com',NULL,'password',NULL,NULL,NULL,'2023-05-02 13:19:15','2023-05-02 13:19:15',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(10016,'mutia','mutia@gmail.com',NULL,'P@ssw0rd1',NULL,NULL,NULL,'2023-05-03 12:35:57','2023-05-03 12:35:57',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(21457,'admin','admin@piji.app','no_image.jpg','$2a$08$.YcMQoTscVRawfHe0sc5weBbmcdlvSGSYxNkWxCCC3nnmazwp8Fba','0x415Cac1A65B6AA73D606752a6aa7e9F7a3bfb4E7','0xd135cddfbada9968a8581465d42f5182cc633b713c0711abb4eb20e8fdd85699',NULL,'2022-11-18 16:46:49','2023-05-10 04:05:50',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(21458,'Gamer One','gamerone@gmail.com',NULL,'P@ssw0rd1',NULL,NULL,NULL,'2023-05-04 01:42:20','2023-05-04 01:42:20',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(21459,'Gamer Two','gamertwo@gmail.com',NULL,'P@ssw0rd1',NULL,NULL,NULL,'2023-05-04 02:22:29','2023-05-04 02:22:29',0,0,0,0,0,0,0,0,0,0,0,0,0,100000,0,NULL),(21460,'Gamer Three','gamerthree@gmail.com',NULL,'P@ssw0rd1',NULL,NULL,NULL,'2023-05-04 02:27:36','2023-05-04 02:27:36',0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,0,NULL),(21461,'Gamer Four','gamerfour@gmail.com',NULL,'P@ssw0rd1',NULL,NULL,NULL,'2023-05-04 02:30:17','2023-05-04 02:30:17',0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,0,NULL),(21462,'Gamer Five','gamerfive@gmail.com',NULL,'P@ssw0rd1',NULL,NULL,NULL,'2023-05-04 02:58:08','2023-05-04 02:58:08',0,0,0,0,0,0,0,0,0,0,0,0,0,NULL,0,NULL),(21463,'Gamer Six','gamersix@gmail.com',NULL,'P@ssw0rd1',NULL,NULL,NULL,'2023-05-04 03:00:23','2023-05-04 03:00:23',0,0,0,0,0,0,0,0,0,0,0,0,0,298534,0,102981),(21464,'Mamamia','Mutia.rachmi01@gmail.com',NULL,'12345',NULL,NULL,NULL,'2023-05-05 09:05:53','2023-05-05 09:05:53',0,0,0,0,0,0,0,0,0,0,0,0,0,225299,0,NULL),(21465,'Andrew','Andrew.tmy@gmail.com',NULL,'andrew',NULL,NULL,NULL,'2023-05-05 11:25:06','2023-05-05 11:25:06',0,0,0,0,0,0,0,0,0,0,0,0,0,921585,0,NULL),(21466,'ilham','ilham@yopmail.com',NULL,'password',NULL,NULL,NULL,'2023-05-07 13:56:17','2023-05-07 13:56:17',0,0,0,0,0,0,0,0,0,0,0,0,0,338952,0,NULL),(21468,'soul','soultanmuh@gmail.com',NULL,'password',NULL,NULL,NULL,'2023-05-09 10:38:28','2023-05-09 10:38:28',0,0,0,0,0,0,0,0,0,0,0,0,0,357476,0,NULL),(21469,'ilham2','ilham2@yopmail.com',NULL,'password',NULL,NULL,NULL,'2023-05-09 13:06:44','2023-05-09 13:06:44',0,0,0,0,0,0,0,0,0,0,0,0,0,610967,0,NULL),(21470,'Gamer seven','gamerseven@gmail.com',NULL,'P@ssw0rd1','0x7131573F83C5Bf00327C394cb7a9A3CcB97154FE','0x67a32553e974596f21626107d6600f11342e867bb2edd8f3a13a10907097461a',NULL,'2023-05-10 04:42:57','2023-05-10 04:42:57',0,0,0,0,0,0,0,0,0,0,0,0,0,707134,0,102981),(21471,'Gamer seventh','gamersevend@gmail.com',NULL,'P@ssw0rd1',NULL,'0x8966f22724b95df1d1946c49538fb16808b0148b9b438218cb00e03c1da41a11',NULL,'2023-05-14 13:29:30','2023-05-14 13:29:30',0,0,0,0,0,0,0,0,0,0,0,0,0,93179,0,102981),(21472,'Gamer seventh','gamersevednd@gmail.com',NULL,'P@ssw0rd1','0xbfD302fC722C21Fa51543E551AFBbf5c1739EbF5','0x4f07e2ba06ab8a6e2bc948b426a94d435c1e1dd0b5094284ac775fbdde0f7a62',NULL,'2023-05-14 13:30:42','2023-05-14 13:30:42',0,0,0,0,0,0,0,0,0,0,0,0,0,609957,0,102981),(21473,'Eky','Mamamia@gmail.com',NULL,'E12345','0x710e8ecA0712b88Eec508658FE9fca147ECA3D13','0xaa77f059d4ae6bbc1368c9ad24646f66a346615d8e7658b106ab60ab8785c944',NULL,'2023-05-14 23:59:44','2023-05-14 23:59:44',0,0,0,0,0,0,0,0,0,0,0,0,0,309853,0,NULL),(21474,'Cahaya','csandhyka@gmail.com',NULL,'Cahayapiji','0x7bA1eb7De1560B003d052a8C32900106e980c969','0x416ea36932ba82435ae2b77335efe1a8f90a5f1be1eebca58c1928170488a7c6',NULL,'2023-05-15 10:56:31','2023-05-15 10:56:31',0,0,0,0,0,0,0,0,0,0,0,0,0,835766,0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` int DEFAULT '0',
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (1,'Pulsa Rp. 25.000',2,'1670861660396-home_red.png','-','2022-12-12 16:14:20','2022-12-12 16:14:20'),(2,'Pulsa Rp. 10.000',1,'1670861698157-home_red.png','-','2022-12-12 16:14:58','2022-12-12 16:14:58'),(3,'Pulsa Rp. 10.000',1,'1670861712652-home_red.png','-','2022-12-12 16:15:12','2022-12-12 16:15:12'),(4,'Pulsa Rp. 125.000',125,'no_image.jpg','-','2023-03-03 13:37:30','2023-03-03 13:37:30'),(5,'Pulsa Rp. 125.000',125,'1679962928079-ani-logo-white.png','-','2023-03-28 00:22:08','2023-03-28 00:22:08'),(6,'Pulsa Rp. 125.000',125,'1679963087517-ani-logo-white.png','-','2023-03-28 00:24:47','2023-03-28 00:24:47'),(7,'Pulsa Rp. 25.000',25,'no_image.jpg','-','2023-03-28 00:47:36','2023-03-28 00:47:36'),(8,'Pulsa Rp. 25.000',25,'no_image.jpg','-','2023-03-28 00:56:37','2023-03-28 00:56:37');
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'piji'
--

--
-- Dumping routines for database 'piji'
--
/*!50003 DROP PROCEDURE IF EXISTS `history_activity` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `history_activity`(IN in_user_id INT)
BEGIN
    DROP TEMPORARY TABLE IF EXISTS sementara;
    CREATE TEMPORARY TABLE sementara
    ( `subject` VARCHAR ( 225 ), `status` VARCHAR ( 225 ), `reportId` INT, `voucherId` INT, `tpix` INT, `userId` INT, `date` datetime NOT NULL );
     
    BEGIN
        DECLARE done BOOLEAN DEFAULT false;
        DECLARE `status`,`subject`,`iis_date` VARCHAR ( 100 ) DEFAULT "-";
				DECLARE	`valueId`,`userId` INTEGER;
        DECLARE get_report CURSOR FOR 
				SELECT ba.id,ba.iss_name,ba.iss_date,ba.userId FROM	trxreportodps ba;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
          
        OPEN get_report;
 
            report_loop: LOOP
                 FETCH get_report INTO `valueId`,`subject`,`iis_date`,`userId`;
                 IF done THEN
                        LEAVE report_loop;
                 END IF;     
                 -- cursor loop statements
                     
                 INSERT INTO sementara VALUES( `subject`, 'Upload', `valueId`, NULL, 1, `userId`, `iis_date` );
            END LOOP;
          
        CLOSE get_report;
    END;
    BEGIN
        DECLARE done BOOLEAN DEFAULT false;
        DECLARE	`vo_subject`,`vo_date` VARCHAR ( 100 ) DEFAULT "-";
				DECLARE	`vo_valueId`,`vo_userId`,`vo_price` INTEGER;
        DECLARE get_voucher CURSOR FOR SELECT	vo.id,v.name,v.price,vo.date,vo.userId FROM trxredeemvouchers vo	LEFT JOIN vouchers v ON v.id = vo.voucherId;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
          
        OPEN get_voucher;
 
            voucher_loop: LOOP
                 FETCH get_voucher INTO `vo_valueId`,`vo_subject`,`vo_price`,`vo_date`,`vo_userId`;
                 IF done THEN
                        LEAVE voucher_loop;
                 END IF;     
                 -- cursor loop statements
              
                 INSERT INTO sementara VALUES	( `vo_subject`, 'Redeem', null, `vo_valueId`, CONCAT('-',vo_price), `vo_userId`, `vo_date` );
            END LOOP;
          
        CLOSE get_voucher;
    END;
     
    SELECT
		* 
	FROM
		sementara 
	WHERE
		( userId = in_user_id ) 
	ORDER BY
		`date` ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-17 12:44:27
