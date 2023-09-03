module.exports = (app) => {
    const shop = require('../controllers/shop.controller.js');

	// Deliver Product with pizzas Array
	app.post('/shop', shop.deliverProduct);
	
	// Delete a Product with productId
    app.delete('/shop/:productId', shop.delete);
	
	 // Update a Product with productId
    app.put('/shop/:productId', shop.update);
	 
}