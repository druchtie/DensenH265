var fs = require('fs');

var ffmpeg = require('fluent-ffmpeg');
// Setting ffmpeg path to ffmpeg binary for os x so that ffmpeg can be packaged with the app.
//ffmpeg.setFfmpegPath("./bin/ffmpeg")
//because of the nature of ffmpeg, this can take both audio or video files as input
var command = ffmpeg();

document.getElementById("drop").addEventListener('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      
      

let count = 0;
for (let f of e.dataTransfer.files) {

	count = count + 1;	
		

var droparea = document.getElementById("settings");
	droparea.classList.add("active");


var lexport = document.getElementById("export");
	lexport.classList.add("active");

var limport = document.getElementById("import");
	limport.classList.add("active");


var path = f.path;
var dir = path.substring(0, path.lastIndexOf("."));


var n = path.lastIndexOf('/');
var result = path.substring(n + 1);

var encoding = document.getElementById('encoding');
var tune = document.getElementById('tune');
var resolution = document.getElementById('resolution'); 




    var div = document.createElement('div');
    
     div.className = 'progress-holder';
     
     div.innerHTML =
     '<div class="video-name video-name'+count +'">Loading...</div>\
			<div class="status">\
				<div class="progress progress'+count +'" ><div class="percent percent'+count +'"></div></div>\
	</div>';	
	
    document.getElementById('settings').appendChild(div);


	document.getElementsByClassName("video-name"+ count)[0].innerHTML= result;

ffmpeg(f.path)
  .videoCodec('libx265')	
  .size('?x' + resolution.value)
  .videoBitrate(400000)
  .outputOptions(['-strict -2','-tag:v hvc1', '-pix_fmt yuv420p', '-preset ' + encoding.value , '-profile:v main10'])
  .output( dir+'-converted.mov')


  .on('progress', function(progress) {
	    

    var percent = Math.round(progress.percent);
    document.getElementsByClassName("percent"+ count)[0].innerHTML= percent + '%';
    document.getElementsByClassName("progress"+ count)[0].style.width= percent + '%';


	})
	
  .on('end', function() {
   	//console.log('Finished processing');
    document.getElementsByClassName("percent"+ count)[0].innerHTML='Done';

	droparea.classList.remove("active");
	limport.classList.remove("active");
	lexport.classList.remove("active");
	

	var paras = document.getElementsByClassName('progress-holder');

	while(paras[0]) {
    	paras[0].parentNode.removeChild(paras[0]);
	}


  })
  .run();
   
      }
    });
    
    
    document.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });





