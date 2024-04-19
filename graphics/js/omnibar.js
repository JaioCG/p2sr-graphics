// Switching the content of the omnibar
var divs = $('div[id^="content-"]').hide(), i = 0;
(function cycle() { 
    divs.eq(i).fadeIn(1000)
	    .delay(5000)
	    .fadeOut(1000, cycle);

	i = ++i % divs.length;
})();