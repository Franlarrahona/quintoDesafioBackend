import path from "path";

const config = {
    PORT: 5050,
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')), // Win
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
    MONGODB_URI: 'mongodb+srv://kouse:fran1234@cluster0.egwshaq.mongodb.net/mydatabase',
    PRODUCTS_PER_PAGE: 7,
    SECRET: "abc123"
}

export default config;