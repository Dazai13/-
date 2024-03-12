const adsTableController = document.querySelector("ads-table").controller;

const eventBus = new EventBus();
eventBus.addEvent("deleteEverything");
eventBus.addSubscriber(() => {
    adsTableController.deleteEverything();
}, "deleteEverything");

const addNewOneButton = document.querySelector(".add-a-new-one");
const deselectButton = document.querySelector(".deselect");
const importButton = document.querySelector(".import-button");
const exportButton = document.querySelector(".export-button");
const deleteEverythingButton = document.querySelector(".delete-everything");

deselectButton.onclick = () => {
    adsTableController.clearSearch();
};

importButton.onclick = () => {
    const importPopup = document.createElement("import-ads");
    document.body.appendChild(importPopup);
};

exportButton.onclick = () => {
    const exportButton = document.createElement("export-ads");
    document.body.appendChild(exportButton);
};

deleteEverythingButton.onclick = async () => {
    const result = await new DeleteEverythingPopup().open();
    if (result == "delete") {
        adsTableController.deleteEverything();
    }
};
