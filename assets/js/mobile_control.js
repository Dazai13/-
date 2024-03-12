class MobileControlMini extends HTMLElement {
    constructor() {
        super();
        this.active = 1;
    }
    connectedCallback() {
        this.render();
        this.setup();
    }
    THRID_PANEL_TABS = [
        ["объявления", ""],
        ["вакансии", ""],
        ["вакансии объед", ""],
        ["соискатели", ""],
        ["отклики", ""],
        ["фио", ""],
        ["Адреса", ""],
        ["Компании", ""],
        ["Учебные заведения", ""],
        ["Сокр.Ю.Ф.", ""],
        ["Альтернативные", ""],
        ["Филиалы", ""],
        ["Квалификации", ""],
        ["Специальности", ""],
        ["Телефонные коды", ""],
        ["Администраторы", ""],
        ["email рассылка", ""],
        ["КАК БЫЛО КАК НАДО", ""],
        ["ПРЕФИКСЫ СЧЕТОВ", ""],
        ["ПОИСК", ""],
        ["БАНКИ", ""],
        ["РУБРИКАТОР", ""],
    ];
    TEMPLATE_TAB = (tabName, icon, { classes } = {}) => {
        return /*html*/ `
            <div class="mobile-control-wrapper__grid-nav ${classes}">
                <div class="mobile-control-wrapper__icon-wrapper ">
                    <span class="icon too-big-icon">${icon}</span>
                </div>
                <div class="mobile-control__tab-name">
                    <p>${tabName}</p>
                </div>
            </div>
        `;
    };
    render() {
        const STYLE = /*html*/ `<style>
                @media (width <= 640px) {
                    div.mobile-control-wrapper__grid-nav-wrapper {
                        padding: 10px;
                        padding-top: 20px;
                        padding-left: 0;
                        padding-right: 0;
                        display: grid;
                        grid-template-columns: 40px 1fr;
                        align-items: center;
                        height: 100%;
                        padding-bottom: 50px;
                        box-sizing: border-box;
                        row-gap: 20px;
                        overflow: auto;
                    }
                    div.mobile-control-wrapper__grid-nav-wrapper::-webkit-scrollbar{
                        width: 0;
                        height: 0;
                    }
                    div.mobile-control-wrapper__grid-nav {
                        display: contents;
                        font-size: 20px;
                        color: #414141;
                        cursor: pointer;
                        height: 50px;
                    }
                    div.mobile-control-wrapper__grid-nav_active {
                        color: var(--yellow);
                        background-color: var(--blue);
                        font-weight: 900;
                        font-family: 'Inter-Bold'
                    }
                    .mobile-control-wrapper__grid-nav > span {
                        height: auto;
                        width: auto;
                        font-size: 22px;
                    }
                    .mobile-control-wrapper__grid-nav > p {
                        padding-left: 15px;
                    }
                    div.mobile-control-wrapper__grid {
                        z-index: 101;
                        display: flex;
                        height: 100dvh;
                        width: 100dvw;
                        position: absolute;
                        flex-direction: column;
                        justify-content: end;
                    }
                    div.mobile-control-wrapper__grid-control {
                        bottom: 0;
                        width: 100%;
                        gap: 5px;
                        padding: 10px;
                        padding-left: 0px;
                        padding-right: 0px;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        background-color: white;
                        border-top: 1px solid gray;
                    }
                    .mobile-control-wrapper__grid-control-wrapper {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        cursor: pointer;
                        color: #757575;
                    }
                    .more-button {
                        color: gray;
                    }
                    .mobile-control-wrapper__grid-control-wrapper > p {
                        font-size: 14px;
                        text-align: center;
                    }
                    .mobile-control-wrapper__grid-control-wrapper > span {
                        color: inherit;
                        font-size: 25px;
                    }
                    .mobile-control-wrapper__grid-control-wrapper_active {
                        color: var(--blue);
                    }
                    div.mobile-control-wrapper__grid-control-wrapper:hover {
                        color: var(--blue);
                    }
                    .mobile-control-wrapper__icon-wrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: inherit;
                        width: 100%;
                        padding-left: 20px;
                        box-sizing: border-box;
                        color: inherit;
                        background-color: inherit;
                        cursor: pointer;
                    }
                    .mobile-control__tab-name {
                        box-sizing: border-box;
                        background-color: inherit;
                        height: inherit;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        padding-left: 14px;
                    }
                    .mobile-control__tab-name > p {
                        text-transform: uppercase;
                    }
                    .mobile-control-wrapper__icon-wrapper > span {
                        color: inherit;
                        font-weight: normal;
                    }
                    .medium-screen-size__table-name {
                        display: none;
                    }
                    .mobile-cocntrol-wrapper__go-back {
                        display: flex;
                        flex-direction: row;
                        color: #414141;
                        width: 100%;
                        margin-top: 20px;
                        font-size: 20px;
                        font-weight: bold;
                        gap: 15px;
                        align-items: center;
                    }
                    .mobile-cocntrol-wrapper__go-back > span.icon {
                        color: inherit;
                        cursor: pointer;
                        font-size: 18px;
                    }
                    .mobile-control__menu-button {
                        display: none;
                    }
                    .mobile-control-wrapper__grid-first-panel {
                        cursor: pointer;
                        font-size: 20px;
                        padding: 10px;
                        padding-left: 10px;
                        padding-top: 30px;
                        font-weight: bold;
                        height: fit-content;
                        display: flex;
                        flex-direction: row;
                        color: #414141;
                    }
                    .mobile-control-wrapper__grid-first-panel > span {
                        display: block;
                        color: inherit;
                        font-size: 30px;
                        font-weight: 400;
                        padding-left: 4px;
                        padding-right: 5px;
                    }
                    .mobile-control-wrapper__grid-first-panel > p {
                        padding-left: 10px;
                    }
                    .mobile-menu-mini {
                        display: none;
                        top: 0;
                        box-sizing: border-box;
                        flex-direction: column;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        background-color: white;
                    }

                    .mobile-control.control {
                        display: none;
                    }
                }
                .mobile-control-wrapper__grid-nav_active {
                    color: var(--yellow);
                }
                .mobile-control-wrapper__grid {
                    display: none;
                }

                .mobile-control-wrapper__grid-nav-wrapper {
                    display: none;
                }
                .mobile-control-wrapper__grid-control {
                    display: none;
                }
                .mobile-control-wrapper__grid-control-wrapper > span.icon {
                    color: inherit;
                }

                .mobile-menu-mini-wrapper {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: fit-content;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .mobile-menu-mini-wrapper_active {
                    display: flex;
                    height: 100%;
                }
                .mobile-control-wrapper__row {
                    display: flex;
                    flex-direction: row;
                }

                .mobile-control-wrapper__row.second {
                    display: none;
                }
            </style>`;
        this.innerHTML = /*html*/ `
            ${STYLE}
            <div class="mobile-menu-mini-wrapper">
                <div class="mobile-menu-mini">
                    <div class="mobile-control-wrapper__grid-first-panel">
                        <span class="icon"></span>
                        <p>Войти</p>
                    </div>
                    <div class="mobile-control-wrapper__grid-nav-wrapper">
                        ${(() => {
                            let markup = ``;
                            for (const [index, tab] of this.THRID_PANEL_TABS.entries()) {
                                markup += this.TEMPLATE_TAB(tab[0], tab[1], {
                                    classes: index == this.active ? "mobile-control-wrapper__grid-nav_active" : "",
                                });
                            }
                            return markup;
                        })()}
                    </div>
                </div>

                <div class="mobile-control-wrapper__grid-down">
                    <div class="mobile-control-wrapper__grid-control">
                        <div class="mobile-control-wrapper__row">
                            <div class="mobile-control-wrapper__grid-control-wrapper">
                                <span class="icon"></span>
                                <p>Интерфейс</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper">
                                <span class="icon"></span>
                                <p>Соц. сети</p>
                            </div>
                            <div
                                class="mobile-control-wrapper__grid-control-wrapper mobile-control-wrapper__grid-control-wrapper_active journals">
                                <span class="icon"></span>
                                <p>Журнал</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper">
                                <span class="icon"></span>
                                <p>Импорт</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more-button">
                                <span class="icon"></span>
                                <p>Еще</p>
                            </div>
                        </div>

                        <div class="mobile-control-wrapper__row second">
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Экспорт</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Пользователи</p>
                            </div>

                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>E-mail</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Ключи.Пароли</p>
                            </div>
                            <div class="mobile-control-wrapper__grid-control-wrapper more">
                                <span class="icon"></span>
                                <p>Разное</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    openMenu() {
        const mobileMenu = document.querySelector(".mobile-menu-mini");
        const mobileMenuWrapper = document.querySelector(".mobile-menu-mini-wrapper");
        const mainContainer = document.querySelector(".main-container");
        mobileMenuWrapper.classList.add("mobile-menu-mini-wrapper_active");
        mobileMenu.style.setProperty("display", "flex");
        mainContainer.style.setProperty("display", "none");
    }

    closeMenu() {
        const mobileMenu = document.querySelector(".mobile-menu-mini");
        const mobileMenuWrapper = document.querySelector(".mobile-menu-mini-wrapper");
        const mainContainer = document.querySelector(".main-container");
        mobileMenuWrapper.classList.remove("mobile-menu-mini-wrapper_active");
        mobileMenu.style.setProperty("display", "none");
        mainContainer.style.setProperty("display", "flex");
    }

    setActvie(index) {
        this.active = index;
    }

    openSecondRow() {
        const secondRow = document.querySelector(".mobile-control-wrapper__row.second");
        secondRow.style.display = "flex";
    }
    closeSecondRow() {
        const secondRow = document.querySelector(".mobile-control-wrapper__row.second");
        secondRow.style.display = "none";
    }

    setup() {
        document.querySelector(".mobile-control-wrapper__grid-control-wrapper.journals").onclick = () => {
            this.openMenu();
        };

        document.querySelectorAll(".mobile-control-wrapper__grid-nav").forEach(nav => {
            nav.onclick = () => {
                this.closeMenu();
            };
        });

        const controls = document.querySelectorAll(".mobile-control-wrapper__grid-control-wrapper:not(.more-button)");

        const tabs = document.querySelectorAll(".mobile-control-wrapper__grid-nav");
        tabs.forEach(tab => {
            tab.onclick = () => {
                tabs.forEach(tab => {
                    tab.classList.remove("mobile-control-wrapper__grid-nav_active");
                });
                tab.classList.add("mobile-control-wrapper__grid-nav_active");
                this.closeMenu();
            };
        });

        controls.forEach(control => {
            control.addEventListener("click", () => {
                controls.forEach(control => {
                    control.classList.remove("mobile-control-wrapper__grid-control-wrapper_active");
                });
                control.classList.add("mobile-control-wrapper__grid-control-wrapper_active");
            });
        });

        const goBack = document.querySelector(".mobile-cocntrol-wrapper__go-back");
        if (goBack) {
            goBack.onclick = () => {
                this.openMenu();
            };
        }

        const more = document.querySelector(".mobile-control-wrapper__grid-control-wrapper.more-button");
        more.onclick = () => {
            if (more.querySelector("p").textContent == "Еще") {
                more.querySelector("p").textContent = "Меньше";
                this.openSecondRow();
            } else {
                more.querySelector("p").textContent = "Еще";
                this.closeSecondRow();
            }
        };
    }
}

customElements.define("mobile-ui", MobileControlMini);
