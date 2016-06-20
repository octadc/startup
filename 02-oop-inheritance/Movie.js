class Movie {
	constructor(title, year, duration) {
	this.title = title;
	this.year = year;
	this.duration = duration;
	this.cast = [];
	}
	play(){
		console.log("Playing");
	}
	pause(){
		console.log("Paused");
	}
	resume(){
		console.log("Resuming");
	}

	addCast(Actor){
		this.cast.push(Actor);
	}
}
	

