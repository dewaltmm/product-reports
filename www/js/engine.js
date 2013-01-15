// JavaScript Document
//Constructor for ProductReport object
function ProductReport(series,title,url)
{
		this.series = series;
		this.title = $.trim(title);
		this.url = $.trim(url);	
}

	//on document load, do these things...
	$(document).ready(function(){
		//jquery ajax request to apa server to get most recent ProductReportsDD-MM-YYYY.txt 
		$.get('http://www.apawood.org/ProductReports.txt', function(data){
		  handle(data);
		  });
     });

	 //function to parse '|' delimited data from $.get()
	 function handle(data){
		 var array = data.split('|');
		 var i = 3;
		 productReports = new Array();	
		 id=0;
		 while(i < array.length-1){
			 productReports[id] = new ProductReport(array[i], array[i+1], array[i+2]);
			 id++; i=i+3;	
		 }
		 displayArray(productReports);
	 }

	//parse array of ProductReport objects to create a string "links" of html, then
	//set html in "link-list-container" to string "link"
	//create a jQuery listview with $("#link-list").listview(); 
	//uses jQuery Mobile listview and data-filter
	function displayArray(prArray){
		//declare the placeholder for search area
		var placeholder = "Search for Product Report";
		//links is an html list with jquery mobile markups for dividers
		//initalize links variable with firs tlist divider and the first
		//product report, then loop prArray to finish building links variable
		var links = "<li data-role='list-divider'>" + prArray[0].series + " Series</li><li><a href='"+prArray[0].url+"'>"+prArray[0].title+"</a></li>";
		for(i=1;i<prArray.length;i++){
			if(prArray[i].series!=prArray[i-1].series){
				links += "<li data-role='list-divider'>" + prArray[i].series + " Series</li>";
				}
			links += "<li><a href='"+prArray[i].url+"'>"+prArray[i].title+"</a></li>";
		}
		//set content of link-list-container div to contain a list with populated links variable, 
		$('#link-list-container').html('<ul id="link-list" data-role="listview" data-inset="true" data-filter="true" data-filter-placeholder="'+placeholder+'">'+links+'</ul>');
		//render link-list div as a jquery mobile listview
		$("#link-list").listview();
	}


