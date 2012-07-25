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
	
	// turn on the table
	if ($('#drop_result').css('visibility') == 'hidden') {
		$('#drop_result').css('visibility', 'visible');
	};

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
			
			  output.push('<tr><td><button class=\'btn btn-primary\'>Save</button></td>');
			  output.push('<td><strong>', file.name, '</strong></td><td>', file.type || 'n/a', '</td>');
			  output.push('<tdd class=\'td_size\' style=\'visibility: hidden\'>', file.size, '</td>');
			  output.push('<tdd class=\'td_hash\' style=\'visibility: hidden\'>', hash, '</td></tr>');			
			  $('#drop_result').append(output.join(''));
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
