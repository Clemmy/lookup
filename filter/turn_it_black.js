
var lwip = require('lwip');
var path = require('path');

function getImageDataAndCreate(input, output){
	lwip.open(input, function(err, image){
		if (!image){
			console.log('Problem loading image');
			return;
		}

		var height = image.height();
		var width = image.width();

		var pixelData;
		var frameData = [];
		for (var i = 0; i < height; i++){
			frameData.push([]);
			for (var j = 0; j < width; j++){
				frameData[i].push(image.getPixel(j, i));
			}
		}
		createImage(frameData, input, output);
	});
}

function setXYPixel(x, y, frameData, image, output){
	if (x == image.height()){
		image.writeFile(output, function(){
				console.log('done');
		});
	} else {
		var colourSum = frameData[x][y].r + frameData[x][y].g + frameData[x][y].b;
		var data = frameData[x][y];
	
		if (colourSum < 500){
			data = {r: 0, g: 0, b:0, a: data.a};
		}

		image.setPixel(y, x, data, function(err){
			if (y == image.width() - 1){
				y = 0;
				x += 1;
			} else {
				y += 1;	
			}
			setXYPixel(x, y, frameData, image, output);
		});	
	}

	return;
}

function createImage(frameData, input, output){
	lwip.open(input, function(err, image){
		var height = image.height();
		var width = image.width();

		lwip.create(width, height, [0, 0, 0], function(err, newImage){
			setXYPixel(0, 0, frameData, newImage, output);			
		});
	});
}

//getImageDataAndCreate(process.argv[2], process.argv[3]);
// getImageDataAndCreate('4.jpg', '4-out.jpg');
// getImageDataAndCreate('5.jpg', '5-out.jpg');
//console.log(process.argv[2], process.argv[3]); 

