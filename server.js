/*
* @Author: Mazw
* @Date: 2024-06-14 09:01:40
* @Last Modified by: Mazw
* @Describe:  WebSocket 服务端 node server.js 服务端启动后，浏览器访问 http://localhost:9527/ 即可
*/
const http = require('http');
const websocket = require('ws');
const server = http.createServer();
const wss = new websocket.Server({ server });

//绑定事件，建立连接
wss.on('connection', (socket) => {
  console.log('websocket已连接');
  //收到客户端发来的消息
  socket.on('message', (message) => {
    //打印收到的消息
    console.log('收到客户端发来的消息：' + message);
    //收到后返回消息给客户端
    socket.send('服务端返回消息：' + message + '，已收到！')
  });
  socket.on('close', () => {
    console.log('websocket已关闭');
  });
});

server.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello,world!');
});

server.listen(9527, () => {
  console.log('服务已启动，端口号为9527');
});
