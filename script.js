var W = {
  uploadFile: function(evt) {
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();

      reader.onload = function() {
        return function(e) {
          var a = W.imageInit(reader.result, 0, 0);
          W.drawScene(ctx);
        };
      }(f);

      reader.readAsDataURL(f);
    };
  },
  getById: function(e) {
    return e = document.getElementById(e);
  },
  drawCaptions: function(context, fstText, sndText) {
    context.textAlign="center";
    context.font = "48px ImpactRegular";
    context.lineWidth = 10;
    context.strokeStyle = '#fff';
    context.lineJoin = 'round';

    var linesArray = fstText.split(' ');
    var linesArrayBottom = sndText.split(' ');
    
    var newArray = ['','',''];
    var newArrayBottom = ['','',''];
    
    var margin = 50;
    var marginBottom = 50;
    
    var correntElement = 0;
    var correntElementBottom = 0;

    for(var i = 0; i < linesArray.length; i++) {
      if((newArray[correntElement] + linesArray[i]).length < 18) {
        newArray[correntElement] += (' ' + linesArray[i]);
      } else {
        newArray[correntElement + 1] = linesArray[i];
        correntElement++;
      }
    }
    
    for(var i = 0; i < linesArrayBottom.length; i++) {
      if((newArrayBottom[correntElementBottom] + linesArrayBottom[i]).length < 18) {
        newArrayBottom[correntElementBottom] += (' ' + linesArrayBottom[i]);
      } else {
        newArrayBottom[correntElementBottom + 1] = linesArrayBottom[i];
        correntElementBottom++;
      }
    }

    for(var i = 0; i < newArray.length; i++) {
      if(!newArray[i]) break;
      context.strokeText(newArray[i],
                         W.getCanvasHandle().width / 2,
                         margin);

      context.fillText(newArray[i],
                       W.getCanvasHandle().width / 2,
                       margin);
      margin += 50;
    }
    
    for(var i = 0; i < newArrayBottom.length; i++) {
      if(!newArrayBottom[i]) break;
      context.strokeText(newArrayBottom[i],
                         W.getCanvasHandle().width / 2,
                         W.getCanvasHandle().height - marginBottom);

      context.fillText(newArrayBottom[i],
                       W.getCanvasHandle().width / 2,
                       W.getCanvasHandle().height - marginBottom);
      //marginBottom * -1;
      marginBottom += 50
    }

    // верхний заголовок
    /*
    context.strokeText(fstText,
                       W.getCanvasHandle().width / 2,
                       100);

    context.fillText(fstText,
                     W.getCanvasHandle().width / 2,
                     100)
    
    // нижний заголовок
    context.strokeText(sndText,
                       W.getCanvasHandle().width / 2,
                       W.getCanvasHandle().height - 100);


    context.fillText(sndText,
                     W.getCanvasHandle().width / 2,
                     W.getCanvasHandle().height - 100);*/
  },
  drawPriorityArray: [],
  getCanvasHandle: function(){
    return document.getElementsByTagName('canvas')[0]
  },
  context: function() {
    var a = document.getElementsByTagName('canvas')[0];
    return a = a.getContext('2d')
  },
  drawScene: function(context) {
    context.clearRect(0,0,500,500);
    for(var i = 0; i < W.drawPriorityArray.length; i++) {
      context.drawImage(W.drawPriorityArray[i].img,
                        W.drawPriorityArray[i].x,
                        W.drawPriorityArray[i].y,
                        500,
                        500)
    }
    W.drawCaptions(ctx,
                   W.getById('text1').value.toUpperCase(),
                   W.getById('text2').value.toUpperCase());
  },
  imageInit: function(url, x, y) {
    var obj     = {};
    obj.img     = new Image();
    obj.img.src = url;
    obj.x       = x;
    obj.y       = y; 
    W.drawPriorityArray.push(obj);
    return obj;
  },
  setImageCoordinates: function(obj, x, y) {
    obj.x = x;
    obj.y = y;
    W.drawScene(ctx);
  },
}
var ctx = W.context();
var img1 = W.imageInit('http://placehold.it/500x500', 0, 0);

var content = document.getElementById('content-block');
content = content.getElementsByTagName('img');

document.getElementById('files').addEventListener('change', W.uploadFile, false);

for(var i = 0; i < content.length; i++) {
  content[i].addEventListener('click', function() {
    W.imageInit(this.src, 0, 0);
    W.drawScene(ctx);
  }, true)
}
setTimeout(function(){
  var a = document.getElementsByClassName('details-bar')[0];
  a.innerHTML = '';
}, 1000)
window.onload = function() {
  /*W.setImageCoordinates(W.drawPriorityArray[0],0,0);
      W.setImageCoordinates(W.drawPriorityArray[1],
                            W.getCanvasHandle().width - W.drawPriorityArray[1].img.width,
                            0);*/
  W.drawScene(ctx);
}