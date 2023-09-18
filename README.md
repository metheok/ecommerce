# E-commerce

Master Repository for E-commerce

To run client and server on concurrently on port 3000 and 4000 respectively

### `npm run dev`

To run client and server on concurrently on port 3000 and 4000 respectively

### `npm run server`

To run server on port 4000

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Extra API's to use on port:4000 are:

Create Product: http://localhost:4000/api/product - POST - JSON body raw :
{
"name":"Sheep",
"category":"6508ad34cbcad38df5386649",
"image":"https://as2.ftcdn.net/v2/jpg/03/12/95/13/1000_F_312951336_8LxW7gBLHslTnpbOAwxFo5FpD2R5vGxu.jpg",
"type":"non-veg"  
}

Create Category: http://localhost:4000/api/category - POST - JSON body raw :
{
"name":"Sheep",
}

Create User: http://localhost:4000/api/auth/signup - POST - JSON body raw : {"email":"user1@gmail.com","password":"Password@111"}
