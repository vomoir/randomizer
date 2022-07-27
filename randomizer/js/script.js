$.fn.randomize = function(selector){
	var $elems = selector ? $(this).find(selector) : $(this).children(),
		$parents = $elems.parent();

	$parents.each(function(){
		$(this).children(selector).sort(function(){
			return Math.round(Math.random()) - 0.5;
		}).remove().appendTo(this);
	});

	return this;
};	
function startsWith(sVal ,pattern) {
	return sVal.lastIndexOf(pattern, 0) === 0;
}

function endsWith(sVal ,pattern) {
	var d = sVal.length - pattern.length;
	return d >= 0 && sVal.indexOf(pattern, d) === d;
}

function selectRandom(){
	$("#group").empty();				
	var grpSize = parseInt($("#gSize").val(),10);
	var grpMembers = "";
	var selCnt = 1;	
	var options = $("#sel > option");
	var optLen = options.length;
	//back up the members into an array
	var classMembers = $.map(options ,function(option) {
		return option.text;
	});
	
	//$('#sel > option').clone().appendTo('#ddlClone');	//make a backup of the data in case we want to do it again
	while (optLen > 0){					
		for(var i=0; i < grpSize; i++){
			options[Math.floor(Math.random() * optLen)].selected = true;
			var gmem = $('#sel :selected').text();
			if(gmem.length > 0){
				$('#sel :selected').remove();
				grpMembers += gmem + ", ";
			}
		}
		if(endsWith(grpMembers ,', ')){
			grpMembers = grpMembers.substring(0,grpMembers.length - 2);
		}
		
		//Arrange results in grid like format
		if(selCnt % 2 === 1){
			$("#group").append('<div class="ui-block-a"><div class="group"><strong>Group</strong> ' + parseInt(selCnt) + '<br/>' + grpMembers + '</div></div>');
		} else if (selCnt % 2 === 3) {
			$("#group").append('<div class="ui-block-c"><div class="group"><strong>Group</strong> ' + parseInt(selCnt) + '<br/>' + grpMembers + '</div></div>');
		} else {
			$("#group").append('<div class="ui-block-b"><div class="group"><strong>Group</strong> ' + parseInt(selCnt) + '<br/>' + grpMembers + '</div></div>');
		}
		
		grpMembers = "";	//clear the group ready to go again.				
		optLen -= grpSize;
		selCnt += 1;
	}
	//move the class members from array back to list
	var options = '';
	for (var i = 0; i < classMembers.length; i++) {
		options += '<option value="' + i + '">' + classMembers[i] + '</option>';
	}
	
	$('#sel').html(options);
	$.mobile.changePage('#uir_group', {transition:"pop",role:"page", reverse:true});

}
function clearGroups(){
	$("#group").empty();
}

var toast=function(msg){
	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>"+msg+"</h3></div>")
	.css({ display: "block", 
		opacity: 0.90, 
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "270px",
		left: ($(window).width() - 284)/2,
		top: $(window).height()/2 })
	.appendTo( $.mobile.pageContainer ).delay( 1500 )
	.fadeOut( 400, function(){
		$(this).remove();
	});
};
function supports_local_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}
function isAPIAvailable() {
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	  // Great success! All the File APIs are supported.
	  return true;
	} else {
	  // source: File API availability - http://caniuse.com/#feat=fileapi
	  // source: <output> availability - http://html5doctor.com/the-output-element/
	  document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
	  // 6.0 File API & 13.0 <output>
	  document.writeln(' - Google Chrome: 13.0 or later<br />');
	  // 3.6 File API & 6.0 <output>
	  document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
	  // 10.0 File API & 10.0 <output>
	  document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
	  // ? File API & 5.1 <output>
	  document.writeln(' - Safari: Not supported<br />');
	  // ? File API & 9.2 <output>
	  document.writeln(' - Opera: Not supported');
	  return false;
	}
}

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	var file = files[0];
	$("#group_name").val(escape(file.name));
	// read the file metadata
	var output = ''
		output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
		output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
		output += ' - FileSize: ' + file.size + ' bytes<br />\n';
		output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';
	//toast(output);
	// read the file contents
	printTable(file);

	// post the results
	//$('#list').append(output);
}
function printTable(file) {
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function(event){
		var csv = event.target.result;
		var data = $.csv.toArrays(csv);
		var options = '';
		for (var i = 0; i < data.length; i++) {
			options += '<option value="' + i + '">' + data[i] + '</option>';
		}
		$('#sel').html(options);
		$('#sel').randomize('option');
		toast("Class loaded");
	};
	reader.onerror = function(){ toast('Unable to read ' + file.fileName); };
}
