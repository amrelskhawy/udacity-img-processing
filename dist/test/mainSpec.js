"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const request = (0, supertest_1.default)(index_1.app);
describe('Testing My EndPoint server', () => {
    describe('Status Codes tests', () => {
        // Test is there is any response error with all params
        it('expects to return 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=keyboard.jpg&width=500&height=500');
            expect(response.status).toBe(200);
        }));
        it('expectd to bad request', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=keyboard&width=500&height=500');
            expect(response.text).toBe('Bad Request');
        }));
        it('expectd to be 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=keyboard&width');
            expect(response.status).toBe(400);
        }));
    });
});
