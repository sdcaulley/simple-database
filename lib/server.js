const net = require('net');
const db = require('./simple-db');
const server = net.createServer();

server.on('connection', client => {
    client.setEncoding('utf8');

    client.on('data', data => {
        const request = JSON.parse(data);

        if (request.method === 'getAll') {
            db.getAll(request.collection, (err, data) => {
                client.write(JSON.stringify({ data: data }));
            });
        }
    });
});

module.exports = {
    start(options, callback) {
        server.listen(options.port, () => {
            callback();
        });
    },
    stop(callback) {
        server.close(callback);
    }
};