class Social{
	constructor(title, friend){
		this.title = title;
		this.friend = friend;
	}

	share(){

		var varFirend = document.getElementById("friend").value;
		var varMovie= document.getElementById("movies").value;
		document.getElementById("shareStat").innerHTML = "You shared " + varMovie + " with " + varFirend ;
	}

	like(varFirend){
		return varFirend + " likes this."
	}
	
}