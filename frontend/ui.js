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


var userToken = null;

// IT IS A MYSTERY.
var etphonehome = false;

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
    if(kik.enabled) kik.send({
        title     : kikTitle                ,
        text      : kikDescription          ,
        pic       : kikPic                  , // optional
        big       : false                   , // optional
        noForward : false                   , // optional
        data      : { h : curHash }         // optional
    });
    else showFiles();
}

function search(query) {
    if (query.substring(0,6) == "stack:") {
        var sid = query.substring(6);
        // GET INFO FROM AJAX AND STUFF
        
        // WOOP WOOP WOP.
        etphonehome = true;
        $("#searchkik").removeClass("hidden");
        resultsLoading();
    
    /***********************************
    
    
    
    
    
    
    BLAAAAAAAh
    
    
    
    
    
    
    
    *************************************/
        setBreadcrumb("loading...");
        setTimeout(function() {returnSearchResults("");}, 1000);
        setHash("stack:"+sid);
        setTitle('Search results for "'+query+'"');
    } else if (query == "") {
        setBreadcrumb("Search for a song...");
        $("#searchbar").addClass("hidden");
        $("#searchresults").addClass("hidden");
        $("#home").removeClass("hidden");
        setHash("home");
    } else {
        setBreadcrumb(query);
        etphonehome = true;
        $("#searchkik").addClass("hidden");
        resultsLoading();
    
    /***********************************
    
    
    
    
    
    
    BLAAAAAAAh
    
    
    
    
    
    
    
    *************************************/
        setTimeout(function() {returnSearchResults(0);}, 1000);
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

function resultsLoading() {
    $("#searchbar").removeClass("hidden");
    $("#searchresults").addClass("hidden");
    $("#loading").removeClass("hidden");
}

function returnSearchResults(data) {
    // RETURN SEARCH RESULTS
    
    if(data == 0) {
        data = {entries: []}
        for(i=0;i<20;i++) {
            j = Math.floor(Math.random() * tabs.length);
            tabs[j]["id"]=j;
            data.entries[i] = tabs[j];
        }
    } else {
        var data = collection[0];
    }
    $("#resultcontainer").html("");
    for(i in data.entries) {
        entry = data.entries[i];
        $("#resultcontainer").append('<div class="searchresult">'+
                                     '<h2><a href="javascript: showSheet(\''+entry.id+'\',1)">'+entry.title+' <em>by '+entry.artist+'</em></a></h2>'+
                                     '</div>');
    }
    
    // REMOVE LOADING SCREEN
    etphonehome = false;
    $("#loading").addClass("hidden");
    $("#searchresults").removeClass("hidden");
    
    // FAT $TACK$
    if(data.title != null) {
        setBreadcrumb(data.title);
        setTitle(data.title);
    }
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
    $("#home").addClass("hidden");
    $("#searchbar").removeClass("hidden");
    $("#files").removeClass("hidden");
    $("#filesbutton").addClass("active");
}

function hideFiles() {
    $("#files").addClass("hidden");
    $("#filesbutton").removeClass("active");
    // RETURN HOME
    if($("#stack").hasClass("hidden") && $("#searchresults").hasClass("hidden") && !etphonehome) {
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
    $("#stack").addClass("hidden");
    etphonehome = true;
    hideFiles();
    // LOADING SCREEN
    $("#loading").removeClass("hidden");
    
    // END LOADING SCREEN
    // LOAD THAT FUCKER UP
    setTimeout(function() {returnSheet(id,"")},1000);
}

function returnSheet(id,data) {
    $("#loading").addClass("hidden");
    $("#stack").removeClass("hidden");
    sheetid = 1;
    etphonehome=false;
    data = tabs[id];
    /*
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
    }*/
    
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

var collection = [
    {
        "id":"104184",
        "title":"Greatest Hits",
        "entries":[
        {
            "id":"0",
            "title": tabs[0].title,
            "artist":tabs[0].artist
        },
        {
            "id":"3",
            "title": tabs[3].title,
            "artist":tabs[3].artist
        },
        {
            "id":"1",
            "title": tabs[1].title,
            "artist":tabs[1].artist
        },
        {
            "id":"5",
            "title": tabs[5].title,
            "artist":tabs[5].artist
        },
        {
            "id":"2",
            "title": tabs[2].title,
            "artist":tabs[2].artist
        },
        {
            "id":"4",
            "title": tabs[4].title,
            "artist":tabs[4].artist
        }
        ]
    },
    {
        "id":"213512",
        "title":"UW Music Club",
        "entries":[
        {
            "id":"2",
            "title":"Wonderwall",
            "artist":"Oasis"
        },
        {
            "id":"4",
            "title":"Boulevard of Broken Dreams",
            "artist":"Green Day"
        },
        {
            "id":"1",
            "title":"Sandstorm",
            "artist":"Darude"
        }
        ]
    }
];

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
    if(listeningToAdd != 0)
        $("#loading").removeClass("hidden");
    
    for(i in collection) {
        if(i == id) {
            if(listeningToAdd != 0) {
                // AJAX STUFF GOES HERE
                
                
                
                
                
                
                
                
                
                
                
                
                setTimeout(function() {doneAdding(id,"1")},3000);
                
                /// RAWR
            } else fillContentThing(id);
            
            setHash("stack:"+collection[id].id);
            setTitle(collection[id].title);
            activateFolder(id);
        } else {
            $("#folder-"+i).removeClass("active");
        }
    }
}

function doneAdding(i,data) {
    if(listeningToAdd != 0)
        collection[i].entries.push({
            "id": listeningToAdd,
            "title": listeningToAddTitle,
            "artist": listeningToAddArtist
        });
    listeningToAdd = 0;
    buildStacks();
    activateFolder(i);
    $("#loading").addClass("hidden");
    fillContentThing(i);
}

function activateFolder(i) {
    $("#folder-"+i).addClass("active");
    $("#folderkik").css('top', ($("#folder-"+i).offset().top+12)+'px');
    $("#folderkik").removeClass("hidden");
    hideFolders();
}

function fillContentThing(id) {
    $("#contentslist").html("");
    var count = 0;
    for(j in collection[id].entries) {
        sheet = collection[id].entries[j];
        $("#contentslist").append('<div class="searchresult"><h2><a href="javascript: showSheet(\''+sheet.id+'\',1);">'+sheet.title+' <em>by '+sheet.artist+'</em></a></h2></div>');
        count++;
    }
    listeningToAdd = 0;
    if(count == 0)
        $("#contentslist").append('<div class="sorry"><h2>Oops!</h2>no results found</div>');
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
    collection.push({
        "id":id,
        "title":name,
        "entries":[]
    });
    i=collection.length-1;
    
    
    
    
    
    
    $("#loading").removeClass("hidden");
    setTimeout(function(){doneAdding(i,"");},1000);
    
    
    
    
    
    
    $("#newstackinput").blur();
    return false;
}