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
    context.font = "48px Impact";
    context.lineWidth = 10;
    context.strokeStyle = '#fff';
    context.lineJoin = 'round';

    /*
          var margin = 100;
          var arrayOfStrings = fstText.split(' '),
              a              = 0,
              newArray       = [],
              str;

          for(var i = 0; i < arrayOfStrings.length; i++) {
            str += arrayOfStrings[i] + ' ';
            a += arrayOfStrings[i].length;
            if(a >= 12) {
              newArray.push(str);
              a = 0;
              str = '';
            }
          }


          for(var i = 0; i < newArray.length; i++) {
            context.strokeText(newArray[i],
                               W.getCanvasHandle().width / 2,
                               margin);
            context.fillText(newArray[i],
                             W.getCanvasHandle().width / 2,
                             margin)
            margin += 50;
          }
          newArray = [];*/

    // верхний заголовок
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
                     W.getCanvasHandle().height - 100);
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

window.onload = function() {
  /*W.setImageCoordinates(W.drawPriorityArray[0],0,0);
      W.setImageCoordinates(W.drawPriorityArray[1],
                            W.getCanvasHandle().width - W.drawPriorityArray[1].img.width,
                            0);*/
  W.drawScene(ctx);
}