"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Header_1 = require("../../components/header/Header/Header");
var Footer_1 = require("../../components/footer/Footer");
var index_module_scss_1 = require("./index.module.scss");
var FirstContent = function () {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: index_module_scss_1["default"].firstContent })));
};
var Home = function () {
    return (react_1["default"].createElement("div", { className: 'home-1' },
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement(FirstContent, null),
        react_1["default"].createElement(Footer_1["default"], null)));
};
exports["default"] = Home;
