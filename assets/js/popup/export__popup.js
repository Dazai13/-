class ExportAds extends HTMLElement {
    constructor() {
        super();
        this.callback = null;
    }
    setCallback(callback) {
        this.callback = callback;
    }
    connectedCallback() {
        this.render();
        this.setup();
    }
    setup() {
        this.popup = document.querySelector(".popup-wrapper");
        this.popup.querySelectorAll(".cross").forEach(cross => {
            cross.onclick = () => {
                this.remove();
            };
        });
        this.popup.querySelector(".cancel").onclick = () => {
            this.remove();
        };
        this.popup.querySelector(".accept").onclick = () => {
            if (this.querySelector(".accept").classList.contains("inactive")) {
                return;
            }
            this.querySelector(".download").click();
        };
    }
    render() {
        this.innerHTML = /*html*/ `
            <div class="popup-wrapper">
                  <div class="popup">
                      <div class="popup__mobile-control">
                          <span class="icon cross"></span>
                      </div>
                      <div class="popup__title">
                          <p class="popup__title-text">Экспорт объявлений</p>
                      </div>
                      <div class="popup__content">
                          <div class="popup__content-wrapper">
                          <p class="popup__content-wrapper-text">Название файла</p>
                          <label class="pseudo-input" >
                                  <span class="icon" style="color: gray; font-size: 20px"></span>
                                  <p style="width: 100%; outline: none; border: none; padding: 0; padding-left: 10px;"
                                   contenteditable="true" class="placeholder ">Введите название файла</p>
                          </label>
                          </div>
                          <p class="error-output"><span class="icon error-output"></span></p>
                      </div>
                      <div class="popup__footer">
                          <button class="btn accept blue inactive">Выгрузить</button>
                          <button class="btn cancel gray">Отмена</button>
                          <a class="download" href="./test.xlsx"></a>
                      </div>
                      <span class="icon cross"></span>
                  </div>
              </div>
        `;
        const pseudoInput = this.querySelector(".placeholder");
        pseudoInput.onfocus = () => {
            const defaultValue = "Введите название файла";
            pseudoInput.textContent = pseudoInput.textContent == defaultValue ? "" : pseudoInput.textContent;
            pseudoInput.classList.remove("placeholder");
        };
        pseudoInput.onblur = () => {
            const defaultValue = "Введите название файла";
            if (pseudoInput.textContent != defaultValue) {
                pseudoInput.textContent = pseudoInput.textContent.endsWith(".xlsx") ? pseudoInput.textContent : pseudoInput.textContent + ".xlsx";
            }
            document.querySelector(".download").setAttribute("download", pseudoInput.textContent);
        };
        pseudoInput.oninput = () => {
            const button = document.querySelector(".btn.accept.blue");
            if (pseudoInput.textContent) {
                button.classList.remove("inactive");
            } else {
                button.classList.add("inactive");
            }
        };
    }
}

customElements.define("export-ads", ExportAds);
