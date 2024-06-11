import { Router } from "express";
import config from "../config.js";
import products from "./products.routes.js"
import ProductsManager from "../dao/products.manager.mdb.js";

const router = Router();
const manager = new ProductsManager();

router.get('/chat', (req, res) => {
    res.render('chat', {});
});

router.get('/realtime_products/:page', async (req, res) => {
    const data = await manager.getAll(config.PRODUCTS_PER_PAGE, req.params.page)
    res.render('realtime_products', { data: data });
});

router.get("/products", async  (req, res) => {
    const products = await manager.getAll()
    if (!req.session.user) return res.redirect('/login');
    res.render('products', {products:products, user:req.session.user })
})

router.get("/login", async (req,res) =>{
    if (req.session.user) return res.redirect('/profile');
    res.render('login', {})
})
router.get('/profile', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('profile', { user: req.session.user });
});

export default router