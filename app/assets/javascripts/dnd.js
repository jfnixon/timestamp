/*
 * Place all the behaviors and hooks related to the matching controller here.
 * All this logic will automatically be available in application.js.
 * You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
 */

/* register the dropzone div, which has id 'drop_area' */
$(document).ready(function() {
 
  // init event handlers
  $("div#drop_area").get(0).addEventListener("dragenter", noopHandler, false);
  $("div#drop_area").get(0).addEventListener("dragexit",  noopHandler, false);
  $("div#drop_area").get(0).addEventListener("dragover",  noopHandler, false);
  $("div#drop_area").get(0).addEventListener("drop",      dropHandler, false);
});

/* Stop propagation of DnD events */
function noopHandler(evt) {
  evt.stopPropagation();
  evt.preventDefault();
}

/* handle the dropped file */
function dropHandler(evt) {

	evt.stopPropagation();
	evt.preventDefault();
	
  var files = evt.dataTransfer.files;
	var count = files.length;

	alert("dropHandler fired for " + count + " files!");
	
	// Call the handler for each dropped file.
	if (i = 0; i < count; i++) {}
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
	file = evt.target.result;
	
	// pass this off to the Hash function
	
	hash = 1;
	
	// create the hash result and update the display
	
}