"use strict";
const jwt = require("../helpers/jwt")
const moment = require('moment');

exports.validateToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"] || req.body.token || req.query.token;
        if (!token || token == null) throw "token required";
        const userId = jwt.decode(token);
        const user = await db.user.findByPk(userId, { include: [db.role] });
        if (user.status === 'inactive') {
            throw 'Your account is inactive.';
        }
        if (user.status === 'blocked') {
            throw 'Your account has  been blocked by admin.';
        }
        if (user.status === 'deleted') {
            throw 'Your account has been deleted by admin.';
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.send({ error })
    }
}

exports.validateTokenOptional = (req, res, next) => {
    var token =
        req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) return this.validateToken(req, res, next);
    req.user = null;
    next();
}