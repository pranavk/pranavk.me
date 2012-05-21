define([
  'jquery',
	'mustache'
], function($, z){
	
	var Tabify = {
	  headingTag : "h3",
	  template : '<ul class="tabs">[[#tabs]]<li><a href="#">[[.]]</a></li>[[/tabs]]</ul>',
	  names : [],
  
	  init : function(containerSelector, headingTag){
	    Tabify.$container = $(containerSelector);
	    if (headingTag) Tabify.headingTag = headingTag;

	    Tabify.$headings = Tabify.$container.find(Tabify.headingTag);
	    Tabify.$headings.each(function(i){
	      Tabify.names.push($(this).text())
	      $(this).nextUntil(Tabify.headingTag).wrapAll('<span class="tab_content"></span>');
	    })
	    Tabify.$list = $($.mustache(Tabify.template, {tabs : Tabify.names }));
	    Tabify.$slides = Tabify.$container.find(".tab_content");

	    Tabify.$list.insertBefore(Tabify.$headings[0])
	      .find("a").click(function(e){
	        Tabify.$slides.hide().eq($(this).parent().index()).show();
	        Tabify.$list.find("li").removeClass("active");
	        $(this).parent().addClass("active");
	        e.preventDefault();
	        return false;
	      })
    
	    Tabify.start();
	  },
	  start : function(){
	    Tabify.$headings.hide();
	    Tabify.$slides.hide();
	    Tabify.$list.find("a").first().click();
	  }
	}
	
	return Tabify;
});

