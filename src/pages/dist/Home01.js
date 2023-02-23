"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Header_1 = require("../components/header/Header/Header");
var Footer_1 = require("../components/footer/Footer");
var data_slider_1 = require("../assets/fake-data/data-slider");
var Slider_1 = require("../components/slider/Slider");
var data_live_auction_1 = require("../assets/fake-data/data-live-auction");
var LiveAuction_1 = require("../components/layouts/LiveAuction");
var TopSeller_1 = require("../components/layouts/TopSeller");
var data_top_seller_1 = require("../assets/fake-data/data-top-seller");
var TodayPicks_1 = require("../components/layouts/TodayPicks");
var data_today_pick_1 = require("../assets/fake-data/data-today-pick");
var PopularCollection_1 = require("../components/layouts/PopularCollection");
var data_popular_collection_1 = require("../assets/fake-data/data-popular-collection");
var Create_1 = require("../components/layouts/Create");
var Home01 = function () {
    return (react_1["default"].createElement("div", { className: 'home-1' },
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement(Slider_1["default"], { data: data_slider_1["default"] }),
        react_1["default"].createElement(LiveAuction_1["default"], { data: data_live_auction_1["default"] }),
        react_1["default"].createElement(TopSeller_1["default"], { data: data_top_seller_1["default"] }),
        react_1["default"].createElement(TodayPicks_1["default"], { data: data_today_pick_1["default"] }),
        react_1["default"].createElement(PopularCollection_1["default"], { data: data_popular_collection_1["default"] }),
        react_1["default"].createElement(Create_1["default"], null),
        react_1["default"].createElement(Footer_1["default"], null)));
};
exports["default"] = Home01;
