// dtk.js
// author: Anil Shankar
// date: Dec. 13, 2012
// purpose: collect dtk words data from users with a web interface and store the data in local storage

var n_words = 0;
var g_words_to_select = 3; 
/* shuffles an array */ 
shuffle = function(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

$(document).ready(function() {
	$("#donebtn").hide();
	$("#alert_msg").hide();
});

var dtk_array = ["Accessible", "Desirable", "Gets in the way", "Patronizing", "Stressful", "Appealing", "Easy to use", "Hard to use", "Personal", "Time-consuming", "Attractive", "Efficient", "High quality", "Predictable", "Time-saving", "Busy", "Empowering", "Inconsistent", "Relevant", "Too technical", "Collaborative", "Exciting", "Intimidating", "Reliable", "Trustworthy", "Complex", "Familiar", "Inviting", "Rigid", "Uncontrollable", "Comprehensive", "Fast", "Motivating", "Simplistic", "Unconventional", "Confusing", "Flexible", "Not valuable", "Slow", "Unpredictable", "Connected", "Fresh", "Organized", "Sophisticated", "Usable", "Consistent", "Frustrating", "Overbearing", "Stimulating", "Useful", "Customizable", "Fun", "Overwhelming", "Straight Forward", "Valuable"];
var dtk_rand_array = dtk_array.slice(); // copy the original list
shuffle(dtk_rand_array);
var btn_styles = ["btn-success btn-small", "btn-info btn-small", "btn-dropdown btn-small"]; //used for laying out the words
btn_style_idx = Math.floor(Math.random()*btn_styles.length); // pick a random style on every page load
var btn_style = btn_styles[btn_style_idx];
// create html for the table of words
var dtk_table_contents = "<table class=\"table table-striped table-condensed\"  id=\"dtk_table\" style=\"width:100%;\">"
var count = 0; // step through the 
// layout the dtk works in a table with the following r-c 
var n_rows = 8;
var n_cols = 7;
for (row = 0; row < n_rows; row++) {
	dtk_table_contents += "<tr>"
	for (col = 0; col < n_cols; col++) {
		if (typeof dtk_rand_array[count] == 'undefined') {
			// doesn't exist
			dtk_table_contents += "<td></td>";
		} else {
			// this needs to be a dtkButton
			var btn = "<button type=\"link\" class=\"btn " + btn_style + "\">" + dtk_rand_array[count] +
			//"<i class=\"icon-white icon-heart\">" +
			"</button>";
			dtk_table_contents += "<td>" + btn + "</td>";
		}
		count++;
	}
	dtk_table_contents += "</tr>"
}

dtk_table_contents += "</table>"

$("#dtk_words_table").append(dtk_table_contents);

var selected_words_arr = [ ];

$("#dtk_table :button").click(function() {
	//console.log($(this).attr("class"));
	// if a user clicks on a selected button then toggle its selection
	var curr_attr = $(this).attr("class");
	if (curr_attr == "btn btn-danger") {
		$((this)).attr("class", "btn " + btn_style);
		n_words--;
	} else {
		var word = $(this).text();
		//console.log(word);
		selected_words_arr.push(word);
		n_words++;

		//$("#selected_words").text(selected_words_arr.toString());
		//$((this)).attr("disabled", true);
		$((this)).attr("class", "btn btn-danger");
	}
	if (n_words >= g_words_to_select) $("#donebtn").fadeIn("slow");
	else $("#donebtn").fadeOut("slow");	
});

$("#donebtn").click(function() {
	console.log("Words selected: " + selected_words_arr.toString());
	if (typeof(localStorage) == "undefined") {
		alert("Your browser does not support HTML5 localStorage. Try upgrading.");
	} else {
		try {
			var d = new Date();
			var dstr = d.toLocaleString();
			localStorage[dstr] = selected_words_arr.toString();
			$("#alert_msg").show(); 
		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				alert("Quota exceeded!"); //data wasn’t successfully saved due to quota exceed so throw an error
			}
		}
	}
});

$('#alert_msg').bind('closed', function () {
  // do something…
  // alert("1-2 1-2 keep it on")
	$("#dtk_table :button").attr('disabled','disabled');
	$("#donebtn").hide(); 
})
/*
 words needs to be an array
*/
