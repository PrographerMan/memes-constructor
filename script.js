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
  maxLineWidth: 18,
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
    const drawLine = (line, margin) => {
      this.context.strokeText(line, W.сanvasElement.width / 2, margin);
      this.context.fillText(line, W.сanvasElement.width / 2, margin);
    }
    
    const topCaptionWords = fstText.split(' ');
    const bottomCaptionWords = sndText.split(' ');
    
    let topCaptionLines = [''];
    let bottomCaptionLines = [''];
    
    let margin = 50;
    let marginBottom = 50;
    
    let currentRow = 0;
    let correntElementBottom = 0;

    const splitIntoLines = (wordsArray, linesArray, lineIterator) => {
      wordsArray.forEach((word) => {
        if ((linesArray[lineIterator] + word).length < W.maxLineWidth) {
          linesArray[lineIterator] += ` ${word}`;
        } else {
          linesArray.push(word);
          lineIterator++;
        }
      });
    }
    
    splitIntoLines(topCaptionWords, topCaptionLines, currentRow);
    splitIntoLines(bottomCaptionWords, bottomCaptionLines, correntElementBottom);
    
    for (var i = 0; i < topCaptionLines.length; i++) {
      if (!topCaptionLines[i]) break;
      
      drawLine(topCaptionLines[i], margin);
      margin += 50;
    }
    
    marginBottom *= bottomCaptionLines.length;
    for (var i = 0; i < bottomCaptionLines.length; i++) {
      if (!bottomCaptionLines[i]) break;

      drawLine(bottomCaptionLines[i], W.сanvasElement.height + 34 - marginBottom);
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

W.context.textAlign = 'center';
W.context.font = '48px ImpactRegular';
W.context.lineWidth = 10;
W.context.strokeStyle = '#fff';
W.context.lineJoin = 'round';

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
