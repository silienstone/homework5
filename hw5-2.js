
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};
const colorArray= ['AntiqueWhite ','Silver ','DarkMagenta ', "AliceBlue " , "DarkGray ", "LightBlue  ", "LightSkyBlue ", 'DarkSalmon ','pink', 'DeepPink ', 'Fuchsia ','HotPink  ','LightPink  ','MediumVioletRed ','MediumOrchid ','Orchid ','Plum '];
  
  const createPoint = function(count, canvasWidth, canvasHeight){
	  const points = [];
	  const creator = function(n){
		if(n<=0){
			return "";
		} 
		points.push({
			x: rand(canvasWidth - 30),
			y: rand(canvasHeight - 30),
			width: 15,
			height:15,
			xDelta: rand(20),
			yDelta: rand(20),
			color: colorArray[rand(17)-1]
		})
		creator(n-1);
	  }
	  creator(count);
	  return points;
  };
  const point = createPoint(100, canvas.width,canvas.height);
  const draw = function(){  
context.clearRect(0,0,canvas.width,canvas.height);
	  const drawforeach = function(arr,idx){
		  if(idx === arr.length){
			  return "";
		  }
		  context.fillStyle = arr[idx].color;
		context.fillRect(arr[idx].x,arr[idx].y, arr[idx].width,arr[idx].height);
		  drawforeach(arr,idx+1);
	  };
	  drawforeach(point,0);
  };
 
  
  const updateData = function(){
	  const foreach = function(arr, idx){
		  if(idx === arr.length){
			  return "";
		  }
		  if(arr[idx].x >= canvas.width-arr[idx].width){
			arr[idx].xDelta = -arr[idx].xDelta;
			arr[idx].color = colorArray[rand(17)-1];
		}else if(arr[idx].x<=0){
			arr[idx].xDelta = -arr[idx].xDelta;
			arr[idx].color = colorArray[rand(17)-1];
		}
		if(arr[idx].y >= canvas.height-arr[idx].height){
			arr[idx].yDelta = -arr[idx].yDelta;
			arr[idx].color = colorArray[rand(17)-1];
		}else if(arr[idx].y<=0){
			arr[idx].yDelta = -arr[idx].yDelta;
			arr[idx].color = colorArray[rand(17)-1];
		}
		arr[idx].x =arr[idx].x + arr[idx].xDelta;
		arr[idx].y = arr[idx].y + arr[idx].yDelta;
		foreach(arr,idx+1);
	  };
	  foreach(point,0);
  };
const loop = function(){
    
    draw();
    updateData();
    window.requestAnimationFrame(loop);
  };
  
  loop();
    

			