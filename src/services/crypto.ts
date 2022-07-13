const crypto = require('crypto');

export default class CryptoService {
    static signWithHmacSha256(data: Buffer, withKey: string) {
        let hmac = crypto.createHmac('sha256', Buffer.from(withKey, 'base64'));
        hmac.update(data);
        let mac = hmac.digest('base64');
        let bmac = Buffer.from(mac, 'base64');
        return Buffer.concat([bmac, data]);
    }

    static aesEncrypt(key: Buffer, decrypted: Buffer) {
        let iv = Buffer.from([0, 40, 208, 73, 100, 120, 234, 20, 106, 30, 251, 251, 140, 107, 0, 93]);//crypto.randomBytes(16);
        let encipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = encipher.update(decrypted, 'binary', 'base64');
        let final = (encrypted + encipher.final('base64'));
        return Buffer.concat([iv, Buffer.from(final, 'base64')]);
    }

    static aesDecrypt(key: Buffer, data: Buffer) {
        let iv = data.slice(0, 16);
        let encrypted = data.slice(16);

        let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encrypted, 'binary', 'base64');
        let final = (decrypted + decipher.final('base64'));
        return Buffer.from(final, 'base64');
    }

    static sha256Of(data: string | Buffer, encoding: 'base64' | 'hex' = 'base64') {
        let hash = crypto.createHash('sha256').update(data).digest(encoding);
        return hash;
    }

    static sha512Of(data: string | Buffer, encoding: 'base64' | 'hex' = 'base64') {
        let hash = crypto.createHash('sha512').update(data).digest(encoding);
        return hash;
    }
}