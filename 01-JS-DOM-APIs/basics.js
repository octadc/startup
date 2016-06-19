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


