// Dynamically import chai using import()
const chaiPromise = import("chai");

// Use chai via promise after it is imported
chaiPromise.then(chai => {
    var request = require("supertest");
    var app = require("../model");

    // Use expect from chai
    var expect = chai.expect;

    describe("API Tests", function() {
        // Test case for checking the functionality of POST /api/projects/insert
        it("POST /api/projects/insert should insert project data and return status 200", function (done) {
            const projectData = {
                first_name: "Sumeet",
                last_name: "Kumar",
                password: "test12345",
                email: "test@example.com"
            };

            request(app)
                .post("/api/projects/insert")
                .send(projectData)
                .expect(200)
                .then((res) => {
                    expect(res.body.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
                .catch(err => done(err));
        });

        // Test case for checking the functionality of GET /api/projects
        it("GET /api/projects should return status 200 and an array of projects", function (done) {
            request(app)
                .get("/api/projects")
                .expect(200)
                .then((res) => {
                    expect(res.body.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
                .catch(err => done(err));
        });
    });
});
