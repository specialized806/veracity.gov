// Populate TOC navigation with h2 headings from main content
$(document).ready(function() {
	$("#toc-list").empty();
	$("main h2").each(function() {
		// Find the ID for the heading element
		var myID = $(this).attr("id");
		var myIDtoc = myID + "-TOC"
		var myIDsec = myID + "-SEC"

        // Wrap content under h2 in a section with the h2 heading
        $(this)
			.nextUntil("h2")
			.addBack()
			.wrapAll('<section id="' + myIDsec + '" />')

		// Define TOC li content with link to heading
		var listItem = "<li class='toc-item padding-left-1 padding-y-1 border-left-05 border-transparent' id='"+myIDtoc+"'><a class='text-no-underline' href='#" + myIDsec + "'>" + $(this).text() + "</a></li>";
		
		// Add TOC li for h2 elements
		$("#toc-list").append(listItem);
	});
});

// Higlight TOC items based on scroll position
 
$(window).scroll(function(){
    // Get current scroll position
    let scrollY = window.pageYOffset;
    let tocNavY = $("#toc-nav").offset();
    let stickyNav = tocNavY.top; 
    if (scrollY >= stickyNav) {
        $("#toc-nav").addClass("sticky");
    } else {
        $("#toc-nav").removeClass("sticky");
    }
    // Get section offset and height 
    $("main h2").each(function(){
        SectionID = $(this).attr("id");
        SectionTop = $(this).offset();
        SectionTopOffset = SectionTop.top - 50;
        NextTop = $(this).nextUntil("h2").height();
        NextTopOffset = SectionTop.top + NextTop + 50;
        if (
            scrollY > SectionTopOffset &&
            scrollY <= NextTopOffset
        ){
            $("#" + SectionID + "-TOC").addClass("active text-base-dark text-bold border-primary-darker");
            $("#" + SectionID + "-TOC").removeClass("border-transparent");
        } else {
            $("#" + SectionID + "-TOC").removeClass("active text-base-dark text-bold border-primary-darker");
            $("#" + SectionID + "-TOC").addClass("border-transparent");
        }
    });
});