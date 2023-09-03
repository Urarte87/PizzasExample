module.exports = (app) => {
    const pizzas = require('../controllers/pizza.controller.js');

    // Create a new Pizza
    app.post('/pizzas', pizzas.create);

    // Retrieve all Pizzas
    app.get('/pizzas', pizzas.findAll);
	
	// Filter by name and size
	app.get('/pizzas/filter', pizzas.findPizzaNameSize);

    // Retrieve a single Pizza with pizzaId
    app.get('/pizzas/:pizzaId', pizzas.findOne);

    // Delete a Pizza with pizzaId
    app.delete('/pizzas/:pizzaId', pizzas.delete);
}