class ImportAds extends HTMLElement {
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
        this.querySelectorAll(".cross").forEach(cross => {
            cross.onclick = () => {
                this.remove();
                this.callback(null);
            };
        });
        this.querySelector(".cancel").onclick = () => {
            this.remove();
        };
        this.querySelector(".accept").onclick = () => {
            if (this.querySelector(".accept").classList.contains("inactive")) {
                return;
            }
            this.result = this.querySelector(".pseudo-input>input").files[0];
            this.remove();
        };
        const fileInput = this.querySelector(".pseudo-input>input");
        fileInput.onchange = () => {
            console.log('w')
            this.querySelector(".placeholder").textContent = "";
            this.querySelector(".filename").textContent = fileInput.files[0].name;
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
                        <p class="popup__title-text">Импорт объявлений</p>
                    </div>
                    <div class="popup__content">
                        <div class="popup__content-wrapper">
                        <p class="popup__content-wrapper-text">Название файла</p>
                        <label class="pseudo-input">
                                <span class="icon" style="color: gray; font-size: 20px"></span>
                                <p class="placeholder">Выберите файл</p>
                                <p class="filename"></p>
                                <input accept=".xml" style="display: none" type="file"/>
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
        `;
    }
}

customElements.define("import-ads", ImportAds);
