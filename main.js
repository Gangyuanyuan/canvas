var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy);

listonToMouse(yyy);

var eraserEnabled = false;
eraser.onclick = function(){
  	eraserEnabled = true;
  	actions.className = 'actions x';
}
brush.onclick = function(){
  	eraserEnabled = false;
  	 actions.className = 'actions';
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
  	context.fillStyle = 'black';
  	context.arc(x,y,radius,0,Math.PI*2);
  	context.fill();
}

function drawLine(x1,y1,x2,y2){
  	context.beginPath();
  	context.strokeStyle = 'black';
  	context.moveTo(x1,y1);   // 起点
  	context.lineWidth = 5;
  	context.lineTo(x2,y2);   // 终点
  	context.closePath();
  	context.stroke();
}

function listonToMouse(canvas){
	var using = false;
	var lastPoint = {
		x:undefined,
		y:undefined
	}
	canvas.onmousedown = function(aaa){
		var x = aaa.clientX;
		var y = aaa.clientY;
		using = true;
		if(eraserEnabled){
    		context.clearRect(x-5,y-5,10,10); // 鼠标默认位置为长方形左上角
		}else{
			lastPoint = {"x":x,"y":y};
			drawCircle(x,y,1);
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