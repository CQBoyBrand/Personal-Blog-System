/*
 Navicat Premium Dump SQL

 Source Server         : blog-xxx.xxx.xxx.xx
 Source Server Type    : MySQL
 Source Server Version : xx
 Source Host           : xxx.xxx.xxx.xx:xxxx
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : xx
 File Encoding         : xx

 Date: 28/06/2025 15:57:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ad
-- ----------------------------
DROP TABLE IF EXISTS `ad`;
CREATE TABLE `ad` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `adName` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '广告名字',
  `adUrl` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '广告链接',
  `adImage` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '广告图片',
  `adDesc` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '广告描述',
  `adPosition` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '广告位置',
  `status` int NOT NULL DEFAULT '0' COMMENT '广告状态,0:未启用,1:启用',
  `cdate` bigint NOT NULL DEFAULT '1751038992677' COMMENT '创建时间',
  `updateTime` bigint NOT NULL DEFAULT '1751038992677' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` bigint NOT NULL COMMENT '文章id',
  `artTitle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题',
  `abstract` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章摘要',
  `category` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章分类',
  `tag` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标签',
  `thumbnail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '文章缩略图',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章内容',
  `cdate` bigint NOT NULL COMMENT '文章发布时间',
  `pv` int NOT NULL DEFAULT '0' COMMENT '文章浏览量',
  `discuss` int NOT NULL DEFAULT '0' COMMENT '文章留言数',
  `status` int NOT NULL DEFAULT '0' COMMENT '文章状态：1-公开；0-未公开',
  `editdate` bigint NOT NULL COMMENT '文章修改时间',
  `artDiscuss` int NOT NULL DEFAULT '1' COMMENT '文章是否允许评论：1-允许；0-不允许',
  `artType` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章所属板块：code or life',
  `authorId` int NOT NULL COMMENT '作者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `categorydesc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类描述',
  `cdate` bigint NOT NULL DEFAULT '1751038992676' COMMENT '创建时间',
  `status` int NOT NULL DEFAULT '0' COMMENT '分类状态, 1-可用，0-不可用',
  `categorytype` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类所属板块：code or life',
  `authorId` int NOT NULL COMMENT '作者',
  `categoryname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `artId` bigint NOT NULL COMMENT '文章id',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论内容',
  `from_uname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论者昵称',
  `from_uemail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论者邮箱',
  `from_uavatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论者头像',
  `to_uname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '被回复者昵称',
  `to_uavatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '被回复者头像',
  `to_uemail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '被回复者邮箱',
  `cdate` bigint NOT NULL COMMENT '评论回复时间',
  `from_uweb` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '评论者网址',
  `to_uweb` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '被回复者网址',
  `oldContent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '被回复的内容',
  `oldCdate` bigint DEFAULT NULL COMMENT '被回复的内容的回复时间',
  `artURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论的文章链接',
  `oldId` bigint DEFAULT NULL COMMENT '被回复内容的id',
  `isChecked` int NOT NULL DEFAULT '0' COMMENT '评论是否审核过 1-通过；0-不通过',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `discussStatus` int NOT NULL DEFAULT '1' COMMENT '网站是否开启留言： 1-开启；0-关闭',
  `icp` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'ICP备案号',
  `psr` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '公安备案号：The public security for the record',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for ip
-- ----------------------------
DROP TABLE IF EXISTS `ip`;
CREATE TABLE `ip` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ip` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ip',
  `ipNum` bigint NOT NULL COMMENT '该ip访问的次数',
  `cdate` bigint NOT NULL DEFAULT '1751038992676' COMMENT '创建时间',
  `updateTime` bigint NOT NULL DEFAULT '1751038992676' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1851 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for link
-- ----------------------------
DROP TABLE IF EXISTS `link`;
CREATE TABLE `link` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `siteName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '网站名名',
  `siteUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '网站地址',
  `status` int DEFAULT '0' COMMENT '链接状态, 1-可用，0-不可用',
  `cdate` bigint NOT NULL DEFAULT '1751038992675' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pv
-- ----------------------------
DROP TABLE IF EXISTS `pv`;
CREATE TABLE `pv` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `pvNum` bigint NOT NULL COMMENT '访问的次数',
  `cdate` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '创建日期',
  `updateTime` bigint NOT NULL DEFAULT '1751038992677' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for statistic
-- ----------------------------
DROP TABLE IF EXISTS `statistic`;
CREATE TABLE `statistic` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ip` bigint NOT NULL DEFAULT '0' COMMENT '累计访问ip数',
  `currentIp` bigint NOT NULL DEFAULT '0' COMMENT '当天访问ip数',
  `pv` bigint NOT NULL DEFAULT '0' COMMENT '累计pv数',
  `currentPv` bigint NOT NULL DEFAULT '0' COMMENT '当天pv数',
  `uv` bigint NOT NULL DEFAULT '0' COMMENT '累计uv数',
  `currentUv` bigint NOT NULL DEFAULT '0' COMMENT '当天uv数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `tagname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标签名称',
  `tagdesc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标签描述',
  `cdate` bigint NOT NULL DEFAULT '1751038992675' COMMENT '创建时间',
  `status` int DEFAULT '0' COMMENT '标签状态, 1-可用，0-不可用',
  `authorId` int NOT NULL COMMENT '作者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户 id',
  `username` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户密码',
  `nickname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '用户昵称',
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '用户头像',
  `signature` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '用户签名',
  `cdate` bigint NOT NULL DEFAULT '1751038992580' COMMENT '用户创建时间',
  `permissions` int NOT NULL DEFAULT '0' COMMENT '用户权限,0是有权限，1是无权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'test', 'd42ea2921cc0ec2d02ab6951ea1834ed', 'testUser', 'https://s.gravatar.com/avatar/d8065bea49aa2877ce13686772727711?s=80', 'Hello World', 1582595976253, 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
