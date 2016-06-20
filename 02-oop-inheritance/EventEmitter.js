class EventEmitter extends Movie{
	 constructor(event) {
        this.event = {};
    }
	on(event, callback){
		this.events[event] = callback;
	}
	emit(){
		 this.events[event](event);
	}
	off(){
		delete this.events[event];
	}
}