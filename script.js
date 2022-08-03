var W = {
  uploadFile: function(evt) {
    const image = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      W.imageInit(reader.result, 0, 0);
      W.drawScene(ctx);
    };

    reader.readAsDataURL(image);
  },

  getById: function(e) {
    return e = document.getElementById(e);
  },

  drawCaptions: function(context, fstText, sndText) {
    context.textAlign="center";
    context.font = '48px ImpactRegular';
    context.lineWidth = 10;
    context.strokeStyle = '#fff';
    context.lineJoin = 'round';

    
    var linesArray = fstText.split(' ');
    var linesArrayBottom = sndText.split(' ');
    
    var newArray = [''];
    var newArrayBottom = [''];
    
    var margin = 50;
    var marginBottom = 50;
    
    var correntElement = 0;
    var correntElementBottom = 0;
    
    var newFontSize = 48;
    var maxLineWidth = 18;
    
    for(var i = 0; i < linesArray.length; i++) {
      if((newArray[correntElement] + linesArray[i]).length < maxLineWidth) {
        newArray[correntElement] += (' ' + linesArray[i]);
      } else {
        newArray[correntElement + 1] = linesArray[i];
        correntElement++;
      }
    }
    
    for(var i = 0; i < linesArrayBottom.length; i++) {
      if((newArrayBottom[correntElementBottom] + linesArrayBottom[i]).length < maxLineWidth) {
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
    
    marginBottom *= newArrayBottom.length;
    for(var i = 0; i < newArrayBottom.length; i++) {
      if(!newArrayBottom[i]) break;
      context.strokeText(newArrayBottom[i],
                         W.getCanvasHandle().width / 2,
                         W.getCanvasHandle().height + 34 - marginBottom);

      context.fillText(newArrayBottom[i],
                       W.getCanvasHandle().width / 2,
                       W.getCanvasHandle().height + 34 - marginBottom);
      marginBottom -= 50
    }
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
    obj.img     = new Image(W.getCanvasHandle().width, W.getCanvasHandle().height);
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
var img1 = W.imageInit('https://placehold.jp/500x500.png', 0, 0);

var content = document.getElementById('content-block');
content = content.getElementsByTagName('img');

document.getElementById('files').addEventListener('change', W.uploadFile, false);

for(var i = 0; i < content.length; i++) {
  content[i].addEventListener('click', function() {
    W.imageInit(this.src, 0, 0);
    W.drawScene(ctx);
  }, true)
}
