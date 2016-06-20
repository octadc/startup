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
    myarray[i]=new Array(2)
}
myarray[0][0]= document.getElementById("cell 1").value;
myarray[0][1]= document.getElementById("row 1").value;
myarray[1][0]= document.getElementById("cell 2").value;
myarray[1][1]= document.getElementById("row 2").value;

function makeTable(myarray) {
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
  	document.body.appendChild(table);
	var container = document.getElementById("container");
    container.appendChild(table);
  
}
}
