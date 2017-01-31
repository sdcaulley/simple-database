const net = require('net');
const server = net.createServer();

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