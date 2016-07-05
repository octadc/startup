$(document).ready(function(){
	$("#hid").fadeIn(1200);
})

function ajaxPromise(url, method, params){
	var p = new Promise(function(resolve,reject) {
    	var xhttp = new XMLHttpRequest();
        xhttp.open(method, url+"?"+params, true);
    	xhttp.onload = function () {
            if (this.status == 200 && this.response.length > 0) {
              	resolve(this.response)
    	    } else {
    	           	reject({type:'Error'});
    	       }
        };  	
        xhttp.onerror = function () {
            reject({type:'Error'});
        };
        xhttp.send();
	})
	return p;
}

function doAmatrix(){
	var myarray=new Array(2);
    for (i=0; i <2; i++){
        myarray[i]=new Array(2);
    }

    myarray[0][0]= document.getElementById("row 1").value;
    myarray[0][1]= document.getElementById("cell 1").value;
    myarray[1][0]= document.getElementById("row 2").value;
    myarray[1][1]= document.getElementById("cell 2").value;
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    for (var i = 0; i < myarray.length; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < myarray[i].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = myarray[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    table.appendChild(tableBody);
    table.setAttribute("border", "2");
    document.getElementById("my-table").innerHTML = "";
    document.getElementById("container").appendChild(table);
    document.getElementById("container").style.display = "block";
}

function joke(){
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.icndb.com/jokes/random";
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            console.log(myArr.value);
            document.getElementById("result").innerHTML = myArr.value.joke;
        };
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

function repositories(){
    ajaxPromise('https://api.github.com/search/repositories', 'GET', 'q=Javascript').then(
        function(val) {
            var elem = JSON.parse(val);
            var ul = document.createElement("ul");                
            for(i = 0 ;i < elem.items.length ; i++) {
                var node = document.createElement("li");
                var textnode = document.createTextNode((elem.items[i].full_name.split("/")[0])); 
                node.appendChild(textnode);
                ul.appendChild(node);       
            };
            document.getElementById("ulResult").innerHTML = "";
            document.getElementById('ulResult').appendChild(ul);
        },
        function(err) {
           console.log("Error loading list");
    });
}; 