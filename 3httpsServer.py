from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl

handler = SimpleHTTPRequestHandler;
handler.extensions_map.update({
      ".js": "application/javascript",
});
httpd = HTTPServer(('localhost', 8080), handler);
httpd.socket = ssl.wrap_socket (httpd.socket, keyfile="./key.pem", certfile='./cert.pem', server_side=True)
httpd.serve_forever()
