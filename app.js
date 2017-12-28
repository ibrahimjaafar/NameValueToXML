
/**
By Ibrahim Jaafar

Key/Value to XML

**/


var pairs=[];
is_xml = false;
function add(nameValue) {
	
	var namevalue = nameValue.value;

	var nameRgx = /^[\w]+[\s]*$/g;
	var valueRgx = /^[\s]*[\w]+$/g;
	
	var pair = namevalue.split('=');
	
	//Error checking
	if (pair[0].match(nameRgx) ===  null || pair[1].match(valueRgx) === null){
		$(".errorText").text("Invalid input! Input must be alpha-numeric. e.g Name=Value");
			return;
	}
	else
		$(".errorText").text("");
	
	var name = $.trim(pair[0]);
	var value = $.trim(pair[1]);
	

	pairs[name] = value;
	
	
	//Add the pair to the list	
	$(".container").append("<p class="+""+">"+name + "=" + value+"</p>");
	
	//Call highlight in each function
	highlight();
	
}

//Delete name from the list
$("[name=delete]").click(function(){
		for (var key in pairs) {
    if (pairs.hasOwnProperty(key) ) {
		if ($("p:contains("+"'"+key+"'"+")").hasClass('highlight')){
			delete pairs[key];
		}
		}}
		$(".highlight").remove();
});
	
//Sort the list by name
$("[name=sortbyname]").click(function(){
	
		$("p").remove();
		const sorted = [];
		//Loop through sorted keys 
		Object.keys(pairs).sort().forEach(function(key) {
		sorted[key] = pairs[key];
		});
		pairs=sorted;
		for (var key in pairs) {
		if (pairs.hasOwnProperty(key) ) {
		$(".container").append("<p class="+""+">"+key + "=" + pairs[key]+"</p>");
	}
	}
		highlight();
});
	
	
//Sort the list by values
$("[name=sortbyvalue]").click(function(){
		$("p").remove();
		const sorted = [];
		
		for (i = 0; i < Object.keys(pairs).length; i++){
			for (j = 0; j < Object.keys(pairs).length; j++){
			//if the value at index j is the same as the sorted key on index i
			//then set the value to that name and break the loop
			if (pairs[Object.keys(pairs)[j]] === Object.values(pairs).sort()[i] ){
			sorted[Object.keys(pairs)[j]] = Object.values(pairs).sort()[i];
			break;
			}
			}
		}
		pairs=sorted;
		for (var key in pairs) {
		if (pairs.hasOwnProperty(key) ) {
		$(".container").append("<p class="+""+">"+key + "=" + pairs[key]+"</p>");
	}
	}
		highlight();
});
	
	
//Convert list to XML
$("[name=toxml]").unbind('click').click(function(){
		$("p").remove();
		for (var key in pairs) {
		if (pairs.hasOwnProperty(key) ) {
		if(!is_xml){
		$(".container").append("<p class="+""+">"+"&lt;pair&gt; &lt;name&gt;"+ key+"&lt;/name&gt; &lt;value&gt;" + pairs[key]+"&lt;/value&gt; &lt;/pair&gt;"+"</p>");
		}
		else{
		$(".container").append("<p class="+""+">"+key + "=" + pairs[key]+"</p>");
		}
	}
	}
	is_xml = is_xml ? false: true;
	highlight();
});

//Used to select the pairs
function highlight(){
	$("p").unbind('click').click(function(event) {
		$(this).toggleClass("highlight");
	});
}