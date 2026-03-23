import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

const LOW_STOCK_THRESHOLD = 5

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller, stock } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
            stock: Number(stock) || 0
        }

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Admin: manually update stock for a product
const updateStock = async (req, res) => {
    try {
        const { productId, stock } = req.body
        if (productId === undefined || stock === undefined) {
            return res.json({ success: false, message: "productId and stock are required" })
        }

        const updated = await productModel.findByIdAndUpdate(
            productId,
            { stock: Number(stock) },
            { new: true }
        )

        if (!updated) {
            return res.json({ success: false, message: "Product not found" })
        }

        const isLow = updated.stock <= LOW_STOCK_THRESHOLD
        const message = updated.stock === 0
            ? "Stock updated – product is now OUT OF STOCK"
            : isLow
                ? `Stock updated – only ${updated.stock} item(s) left (Low Stock)`
                : "Stock updated successfully"

        res.json({ success: true, message, product: updated })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Admin: get products with low or zero stock
const getLowStockProducts = async (req, res) => {
    try {
        const products = await productModel.find({ stock: { $lte: LOW_STOCK_THRESHOLD } }).sort({ stock: 1 })
        res.json({ success: true, products, threshold: LOW_STOCK_THRESHOLD })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Admin: Update product details (Price and Stock)
const updateProduct = async (req, res) => {
    try {
        const { id, price, stock } = req.body;
        if (!id) {
            return res.json({ success: false, message: "Product ID is required" });
        }

        const updated = await productModel.findByIdAndUpdate(
            id,
            { price: Number(price), stock: Number(stock) },
            { new: true }
        );

        if (!updated) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product updated successfully", product: updated });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateStock, getLowStockProducts, updateProduct }