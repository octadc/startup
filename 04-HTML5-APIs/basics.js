function storageInLocal(){
	
	
	
	if (typeof(Storage) !== "undefined") {
 		// Store
        var text = document.getElementById("writeSpace").value; 
		localStorage.setItem("WrittenText", text);

		// Retrieve
		var getLocalStoragedText = localStorage.getItem("WrittenText");	
		document.getElementById("console").style.visibility = "visible";
		document.getElementById("console").innerHTML = "Local Storage: " + getLocalStoragedText;
	}/*end typeOf(storage) */ 
	else {
		alert("Sorry! No Web Storage support..");
	}/*end else of typeOf(storage) */
}//end of function	

function createIndexedDB(){
	if (!window.indexedDB) {
			 alert("Sorry! No indexedDB support..");
	}
	else {
		// inicialize
		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
		window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;	         
        dataBase = indexedDB.open("object", 1);            
        dataBase.onupgradeneeded = function (e) {
        	active = dataBase.result;                    
            object = active.createObjectStore("writtenThings", { keyPath : 'id', autoIncrement : true });
			//object.createIndex('by_order', 'order', { unique : true });
        };
        dataBase.onsuccess = function (e) {
            console.log('Base de datos cargada correctamente');
        };
        dataBase.onerror = function (e)  {
            alert('Error cargando la base de datos');
        };
	}
    
}

function addIndexDB(){
 	var active = dataBase.result;
    var data = active.transaction(["writtenThings"], "readwrite");
    var object = data.objectStore("writtenThings");
    var request = object.put({
        text: document.querySelector("#writeSpace").value,
    });

    request.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    data.oncomplete = function (e) {
        //document.querySelector("#order").value = 0;
        document.querySelector("#writeSpace").value = '';
        console.log('Objeto agregado correctamente');
    };
}

function showIndexedDB() {
    var active = dataBase.result;
    var data = active.transaction(["writtenThings"], "readonly");
    var object = data.objectStore("writtenThings");
    var elements = [];
    object.openCursor().onsuccess = function (e) {
        var result = e.target.result;
        if (result === null) {
            return;
        }
        elements.push(result.value);
        result.continue();
    };
    data.oncomplete = function () {
		var outerHTML = 'IndexedDB elements:';
    	for (var key in elements) {
    	    outerHTML += '\n\
    	        <tr>\n\
            	    <td>' + elements[key].text + '</td>\n\
                	<td>\n\
	                </td>\n\
	            </tr>';
	    }
	    elements = [];
	    document.getElementById("consoleError").style.visibility = "visible";
	    document.getElementById("consoleError").innerHTML = outerHTML;
	};
}

function clearAll() {
    localStorage.clear();
    var active = dataBase.result;
    var data = active.transaction(["writtenThings"], "readwrite");
    var object = data.objectStore("writtenThings");
    data.oncomplete = function(event) {
        console.log("ok");
    };
    data.onerror = function(event) {
        alert('<li>Transaction not opened due to error: ' + transaction.error + '</li>');
    };
    var objectStore = data.objectStore("writtenThings");
    var objectStoreRequest = objectStore.clear();
    objectStoreRequest.onsuccess = function(event) {
        document.getElementById("console").style.visibility = "hidden";    
        document.getElementById("consoleError").innerHTML = "Data cleared"; 
        setTimeout(function() {
            var getLocalStoragedText = localStorage.getItem("WrittenText"); 
            document.getElementById("console").style.visibility = "visible";
            document.getElementById("console").innerHTML = "Local Storage: " + getLocalStoragedText;
            showIndexedDB();
        }, 1500);
    };
}

function Output(msg) {
    var m = document.getElementById("messages");
    m.innerHTML = msg + m.innerHTML;
}

if (window.File && window.FileList && window.FileReader) {
    Init();
}

function Init() {

    var fileselect = document.getElementById("fileselect");
    var filedrag = document.getElementById("filedrag");
    var submitbutton = document.getElementById("submitbutton");

    fileselect.addEventListener("change", FileSelectHandler, false);

    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
    
        filedrag.addEventListener("dragover", FileDragHover, false);
        filedrag.addEventListener("dragleave", FileDragHover, false);
        filedrag.addEventListener("drop", FileSelectHandler, false);
        filedrag.style.display = "block";
        
        submitbutton.style.display = "none";
    }

}

function FileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = (e.type == "dragover" ? "hover" : "");
}

function FileSelectHandler(e) {

    FileDragHover(e);

    var files = e.target.files || e.dataTransfer.files;

    for (var i = 0, f; f = files[i]; i++) {
        ParseFile(f);
    }

}

function ParseFile(file) {
    Output(
        "<p>File information: <strong>" + file.name +
        "</strong> type: <strong>" + file.type +
        "</strong> size: <strong>" + file.size +
        "</strong> bytes</p>"
    ); 
}