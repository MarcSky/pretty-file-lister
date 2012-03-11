jQuery(function(jQuery) {  
	/*Initial load*/
	if(jQuery('#show_pages').attr('value') == '' || jQuery('#show_pages').attr('value') === undefined)
	{	
		jQuery.get(prettylistScriptParams.pluginUrl + '/styles/prettylist.css', updateImageUrls);
	}
	else
	{
		//If it contains a hash it's an alt style
		if((jQuery('#show_pages').attr('value')).indexOf('#') > 0){
			jQuery.get(prettylistScriptParams.altPluginUrl + jQuery('#show_pages').attr('value'), updateImageUrls);
		}
		else{
			jQuery.get(prettylistScriptParams.pluginUrl + '/styles/' + jQuery('#show_pages').attr('value'), updateImageUrls);
		}
	}
	
	/*After selecting a stylesheet*/
	jQuery('#show_pages').change(function(){
			//If it contains a hash it's an alt style
		if((jQuery('#show_pages').attr('value')).indexOf('#') > 0){
			jQuery.get(prettylistScriptParams.altPluginUrl + jQuery('#show_pages').attr('value'), updateImageUrls);
		}
		else{
			jQuery.get(prettylistScriptParams.pluginUrl + '/styles/' + jQuery('#show_pages').attr('value'), updateImageUrls);
		}
	
		//Load styles
		//jQuery.get(prettylistScriptParams.pluginUrl + '/styles/' + jQuery(this).attr('value'), updateImageUrls);
	});
	
	//Make image paths work in the previewer
	function updateImageUrls(data) {		
		//If it contains a hash it's an alt style
		if((jQuery('#show_pages').attr('value')).indexOf('#') > 0){
			//Make image paths work with a greedy regex
			//Uses "../i because we can't be sure if it will be images or img. 
			//Also uses ../../../ to fix style pack icons
			//Also looks for a bracket or quote to stop ../../ etc from matching
			//This will not always work.
			newData = data.replace( new RegExp( '"../i', 'g' ), '"' + prettylistScriptParams.altPluginUrl + 'i' );		
			newData = data.replace( new RegExp( '\\(../i', 'g' ),'(' +  prettylistScriptParams.altPluginUrl + 'i' );		
			newData = data.replace( new RegExp( '.../../../plugins/pretty-file-lister/', 'g' ),'(' +  prettylistScriptParams.pluginUrl + '' );	
		}
		else{
			//Make image paths work with a greedy regex
			newData = data.replace( new RegExp( '../images/', 'g' ), prettylistScriptParams.pluginUrl + 'images/' );
		}
		
		//Empty and refill styles section
		jQuery('#Previewer').empty().append(newData);
	}
});  