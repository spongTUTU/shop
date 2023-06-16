const express = require("express");
const router = express.Router();
const request = require('request');
const SQLConnect = require("../SQLConnect.js");
const url = require("url");
const config = require('../util/config');
const util = require('../util/util')

/**
 * 美食列表数据:列表数据
 */
router.get("/foods/list", (req, res) => {
    const sql = "select * from goods ";
    var arr = []
    SQLConnect(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: {
                    result: result
                }
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }

    })
})

/**
 * 美食列表数据详情
 * 详情是的图片，需要多张 待定
 */
router.get("/foods/list/detail", (req, res) => {
    var id = url.parse(req.url, true).query.id || 1;
    const sql = "select * from goods where id=?";
    var arr = [id]
    SQLConnect(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
})

/**
 * 8中类型：
 * 0-美容养颜   1-保养调养  2-补养   3-减肥   4-母婴   5-气节    6-常见食疗   7-维生素
 */
router.get("/foods/list/type", (req, res) => {
    var type = url.parse(req.url, true).query.type;
    const sql = "select * from goods where type=?";
    var arr = [type]
    SQLConnect(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }
    })
})

/**
 * 购物车查询
 */
router.get("/cart/list", (req, res) => {
    const sql = "select * from cart";
    SQLConnect(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: {
                    result: result
                }
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }

    })
})

/**
 * 购物车增加
 * name,pic,num,info,price
 */
router.get("/cart/add", (req, res) => {
    var name = url.parse(req.url, true).query.name;
    var pic = url.parse(req.url, true).query.pic;
    var num = url.parse(req.url, true).query.num;
    var info = url.parse(req.url, true).query.info;
    var price = url.parse(req.url, true).query.price;

    const sql = "insert into cart values (null,?,?,?,?,?)";
    var arr = [name, pic, num, info, price];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "添加失败"
            });
        }
    })
})

/**
 * 购物车删除
 */
router.get("/cart/delete", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "DELETE FROM cart WHERE id=?";
    var arr = [id];
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "删除失败"
            });
        }
    })
})

/**
 * 购物车修改数量
 * id,num
 */
router.get("/cart/update", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    var num = url.parse(req.url, true).query.num;
    const sql = "update cart set num=? WHERE id=?";
    var arr = [num, id]
    SQLConnect(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "修改失败"
            });
        }
    })
})


/**
 * 购买接口
 * post:user, id
 */
router.post("/buy", (req, res) => {
    const user = req.body.user;
    const id = req.body.id;
    if (user && id) {
        res.send({
            status: 200,
            msg: '恭喜您,购买成功'
        })
    } else {
        res.status(500).send({
            msg: "购买失败"
        });
    }
})


/**
 *  兑换令牌：openId
 */
router.get('/getSession', (req, res) => {
    let code = req.query.code;
    if (!code) {
        res.json(util.handleFail('code不能为空', 10001));
    } else {
        let sessionUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`
        request(sessionUrl, (err, response, body) => {
            let result = util.handleResponse(err, response, body);
            res.json(result);
        })
    }
})

/**
 *  实现登录
 */

router.get("/login", (req, res) => {
    let userInfo = JSON.parse(req.query.userInfo);
    if (!userInfo) {
        res.json(util.handleFail('用户信息不能为空'), 10002);
    } else {
        /**
         * 存储数据到数据库
         */
        res.json({
            code: 0,
            data: {
                userId: '10000001'
            },
            message: "登录成功"
        })
    }
})

/**
 * 用户推荐数据接口:随机
 * 参数:用户user
 */
router.get("/recommand",(req,res) =>{
    var user = url.parse(req.url, true).query.user;
    var  sql = "SELECT * FROM goods ORDER BY RAND() LIMIT 4"
    SQLConnect(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                user:user,
                data: {
                    result: result
                }
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            });
        }

    })
})


module.exports = router;