const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if ( url === '/'){
        try{
            const data = fs.readFileSync('message.txt');
        }catch{
            fs.writeFileSync('message.txt', 'undefined');
        }

        const readingData = fs.readFileSync('message.txt').toString();

        res.write('<html>');
        res.write('<head><title>Node App</title></head>');
        res.write('<body>');
        res.write(readingData);
        res.write('<div></div>')
        res.write('<div><form action="/message" method="POST"><input type="text" name="msg"><button type="submit">Submit</button></form></div>');
        res.write('</body>');
        res.write("</html>");
        return res.end();
    }
    if(url === "/message" && method === "POST"){
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedData = Buffer.concat(body).toString();
            const message = parsedData.split('=')[1];
            fs.writeFileSync('message.txt', message);

        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = requestHandler;