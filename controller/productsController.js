function getProducts (req, res){
    if(!req){
        res.status(404).send("Kichi req. nadiki khali responce nabanaba boli kauci he.")
    }
    res.status(200).send("Products data Pauchinti.. na :-)");
}


module.exports = getProducts;