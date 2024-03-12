class EventBus{
    constructor() {
        this.subscribers = {}
    }
    addEvent(eventName){
        this.subscribers[eventName] = []
    }
    addSubscriber(subscriber, eventName){
        this.subscribers[eventName].push(subscriber)
    }
    notice(event, eventName){
        this.subscribers[eventName].forEach(subscriber => {
            subscriber(event)
        });
    }
}