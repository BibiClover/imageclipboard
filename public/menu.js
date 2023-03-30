var currentImportPack = [];
function openEditMenu() {
    document.getElementById("EDITMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function openPackMenu() {
    document.getElementById("PACKMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function packMenuBack() {
    closeMenu();
    openPackMenu();
}
function packImportPrompt(url) {
    
    fetch(url)
    .then(res => res.json())
    .then(out =>
    {
        currentImportPack = out;
        document.getElementById("PACKPROMPTHEADING").innerText = "Do you want to import " + currentImportPack.length + " emojis? (This cannot be undone easily)";
        document.getElementById("PACKPROMPT").style.display = "block";
        document.getElementById("GRAYBACKGROUND").style.display = "block";
    }
    )
    .catch(err => console.log(err));    
}

function packImport() {
    closeMenu();
    var copyDataJson = JSON.parse(localStorage.getItem("copyData")); //gets copyData value
    for (var i = 0; i < currentImportPack.length; i++) {
        let url = currentImportPack[i];
        if (url.startsWith("https://cdn.discordapp.com/emojis/") && url.includes("?size=")) {
            if (url.includes("&quality=loseless")) {
                url = url.split('?')[0];
                url = url + "?size=48&quality=loseless";
            }
            else {
                url = url.split('?')[0];
                url = url + "?size=48";
            }
        }
        copyDataJson.push(url);
    }
    localStorage.setItem("copyData", JSON.stringify(copyDataJson)); //sets copyData value
    list();
}

function openImportMenu() {
    document.getElementById("IMPORTMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function exportData() {
    let string = JSON.stringify(JSON.parse(localStorage.getItem("favData")).concat(JSON.parse(localStorage.getItem("copyData"))));
    download(string, 'export.json', 'text/plain');
}
function closeMenu() {
    document.getElementById("EDITMENU").style.display = "none";
    document.getElementById("GRAYBACKGROUND").style.display = "none";
    document.getElementById("IMPORTMENU").style.display = "none";
    document.getElementById("DANGERMENU").style.display = "none";
    document.getElementById("resetDataPopUp").style.display = "none";
    document.getElementById("deleteAllPopUp").style.display = "none";
    document.getElementById("HELPMENU").style.display = "none";
    document.getElementById("PACKMENU").style.display = "none";
    document.getElementById("PACKPROMPT").style.display = "none";
}
function favSetup() {
    favMode = true;
    closeMenu();
    document.getElementById("FAVMODE").style.display = "flex";
    document.getElementById("URL").style.display = "none";
    document.getElementById("EDITBUTTON").style.display = "none";
    document.getElementById("FAVBUTTON").style.display = "none";
    document.getElementById("PACKBUTTON").style.display = "none";
    document.getElementById("EDITMODE").style.display = "none";
    document.getElementById("HELPBUTTON").style.display = "none";
}

function editSetUp() {
    editMode = true;
    closeMenu();
    document.getElementById("URL").style.display = "none";
    document.getElementById("EDITBUTTON").style.display = "none";
    document.getElementById("PACKBUTTON").style.display = "none";
    document.getElementById("EDITMODE").style.display = "flex";
    document.getElementById("HELPBUTTON").style.display = "none";
    document.getElementById("FAVBUTTON").style.display = "none";
}

function defaultMode() {
    editMode = false;
    favMode = false;
    closeMenu();
    document.getElementById("URL").style.display = "flex";
    document.getElementById("EDITBUTTON").style.display = "flex";
    document.getElementById("PACKBUTTON").style.display = "flex";
    document.getElementById("EDITMODE").style.display = "none";
    document.getElementById("HELPBUTTON").style.display = "flex";
    document.getElementById("FAVBUTTON").style.display = "flex";
    document.getElementById("FAVMODE").style.display = "none";
}
function dangerSetup() {
    document.getElementById("DANGERMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function deleteAllPopUp() {
    closeMenu();
    document.getElementById("deleteAllPopUp").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function resetDataPopUp() {
    closeMenu();
    document.getElementById("resetDataPopUp").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
function resetData() {
    closeMenu();
    localStorage.setItem("copyData", JSON.stringify(defaultData));
    list();
}
function deleteAll() {
    closeMenu();
    localStorage.setItem("copyData", JSON.stringify([]));
    list();
}
function openHelpMenu() {
    document.getElementById("HELPMENU").style.display = "block";
    document.getElementById("GRAYBACKGROUND").style.display = "block";
}
async function loadFile(file) {
    let text = await file.text();
    closeMenu();
    let json = JSON.parse(text);
    var copyDataJson = JSON.parse(localStorage.getItem("copyData"));
    for (var i = 0; i < json.length; i++) {
        let obj = json[i];
        if(!obj) //true if "" null undefined false 0 NaN
        {
            continue;
        }
        if (obj.startsWith("https://cdn.discordapp.com/emojis/") && obj.includes("?size=")) {
            obj = obj.replace(/\d{2}$/, '48');
        }
        copyDataJson.push(obj);
    }
    localStorage.setItem("copyData", JSON.stringify(copyDataJson));
    list();
}
