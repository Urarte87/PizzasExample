const shopService = require('../services/shop.service.js');
const MockUserId = 'mockUserId@email.com';


exports.deliverProduct = (req, res) => {
	 if(!req.body) {
        return res.status(400).send({
            message: "Product delivery content can not be empty"
        });
    }
	
	if (shopService.checkProduct(req.body) == false) {
		 return res.status(400).send({
            message: "Product delivery content not complete"
        });
	}
	
	let pizzas = {};
	pizzas.delivery = req.body;
	pizzas.userId = MockUserId;
	res.status(200).send({id: shopService.buyProduct(pizzas)});
};


exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product delivery content can not be empty"
        });
    }
	
	if (shopService.checkProduct(req.body) == false) {
		 return res.status(400).send({
            message: "Product delivery content not complete"
        });
	}
	
	let specificProduct = shopService.findProduct(req.params.productId);
	if (typeof specificProduct === 'undefined' || specificProduct.length == 0) {
		return res.status(400).send({
				message: "Product does not exist"
		});
	}
	
	shopService.deleteProduct(req.params.productId);	
	let pizzas = {};
	pizzas.delivery = req.body;
	pizzas.userId = MockUserId;
	pizzas.id = req.params.productId;
	res.status(200).send({id: shopService.buyProduct(pizzas)});
};


// Delete a pizza with the specified pizzaId in the request
exports.delete = (req, res) => {
	let specificProduct = shopService.findProduct(req.params.productId);
	if (typeof specificProduct === 'undefined' || specificProduct.length == 0) {
		return res.status(400).send({
				message: "Product does not exist"
		});
	}
	shopService.deleteProduct(req.params.productId);
	res.status(200).send({message: "product delivery deleted"});
};