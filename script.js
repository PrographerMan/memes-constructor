class AppImage {
  constructor(url, x, y) {
    this.url = url;
    this.img = new Image(W.сanvasElement.width, W.сanvasElement.height);
    this.img.src = url; 
    this.x = x;
    this.y = y;

    W.drawPriorityArray.push(this);
  }
}

var W = {
  templatesBlock: document.getElementById('templates'),
  fileInput: document.getElementById('files'),
  topTextField: document.getElementById('text1'),
  bottomTextField: document.getElementById('text2'),
  сanvasElement: document.getElementById('canvas'),
  context: document.getElementById('canvas').getContext('2d'),

  // массив изображений, которые рисуются
  drawPriorityArray: [],

  uploadFile: function(evt) {
    const image = evt.target.files[0];
    let reader = new FileReader();
    
    reader.onload = () => {
      new AppImage(reader.result, 0, 0);
      W.drawScene();
    };

    reader.readAsDataURL(image);
  },

  drawCaptions: function(fstText, sndText) {
    this.context.textAlign = 'center';
    this.context.font = '48px ImpactRegular';
    this.context.lineWidth = 10;
    this.context.strokeStyle = '#fff';
    this.context.lineJoin = 'round';
    
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
    
    for (var i = 0; i < linesArrayBottom.length; i++) {
      if ((newArrayBottom[correntElementBottom] + linesArrayBottom[i]).length < maxLineWidth) {
        newArrayBottom[correntElementBottom] += (' ' + linesArrayBottom[i]);
      } else {
        newArrayBottom[correntElementBottom + 1] = linesArrayBottom[i];
        correntElementBottom++;
      }
    }
    
    for (var i = 0; i < newArray.length; i++) {
      if (!newArray[i]) break;
      this.context.strokeText(newArray[i],
                         W.сanvasElement.width / 2,
                         margin);

      this.context.fillText(newArray[i],
                       W.сanvasElement.width / 2,
                       margin);
      margin += 50;
    }
    
    marginBottom *= newArrayBottom.length;
    for (var i = 0; i < newArrayBottom.length; i++) {
      if (!newArrayBottom[i]) break;
      this.context.strokeText(newArrayBottom[i],
                         W.сanvasElement.width / 2,
                         W.сanvasElement.height + 34 - marginBottom);

      this.context.fillText(newArrayBottom[i],
                       W.сanvasElement.width / 2,
                       W.сanvasElement.height + 34 - marginBottom);
      marginBottom -= 50
    }
  },

  drawScene: function() {
    this.context.clearRect(0, 0, this.сanvasElement.width, this.сanvasElement.height);
    
    this.drawPriorityArray.forEach((image) => {
      this.context.drawImage(image.img, image.x, image.y, 500, 500)
    });
    
    W.drawCaptions(W.topTextField.value.toUpperCase(),
                   W.bottomTextField.value.toUpperCase());
  },
}

var img1 = new AppImage('https://placehold.jp/500x500.png', 0, 0);

let templates = Array.prototype.slice.call(
  W.templatesBlock.getElementsByTagName('img')
);

templates.forEach(template => {
  template.addEventListener('click', () => {
    new AppImage(template.src, 0, 0);
    W.drawScene();   
  }, true);
});

W.fileInput.addEventListener('change', W.uploadFile, false);
W.topTextField.addEventListener('input', () => W.drawScene(), false);
W.bottomTextField.addEventListener('input', () => W.drawScene(), false);
