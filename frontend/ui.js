function test3() {
    showSheet(1,1);
}

var breadcrumb = "Search for a song...";
var description = "";
var url = "http://jamesy.us/porn/chorq/main.html";


var kikTitle = "";
var kikDescription = "Chord: the hippest new way to share chords !!";
var kikUrl = "";
var kikPic = "http://jamesy.us/porn/chorq/logo.png";

function setTitle(subtitle) {
    description = subtitle;
    if(description == "")
        document.title = "Chorq";
    else
        document.title = "Chorq | "+description;
    // SET BUTTONS
    kikTitle=((description=="")?"Chorq":description);
    kikUrl=getBase()+"#!/"+curHash;
}
function share() {
    //alert('test');
    kik.send({
        title     : kikTitle                ,
        text      : kikDescription          ,
        pic       : kikPic                  , // optional
        big       : false                   , // optional
        noForward : false                   , // optional
        data      : { h : curHash }         // optional
    });
/*    kik.send({
        title:      kikTitle,
        text:       kikDescription,
        url:        kikUrl,
        pic:        kikpic,
        data:       {
            hash:   curHash
        }
    })*/
}

function search(query) {
    if (query.substring(0,6) == "stack:") {
        var sid = query.substring(6);
        // GET INFO FROM AJAX AND STUFF
        
        // WOOP WOOP WOP.
        var data = collection[sid];
        setBreadcrumb(data.title);
        $("#searchkik").removeClass("hidden");
        $("#searchbar").removeClass("hidden");
        $("#searchresults").removeClass("hidden");
        setHash("stack:"+sid);
        setTitle('Search results for "'+query+'"');
    } else if (query == "") {
        setBreadcrumb("Search for a song...");
        $("#searchbar").addClass("hidden");
        $("#searchresults").addClass("hidden");
        $("#home").removeClass("hidden");
        setHash("home");
        setTitle('');
    } else {
        setBreadcrumb(query);
        $("#searchkik").addClass("hidden");
        $("#searchbar").removeClass("hidden");
        $("#searchresults").removeClass("hidden");
        $("#home").addClass("hidden");
        setHash("search:"+query);
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

function getHash() {
    return window.location.href.split("#!/")[1];
}

function getBase() {
    var b;
    if((b = window.location.href.split("#!/")[0]) != null)
        return b;
    else return window.location.href;
}

var curHash;

function setHash(hash) {
    curHash = hash;
    window.location.href = getBase()+"#!/"+hash;
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
        setHash("home");
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
    
    /*data={
        title: "Let Her Go",
        artist: "Passenger",
        content: "Well you only need the [[F]]light when it s burning [[C]]low\n"+
"Only miss the [[G]]sun when it s starts to [[Am]]snow\n"+
"Only know your [[F]]love her when you let her go[[C]][[G]]\n"+
"Only know you ve been [[F]]high when you re feeling [[C]]low\n"+
"Only hate the [[G]]road when you re missin  [[Am]]home\n"+
"Only know your [[F]]love her when you ve let h[[C]]er go\n"+
"[[G]]  And you let her go\n"+
"\n"+
"\n"+
"\n"+
"Am   F   G   Em\n"+
"\n"+
"[[Am]][[F]][[G]]\n"+
"\n"+
"\n"+
"[[Am]]Staring at the bottom of your[[F]] glass\n"+
"Hoping o[[G]]ne day you will make a dream [[Em]]last\n"+
"The dreams come[[Am]] slow and goes s[[F]]o fast[[G]]\n"+
"You [[Am]]see her when you close your[[F]] eyes\n"+
"Maybe [[G]]one day you will understand [[Em]]why\n"+
"Everything you [[Am]]touch surely[[F]] dies[[G]]\n"}*/
    
    $("#sheet"+sheetid+"-title").html(data.title+" <em>by "+data.artist+"</em>");
    $("#sheet"+sheetid+"-lyrics").html(parseLyrics(data.content));
    
    // SET URL AND LINKS AND STUFF
    setHash("sheet:"+id);
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
                    $("#contentslist").append('<div class="searchresult"><h2><a href="javascript: showSheet(\''+j+'\',1);">'+sheet.title+' <em>by '+sheet.artist+'</em></a></h2></div>');
                    count++;
                }
            }
            if(count == 0)
                $("#contentslist").append('<div class="sorry"><h2>Oops!</h2>no results found</div>');
            setHash("stack:"+id);
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