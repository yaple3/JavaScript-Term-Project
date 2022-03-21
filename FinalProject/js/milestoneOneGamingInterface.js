//sideNav Menu (to open and close)
document.getElementById("open").addEventListener("click", openNav);
document.getElementById("close").addEventListener("click", closeNav);

function openNav() {
    document.getElementById("mySideNav").style.width = "60vw";
    document.getElementById("main").style.marginleft = "60vw";
}
function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
    document.getElementById("main").style.marginleft = "0";
}

//links to game pages
document.getElementById("burger").addEventListener("click", function(){
    location.assign("https://lisabalbach.com/yaple3/CIT190/FinalProject/burgerStacker.html");
});
document.getElementById("tic").addEventListener("click", function(){
    location.assign("https://lisabalbach.com/yaple3/CIT190/FinalProject/ticTacToe.html");
});
document.getElementById("memory").addEventListener("click", function(){
    location.assign("https://lisabalbach.com/yaple3/CIT190/FinalProject/memory.html");
});

//link to readme file in footer
document.getElementById("footer").addEventListener("click", function(){
    window.open("https://lisabalbach.com/yaple3/CIT190/FinalProject/readmeCopyrightInfo.txt");
});