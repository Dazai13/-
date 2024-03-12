class DeleteVacancy extends DeleteEverythingPopup{
    constructor() {
      super();
      this.DELETE = "delete";
      this.CANCEL = "cancel";
      this.resolve = null;
      this.result = null;
      this.eventBus = null;
      this.context = null;
    }
  
    setContext(context) {
      this.context = context;
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
                <p class="popup__title-text">Удалить вакансию</p>
              </div>
              <div class="popup__content">
                <div class="popup__content-wrapper">
                  <p class="popup__content-wrapper-text">
                      <span class="icon" style="color: red;"></span> Вы собираетесь удалить вакансию id${this.context.id} - ${this.context.vacancyName}
                  </p>
                </div>
                <p class="error-output"><span class="icon error-output"></span></p>
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
  
    setContext(context) {
      this.context = context;
    }
  
    setup() {
      this.popup = document.querySelector(".popup-wrapper");
      this.popup.querySelectorAll(".cross").forEach((cross) => {
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
        if (this.popup.querySelector(".accept").classList.contains("inactive")) {
          return;
        }
        this.close();
        this.resolve(this.DELETE);
      };
    }
  }
  