class AdsTableEventBusRelation {
    constructor(controller, eventBus) {
        this.controller = controller;
        this.eventBus = eventBus;
    }
    onUpdateInputs() {
        this.eventBus.notice()
    }
    onUpdateTable() {
        this.eventBus.notice("totalRows", controller.getTotalRows());

    }
}
