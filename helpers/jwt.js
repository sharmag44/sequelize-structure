"use strict";
const secretKey = require("config").get("auth");

exports.encode = (user) => {
    try {
        return jwt.sign({
            value: user.id
        }, secretKey.secret, { expiresIn: secretKey.time });
    }
    catch (error) {
        throw error
    }
}

exports.decode = (token) => {
    try {
        const decode = jwt.verify(token, secretKey.secret);
        return decode.value;
    } catch (error) {
        throw error
    }

}