import CryptoJS from "https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/+esm";

export default class AES {
    static encrypt(plain, password) {
        return CryptoJS.AES.encrypt(plain, password).toString();
    }

    static decrypt(secret, password) {
        return CryptoJS.AES.decrypt(
            secret,
            password
        ).toString(CryptoJS.enc.Utf8);
    }
}
