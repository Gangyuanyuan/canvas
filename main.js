var yyy = document.getElementById('xxx');   // 获取 id 为 xxx 的元素
var context = yyy.getContext('2d');         // 获取 yyy 的二维渲染上下文
var lineWidth = 5;
var circleSize = 3

autoSetCanvasSize(yyy);

listonToUser(yyy);

var eraserEnabled = false;
pencil.onclick = function(){
  eraserEnabled = false;
  pencil.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true;
  eraser.classList.add('active')
  pencil.classList.remove('active')
}
clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height)
}
download.onclick = function(){
  var url = yyy.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的图片'
  a.target = '_blank'
  a.click()
}

red.onclick = function(){
  context.fillStyle = 'red';
  context.strokeStyle = 'red';
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
}
green.onclick = function(){
  context.fillStyle = 'green';
  context.strokeStyle = 'green';
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  black.classList.remove('active')
}
blue.onclick = function(){
  context.fillStyle = 'blue';
  context.strokeStyle = 'blue';
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  black.classList.remove('active')
}
black.onclick = function(){
  context.fillStyle = 'black';
  context.strokeStyle = 'black';
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active') 
}

thin.onclick = function(){
  lineWidth = 5;
  circleSize = 3;
}
thick.onclick = function(){
  lineWidth = 10;
  circleSize = 5;
}

/******************/

function autoSetCanvasSize(canvas){
  setCanvasSize();
  window.onresize = function(){
    setCanvasSize();
  }
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth;    // 获取用户屏幕宽度
    var pageHeight = document.documentElement.clientHeight;  // 获取用户屏幕高度
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    context.fillStyle = 'white';     // 使用户保存图片时背景色为白色
    context.fillRect(0, 0, yyy.width, yyy.height);
  }
}

function drawCircle(x,y,radius){
  context.beginPath();
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill();
}

function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1);   // 起点
  context.lineWidth = lineWidth;
  context.lineTo(x2,y2);   // 终点
  context.closePath();
  context.stroke();
}

function listonToUser(canvas){
  var using = false;
  var lastPoint = {
	x:undefined,
	y:undefined
  }
  // 特性检测
  if(document.body.ontouchstart !== undefined){
		// 触屏设备
		canvas.ontouchstart = function(aaa){
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      using = true;
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10); // 鼠标默认位置为长方形左上角
    	}else{
    		lastPoint = {"x":x,"y":y};
    		drawCircle(x,y,circleSize);
      }
		}
		canvas.ontouchmove = function(aaa){
      var x = aaa.touches[0].clientX;
    	var y = aaa.touches[0].clientY;
    	if(!using) {return}
    	if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10);
    	}else{
        var newPoint = {"x":x,"y":y};
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
    	}
		}
		canvas.ontouchend = function(aaa){
      using = false;
		}
  }else{
		// 非触屏设备
		canvas.onmousedown = function(aaa){
      var x = aaa.clientX;
      var y = aaa.clientY;
      using = true;
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10); // 鼠标默认位置为长方形左上角
      }else{
        lastPoint = {"x":x,"y":y};
        drawCircle(x,y,circleSize);
      }
    }
    canvas.onmousemove = function(aaa){
      var x = aaa.clientX;
      var y = aaa.clientY;
      if(!using) {return}
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10);
      }else{
      var newPoint = {"x":x,"y":y};
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
      }
    }
    canvas.onmouseup = function(aaa){
      using = false;
    }
  }	
}

