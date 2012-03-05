jQuery(function(jQuery) {  
	/*Initial load*/
	if(jQuery('#show_pages').attr('value') == '' || jQuery('#show_pages').attr('value') === undefined)
	{	
		jQuery.get(prettylistScriptParams.pluginUrl + '/styles/prettylist.css', updateImageUrls);
		
	}
	else
	{
		jQuery.get(prettylistScriptParams.pluginUrl + '/styles/' + jQuery('#show_pages').attr('value'), updateImageUrls);
	}
	
	/*After selecting a stylesheet*/	
	jQuery('#show_pages').change(function(){
		//Load styles
		jQuery.get(prettylistScriptParams.pluginUrl + '/styles/' + jQuery(this).attr('value'), updateImageUrls);
	});
	
	function updateImageUrls(data) {
		//Make image paths work with a greedy regex
		newData = data.replace( new RegExp( "../images/", "g" ), prettylistScriptParams.pluginUrl + '/images/' );
		//Empty and refill styles section
		jQuery('#Previewer').empty().append(newData);
	}
});  