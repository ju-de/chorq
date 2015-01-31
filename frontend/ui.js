function test3() {
    showSheet(1,1);
}

var breadcrumb = "Search for a song...";
var description = "";
var url = "http://jamesy.us/porn/chorq/main.html";

function setTitle(subtitle) {
    description = subtitle;
    if(description == "")
        document.title = "Chorq";
    else
        document.title = "Chorq | "+description;
    // SET BUTTONS
    $(".kik-button").each(function(index) {
        $(this).data("title",((description=="")?"Chorq":description));
        $(this).data("description","Chorq: the hippest new way to share chords !!");
        $(this).data("url",url+window.location.hash); 
        $(this).data("pic","http://jamesy.us/porn/chorq/logo.png"); 
    });
}

function search(query) {
    if(query == "") {
        setBreadcrumb("Search for a song...");
        $("#searchbar").addClass("hidden");
        $("#searchresults").addClass("hidden");
        $("#home").removeClass("hidden");
        window.location.hash="#!/home";
        setTitle('');
    } else {
        setBreadcrumb(query);
        $("#searchbar").removeClass("hidden");
        $("#searchresults").removeClass("hidden");
        $("#home").addClass("hidden");
        window.location.hash="#!/search:"+query;
        setTitle('Search results for "'+query+'"');
    }
    hideFiles();
    $("#stack").addClass("hidden");
    $("#searchinput").blur();
    $("#bigsearchbar").blur();
    return false;
}

function setBreadcrumb(bc) {
    breadcrumb = bc;
    $("#searchinput").val(breadcrumb);
}

function searchFocus() {
    if($("#searchinput").val() == breadcrumb)
        $("#searchinput").val("");
}

function searchBlur() {
    if($("#searchinput").val() == "")
        $("#searchinput").val(breadcrumb);
}

function bigSearchFocus() {
    if($("#bigsearchbar").val() == "Search for a song...")
        $("#bigsearchbar").val("");
}

function bigSearchBlur() {
    if($("#bigsearchbar").val() == "")
        $("#bigsearchbar").val("Search for a song...");
}

function toggleFiles() {
    if($("#files").hasClass("hidden"))
        showFiles();
    else hideFiles();
}

function showFiles() {
    $("#searchbar").removeClass("hidden");
    $("#files").removeClass("hidden");
    $("#filesbutton").addClass("active");
}

function hideFiles() {
    $("#files").addClass("hidden");
    $("#filesbutton").removeClass("active");
    // RETURN HOME
    if($("#stack").hasClass("hidden") && $("#searchresults").hasClass("hidden")) {
        $("#searchbar").addClass("hidden");
        $("#home").removeClass("hidden");
        window.location.hash="#!/sheet:"+id;
        setTitle("");
    }
}

function hideFolders() {
    $("#folders").addClass("hidden");
}

function toggleFolders() {
    if($("#folders").hasClass("hidden"))
        $("#folders").removeClass("hidden");
    else hideFolders();
}

/*********************

    CHORD STUFF
    
*********************/



function showSheet(id,sheetid) {
    $("#searchresults").addClass("hidden");
    $("#searchbar").removeClass("hidden");
    $("#stack").removeClass("hidden");
    hideFiles();
    // LOADING SCREEN
    
    // END LOADING SCREEN
    // LOAD THAT FUCKER UP
    data = {
        title: "Wonderwall",
        artist: "Oasis",
        content: "[[Em]]Today is [[G]]gonna be the day that they're [[D]]gonna throw it back to [[Am]]you\n"+
"[[Em]]By now you [[G]]should've somehow rea[[D]]lized what you gotta [[Am]]do\n"+
"[[Em]]I don't believe that [[G]]anybody [[D]]feels the way I [[Am]]do about you [[C]]now[[D]][[Am]][[Am]]\n"+
"\n"+
"[[Em]]Back beat, the [[G]]word is on the street that the [[D]]fire in your heart is [[Am]]out\n"+
"[[Em]]I'm sure you've [[G]]heard it all before but you [[D]]never really had a [[Am]]doubt\n"+
"[[Em]]I don't believe that [[G]]anybody [[D]]feels the way I [[Am]]do about you [[Em]]now[[G]][[D]][[Am]][[Am]]\n"+
"\n"+
"And [[C]]all the roads we [[D]]have to walk are [[Em]]winding[[Em]]\n"+
"And [[C]]all the lights that [[D]]lead us there are [[Em]]blinding[[Em]]\n"+
"[[C]]There are many [[D]]things that I would [[G]]like to say to [[Am]]you\n"+
"But I don't know [[Am]]how[[Am]]\n"+
"\n"+
"Because [[C]]maybe[[Em]] [[G]]\n"+
"You're [[Em]]gonna be the one that [[C]]saves me[[Em]] [[G]]\n"+
"And [[Em]]after [[C]]all [[Em]] [[G]]\n"+
"You're my [[Em]]wonder[[C]]wall[[Em]][[G]][[Em]][[Am]][[Am]]"
    }
    $("#sheet"+sheetid+"-title").html(data.title+" <em>by "+data.artist+"</em>");
    $("#sheet"+sheetid+"-lyrics").html(parseLyrics(data.content));
    
    // SET URL AND LINKS AND STUFF
    window.location.hash="#!/sheet:"+id;
    setTitle(data.title+' by '+data.artist);
}

function parseChord(match, p1, offset, string) {
    return '<div class="chordflag"><a href="#" class="chord">'+p1+'</a></div>';
}

function parseLyrics(lyrics) {
    lyrics = lyrics.replace(/(\r\n|\n|\r)/gm,"<br />");
    lyrics = lyrics.replace(/\]\]\s*\[\[/gm,']]<div class="spacer"></div>[[');
    lyrics = lyrics.replace(/\[\[([A-Za-z0-9]*?)\]\]/gm,parseChord);
    lyrics = lyrics.replace("  "," &nbsp;");
    return lyrics;
}