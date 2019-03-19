var yyy = document.getElementById('xxx');

WHxxx();
window.onreset = function() {
  WHxxx();
}

var context = yyy.getContext('2d');

painting = false;
var lastPoint = {x:undefined,y:undefined}
yyy.onmousedown = function(aaa) {
  painting = true;
  var x = aaa.clientX;
  var y = aaa.clientY;
  lastPoint = {"x":x,"y":y};
  drawCircle(x,y,1);
}
yyy.onmousemove = function(aaa) {
  if(painting){
    var x = aaa.clientX;
    var y = aaa.clientY;
    var newPoint = {"x":x,"y":y};
    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
    lastPoint = newPoint;
  }
}
yyy.onmouseup = function(aaa) {
  painting = false;
}

function WHxxx() {
  var pageWidth = document.documentElement.clientWidth;  // 获取用户屏幕宽度
  var pageHeight = document.documentElement.clientHeight;// 获取用户屏幕高度
  yyy.width = pageWidth;
  yyy.height = pageHeight;
}

function drawCircle(x,y,radius) {
  context.beginPath();
  context.fillStyle = 'black';
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill();
}

function drawLine(x1,y1,x2,y2) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.moveTo(x1,y1);   // 起点
  context.lineWidth = 5;
  context.lineTo(x2,y2);   // 终点
  context.closePath();
  context.stroke();
}