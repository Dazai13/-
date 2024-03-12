class DeleteEverythingPopup {
    CANCEL = "cancel";
    DELETE = "delete";
    constructor() {
        this.resolve = null;
        this.popup = null;
    }

    insert() {
        document.body.insertAdjacentHTML(
            "beforeend",
            `
      <div class="popup-wrapper">
        <div class="popup">
            <div class="popup__mobile-control">
                <span class="icon cross"></span>
            </div>
            <div class="popup__title">
                <p class="popup__title-text">Удалить все в данной таблице</p>
            </div>
            <div class="popup__content">
                <div class="popup__content-wrapper delete-everething">
                    <div class='delete-everething' style="display: flex; flex-direction: row; align-items: center; width: 100%;">
                        <span class="icon attention"></span>
                        <p style="padding-left: 10px;" class="popup__content-wrapper-text">
                            Удалить ВСЕ объявления из БД
                        </p>
                    </div>
                </div>
            </div>
        <div class="popup__footer">
          <button class="btn accept red">Подтверждаю удаление</button>
          <button class="btn cancel gray">Отмена</button>
        </div>
        <span class="icon cross"></span>
      </div>
    </div>
      `
        );
    }
    close() {
        this.popup.remove();
    }
    setup() {
        this.popup = document.querySelector(".popup-wrapper");
        this.popup.querySelectorAll(".cross").forEach(cross => {
            cross.onclick = () => {
                this.close();
                this.resolve(this.CANCEL);
            };
        });
        this.popup.querySelector(".cancel").onclick = () => {
            this.close();
            this.resolve(this.CANCEL);
        };
        this.popup.querySelector(".accept").onclick = () => {
            this.close();
            this.resolve(this.DELETE);
        };
    }

    async open() {
        return new Promise(resolve => {
            this.resolve = resolve;
            this.insert();
            this.setup();
        });
    }
}
