# projecto-app
Repository for projecto-app

App is built on the MEVN(MongoExpressVueNode) stack.

*server - nodeJS/express back-end with mongoDB
*client - vueJS front-end

```
testeArtur = true;
```

##Front-end (Vue/javascript)

The client javascript app is built on the Vue framework to display HTML and CSS components in the browser.

Operations like authentication (passportjs), state-managment (Vuex), sending HTTP requests (axios) to query our API, displaying toast messages (toastr), etc can be wrapped in Services that are used by components to render html to the browser. 

*HTTPService: knows how to send basic HTTP requests to our API. 
*AuthService and ExamplesService: use HTTPService to request /auth and /api endpoints. 
*VuexService: We use Vuex to save the app state (a boolean to toggle the main navigation menu open and the JWToken to authenticate requests. The Vuex store is saved persistently in the localStorage.

##Back-end (nodejs/expressjs) 

###DB
We use mongoDB to store app info using mongoose models.

###API:

*/auth: username and password to /auth/login and /auth/register endpoints
*/api/examples: uses GET requests to retrieve examples and POST to add examples with file upload. The examples API is protected and can only be accessed by authorized users. Requests are authorized using JSON Web Tokens in the Authorization header.