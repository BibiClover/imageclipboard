var selection;
var editMode = false;
var favMode = false;


function load() {

    if (localStorage.getItem("firstTime") != "true") {
        openHelpMenu();
        localStorage.setItem("firstTime", "true");
    }   
    
    //Convert from v1 single list (copyData) to v2 tabs (localData)
    if(localStorage.getItem("copyData") != null) {
        let localData = [JSON.parse(localStorage.getItem("copyData"))];
        localStorage.setItem("localData", JSON.stringify(localData));
        localStorage.removeItem("copyData");
    }
    else if(localStorage.getItem("localData") == null)
    {
        localStorage.setItem("localData", JSON.stringify(defaultData));
    }

    list();
}
function addData() {
    let data = document.getElementById('URL').value.toString().trim();
    //guard - Make sure its a URL
    // if(!url.startsWith("http"))
    // {
    //     alert("Must be a URL");
    //     return;
    // }
    //Set size to 48 (if it's a discord emoji)
    // if (url.startsWith("https://cdn.discordapp.com/emojis/") && url.includes("?size=")) {
    //     if (url.includes("&quality=loseless")) {
    //         url = url.split('?')[0];
    //         url = url + "?size=48&quality=loseless";
    //     }
    //     else {
    //         url = url.split('?')[0];
    //         url = url + "?size=48";
    //     }
    // }
    let dataArray = data.split('"');
    let newArray = [];
    for (let i = 0; i < dataArray.length; i++)
    {
        if(dataArray[i].startsWith("https://cdn.discordapp.com/emojis/"))
        {
            var url = dataArray[i];
            if (url.includes("?size=")) 
            {
                if (url.includes("&quality=loseless")) {
                    url = url.split('?')[0];
                    url = url + "?size=48&quality=loseless";
                }
                else {
                    url = url.split('?')[0];
                    url = url + "?size=48";
                }
            }
            newArray.push(url);
        }
        else if(dataArray[i].startsWith("https://media.discordapp.net/stickers/"))
        {
            var url = dataArray[i];
            if (url.includes("?size=")) 
            {
                url = url.split('?')[0];
                url = url + "?size=160";
            }
            newArray.push(url);
        }
        else if(dataArray[i].startsWith("https://"))
        {
            newArray.push(dataArray[i]); 
        }
        else if(dataArray[i].startsWith("!text"))
        {
            newArray.push(dataArray[i].toString().replace('!text','').trim());
        }
    }
    
    var setData = JSON.parse(localStorage.getItem("localData"))
    var folderDataJson = setData[currentFolder];
    // copyDataJson.push(url);
    for (var i = newArray.length; i >= 0; i--) {
        folderDataJson.push(newArray[i]);
    }
    setData[currentFolder] = folderDataJson;
    localStorage.setItem("localData", JSON.stringify(setData));
    list();
}
function list() {
    
    // if (localStorage.getItem("copyData") == null) {
    //     let ii = 0;
    //     localStorage.setItem("copyData", JSON.stringify(defaultData));
    //     localStorage.setItem("updateVersion", JSON.stringify(ii));
    // }
    // if (localStorage.getItem("favData") == null) {
    //     localStorage.setItem("favData", '[]');
    // }

    var localData = JSON.parse(localStorage.getItem("localData"));
    if (localData == null)
    {
        localData = [];
        localStorage.setItem("localData", JSON.stringify(localData));
    }
    else if (localData[currentFolder] == null)
    {
        localData[currentFolder] = [];
        localStorage.setItem("localData", JSON.stringify(localData));
    }
    if (localStorage.getItem("favData") == null) {
        localStorage.setItem("favData", '[]');
    }
    listFolders()
    //fav list
    let favImageList = document.getElementById('FavImageList');
    let favHtml = "";
    let favDataJson = JSON.parse(localStorage.getItem("favData"));
    for (var i = favDataJson.length; i >= 0; i--) {
        favHtml += image(favDataJson[i], i, "favData");
    }
    favImageList.innerHTML = favHtml;

    //normal list
    let imageList = document.getElementById('ImageList');
    let html = "";
    let folderDataJson = JSON.parse(localStorage.getItem("localData"))[currentFolder];
    for (var i = folderDataJson.length; i >= 0; i--) {
        html += image(folderDataJson[i], i, "localData");
    }
    imageList.innerHTML = html;
}

function copy(element, src, index, listName) {
    if (!editMode && !favMode) {
        navigator.clipboard.writeText(src);
        element.style.backgroundColor = "#8a8a8a";
        if (selection && selection != element) {
            selection.style.backgroundColor = null;
        }
        selection = element;
    }
    else if (editMode) {
        let jsonValue = JSON.parse(localStorage.getItem("localData"));
        jsonValue[currentFolder].splice(index, 1);
        jsonValue[currentFolder] = jsonValue;
        localStorage.setItem(listName, JSON.stringify(jsonValue));
        list();
    }
    else if (favMode)
    {
        //remove
        var jsonValue = JSON.parse(localStorage.getItem(listName));
        jsonValue.splice(index, 1);
        localStorage.setItem(listName, JSON.stringify(jsonValue));
        
        //add
        var newListName = (listName == "localData") ? "favData" : "localData";
        var newDataJson = JSON.parse(localStorage.getItem(newListName));
        newDataJson.push(src);
        localStorage.setItem(newListName, JSON.stringify(newDataJson));

        list();
    }
}
function image(url, index, list) {
    if (!url)
        return "";
    if (url.slice(0, 4) == "http") 
    {
        var bigUrl = url;
        // if (bigUrl.includes("?size=")) {
        //     bigUrl = url.split('?')[0];
        //     bigUrl = bigUrl + "?size=256";
        // }
        if (bigUrl.includes("?size=")) 
        {
            if (url.includes("&quality=loseless")) {
                bigUrl = url.split('?')[0];
                bigUrl = bigUrl + "?size=256&quality=loseless";
            }
            else {
                bigUrl = url.split('?')[0];
                bigUrl = bigUrl + "?size=256";
            }
        }
        return "<div class='item' onclick='copy(this, \"" + url + "\", \"" + index + "\", \"" + list + "\")'><image style='height: 48px;' src='" + bigUrl + " '/></div>";
    }
    else {
            return "<div class='item' onclick='copy(this, \"" + url + "\", \"" + index + "\", \"" + list + "\")'>" + url + "</div>";
    }
}