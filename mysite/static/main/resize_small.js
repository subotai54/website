var onResize = function() {
  // apply dynamic padding at the top of the body according to the fixed navbar height
  $(".content-container").css("padding-top", $("nav.fixed-top").height()+20);
};
// attach the function to the window resize event
$(window).resize(onResize);

$(function() {
  onResize();
});