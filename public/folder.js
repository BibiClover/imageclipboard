var currentFolder = 0;
var folderSelection;

function listFolders()
{
    let folderList = document.getElementById('FolderList');
    let folderhtml = "";
    let localData = JSON.parse(localStorage.getItem("localData"));
    // if(localData.length == 0)
    // {
    //     resetData();
    //     localData = JSON.parse(localStorage.getItem("localData"));
    // }
    for (var i = 0; i < localData.length; i++) {
        if(localData[i][0] == null) localData[i][localData[i].length - 1] = "https://cdn.discordapp.com/emojis/664622767303557120.png?size=48";
        folderhtml += folderHTML(i, localData[i][localData[i].length - 1]);
    }
    folderhtml += "<div class='button' onclick='newFolder()'>+</div>";
    folderList.innerHTML = folderhtml;
}

function folderHTML(dataInt, url)
{
    if (url.slice(0, 4) == "http") {
        return "<div class='item' onclick='openFolder("+dataInt+")'><image style='height: 48px' src='" + url + " '/></div>";
    }
    else {
        return "<div class='item' onclick='openFolder("+dataInt+")'>" + url + "</div>";
    }
}

function openFolder(dataInt)
{
    currentFolder = dataInt;
    console.log("Current folder: " + currentFolder);
    list();
}

function newFolder()
{
    var localData = JSON.parse(localStorage.getItem("localData"));
    currentFolder = localData.length;
    console.log("Current folder: " + currentFolder)
    localData[currentFolder] = [];
    localStorage.setItem("localData", JSON.stringify(localData));
    list();
}