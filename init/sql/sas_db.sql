
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;


-- ----------------------------
--  Table structure for `sas_menu`
-- ----------------------------
DROP TABLE IF EXISTS `sas_menu`;
CREATE TABLE `sas_menu` (
  `id` bigint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
  `name` varchar(10) NOT NULL COMMENT '菜单名称',
  `url` varchar(50) NOT NULL DEFAULT '' COMMENT '菜单URL',
  `method` varchar(6) NOT NULL DEFAULT '' COMMENT 'url 方法',
  `icon` varchar(20) NOT NULL DEFAULT '' COMMENT '图标',
  `pid` bigint(10) unsigned NOT NULL DEFAULT '0' COMMENT '父级菜单 ID， 为 0 表示顶级菜单',
  `menu_order` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '菜单顺序',
  `level` tinyint(2) NOT NULL COMMENT '菜单级别：1-一级菜单，2-二级菜单，3-三级菜单',
  `addable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可新增',
  `editable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可编辑',
  `deletable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可删除',
  `selectable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可查',
  `exportable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可导出',
  `auditable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可审核',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='菜单表';

-- ----------------------------
--  Records of `sas_menu`
-- ----------------------------
BEGIN;
INSERT INTO `sas_menu` VALUES ('1', '系统概况', '', 'GET', 'fa fa-briefcase', '0', '1', '1', '1', '1', '0', '1', '0', '0', '2017-12-19 16:42:39', '2017-12-27 14:13:48'), ('2', '云POS', '', 'GET', 'fa fa-table', '0', '2', '1', '0', '0', '0', '0', '0', '0', '2017-12-19 16:43:03', '2017-12-20 11:46:40'), ('3', '风控管理', '', 'GET', 'fa fa-cloud-upload', '0', '3', '1', '0', '0', '0', '0', '0', '0', '2017-12-19 16:43:46', '2017-12-25 09:21:08'), ('4', '系统管理', '', 'GET', 'fa fa-bullseye', '0', '4', '1', '0', '0', '0', '0', '0', '0', '2017-12-19 17:06:37', '2017-12-20 11:49:34'), ('5', '风控管理', '', 'GET', '', '0', '5', '1', '0', '0', '0', '0', '0', '0', '2017-12-19 17:10:52', '2017-12-19 17:10:52'), ('6', '开户申请', '/modules/user/user_list.html', 'GET', '', '8', '3', '3', '0', '0', '0', '0', '0', '0', '2017-12-19 17:12:21', '2017-12-20 14:01:01'), ('7', '菜单管理', '/modules/menu/menu_list.html', 'GET', '', '15', '2', '2', '1', '1', '1', '1', '0', '0', '2017-12-19 17:12:47', '2017-12-25 09:40:31'), ('9', '数据分析', '', 'GET', 'fa fa-table', '0', '6', '1', '0', '0', '0', '0', '0', '0', '2017-12-19 17:15:25', '2017-12-25 09:34:29'), ('10', '运营商数据统计', '', 'GET', '', '9', '1', '2', '0', '0', '0', '0', '0', '0', '2017-12-19 17:15:50', '2017-12-19 17:15:50'), ('11', '商户数据统计', '', 'GET', '', '9', '2', '2', '0', '0', '0', '0', '0', '0', '2017-12-19 17:16:12', '2017-12-19 17:16:12'), ('13', '一码付交易统计', '', 'GET', '', '10', '2', '3', '0', '0', '0', '0', '0', '0', '2017-12-19 17:16:59', '2017-12-19 17:16:59'), ('14', 'API', '/swagger-ui/index.html', 'GET', 'fa fa-tags', '15', '1', '2', '0', '0', '0', '0', '0', '0', '2017-12-20 10:14:17', '2017-12-26 17:56:29'), ('15', '系统管理', '', 'GET', 'fa fa-table', '0', '6', '1', '0', '0', '0', '0', '0', '0', '2017-12-25 09:35:22', '2017-12-25 09:35:22'), ('26', '用户管理', '/modules/user/user_list.html', 'GET', 'fa fa-user-circle-o', '15', '3', '2', '1', '1', '1', '1', '1', '0', '2017-12-26 17:13:11', '2017-12-27 10:21:39'), ('27', '角色管理', '/modules/role/role_list.html', 'GET', 'fa fa-book', '15', '4', '2', '1', '1', '1', '1', '1', '0', '2017-12-26 17:53:55', '2017-12-27 10:21:59'), ('28', 'test1', '', 'GET', '', '27', '5', '2', '1', '1', '1', '1', '0', '0', '2017-12-28 14:13:12', '2017-12-28 14:13:12');
COMMIT;

-- ----------------------------
--  Table structure for `sas_role`
-- ----------------------------
DROP TABLE IF EXISTS `sas_role`;
CREATE TABLE `sas_role` (
  `id` bigint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
  `name` varchar(15) NOT NULL COMMENT '角色名称',
  `inst_id` varchar(12) NOT NULL COMMENT '所属机构 ID，ID 为 0 表示公有角色',
  `remark` varchar(20) NOT NULL DEFAULT '' COMMENT '备注',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='角色表';

-- ----------------------------
--  Records of `sas_role`
-- ----------------------------
BEGIN;
INSERT INTO `sas_role` VALUES ('1', '系统管理员', '', '', '2017-12-19 14:31:03', '2017-12-27 14:16:50'), ('2', '角色管理员', '1', '', '2017-12-19 14:31:19', '2017-12-19 14:31:19'), ('3', '财务', '1', '', '2017-12-19 14:31:39', '2017-12-19 14:31:39'), ('4', '业务员', '1', '', '2017-12-19 14:31:48', '2017-12-19 14:31:48'), ('5', '收单员', '', 'ef222', '2017-12-27 11:41:19', '2017-12-28 14:44:31'), ('8', 'test', '000000000000', 'afe', '2017-12-28 14:55:29', '2017-12-28 14:55:29'), ('9', 'test2', '', '', '2017-12-28 17:29:17', '2017-12-28 17:29:17');
COMMIT;

-- ----------------------------
--  Table structure for `sas_role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `sas_role_menu`;
CREATE TABLE `sas_role_menu` (
  `id` bigint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
  `role_id` bigint(10) unsigned NOT NULL COMMENT '用户 ID',
  `menu_id` bigint(10) unsigned NOT NULL COMMENT '菜单 ID',
  `addable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可新增',
  `editable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可编辑',
  `deletable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可删除',
  `selectable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可查',
  `exportable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可导出',
  `auditable` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可审核',
  PRIMARY KEY (`id`),
  KEY `menu_role` (`menu_id`,`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='角色菜单关联表';

-- ----------------------------
--  Records of `sas_role_menu`
-- ----------------------------
BEGIN;
INSERT INTO `sas_role_menu` VALUES ('7', '2', '1', '1', '1', '1', '1', '0', '0'), ('8', '2', '2', '0', '0', '0', '0', '0', '0'), ('9', '2', '3', '0', '0', '0', '0', '0', '0'), ('10', '2', '7', '1', '1', '1', '1', '0', '0'), ('12', '2', '9', '0', '0', '0', '0', '0', '0'), ('13', '2', '14', '0', '0', '0', '0', '0', '0'), ('14', '2', '15', '1', '1', '1', '1', '0', '0'), ('15', '2', '26', '1', '1', '1', '1', '0', '0'), ('16', '2', '27', '1', '1', '1', '1', '1', '0'), ('40', '8', '15', '0', '0', '0', '0', '0', '0'), ('41', '8', '14', '0', '0', '0', '0', '0', '0'), ('42', '8', '7', '1', '0', '0', '1', '0', '0'), ('43', '8', '26', '1', '0', '0', '1', '0', '0'), ('44', '8', '27', '1', '1', '1', '1', '0', '0'), ('72', '9', '1', '0', '0', '0', '0', '0', '0'), ('73', '9', '2', '0', '0', '0', '0', '0', '0'), ('74', '9', '3', '0', '0', '0', '0', '0', '0'), ('75', '9', '15', '0', '0', '0', '0', '0', '0'), ('76', '9', '14', '0', '0', '0', '0', '0', '0'), ('77', '9', '7', '1', '0', '0', '0', '0', '0'), ('78', '9', '26', '0', '0', '0', '0', '0', '0'), ('79', '9', '27', '0', '0', '0', '0', '0', '0'), ('80', '9', '9', '0', '0', '0', '0', '0', '0'), ('85', '1', '1', '0', '0', '0', '0', '0', '0'), ('86', '1', '2', '0', '0', '0', '0', '0', '0'), ('87', '1', '15', '0', '0', '0', '0', '0', '0'), ('88', '1', '27', '1', '1', '1', '1', '0', '0');
COMMIT;

-- ----------------------------
--  Table structure for `sas_user`
-- ----------------------------
DROP TABLE IF EXISTS `sas_user`;
CREATE TABLE `sas_user` (
  `id` bigint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID,主键',
  `user_name` varchar(16) NOT NULL COMMENT '用户名',
  `telephone` varchar(16) NOT NULL COMMENT '手机号',
  `email` varchar(30) NOT NULL COMMENT '邮箱',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `belong_type` tinyint(2) NOT NULL COMMENT '用户所属组织类型 0：运营商 1：机构 2：商户 ',
  `belong_id` bigint(10) unsigned NOT NULL COMMENT '所属id',
  `name_cn` varchar(16) NOT NULL DEFAULT '' COMMENT '用户中文名',
  `status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '用户状态 0：正常 1：冻结',
  `nickname` varchar(10) NOT NULL DEFAULT '' COMMENT '昵称',
  `created_by` varchar(16) NOT NULL COMMENT '创建人',
  `last_modified_by` varchar(16) NOT NULL DEFAULT '' COMMENT '修改人',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `telephone` (`telephone`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='用户信息';

-- ----------------------------
--  Records of `sas_user`
-- ----------------------------
BEGIN;
INSERT INTO `sas_user` VALUES ('1', 'admin', '123456', 'ee@1.com', '$2a$10$e/xlEUPwuMCyDeVOknng8uCs9Bdzh1Af91GHCn.DwEVXLrEWtRMqK', '0', '1', '', '1', '', 'admin', '', '2017-12-19 15:26:56', '2018-03-09 14:45:45');
COMMIT;

-- ----------------------------
--  Table structure for `sas_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `sas_user_role`;
CREATE TABLE `sas_user_role` (
  `id` bigint(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键 ID',
  `user_id` bigint(10) unsigned NOT NULL COMMENT '用户 ID',
  `role_id` bigint(10) unsigned NOT NULL COMMENT '角色 ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT COMMENT='用户角色关联表';

-- ----------------------------
--  Records of `sas_user_role`
-- ----------------------------
BEGIN;
INSERT INTO `sas_user_role` VALUES ('1', '1', '1');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
