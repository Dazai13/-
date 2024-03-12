class EditTextPopup extends HTMLElement {
    constructor() {
        super();
        this.resolve = null;
        this.text = "";
        this.callback = null;
    }
    setCallback(callback) {
        this.callback = callback;
    }
    setup() {
        const editField = this.querySelector("#editDescription");
        this.querySelector(".accept").onclick = () => {
            this.callback(editField.value);
            this.remove();
        };
        this.querySelector(".cancel").onclick = () => {
            this.callback(null);
            this.remove();
        };
        this.querySelectorAll(".cross.icon").forEach(cross => {
            cross.onclick = () => {
                this.callback(null);
                this.remove();
            };
        });
    }
    connectedCallback() {
        this.render();
        this.setup();
    }
    render() {
        this.innerHTML = /*html*/ `
            <div class="popup-wrapper">
                <div class="popup">
                    <div class="popup__mobile-control">
                        <span class="icon cross"></span>
                    </div>
                    <div class="popup__title">
                        <p class="popup__title-text">Изменить текст</p>
                    </div>
                    <div class="popup__content">
                        <div class="popup__content-wrapper delete-everething">
                            <div class='delete-everething' style="display: flex; flex-direction: row; align-items: center; width: 100%;">
                                <p style="padding-left: 10px;" class="popup__content-wrapper-text">
                                    Изменить текст объявления
                                </p>
                            </div>
                        </div>
                        <div style="padding-left: 30px; width: 100%; padding-right: 30px; box-sizing: border-box; resize: none;"><textarea style="width: 100%;" id="editDescription">${
                            this.getAttribute("value") || ""
                        }</textarea></div>
                        
                    </div>
                    <div class="popup__footer">
                        <button class="btn accept blue">Подтвердить изменения</button>
                        <button class="btn cancel gray">Отмена</button>
                    </div>
                    <span class="icon cross"></span>
                </div>
            </div>
        `;
    }
}

customElements.define("edit-text", EditTextPopup);
