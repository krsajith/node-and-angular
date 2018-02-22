const express = require('express');
var bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const port = 3000;

const originWhitelist = ['http://localhost:4200'];


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// middleware route that all requests pass through
router.use((request, response, next) => {
    console.log('Server info: Request received');

    let origin = request.headers.origin;

    // only allow requests from origins that we trust
    if (originWhitelist.indexOf(origin) > -1) {
        response.setHeader('Access-Control-Allow-Origin', origin);
    }

    // only allow get requests, separate methods by comma e.g. 'GET, POST'
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);

    // push through to the proper route
    next();
});


// url: http://localhost:3000/
app.get('/', (request, response) => response.send('I am running :-)'));

// all routes prefixed with /api
app.use('/api', router);




///////////////////////////////////////////  START YOU CODE HERE ///////////////////////////////////////////

//Call from browser with :  http://localhost:3000/api/sum?n1=10&n2=15


router.post('/saveEmployee', function (request, response) {
    saveToDataBase(request.body)
    return response.send(request.body);
});

router.get('/sum', (request, response) => {

    //here we used the operator => instead of  router.get('/sum', function (request, response) {

    n1 = Number(request.query.n1);
    n2 = Number(request.query.n2);
    sum = n1 + n2;

    response.json(sum);
});

//Simple function to save to database
function saveToDataBase(data) {
    console.log(data);
}

///////////////////////////////////////////  END YOU CODE HERE ///////////////////////////////////////////



// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));

