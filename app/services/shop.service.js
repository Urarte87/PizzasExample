const Mailer = require('../services/mail.service.js');
const pizzaService = require('../services/pizza.service.js');
const moment = require("moment");
var products=[];
const TWOWEEKS = 2;
const THREEWEEKS = 3;
var autonumeric = 0;


function buyProduct(pizzas) {
	if (!pizzas.id) {
		autonumeric = autonumeric + 1;
		pizzas.id = autonumeric;
	}
	pizzas.timestamp = moment().unix();
	products.push(pizzas);
	
	let listOfDeliverThreeWeeks = filterWeeks(THREEWEEKS, pizzas);
	let accumulatedPriceThreeWeeks = accumulatedTotalPrice(listOfDeliverThreeWeeks);
	
	let accumulatedPrice = 0;
	
	if (accumulatedPriceThreeWeeks > 200) {
		console.log("Descuento del 15%");
		accumulatedPrice = applyDiscount(deliveryTotalPrice(pizzas), 15); 
	}
	else {
		let listOfDeliverTwoWeeks = filterWeeks(TWOWEEKS, pizzas);
		let accumulatedPriceTwoWeeks = accumulatedTotalPrice(listOfDeliverTwoWeeks);
		
		if (accumulatedPriceTwoWeeks > 100) {
			console.log("Descuento del 5%");
			accumulatedPrice = applyDiscount(deliveryTotalPrice(pizzas), 5);
	    }
		else {
			console.log("Sin descuento");
			accumulatedPrice = deliveryTotalPrice(pizzas);
		}
	}
	Mailer.sendEmail(pizzas, accumulatedPrice);
	return pizzas.id;
}

function findProduct(id) {
	//console.log(products);
	return products.filter(product => product.id == id);
}

function deleteProduct(id) {
    products = products.filter(product => product.id != id);
}

function checkProduct(pizzas) {
	for (i in pizzas) {
		if (!pizzas[i].name || !pizzas[i].price || !pizzas[i].size) return false;
		let result = pizzaService.validatePizza(pizzas[i].name, pizzas[i].size, pizzas[i].price);
		if (result == false) return false;
	}
   return true;
}
//PRIVATE FUNCTIONS
function filterWeeks(numWeeks, pizzas) {
	return products.filter(products => products.userId == pizzas.userId && 
	       weeksDiff(moment.unix(products.timestamp), moment.unix(pizzas.timestamp)) < numWeeks);
}

function applyDiscount(accumulatedPrice, discount) {
	return accumulatedPrice-(accumulatedPrice*discount/100);
}

function deliveryTotalPrice(pizzas) {
	let totalPrice= 0;
	for (i in pizzas.delivery) {
	  totalPrice = totalPrice + parseFloat(pizzas.delivery[i].price);
	}
	return totalPrice;
}

function accumulatedTotalPrice(pizzas) {
	let totalPrice= 0;
	for (i in pizzas) {
		for (j in pizzas[i].delivery) {
			totalPrice = totalPrice + parseFloat(pizzas[i].delivery[j].price);
		}
	}
	return totalPrice;
}

function weeksDiff(start, end) {
	return Math.ceil(moment.duration(start.diff(end)).asWeeks());
}

module.exports = {
  buyProduct,
  deleteProduct,
  findProduct,
  checkProduct
}