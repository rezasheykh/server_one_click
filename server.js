const http = require('http');
const path = require('path');
const fs = require('fs');





function server() {
    const server = http.createServer(
        (req, res) => {
            let filepath = path.join(__dirname, "asset",
                req.url === '/' ? "index.html" : req.url
            );
            let extname = path.extname(filepath);
            let contentType = "text/html";
            switch (extname) {

                case ".js":
                    contentType = "text/javascript";
                    break;
                case ".css":
                    contentType = "text/css";
                    break;
                case ".json":
                    contentType = "application/json";
                    break;
                case ".png":
                    contentType = "image/png";
                    break;
                case ".jpg":
                    contentType = "image/jpg";
                    break;
                case ".ico":
                    contentType = "favicon/ico";
                    break;
            }

            if (contentType === "text/html" && extname === "") {
                filepath += ".html";
            }

            fs.readFile(filepath, (err, data) => {
                    if (err) {
                        if (err.code == 'ENOENT') {
                            fs.readFile(path.join(__dirname, 'asset', '404.html'), (err, data) => {
                                res.writeHead('404', { 'Content-Type': 'text/html' });
                                res.end(data, 'utf-8');

                            })
                        } else {
                            res.writeHead('500');
                            res.end(`server error :${ree.code}`);

                        }


                    } else {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(data, 'utf-8');
                    }
                }

            )
        })



    server.listen(3000, () => console.log('server ruinng in ports 3000'));
};
server();
module.exports.server = server;