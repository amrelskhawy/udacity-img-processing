import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import { resizeThePic } from '../_utils/resizing';
import { app } from '../index';


const request = supertest(app);

describe('Testing My EndPoint server', () => {

    describe('Status Codes tests', () => {
        // Test is there is any response error with all params
        it('expects to return 400', async () => {
            const response = await request.get('/api/images?filename=keyboard.jpg&width=500&height=500')
            expect(response.status).toBe(200);
        });

        it('expectd to bad request', async ()=> {
            const response = await request.get('/api/images?filename=keyboard&width=500&height=500')
            expect(response.text).toBe('Bad Request');
        })

        it('expectd to be 400', async ()=> {
            const response = await request.get('/api/images?filename=keyboard&width')
            expect(response.status).toBe(400);
        })

        it('Expected new file exists', async()=> {
            const response = await request.get('/api/images?filename=keyboard.jpg&width=500&height=500')
            const res = fs.existsSync(path.resolve('./') + '/assets/thumbs/keyboard.jpg-500_500.jpg')            
            expect(res).toBeTrue()
        })

        it('Expected new file exists', async()=> {
            const response = await request.get('/api/images?filename=keyboard.jpg&width=&height=')
            expect(response.statusCode).toBe(404)
            
        })
    });
});
