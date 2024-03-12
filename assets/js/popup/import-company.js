class ImportVacancies extends DeleteEverythingPopup {
    constructor() {
      super();
      this.IMPORT = "import";
      this.CANCEL = "cancel";
      this.resolve = null;
      this.result = null;
      this.eventBus = null;
    }
  
    setEventBus(eventBus) {
      this.eventBus = eventBus;
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
                          <p class="popup__title-text">Импорт вакансий</p>
                      </div>
                      <div class="popup__content">
                          <div class="popup__content-wrapper">
                          <p class="popup__content-wrapper-text">Название файла</p>
                          <label class="pseudo-input">
                                  <span class="icon" style="color: gray; font-size: 20px"></span>
                                  <p class="placeholder">Выберите файл</p>
                                  <p class="filename"></p>
                                  <input accept=".xlsx" style="display: none" type="file"/>
                          </label>
                          </div>
                          <p class="error-output"><span class="icon error-output"></span></p>
                      </div>
                      <div class="popup__footer">
                          <button class="btn accept blue">Загрузить</button>
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
        this.result = document.querySelector(".pseudo-input>input").files[0];
        this.close();
        this.resolve(this.IMPORT);
      };
      const fileInput = document.querySelector(".pseudo-input>input");
      fileInput.onchange = () => {
        document.querySelector(".placeholder").textContent = "";
        document.querySelector(".filename").textContent =
          fileInput.files[0].name;
      };
    }
  }
  