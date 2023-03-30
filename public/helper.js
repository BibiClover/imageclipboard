function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
function deleteDuplicates() {
    //For normal list
    var currentSet = JSON.parse(localStorage.getItem("localData"));
    var current = currentSet[currentFolder]
    var array = [];
    for (var i = 0; i < current.length; i++) {
        if (!array.includes(current[i].toString())) {
            array.push(current[i].toString());
        }
    }
    currentSet[currentFolder] = array;
    localStorage.setItem("localStorage", JSON.stringify(currentSet));
    
    // For fav list
    current = JSON.parse(localStorage.getItem("favData"));
    array = [];
    for (var i = 0; i < current.length; i++) {
        if (!array.includes(current[i].toString())) {
            array.push(current[i].toString());
        }
    }
    localStorage.setItem("favData", JSON.stringify(array));

    list();
}