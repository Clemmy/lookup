
var lwip = require('lwip');

function getImageDataAndCreate(){
	lwip.open('arch.jpg', function(err, image){
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
		createImage(frameData);
	});
}

function setXYPixel(x, y, frameData, image){
	if (x == image.height()){
		image.writeFile('newImage.jpg', function(err){
				console.log('done');
		});
	} else {
		var colourSum = frameData[x][y].r + frameData[x][y].g + frameData[x][y].b;
		var data = frameData[x][y];
	
		if (colourSum < 500){
			data = {r: 0, g: 0, b:0, a: data.a};
		}

		image.setPixel(x, y, data, function(err){
			if (y == image.width() - 1){
				y = 0;
				x += 1;
			} else {
				y += 1;	
			}
			setXYPixel(x, y, frameData, image);
		});	
	}

	return;
}

function createImage(frameData){
	lwip.open('arch.jpg', function(err, image){
		var height = image.height();
		var width = image.width();

		lwip.create(width, height, [0, 0, 0], function(err, newImage){
			setXYPixel(0, 0, frameData, newImage);			
		});
	});
}

getImageDataAndCreate();

