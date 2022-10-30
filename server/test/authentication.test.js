const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../src/app.js");

//afterAll(() => mongoose.connection.close());

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})
describe('endpointtest', () => {
    it('gets the test endpoint', async () => {
        const response = await request(app).get('/test')
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('pass!')
    })
})
/* describe("post /register", () => {
    it("should return all products", async () => {
        const res = await request(app).get("/api/register")
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })
})
*/