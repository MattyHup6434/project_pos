const prisma = require('../prisma/prisma')
const admin = "matty";
exports.postProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const newProduct = await prisma.product.create({    
            data: {
                name: name,
                price: price,
                stock: stock,
                creatBy: admin,
                updatedBy: admin
            }
        });

        res.json(newProduct);
    } catch (err) {
        console.error(err);
         res.status(500).json({ error: 'Internal Server Error' });
        
    }

}
exports.getProduct = async (req, res) => {
    try {
        const products = await prisma.product.findMany()
         if (!products) {
            return res.status(404).send("Product not found");
        }
        res.json(products);
    } catch (err) {
        console.error(err);
           res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getProductByid = async (req, res) => {
    try {
        const {productid} = req.params
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(productid)
            }
        });
        if (!product) {
            return res.status(404).send("Product not found 404");
        }
        res.json(product);
    } catch (err) {
        console.error(err);
           res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.putProductByid = async (req, res) => {
    try {
     const { putproductid } = req.params;
    //  console.log("putproductid:", putproductid);
     const { name, price, stock } = req.body; 
       
     const updatedProduct = await prisma.product.update({
            where:{
               id: parseInt(putproductid)
            },
        data:{
                name: name,
                price: price,
                stock: stock,
                updatedBy: admin
        }
        })
        res.json(updatedProduct);
    } catch (err) {
        console.error(err);
           res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.deleteProductByid = async (req, res) => {
    try {
        const { deleteProductid } = req.params; 
        const product = await prisma.product.delete({
            where: {
                id: parseInt(deleteProductid)
            }
        }); 
            res.json({
            message: 'successfully deleted',
            product: product
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
