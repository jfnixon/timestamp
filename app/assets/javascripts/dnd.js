/*
 * Place all the behaviors and hooks related to the matching controller here.
 * All this logic will automatically be available in application.js.
 * You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
 */

/* register the dropzone div, which has id 'drop_area' */
$(document).ready(function() {
 
  // init event handlers
  $('#drop_area').on("dragenter", noopHandler);
  $('#drop_area').on("dragexit",  noopHandler);
  $('#drop_area').on("dragover",  noopHandler);
  $('#drop_area').on("drop",      dropHandler);
});

/* Stop propagation of DnD events */
function noopHandler(evt) {
  evt.originalEvent.stopPropagation();
  evt.originalEvent.preventDefault();
}

/* handle the dropped file */
function dropHandler(evt) {

	evt.originalEvent.stopPropagation();
	evt.originalEvent.preventDefault();
	
  var files = evt.originalEvent.dataTransfer.files;
	var count = files.length;

	alert("dropHandler fired for " + count + " files!");
	
	// Call the handler for each dropped file.
	for (i = 0; i < count; i++) {
		if ($('div#drop_result').is(':visible')) {
		        $('div#drop_result').hide();
		}
		if ($('div#drop_status').is(':hidden')) {
		        $('div#drop_status').show();
		}
		$('span#drop_filename').innerHTML = files[i].name;
		procFiles(files[i]);
	}
}

/* do the file processing, first, read the file in, then trigger the processing in handleReaderLoad */
function procFiles(file) {

	// document.getElementById("droplabel").innerHTML = "Processing " + file.name;

	var reader = new FileReader();

	// init the reader event handler (we'll need extra error processing here)
	reader.onload = handleReaderLoad;

	// begin the read operation, encoding the data as Base64
	reader.readAsDataURL(file);
}

/* process the file, when we show up here, the file is Base64 encoded */
function handleReaderLoad(evt) {
	file = evt.originalEvent.target.result;
	
	// pass this off to the Hash function
	
	hash = 1;
	
	// create the hash result and update the display
	if ($('div#drop_result').is(':hidden')) {
	        $('div#drop_result').show();
	}
	$('span#result_filename').innerHTML = file.name;
	$('span#result_datetime').innerHTML = 1;
	$('span#result_hash').innerHTML = hash;
}