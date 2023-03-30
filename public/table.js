var selection;
var editMode = false;
var favMode = false;
function load() {
    list();
    if (localStorage.getItem("firstTime") != "true") {
        openHelpMenu();
        localStorage.setItem("firstTime", "true");
    }
    else if(localStorage.getItem("copyData").toString()[0] != "[") {
        localStorage.setItem("copyData", "[]");
    }
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
    
    var copyDataJson = JSON.parse(localStorage.getItem("copyData"));
    // copyDataJson.push(url);
    for (var i = newArray.length; i >= 0; i--) {
        copyDataJson.push(newArray[i]);
    }
    localStorage.setItem("copyData", JSON.stringify(copyDataJson));
    list();
}
function list() {
    if (localStorage.getItem("copyData") == null) {
        let ii = 0;
        localStorage.setItem("copyData", JSON.stringify(defaultData));
        localStorage.setItem("updateVersion", JSON.stringify(ii));
    }
    if (localStorage.getItem("favData") == null) {
        localStorage.setItem("favData", '[]');
    }

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
    let copyDataJson = JSON.parse(localStorage.getItem("copyData"));
    for (var i = copyDataJson.length; i >= 0; i--) {
        html += image(copyDataJson[i], i, "copyData");
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
        var jsonValue = JSON.parse(localStorage.getItem(listName));
        jsonValue.splice(index, 1);
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
        var newListName = (listName == "copyData") ? "favData" : "copyData";
        var newDataJson = JSON.parse(localStorage.getItem(newListName));
        newDataJson.push(src);
        localStorage.setItem(newListName, JSON.stringify(newDataJson));

        list();
    }
}
function image(url, index, list) {
    if (!url)
        return "";
    if (url.slice(0, 4) == "http") {
        return "<div class='item' onclick='copy(this, \"" + url + "\", \"" + index + "\", \"" + list + "\")'><image src='" + url + " '/></div>";
    }
    else {
            return "<div class='item' onclick='copy(this, \"" + url + "\", \"" + index + "\", \"" + list + "\")'>" + url + "</div>";
    }
}