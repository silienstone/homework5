const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const backgroundImage = new Image();
backgroundImage.src = "https://www.gamedevmarket.net/media/get/82f4b4acb89222b8db3fde659103f06009b4b2b2.jpg"
const uniImg = new Image();
	  uniImg.src = "https://d1nqx6es26drid.cloudfront.net/app/uploads/2017/05/18154734/minion_w1_02.png"//"http://www.pngmart.com/files/3/Unicorn-PNG-Image.png" // 
const badguysimg =  new Image();
	  badguysimg.src = "http://fc08.deviantart.net/fs70/i/2013/216/9/5/nightmare_by_southernnight-d6gnlkt.png"
	  const swordimg = new Image ();
	  swordimg.src = "http://i1171.photobucket.com/albums/r545/Brahak/valentineblade_zps67c794d1.png"

const floorY = canvas.height - 310;
const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};
/*const createbadguys = function(count, canvasWidth, canvasHeight){
	  const guys = [];
	  const creator = function(n){
		if(n<=0){
			return "";
		} 
		guys.push({
			x: rand(canvasWidth - 270),
			y: rand(canvasHeight - floorY),
			width: 270,
			height: 240,
			xDelta: 5,
			yDelta: 5,
			img: badguysimg
		})
		creator(n-1);
	  }
	  creator(count);
	  return guys;
  };
   const guy = createbadguys(3, canvas.width,canvas.height);*/
const gameData = {
	uni:      {
		x: 0,
		y: floorY,
		img: uniImg,
		width: 250,
		height: 250,
		xdelta: 0,
		ydelta: 0
		},
	badguys: [
		{
		x: rand(1100)+200,
		y: floorY+20,
		img: badguysimg,
		width: 270,
		height: 240,
		xDelta: 2,		
		yDelta: 2
			},
		],
		
		gameOver: false,
		score: 0,
		shoot: false
	};
	const uni=gameData.uni;
	const sword = {
			x: uni.x + ((uni.width)/2),
			y: uni.y + ((uni.height)/2)-10,
			img: swordimg,
			width: uni.width/2,
			height:30,
			xdelta:10,
			ydelta:0,

		};
	
const draw = function(){
	context.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
	const guy1=gameData.badguys[0];
	context.drawImage(guy1.img, guy1.x, guy1.y, guy1.width, guy1.height); 
	const uni=gameData.uni;
	context.drawImage(swordimg,sword.x, sword.y, sword.width, sword.height);

	
	context.drawImage(uni.img, uni.x, uni.y, uni.width, uni.height);
	 context.font = "30px Arial";
			context.fillText("Score: " +gameData.score, 40, 40);
	

	
};
const leftKey = 37;
	const upKey = 38;
	const rightKey = 39;
	const downKey = 40;
	const space = 32;

document.addEventListener('keydown', function(event) {
	
	if(event.keyCode === rightKey) { 
		if (gameData.uni.x >= canvas.width+20 - gameData.uni.width)
         {gameData.uni.x = canvas.width+20- gameData.uni.width}
        gameData.uni.x +=5;

  	} else if (event.keyCode=== leftKey) {
  		if (gameData.uni.x <= -20){gameData.uni.x = -20}
  		gameData.uni.x -=5;
  	} else if (event.keyCode=== upKey) {
  		if (gameData.uni.ydelta===0) {

  		gameData.uni.ydelta=3}
  		}
  		if (event.keyCode === space ) { 
  			gameData.shoot = true ;
  		}
  	







  	
}, false);
   const checkCollide = function(object1, object2) {
            return object1.x < object2.x + object2.width && object1.x + object1.width > object2.x && object1.y < object2.y + object2.height && object1.y + object1.height > object2.y
        };

const updateData = function(){
	const uni = gameData.uni;
	const guy1=gameData.badguys[0];

	if(!gameData.shoot){if(checkCollide(uni,guy1)) {
                  alert("Game Over. Your score is "+ gameData.score );
                  gameData.gameOver = true;
                }else {gameData.score +=1;
                	guy1.x-=2;
                sword.x=uni.x;
	sword.y=uni.y + ((uni.height)/2)-10;}}
	 if (gameData.shoot){sword.x +=sword.xdelta;
	 	gameData.score +=1;
                	guy1.x-=2;}
	if (sword.x !== uni.x) {
                		if (checkCollide(sword,guy1)) { alert("YouWon!")}

                			else if (!checkCollide(sword,guy1)) {sword.x +=sword.xdelta;}
                	}
 if (gameData.uni.ydelta !==0) {
 	gameData.uni.y -= gameData.uni.ydelta;
 	if (gameData.uni.y <=  floorY - 310) { gameData.uni.ydelta = -gameData.uni.ydelta }
 		else if (gameData.uni.y > floorY) {
 	gameData.uni.y = floorY;
 	gameData.uni.ydelta = 0;
 }

  if (!checkCollide(uni,guy1)) {draw();}
 } 

};
const loop = function(){
	
 	draw();
 	updateData();
 	requestAnimationFrame(loop);
};
  	loop();
 	