define([
  'jquery',
	'plugins/tabify',
	'mustache',
	'plugins/twipsy',
	'plugins/popover'
], function($, Tabify){
		
	var JB = { 
		plugins : {
			tabify : Tabify
		},
		
		init : function(boot){
			if(typeof boot === "function") boot();
		} 
	};

	return JB;
});
