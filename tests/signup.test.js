import mongoose from 'mongoose'
import supertest from 'supertest';
import app from '../index';
import express from 'express'
import User from '../models/User';
import http from 'http';

describe('Testing the signup API', () => {
    let server, appx;
    const user = {
		username: 'akhtar',
		email: 's@akhtar.com',
		password: 'sakhtar'
    };
    
   beforeAll(done => {
        appx = new express();
        server = http.createServer(appx);
        server.listen(done);
        // process.env.MONGO_DB_URL = 'mongodb+srv://admin:admin@cluster0-nlxl8.mongodb.net/data?retryWrites=true&w=majority'
    });

    afterAll(async done => {
        await User.deleteOne({
			email: user.email
        })
        // await new Promise(resolve => setTimeout(() => resolve(), 500));
        // console.log('server is => ', server)
        server.close(done);
        mongoose.disconnect();
    });

    it('tests the signup user end point', async (done) => {
        supertest(app).post('/api/user/signup')
            .send(user)
            .expect(200)
            .end(function(err, response) {
                if (err) return done(err);
                expect(response.status).toBe(200);
		        expect(response.body.user.email).toBe(user.email);
                expect(response.body.token).not.toBe(null);
                done();
            });


        // console.log('response from test ', response )
		// expect(response.status).toBe(200);
		// expect(response.body.user.email).toBe(user.email);
        // expect(response.body.token).not.toBe(null);
        // done();
    })

    // afterAll(async (done) => {
    //     await User.deleteOne({
	// 		email: user.email
    //     })
    //     server.close(done);
	// })
})