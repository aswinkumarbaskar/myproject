process.env.NODE_ENV = 'test';
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { expect } = require("chai");
const should = chai.should();
chai.use(chaiHttp);
const apiRoute = '/app/recentposts'
//testcase for recent posts

describe('Application testing', () => {

    it('get all recent posts', (done) => {
        chai.request(server).get('/app/recentposts').end((err, res) => {
            if (err) throw err;
            should.equal(err, null) //
            //get response from the route
            //console.log(JSON.parse(JSON.stringify(res.text)));
            res.should.have.status(200);
            res.should.be.json;
            done();
        })
    })
})
/*
    //testcases for login route
    it('testing login route', (done) => {
        const user = {
            "phoneNumber": "9360055492",
            "password": "123455 "
        }
        chai.request(server).post('/app/login').send(user).end((err, res) => {
            if (res.status === 200) {
                console.log(res.text)
                res.should.be.json;
                done();
            }
            else {
                console.log("Error Occurred")
                console.log(res.status, res.text);
            }

        })
    })

    //testcases for add builder property
    it('add builder property', (done) => {
        const property = {
            "builderName": "murali buliders",
            "webUrl": "https://www.ramcoindltd.com/",
            "address": "chennai",
            "mobileNumber": "1234567890",
            "price": "7500000",
            "proprtyType": "Apartment",
            "brochure": "https://assets.nobroker.in/brochures/8a9f978279ef996a0179f00a147b3ac1/GDrJCuqxFxBJCwoKIppALxsKxspFuCxwJxqtBotOOLQIJASwf04_axmF.pdf",
            "images": [
                "https://www.dreamstime.com/stock-photo-art-spring-flowers-background-frame-image52852938"
            ]
        }
        chai.request(server).post('/app/addbuilderproperty').send(property).set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNDU4ODI3ODk1OTcyYWRlZTAxNzkwZiIsImlhdCI6MTY0OTY3Njg0NywiZXhwIjoxNjQ5Njg0MDQ3fQ.KeWGcvd5EGiYAaMEzZ-tbchKFRiwB745JhWaEb_8Gv0').end((err, res) => {
            //console.log(JSON.parse(JSON.stringify(res)))
            if (res.status == 200) {
                console.log(JSON.parse(JSON.stringify(res.text)))
                res.should.be.json;
                done();
            }


        })
    })
    //test case for getting reported post of particular user
    it('getting a my reported posts', (done) => {
        const property = {
            "postId": "624be3682124e54019b78446",
            "reason": "added excess available amenties"
        }
        chai.request(server).get('/app/getreportedposts').send(property).set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNDU4ODI3ODk1OTcyYWRlZTAxNzkwZiIsImlhdCI6MTY0OTY3Njg0NywiZXhwIjoxNjQ5Njg0MDQ3fQ.KeWGcvd5EGiYAaMEzZ-tbchKFRiwB745JhWaEb_8Gv0').end((err, res) => {
            if (res.status == 200) {
                console.log(JSON.parse(JSON.stringify(res.text)))
                res.should.be.json;
                done();
            }
            else {
                console.log("error occured");
                console.log(JSON.parse(JSON.stringify(res.text)));
            }
        })
    })
    //testcase for signup activity
    it('user registration...', (done) => {
        const user = {
            "name": "murali",
            "phoneNumber": "1234567891",
            "email": "murali@gmii.com",
            "password": "123456",
            "roleId": "6242f0c9b529535b4fdbf6f4",
            "countryCode": "91",
            "country": "india",
            "state": "tamilnadu",
            "city": "chennai",
            "pinCode": "600004"
        };
        chai.request(server).post('/app/signup').send(user).end((err, res) => {
            if (res.status === 200) {
                console.log(JSON.parse(JSON.stringify(res.text)))
                res.should.be.json;
                done();
            }
            else {
                console.log("error occured");
                console.log(JSON.parse(JSON.stringify(res.text)));
            }

        })
    })

    //testcases for property posts

    it('testing a property posts', () => {
        const property = {
            "propertyTypeId": "62457fc1cec5a604aec0e397",
            "categoryType": "sale",
            "bhkType": "4BHK",
            "totalFloor": "3",
            "propertyAge": "less than 3 years",
            "builtUpArea": 1500,
            "facing": "south",
            "expectedRent": 40000,
            "expectedDeposit": 80000,
            "monthlyMaintenance": "included with rent",
            "preferredTenants": "family",
            "furnishing": "semi furnished",
            "parking": "car",
            "discription": "it's best area to live",
            "amenties": {
                "bathroom": 2,
                "balcony": 2,
                "waterSupply": "corporation",
                "availableAmenties": [
                    "gym",
                    "park"
                ],
                "availability": "sunday"
            },
            "images": [
                "https://www.dreamstime.com/stock-photo-art-spring-flowers-background-frame-image52852938",
                "https://www.dreamstime.com/spring-landscape-panorama-flowering-flowers-meadow-white-chamomile-purple-bluebells-blossom-field-panoramic-summer-image136160978",
                "https://www.dreamstime.com/stock-photo-wild-flowers-plant-summer-autumn-nature-background-banner-website-image55976971"
            ],
            "address": "4 th street tambaram,chennai",
            "city": "chennai",
            "state": "tamilnadu",
            "pinCode": "600004"
        }
        chai.request(server).post('/app/addProperty').send(property).set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNDU4ODI3ODk1OTcyYWRlZTAxNzkwZiIsImlhdCI6MTY0OTY3Njg0NywiZXhwIjoxNjQ5Njg0MDQ3fQ.KeWGcvd5EGiYAaMEzZ-tbchKFRiwB745JhWaEb_8Gv0').end((err, res) => {
            if (res.status === 200) {
                console.log(JSON.parse(JSON.stringify(res.text)))
                res.should.be.json;
                done();
            }
            else {
                console.log("Error occured");
                console.log(JSON.parse(JSON.stringify(res.text)));
            }
        })

    })
    //test case for admin login
    it('Admin login', (done) => {
        const user = {
            "email": "aswinkumar.baskar@siamcomputing.com",
            "password": "password"
        }
        chai.request(server).post('/app/adminlogin').send(user).end((err, res) => {
            if (res.status === 200) {
                console.log(JSON.parse(JSON.stringify(res.text)))
                res.should.be.json;
                done();
            }
            else {
                console.log("Error occured");
                console.log(JSON.parse(JSON.stringify(res.text)));
            }
        })
    })
    //test case for admin access previlages
    it('View Reported posts', (done) => {
        chai.request(server).get('/app/getreportedposts').set('x-access-token', '').end((err, res) => {
            if (res.status === 200) {
                console.log(JSON.parse(JSON.stringify(res.text)))
                res.should.be.json;
                done();
            }
            else {
                console.log("Error occured");
                console.log(JSON.parse(JSON.stringify(res.text)));
            }
        })
    })
    //test cases for money bidding route
    it('get group of posts by single user', (done) => {
        chai.request(server).get('/app/getallpropertywithuser').set('x-access-token', '').end((err, res) => {

            if (res.status === 200) {
                console.log(JSON.parse(JSON.stringify(res.text)))
                res.should.be.json;
                done();
            }
            else {
                console.log("Error occured");
                console.log(JSON.parse(JSON.stringify(res.text)));
            }
        })
    })
    //testcase for money eith bullet in
    it('get group post by single user', (done) => {
        const user = {
            "id": "62458897895972adee017913"
        }
        chai.request(server).post('/app/getgroupposts').send(user).set('x-access-token', '').end((err, res) => {
            if (res.status === 200) {
                console.log(JSON.parse(JSON.stringify(res.text)));
                res.should.be.json;
                done();
            }
            else {
                console.log("Error occured");
                console.log(JSON.parse(JSON.stringify(res.text)));
            }

        })
    })
    //testcase for get all users
    it('get all users', (done) => {
        chai.request(server).get('/app/getallusers').set('x-access-token', '').end((err, res) => {
            if (res.status === 200) {
                console.log(JSON.parse(JSON.stringify(res.text)))
                res.should.be.json;
                done();

            }
            else {
                console.log("Error occured");
                console.log(JSON.parse(JSON.stringify(res.text)));
            }
        })
    })
    //testcases for fetching particular user posts
    it('get particular user', (done) => {
        chai.request(server).post('/app/getparticularUser').set('x-access-token', '').end((err, res) => {
            if (res.status === 200) {
                console.log(JSON.parse(JSON.stringify(res.text)))
                res.should.be.json;
                done();
            }
            else {
                console.log("Error occured");
                console.log(JSON.parse(JSON.stringify(res.text)));
            }
        })
    })
});
//test case for switch user
describe("switchUser",()=>{
        it("/switchuser",(done)=>{
            chai.request(server).post("/app/switchuser").set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNDU4ODk3ODk1OTcyYWRlZTAxNzkxMyIsImlhdCI6MTY0OTc0NDU0MSwiZXhwIjoxNjQ5NzUxNzQxfQ.qPKsuDiH7F3cDAS1JioA9GxdC8EWjxYcy666UmFgRyE").send({"roleId":"6242f0f24711ec4a9e76a8ba"}).end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                done()
            })
            
        })
})
//test case for get owner details
describe("getOwnerDeatils",()=>{
    it("/getOwnerDeatils",(done)=>{
        chai.request(server).post("/app/getOwnerDeatils").set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNDU4ODk3ODk1OTcyYWRlZTAxNzkxMyIsImlhdCI6MTY0OTc1NTA5MSwiZXhwIjoxNjQ5NzYyMjkxfQ.NbsKv-PpjYh0zVNg68cWj-UoVAXa4fd6kYrAB6Y8hvo").send({"propertyId":"6245b042e72729fee2604c69"}).end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            //console.log(res.text)
            done()

        })
    })
})

//test case for get properties
describe("getproperties",()=>{
    it("/getproperties",(done)=>{
        chai.request(server).get("/app/getproperty/6245b53f1c26dbf8edf5983f").set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNDU4ODk3ODk1OTcyYWRlZTAxNzkxMyIsImlhdCI6MTY0OTc1NTA5MSwiZXhwIjoxNjQ5NzYyMjkxfQ.NbsKv-PpjYh0zVNg68cWj-UoVAXa4fd6kYrAB6Y8hvo").end(function(err,res){
            console.log(res.status)
            expect(err).to.be.null
            expect(res).to.have.status(200)
            console.log(res.text)
            done()

        })
    })
})

//test case for get all reported post
describe("all reported posts",()=>{
    it("/allreportedposts",(done)=>{
        chai.request(server).get("/app/allreportedposts").set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGFhMDkxNTE1YWNkNTFjOGM0MmVhMyIsImlhdCI6MTY0OTc1ODk2OCwiZXhwIjoxNjQ5NzY2MTY4fQ.TLHySkwWECvLSMsVnV9jNtL8N5PIa1fQZFuqoX0O4M0").end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done()
        })
    })
})

//test case for remove user
describe("remove user",()=>{
    it("/removeuser",(done)=>{
        chai.request(server).post("/app/removeUser").set("x-access-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjYyNGFhMDkxNTE1YWNkNTFjOGM0MmVhMyIsImlhdCI6MTY0OTc2MzUxNywiZXhwIjoxNjQ5NzcwNzE3fQ.5xJKPnG0872b6ZHT4qg8DmCPQkp8ak7o6SY1NpLvx2o").send({"id":"62458827895972adee01790f"}).end(function(err,res){
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res).to.be.json
            console.log(res.text)
            done()
        })
    })
*/
