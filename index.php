<!DOCTYPE html>
<?php require("pic.php") ?>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Memes Generator</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="modal-overlay">
      <div id="templates" class="modal">
        <div class="modal-header clr">
          <span>Шаблоны</span>
          <input placeholder="Введите имя шаблона">
          <a class="close" href="#">✖</a>
        </div>
        <div id="content-block" class="clr">
		  <?php foreach (getPicArray() as &$pic) { ?>
			<a href="#"><img alt="Template" src="images/<?=$pic?>"></a>
		  <?php } ?>
		  <!--
		  <a href="#"><img alt="Template" src="images/img2.png"></a>
          <a href="#"><img alt="Template" src="images/img3.png"></a>
          <a href="#"><img alt="Template" src="images/img4.png"></a>
		  -->
        </div>
      </div>
    </div>
    <div id="top" class="clr">
      <span class="btn">О сайте</span>
    </div>
    <div id="canvas">
      <div id="btns">
        <input type="file" id="files" class="btn">
        <a href="#templates"><span class="btn">Выбрать шаблон</span></a>
      </div>
      <canvas width="500" height="500"></canvas>
      <div id="textes">
        <input id="text1" type="text" oninput="W.drawScene(ctx);" placeholder="Верхний заголовок">
        <input id="text2" type="text" oninput="W.drawScene(ctx);" placeholder="Нижний заголовок">
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>