"use strict";
const crypto = require("crypto");

exports.generateOTP = (length = 6) => Math.floor(Math.random() * 9000) + Math.pow(10, length - 1);

exports.captchaCode = (length = 6) => {
    const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < length; i++) {
        captcha += char[(Math.floor(Math.random() * char.length))];
    }
    return captcha;

}
