let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const url= 'http://localhost:3000';
chai.use(chaiHttp);
var id;
var ids=[];
//Content-Type: application/json


//PIZZA CONTROLLER
describe('Insert a pizza: ',()=>{

	it('should insert a pizza', (done) => {
		chai.request(url)
			.post('/pizzas')
			.send({"name":"pizzaJAMON", "price": "20", "size": "XL", "ingredients" : [ "peperoni", "queso", "jamon" ]})
			.end( function(err,res){
				expect(res).to.have.status(200);
				ids.push(res.body.message);
				done();
			});
	});
});

describe('Insert a pizza: ',()=>{

	it('should insert a pizza', (done) => {
		chai.request(url)
			.post('/pizzas')
			.send({"name":"pizzaQUESO", "price": "20", "size": "XL", "ingredients" : [ "peperoni", "queso", "jamon" ]})
			.end( function(err,res){
				expect(res).to.have.status(200);
				ids.push(res.body.message);
				done();
			});
	});
});

describe('Insert a pizza: ',()=>{

	it('should insert a pizza', (done) => {
		chai.request(url)
			.post('/pizzas')
			.send({"name":"pizzaJAMON", "price": "15", "size": "L", "ingredients" : [ "peperoni", "queso", "jamon" ]})
			.end( function(err,res){
				expect(res).to.have.status(200);
				ids.push(res.body.message);
				done();
			});
	});
});

describe('Insert a pizza: ',()=>{

	it('should insert a pizza', (done) => {
		chai.request(url)
			.post('/pizzas')
			.send({"name":"pizzaQUESO", "price": "15", "size": "L", "ingredients" : [ "peperoni", "queso", "jamon" ]})
			.end( function(err,res){
				expect(res).to.have.status(200);
				id = res.body.message;
				ids.push(res.body.message);
				console.log(res.body);
				done();
			});
	});
})


describe('get all pizzas: ',()=>{

	it('should get all pizzas', (done) => {
		chai.request(url)
			.get('/pizzas')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});


describe('get concrete pizza: ',()=>{

	it('should get concrete pizza', (done) => {
		chai.request(url)
			.get('/pizzas/' + id)
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});


describe('filter concrete pizza: ',()=>{

	it('should get concrete pizza', (done) => {
		chai.request(url)
			.get('/pizzas/filter?name=pizzaQUESO&size=XL')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});



//SHOP CONTROLLER
describe('Insert delivery: ',()=>{

	it('should insert concrete delivery', (done) => {
		chai.request(url)
			.post('/shop')
			.send([{"name":"pizzaQUESO", "price": "20", "size": "XL", "ingredients" : [ "peperoni", "queso", "jamon" ]},
			       {"name":"pizzaQUESO", "price": "15", "size": "L", "ingredients" : [ "peperoni", "queso", "jamon" ]}])
			.end( function(err,res){
				console.log(res.body);
				idproduct = res.body.id;
				expect(res).to.have.status(200);
				done();
			});
	});
});



describe('Modify delivery: ',()=>{

	it('should modify concrete delivery', (done) => {
		chai.request(url)
			.put('/shop/' + idproduct)
			.send([{"name":"pizzaJAMON", "price": "20", "size": "XL", "ingredients" : [ "peperoni", "queso", "jamon" ]},
			       {"name":"pizzaJAMON", "price": "15", "size": "L", "ingredients" : [ "peperoni", "queso", "jamon" ]}])
			.end( function(err,res){
				console.log(res.body);
				//idproduct = res.body.id;
				expect(res).to.have.status(200);
				done();
			});
	});
});



describe('remove concrete delivery: ',()=>{

	it('should remove concrete delivery', (done) => {
		chai.request(url)
			.del('/shop/' + idproduct)
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});


describe('remove concrete pizza: ',()=>{

	it('should remove concrete pizza', (done) => {
		chai.request(url)
			.del('/pizzas/' + ids[0])
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});


describe('remove concrete pizza: ',()=>{

	it('should remove concrete pizza', (done) => {
		chai.request(url)
			.del('/pizzas/' + ids[1])
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});


describe('remove concrete pizza: ',()=>{

	it('should remove concrete pizza', (done) => {
		chai.request(url)
			.del('/pizzas/' + ids[2])
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});

describe('remove concrete pizza: ',()=>{

	it('should remove concrete pizza', (done) => {
		chai.request(url)
			.del('/pizzas/' + ids[3])
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});

ids=[];
