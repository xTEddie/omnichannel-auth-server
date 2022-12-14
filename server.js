const http = require('http');

const host = 'localhost';
const port = 8080;

class Server {
    constructor() {
        this.getRequests = {};
        this.postRequests = {};
    }

    listen(port, callback) {
        const requestListener = (req, res) => {
            console.log(req.url);

            if (req.method === 'GET') {
                if (Object.keys(this.getRequests).includes(req.url)) {
                    return this.getRequests[req.url](req, res);
                }
            }

            if (req.method === 'POST') {
                if (Object.keys(this.postRequests).includes(req.url)) {
                    return this.postRequests[req.url](req, res);
                }
            }

            res.writeHead(200);
            res.end('Hello World!');
        };

        return http.createServer(requestListener).listen({port, host}, callback);
    }

    get(path, handler) {
        this.getRequests[path] = handler;
    }

    post(path, handler) {
        this.postRequests[path] = handler;
    }
}

const server = new Server();
server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

server.get('/api/publickey', (req, res) => {
    res.writeHead(200);
    res.end('key');
});

server.post('/api/auth/login', (req, res) => {
    res.writeHead(200);
    res.end('login');
});