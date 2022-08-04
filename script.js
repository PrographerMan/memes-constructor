class AppImage {
  constructor(url, x, y) {
    this.url = url;
    this.img = new Image(W.сanvasElement.width, W.сanvasElement.height);
    this.img.src = url; 
    this.x = x;
    this.y = y;

    W.objectsForDrawing.push(this);
  }
}

var W = {
  maxLineWidth: 19,

  templatesBlock: document.getElementById('templates'),
  
  fileInput: document.getElementById('files'),
  
  topTextField: document.getElementById('text1'),
  
  bottomTextField: document.getElementById('text2'),
  
  сanvasElement: document.getElementById('canvas'),
  
  context: document.getElementById('canvas').getContext('2d'),

  /**
   * Объекты для рисования
   */
  objectsForDrawing: [],

  uploadFile: function(event) {
    const image = event.target.files[0];
    let reader = new FileReader();
    
    reader.onload = () => {
      new AppImage(reader.result, 0, 0);
      W.drawScene();
    };

    reader.readAsDataURL(image);
  },

  drawCaptions: function(topFieldText, bottomFieldText) {
    const drawLine = (line, margin) => {
      this.context.strokeText(line, W.сanvasElement.width / 2, margin);
      this.context.fillText(line, W.сanvasElement.width / 2, margin);
    }

    const splitIntoLines = (words) => {
      let lines = [''];
      let lineIndex = 0;

      words.forEach((word) => {
        // вмещается ли слово в строку
        if ((lines[lineIndex] + word).length < W.maxLineWidth) {
          lines[lineIndex] += ` ${word}`;
        
        // создадим новую строку
        } else {
          lines.push(word);
          lineIndex++;
        }
      });

      return lines;
    }
    
    const topCaptionWords = topFieldText.split(' ');
    const bottomCaptionWords = bottomFieldText.split(' ');
    
    let topCaptionLines = splitIntoLines(topCaptionWords);
    let bottomCaptionLines = splitIntoLines(bottomCaptionWords);
    
    let margin = 50;
    let marginBottom = 50;
    
    topCaptionLines.forEach((line) => {
      if (!line) return;
      
      drawLine(line, margin);
      margin += 50;
    });
    
    marginBottom *= bottomCaptionLines.length;
    
    bottomCaptionLines.forEach((line) => {
      if (!line) return;

      drawLine(line, W.сanvasElement.height + 34 - marginBottom);
      marginBottom -= 50
    })
  },

  drawScene: function() {
    this.context.clearRect(0, 0, this.сanvasElement.width, this.сanvasElement.height);
    
    this.objectsForDrawing.forEach((image) => {
      this.context.drawImage(image.img, image.x, image.y, 500, 500)
    });
    
    W.drawCaptions(W.topTextField.value.toUpperCase(),
                   W.bottomTextField.value.toUpperCase());
  },
}

W.context.textAlign = 'center';
W.context.fillStyle = '#fff';
W.context.font = '48px ImpactRegular';
W.context.lineWidth = 10;
W.context.strokeStyle = '#000';
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
