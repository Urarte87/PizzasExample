const moment = require("moment");
var pizzas=[];
var autonumeric = 0;


function createPizza(pizza) {
	autonumeric = autonumeric + 1;
	pizza.id = autonumeric;
	pizza.timestamp = moment().unix();
	pizzas.push(pizza);
	return pizza.id;
}

function deletePizza(id) {
    pizzas = pizzas.filter(pizza => pizza.id != id);
}

function getAllPizzas() {
	return pizzas;
}

function getSpecificPizza(pizzaName, pizzaSize) {
	return pizzas.filter(pizza => pizza.name == pizzaName && pizza.size == pizzaSize);
}

function findPizzaById(id) {
	return pizzas.filter(pizza => pizza.id == id);
}

function validatePizza(pizzaName, pizzaSize, pizzaPrice) {
	let filtro = pizzas.filter(pizza => pizza.name == pizzaName && pizza.size == pizzaSize && pizza.price == pizzaPrice);
	if (filtro.length == 0) return false;
	else return true;
}


module.exports = {
  createPizza,
  deletePizza,
  getAllPizzas,
  getSpecificPizza,
  validatePizza,
  findPizzaById
}