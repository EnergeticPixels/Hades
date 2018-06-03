# <center>Application Programming Interface (API) for Project Ares</center>

### **Summary of Project**

Initial intention of this project is for this API to sit behind a reverse proxy such as NGINX.  This is a "CRUD" interface for ammuinition storage/handling encyclopedia to incorportate the following:

* Act as authorization/role data warehouse that will contain methods to add new admin people and read/update/delete existing admin people
* Act as a data warehouse that will contain methods to add new items and read/update/delete existing item data

### **Specific particulars about project**

* [Restify](http://restify.com) Semantically correct RESTful web services
* [Mongoose](http://mongoosejs.com) Database ORM
* [Axios](https://github.com/axios/axios) http(s) client for frontend to backend communications
* [Karma](https://karma-runner.github.io) for test runner
* [Mocha](https://mochajs.org) and [Chai](http://chaijs.com) for test frameworks
* Code coverage for proof application works as intended (delivery to proponent):
  * [Istanbul](https://istanbul.js.org)
  * [Coveralls](https://coveralls.io)
* End to End testing from one of the following:
  * [Cypress](https://www.cypress.io)
  * [Nightwatch](http://nightwatchjs.org)
  * [Protractor](https://www.protractortest.org)
* Other support as I discover them along the way along the way

### **To-Dos**

* [ ] Basic Restify setup
  * [ ] 'CRUD' Admin user
  * [ ] Unit testing Admin User
  * [ ] 'CRUD' Munition item
    * [ ] Basic CRUD in all munition categories
    * [ ] Search in multiple collections based on munition category (higher order search)
    * [ ] Protected routes based on user role
    * [ ] Unit testing for each API route
* [ ] Error/logging
* [ ] Integration Tests
* [ ] Clustering
* [ ] HTTPS / SSL
* [ ] Deployment processes

### **Contributors**

* Serco Employees
  * Mike Brenner (GA - 3D Artist)
  * Ron Franks (GA - 3D Artist)
  * Anthony Jackman (programmer)
  * Mark Bitleris (idea person / tester)
  * Rick Morris (team lead)

### **Intended Licensing**

* [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)
