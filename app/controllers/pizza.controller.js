const pizzaService = require('../services/pizza.service.js');

// Create and Save a new Pizza
exports.create = (req, res) => {
	
	if(!req.body.name || !req.body.price || !req.body.size || !req.body.ingredients) {
        return res.status(400).send({
            message: "Pizza can not be empty"
        });
	}
	
	let specificPizza = pizzaService.getSpecificPizza(req.body.name, req.body.size);
	if (specificPizza.length > 0) {
		return res.status(400).send({
            message: "Pizza already exists"
        });
	}
	
	res.status(200).send({message: pizzaService.createPizza(req.body)});
 
};

//Filter pizzas by Name and Size.
exports.findPizzaNameSize = (req, res) => {
	//console.log(req.query);
	if (!req.query.name || !req.query.size)     {
		return res.status(400).send({
            message: "Pizza filter can not be empty"
        });
	}
	res.status(200).send(pizzaService.getSpecificPizza(req.query.name, req.query.size));
};

// Retrieve and return all pizzas from the database.
exports.findAll = (req, res) => {
	res.status(200).send(pizzaService.getAllPizzas());
};

// Find a single pizza with a PizzaId
exports.findOne = (req, res) => {
	let specificPizza = pizzaService.findPizzaById(req.params.pizzaId);
	if (typeof specificPizza === 'undefined' || specificPizza.length == 0) {
		return res.status(400).send({
            message: "Pizza does not exist"
        });
		
	}
	res.status(200).send(specificPizza);
};

// Delete a pizza with the specified pizzaId in the request
exports.delete = (req, res) => {
	let specificPizza = pizzaService.findPizzaById(req.params.pizzaId);
	if (typeof specificPizza === 'undefined' || specificPizza.length == 0) {
		return res.status(400).send({
				message: "Pizza does not exist"
		});
	}
	pizzaService.deletePizza(req.params.pizzaId);
	res.status(200).send({message: "pizza deleted"});
};

