"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("../settings");
const fs = require('fs');
const ABSOLUTE_FILES_PATH = `${__dirname}/../../${process.env.FILES_PATH}`;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: `${ABSOLUTE_FILES_PATH}/others`,
    filename: (req, file, callback) => {
        const id = Date.now() + '-' + file.originalname;
        const type = file.originalname.split('.');
        const ext = type[type.length - 1];
        file.type = ext;
        file.id = id;
        req.body.file = file;
        callback(null, file.id);
    }
});
const uploader = multer({ storage });
class FileUploadController {
    static async uploadFile(req, res) {
        const upload = uploader.single('file');
        await new Promise((res, rej) => {
            upload(req, res, () => res(true));
        });
        return await FileUploadController.uploaded(req.body.file, true, req.headers.category);
    }
    static async uploadImage(req, res) {
        const upload = uploader.single('file');
        await new Promise((res, rej) => {
            upload(req, res, () => res(true));
        });
        const validTypes = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
        const isFileValid = validTypes.includes(req.body.file.type);
        req.body.file.type = 'image';
        return await FileUploadController.uploaded(req.body.file, isFileValid, req.headers.category);
    }
    static async uploaded(file, valid, category) {
        const remove = (file) => {
            let readPath = `${ABSOLUTE_FILES_PATH}/others/${file}`;
            fs.unlinkSync(readPath);
        };
        const move = (file, to) => {
            let path = `${ABSOLUTE_FILES_PATH}/${to}${category ? `/${category}` : ''}`;
            if (!fs.existsSync(path))
                fs.mkdirSync(path);
            let readPath = `${ABSOLUTE_FILES_PATH}/others/${file}`;
            let writePath = `${path}/${file}`;
            let buffer = fs.readFileSync(readPath);
            fs.writeFileSync(writePath, buffer);
            fs.unlinkSync(readPath);
            return writePath;
        };
        let destDir = 'bin';
        switch (file.type) {
            case 'pdfx':
            case 'pdf': {
                destDir = 'pdf';
                break;
            }
            case 'svg': {
                destDir = 'svg';
                break;
            }
            case 'image':
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'bmp':
            case 'png': {
                destDir = 'img';
                break;
            }
            case 'video':
            case 'mp4':
            case 'mov':
            case 'wmv': {
                destDir = 'video';
                break;
            }
            case 'audio':
            case 'mp3':
            case 'wav':
            case 'ogg':
            case 'm4a': {
                destDir = 'audio';
                break;
            }
        }
        if (valid) {
            move(file.id, destDir);
            file.id = `${destDir}/${category ? `${category}/` : ''}${file.id}`;
            let src = `${settings_1.FILES_API_URL}${file.id}`;
            return {
                src,
                name: file.id
            };
        }
        else {
            remove(file.id);
            return false;
        }
    }
}
exports.default = FileUploadController;
//# sourceMappingURL=FileUploadController2.js.map