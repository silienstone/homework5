  const createPoints=function(count,canvasWidth,canvasHeight){
      
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
	 canvas.width = canvasWidth;
	 canvas.height = canvasHeight;
			const rand = function(num) {
			return Math.floor(Math.random() * num) + 1;
			};
		const colorArray = [
		'red',
		'green',
		'AntiqueWhite'
		];
	 		
	 													const points = [];
					const creator = function(count){
					const box = {
          		  	x: rand(canvasWidth-30), 
            		y: rand(canvasHeight-30),
            		width: 30,
            		height: 30,
            		xDelta: 1,
            		yDelta: 1,
            		color: colorArray[rand(3)-1] 
    				};
                      
					if (count<=0)
		 			{ return points;}
                      points.push(box);
					creator(count-1);
					};
    	creator(count);
  		return points;
  };
  
  createPoints(10,500,300);