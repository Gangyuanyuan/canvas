var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

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
  context.lineWidth = 5;
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
      console.log('触摸')
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      using = true;
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10); // 鼠标默认位置为长方形左上角
    	}else{
    		lastPoint = {"x":x,"y":y};
    		drawCircle(x,y,3);
      }
		}
		canvas.ontouchmove = function(aaa){
      console.log('移动')
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
      console.log('离开')
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
        drawCircle(x,y,3);
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

