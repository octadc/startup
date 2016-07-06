class EventEmitter{
	 constructor() {
        this.events = {};
    }
	on(event, callback){
		this.events[event] = callback;
	}
	emit(event){
		 this.events[event]();
	}
	off(){
		delete this.events[event];
	}
}