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
// The Modules
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resizing_1 = require("../../../_utils/resizing");
const images = express_1.default.Router();
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename, width, height } = req.query;
        if (filename == '') {
            res.send('Filename Should Be included');
        }
        const thumbPath = `${path_1.default.resolve('./')}/assets/thumbs/`;
        // Check if the Output Folder is Exist
        if (fs_1.default.existsSync(`${path_1.default.resolve('./')}/assets/full/${filename}`)) {
            if (fs_1.default.existsSync(thumbPath)) {
                // Check if there is any resized pic of that pic before
                if (fs_1.default.existsSync(thumbPath + `${filename}-${width}_${height}.jpg`)) {
                    // Return the Pic
                    res.sendFile(path_1.default.resolve('./') + `/assets/thumbs/${filename}-${width}_${height}.jpg`);
                }
                else {
                    yield (0, resizing_1.resizeThePic)((filename), width, height);
                    res.sendFile(path_1.default.resolve('./') + `/assets/thumbs/${filename}-${width}_${height}.jpg`);
                }
            }
            else {
                fs_1.default.mkdirSync(thumbPath);
                yield (0, resizing_1.resizeThePic)((filename), width, height);
                res.sendFile(path_1.default.resolve('./') + `/assets/thumbs/${filename}-${width}_${height}.jpg`);
            }
        }
        else {
            // If the Photo doesn't exist
            res.sendStatus(400);
        }
    }
    catch (error) {
        res.sendStatus(400);
    }
}));
exports.default = images;
