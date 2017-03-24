<?php


function getPicArray() {
	$array = scandir("images/");
	unset($array[1]);
	unset($array[0]);
	return $array;
}

?>
