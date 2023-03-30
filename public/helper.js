function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
function deleteDuplicates() {
    //For normal list
    var current = JSON.parse(localStorage.getItem("copyData"));
    var array = [];
    for (var i = 0; i < current.length; i++) {
        if (!array.includes(current[i].toString())) {
            array.push(current[i].toString());
        }
    }
    localStorage.setItem("copyData", JSON.stringify(array));
    
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
