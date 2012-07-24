/*
 * Place all the behaviors and hooks related to the matching controller here.
 * All this logic will automatically be available in application.js.
 * You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
 */

/* register the dropzone div, which has id 'drop_area' */
$(document).ready(function() {
	
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	  // Great success! All the File APIs are supported.
	} else {
	  bootbox.alert('The File APIs are not fully supported in this browser.');
	  return;
	}

  // init event handlers
  $('#drop_area').on("dragenter", nobubbleHandler);
  $('#drop_area').on("dragexit",  nobubbleHandler);
  $('#drop_area').on("dragover",  nobubbleHandler);
  $('#drop_area').on("drop",      dropHandler);
});

/* Stop bubbling propagation of DnD events */
function nobubbleHandler(evt) {
  evt.originalEvent.stopPropagation();
  evt.originalEvent.preventDefault();
}

// show this is a copy event
function dragoverHandler(evt) {
	nobubbleHandler(evt);
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

/* handle the dropped file */
function dropHandler(evt) {
  evt.originalEvent.stopPropagation();
  evt.originalEvent.preventDefault();

  var files = evt.originalEvent.dataTransfer.files;
	var count = files.length;

	// Issue an async read for each dropped file.
	// Precess the file when the read completes.
	// Move the HTML stuff out soon.
	for (var i = 0; i < count; i++) {
		var reader = new FileReader();
		var f = files[i];
		
		reader.onerror = errorHandler;
		reader.onload  = (function(file) { return function(e) {
			  var hash = hex_sha512(e.target.result);
			  var output = [];
			
			  output.push('<li><strong>', file.name, '</strong> (', file.type || 'n/a', ') - ', file.size, ' bytes</li>');
			  // create the hash result and update the display
			  $('#drop_result').append('<p><b>Hash: </b>' + hash + '</p>');			
			  $('#drop_status').append('<ul>' + output.join('') + '</ul>');
		  };
		})(f);

		reader.readAsDataURL(f);
	}
}

function errorHandler(evt) {
	switch(evt.target.error.code) {
		case evt.target.error.NOT_FOUND_ERR:
			bootbox.alert('File ' + evt.target.name + ' Not Found!');
			break;
		case evt.target.error.NOT_READABLE_ERR:
			bootbox.alert('File ' + evt.target.name + ' is not readable!');
			break;
		case evt.target.error.ABORT_ERR:
		  bootbox.alert('File ' + evt.target.name + ' read was aborted!')
			break; // noop
		default:
			bootbox.alert('An error occurred reading ' + evt.target.name);
	};
}
