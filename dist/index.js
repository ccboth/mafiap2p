/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Peer.ts":
/*!*********************!*\
  !*** ./src/Peer.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Peer = /** @class */ (function () {\r\n    function Peer(iceServers) {\r\n        var _this = this;\r\n        this.cecandidator = function (resolve, reject) {\r\n            _this._peerConnection.onicecandidate = function (event) {\r\n                if (!event.candidate) {\r\n                    resolve(_this._peerConnection.localDescription);\r\n                }\r\n                ;\r\n            };\r\n        };\r\n        this._peerConnection = new RTCPeerConnection({ iceServers: iceServers });\r\n        this._peerConnection.ondatachannel = function (event) {\r\n            _this._channel = event.channel;\r\n            _this._channel.onmessage = function (event) {\r\n                console.log(\"MESSAGE: \" + event.data);\r\n            };\r\n        };\r\n        this._peerConnection.oniceconnectionstatechange = function (ice) {\r\n            if (_this._peerConnection.iceConnectionState == \"failed\") {\r\n                throw \"Ice connection failed. See devtools\";\r\n            }\r\n            else if (_this._peerConnection.iceConnectionState == \"connected\")\r\n                console.log(\"ice connect\");\r\n        };\r\n    }\r\n    Peer.prototype.sendMessage = function (message) {\r\n        this._channel.send(message);\r\n    };\r\n    Object.defineProperty(Peer.prototype, \"onMessage\", {\r\n        set: function (v) {\r\n            this._channel.onmessage = v;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Peer.prototype, \"localDescription\", {\r\n        get: function () {\r\n            return this._localDescription;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    return Peer;\r\n}());\r\nexports[\"default\"] = Peer;\r\n\n\n//# sourceURL=webpack://mafiap2p/./src/Peer.ts?");

/***/ }),

/***/ "./src/host.ts":
/*!*********************!*\
  !*** ./src/host.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Peer_1 = __webpack_require__(/*! ./Peer */ \"./src/Peer.ts\");\r\nvar Host = /** @class */ (function (_super) {\r\n    __extends(Host, _super);\r\n    function Host() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    Host.prototype.createOffer = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var promiseLocalDescription, offer;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        this._channel = this._peerConnection.createDataChannel(\"dasasg\");\r\n                        this._channel.onmessage = function (ev) { return console.log(ev.data); };\r\n                        promiseLocalDescription = new Promise(this.cecandidator);\r\n                        return [4 /*yield*/, this._peerConnection.createOffer()];\r\n                    case 1:\r\n                        offer = _a.sent();\r\n                        return [4 /*yield*/, this._peerConnection.setLocalDescription(offer)];\r\n                    case 2:\r\n                        _a.sent();\r\n                        return [4 /*yield*/, promiseLocalDescription];\r\n                    case 3: return [2 /*return*/, (_a.sent())];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Create room.\r\n     */\r\n    Host.prototype.createRoom = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var _a;\r\n            return __generator(this, function (_b) {\r\n                switch (_b.label) {\r\n                    case 0:\r\n                        _a = this;\r\n                        return [4 /*yield*/, this.createOffer()];\r\n                    case 1:\r\n                        _a._localDescription = _b.sent();\r\n                        return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    Host.prototype.acceptPeer = function (remoteDescription) {\r\n        return this._peerConnection.setRemoteDescription(remoteDescription);\r\n    };\r\n    return Host;\r\n}(Peer_1.default));\r\nexports[\"default\"] = Host;\r\n\n\n//# sourceURL=webpack://mafiap2p/./src/host.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar host_1 = __webpack_require__(/*! ./host */ \"./src/host.ts\");\r\nvar sub_1 = __webpack_require__(/*! ./sub */ \"./src/sub.ts\");\r\n;\r\nvar iceServers = [\r\n    {\r\n        urls: \"stun:stun.l.google.com:19302\",\r\n    },\r\n    {\r\n        urls: 'turn:numb.viagenie.ca',\r\n        credential: 'muazkh',\r\n        username: 'webrtc@live.com'\r\n    },\r\n];\r\nvar peer;\r\n/**\r\n * @description Выполняет настройку хоста\r\n */\r\nfunction host() {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var host;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    host = new host_1.default(iceServers);\r\n                    return [4 /*yield*/, host.createRoom()];\r\n                case 1:\r\n                    _a.sent();\r\n                    console.log(JSON.stringify(host.localDescription));\r\n                    peer = host;\r\n                    document.getElementById(\"newPeer\").onclick = function () {\r\n                        var aceptedSDP = prompt(\"Enter accepted sdp\");\r\n                        host.acceptPeer(JSON.parse(aceptedSDP));\r\n                    };\r\n                    return [2 /*return*/];\r\n            }\r\n        });\r\n    });\r\n}\r\n/**\r\n * @description Выполняет настройку пира\r\n */\r\nfunction sub() {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var remoteDescr, sub;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    remoteDescr = prompt(\"Enter offer(sdp):\");\r\n                    sub = new sub_1.default(iceServers);\r\n                    return [4 /*yield*/, sub.connect(JSON.parse(remoteDescr))];\r\n                case 1:\r\n                    _a.sent();\r\n                    console.log(JSON.stringify(sub.localDescription));\r\n                    peer = sub;\r\n                    return [2 /*return*/];\r\n            }\r\n        });\r\n    });\r\n}\r\nfunction sendMesssage() {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var text;\r\n        return __generator(this, function (_a) {\r\n            text = prompt(\"Enter you message:\", \"Hello!!\");\r\n            peer.sendMessage(text);\r\n            return [2 /*return*/];\r\n        });\r\n    });\r\n}\r\nwindow.onload = main;\r\nfunction main() {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var isHost;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0:\r\n                    document.getElementById(\"sendMessage\").onclick = sendMesssage;\r\n                    isHost = confirm(\"You host?\");\r\n                    if (!isHost) return [3 /*break*/, 2];\r\n                    return [4 /*yield*/, host()];\r\n                case 1:\r\n                    _a.sent();\r\n                    return [3 /*break*/, 4];\r\n                case 2: return [4 /*yield*/, sub()];\r\n                case 3:\r\n                    _a.sent();\r\n                    _a.label = 4;\r\n                case 4: return [2 /*return*/];\r\n            }\r\n        });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://mafiap2p/./src/index.ts?");

/***/ }),

/***/ "./src/sub.ts":
/*!********************!*\
  !*** ./src/sub.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Peer_1 = __webpack_require__(/*! ./Peer */ \"./src/Peer.ts\");\r\nvar Sub = /** @class */ (function (_super) {\r\n    __extends(Sub, _super);\r\n    function Sub() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    Sub.prototype.connect = function (remoteDescription) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var _a;\r\n            return __generator(this, function (_b) {\r\n                switch (_b.label) {\r\n                    case 0:\r\n                        console.log(123);\r\n                        return [4 /*yield*/, this._peerConnection.setRemoteDescription(remoteDescription)];\r\n                    case 1:\r\n                        _b.sent();\r\n                        console.log(321);\r\n                        _a = this;\r\n                        return [4 /*yield*/, this.createAnswer()];\r\n                    case 2:\r\n                        _a._localDescription = _b.sent();\r\n                        console.log(1234);\r\n                        return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    Sub.prototype.createAnswer = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var promiseLocalDescription, answer;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        promiseLocalDescription = new Promise(this.cecandidator);\r\n                        return [4 /*yield*/, this._peerConnection.createAnswer()];\r\n                    case 1:\r\n                        answer = _a.sent();\r\n                        return [4 /*yield*/, this._peerConnection.setLocalDescription(answer)];\r\n                    case 2:\r\n                        _a.sent();\r\n                        return [4 /*yield*/, promiseLocalDescription];\r\n                    case 3: return [2 /*return*/, (_a.sent())];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    return Sub;\r\n}(Peer_1.default));\r\nexports[\"default\"] = Sub;\r\n\n\n//# sourceURL=webpack://mafiap2p/./src/sub.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;