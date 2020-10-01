$("#mysideBar a").click(function(){
	$("#mysideBar a").removeClass("active");
	$(this).addClass("active");
}
	
);

$(".navbar-nav a").click(function(){
	$(".navbar-nav a").removeClass("active");
	$(this).addClass("active");
});


$("#navBtnMech").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#mech").offset().top
    }, 2000);
});
$("#navBtnElec").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#elec").offset().top
    }, 2000);
});
$("#navBtnWifi").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#wifi").offset().top
    }, 2000);
});
$("#navBtnMob").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#mob").offset().top
    }, 2000);
});
$("#navBtnCab").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#cab").offset().top
    }, 2000);
});
$("#navBtnCar").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#car").offset().top
    }, 2000);
});
$("#navBtnPest").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#pest").offset().top
    }, 2000);
});
$("#navBtnLaun").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#laun").offset().top
    }, 2000);
});
$("#navBtnSan").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#san").offset().top
    }, 2000);
});
$("#navBtnPlum").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#plum").offset().top
    }, 2000);
});
$("#navBtnCle").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#cle").offset().top
    }, 2000);
});