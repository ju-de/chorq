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

function onFocus(obj,def) {
    if(obj.val() == def)
        obj.val("");
}
function onBlur(obj,def) {
    if(obj.val() == "")
        obj.val(def);
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
        window.location.hash="#!/home";
        setTitle("");
    }
}

function hideFolders() {
    $("#folders").addClass("hidden");
}

function showFolders() {
    $("#folders").removeClass("hidden");
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
    
    sheetId = id;
    sheetTitle = data.title;
    sheetArtist = data.artist;
    
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



/*****************************
    COLLECTION HANDLING
*****************************/

var collection = {
    "104184": {
        "title":"Greatest Hits",
        "112351235":{
            "title":"Wonderwall",
            "artist":"Oasis"
        },
        "253215532":{
            "title":"Boulevard of Broken Dreams",
            "artist":"Green Day"
        },
        "353152353":{
            "title":"Sandstorm",
            "artist":"Darude"
        },
        "1123511234":{
            "title":"Wonderwall",
            "artist":"Oasis"
        },
        "253211234":{
            "title":"Boulevard of Broken Dreams",
            "artist":"Green Day"
        },
        "353643266":{
            "title":"Sandstorm",
            "artist":"Darude"
        }
    },
    "213512": {
        "title":"UW Music Club",
        "151235":{
            "title":"Wonderwall",
            "artist":"Oasis"
        },
        "2532":{
            "title":"Boulevard of Broken Dreams",
            "artist":"Green Day"
        },
        "35353":{
            "title":"Sandstorm",
            "artist":"Darude"
        }
    }
};

var sheetId = 0;
var sheetTitle = "";
var sheetArtist = "";

function addSheet() {
    listeningToAdd = sheetId;
    listeningToAddTitle = sheetTitle;
    listeningToAddArtist = sheetArtist;
    showFolders();
    showFiles();
}

var listeningToAdd = 0;
var listeningToAddTitle = "";
var listeningToAddArtist = "";

function showStack(id) {
    $("#contentslist").html("");
    for(i in collection) {
        if(i == id) {
            if(listeningToAdd > 0) {
                // AJAX STUFF GOES HERE
                collection[i][listeningToAdd] = {
                    "title": listeningToAddTitle,
                    "artist": listeningToAddArtist
                };
            }
            $("#folder-"+i).addClass("active");
            var count = 0;
            for(j in collection[id]) {
                sheet = collection[id][j];
                if(j != "title") {
                    $("#contentslist").append('<div class="searchresult"><h2><a href="javascript: showSheet('+j+',1);">'+sheet.title+' <em>by '+sheet.artist+'</em></a></h2></div>');
                    count++;
                }
            }
            if(count == 0)
                $("#contentslist").append('<div class="sorry"><h2>Oops!</h2>no results found</div>');
            window.location.hash="#!/stack:"+id;
            setTitle(collection[i].title);
            $("#folderkik").css('top', ($("#folder-"+id).offset().top+12)+'px');
            $("#folderkik").removeClass("hidden");
        } else {
            $("#folder-"+i).removeClass("active");
        }
    }
    hideFolders();
}

function buildStacks() {
    $("#folderthing").html("");
    for(i in collection) {
        stack = collection[i];
        $("#folderthing").append('<div id="folder-'+i+'" class="folder">'+
                                 '<a class="kik-button kik-color-lg"></a><a href="javascript: showStack('+i+');">'+stack.title+'</a>'+
                                 '</div>');
    }
}

function newStack(name) {
    id = Math.floor(Math.random()*999)+10;
    collection[id] = {
        "title":name
    };
    buildStacks();
    showStack(id);
    $("#newstackinput").blur();
    return false;
}