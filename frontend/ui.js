function test3() {
    showSheet(1,1);
}

var breadcrumb = "Search for a song...";
var description = "";
var url = "http://jamesy.us/chorq/";


var kikTitle = "";
var kikDescription = "The hippest new chord sharing site on the block !!";
var kikUrl = "";
var kikPic = "http://jamesy.us/chorq/logo.png";


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
        $.getJSON('/chorq/get/stack.php?'+
            $.param({
                id: sid
            }), returnSearchResults);
        setBreadcrumb("loading...");
        setHash("stack:"+sid);
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
        $.getJSON('/chorq/get/search.php?'+
            $.param({
                q: query
            }), returnSearchResults);
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
    $("#resultcontainer").html("");
    var count = 0;
    for(i in data.entries) {
        entry = data.entries[i];
        $("#resultcontainer").append('<div class="searchresult">'+
                                     '<h2><a href="javascript: showSheet(\''+entry.id+'\',1)">'+entry.title+' <em>by '+entry.artist+'</em></a></h2>'+
                                     '</div>');
        count++;
    }
    if(count == 0)
        $("#resultcontainer").append('<div class="sorry"><h2>Oops!</h2>no results found</div>');
    
    // REMOVE LOADING SCREEN
    etphonehome = false;
    $("#loading").addClass("hidden");
    $("#searchresults").removeClass("hidden");
    
    // FAT $TACK$
    if(data.title != null) {
        setTitle(data.title);
        setBreadcrumb(data.title);
    }
}

function setBreadcrumb(bc) {
    breadcrumb = bc;
    $("#searchinput").val(breadcrumb);
}

function getHash() {
    return window.location.hash.substring(3);
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
    window.location.hash = "#!/"+hash;
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
    $.getJSON('/chorq/get/sheet.php?id='+id,returnSheet);
}

function returnSheet(data) {
    $("#loading").addClass("hidden");
    $("#stack").removeClass("hidden");
    sheetid = 1;
    etphonehome=false;
    
    $("#sheet"+sheetid+"-title").html(data.title+" <em>by "+data.artist+"</em>");
    $("#sheet"+sheetid+"-lyrics").html(parseLyrics(data.content));
    
    // SET URL AND LINKS AND STUFF
    setHash("sheet:"+data.id);
    setTitle(data.title+' by '+data.artist);
    
    sheetId = data.id;
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
                $.getJSON('/chorq/set/addEntry.php?'+
                    $.param({
                        stack: collection[id].id,
                        sheet: listeningToAdd,
                        title: listeningToAddTitle,
                        artist: listeningToAddArtist
                    }),
                    function(data) { doneAdding(id,data); }
                    )
                
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
        collection[i].entries.push(data);
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

function initStacks() {
    if(userToken != null)
        $.getJSON('/chorq/get/collection.php?token='+userToken, function(data) {
            collection = data;
            buildStacks();
        })
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

function doneNewStack(data) {
    collection.push(data);
    i=collection.length-1;
    if(listeningToAdd != 0)
        $.getJSON('/chorq/set/addEntry.php?'+
            $.param({
                stack: data.id,
                sheet: listeningToAdd,
                title: listeningToAddTitle,
                artist: listeningToAddArtist
            }),
            function(data) { doneAdding(i,data); }
            )
    else {
        buildStacks();
        $("#loading").addClass("hidden");
        fillContentThing(i);
    }
    activateFolder(i);
    setTimeout(function(){doneAdding(i,"");},1000);
}

function newStack(name) {
    
    
    $("#loading").removeClass("hidden");

    if(userToken != null)
        $.getJSON('/chorq/set/addStack.php?'+
            $.param({
                token: userToken,
                title: name
            }),
            doneNewStack);
    
    
    
    
    
    
    $("#newstackinput").blur();
    return false;
}