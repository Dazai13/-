

class PopupFactory{
    constructor() {
        this.DELETE_EVERYTHING = 'delete_everething'
        this.ADD_NEW = 'add_new'
        this.EDIT = 'edit'
        this.DELETE = 'delete'
        this.IMPORT = 'import'
        this.EXPORT = 'export'
    }

    build(popupName) {
        if (popupName == this.DELETE_EVERYTHING) {
            return new DeleteEverythingPopup()
        } else if (popupName == this.ADD_NEW) {
            return new AddVacancy()
        } else if (popupName == this.EDIT) {
            return new EditVacancy()
        } else if (popupName == this.DELETE){
            return new DeleteVacancy()
        } else if (popupName == this.IMPORT){
            return new ImportVacancies()
        } else if (popupName == this.EXPORT){
            return new ExportVacancies()
        }
    }
}