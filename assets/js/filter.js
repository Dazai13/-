class FilterQuery {
    constructor(data, eventBus) {
        this.data = data;
        this.idInput = this.getIdFilterInput();
        this.vacancyNameInput = this.getVacancyNameInput();
        this.sourceInput = this.getSourceInput();
        this.dateInput = document.querySelector(".table__row-item.title.date>input");
        this.mobileVacancyInput = document.querySelector(".mobile-wrapper__input-vacancy-name>input");
        this.mobileIdInput = document.querySelector(".mobile-wrapper__input-id>input");
        this.mobileSourceInput = document.querySelector(".mobile-wrapper__input-source>input");
        this.mobileDateInput = document.querySelector(".mobile-wrapper__input-date>input");
        this.callback = () => {};
        this.currentHint = null;
        this.eventBus = eventBus;

        this.inputFieldMapping = new Map();

        this.inputFieldMapping.set(this.mobileVacancyInput, "vacancyNameMobile");
        this.inputFieldMapping.set(this.mobileIdInput, "idMobile");
        this.inputFieldMapping.set(this.mobileSourceInput, "sourceMobile");
        this.inputFieldMapping.set(this.mobileDateInput, "dateMobile");
        this.inputFieldMapping.set(this.idInput, "id");
        this.inputFieldMapping.set(this.vacancyNameInput, "vacancyName");
        this.inputFieldMapping.set(this.dateInput, "date");
        this.inputFieldMapping.set(this.sourceInput, "source");

        this.mobileNonMobileMapping = new Map();

        this.mobileNonMobileMapping.set(this.mobileVacancyInput, this.vacancyNameInput);
        this.mobileNonMobileMapping.set(this.mobileDateInput, this.dateInput);
        this.mobileNonMobileMapping.set(this.mobileIdInput, this.idInput);
        this.mobileNonMobileMapping.set(this.mobileSourceInput, this.sourceInput);
    }
    setCallback(callable) {
        console.log("settedCallback");
        this.callback = callable;
    }
    onInput() {
        this.redrawCrosses();
        this.callback();
        if (
            this.mobileDateInput.value ||
            this.mobileIdInput.value ||
            this.mobileSourceInput.value ||
            this.mobileVacancyInput.value ||
            this.idInput.value ||
            this.vacancyNameInput.value ||
            this.dateInput.value ||
            this.sourceInput.value
        ) {
            this.eventBus.notice({}, "fieldNotEmpty");
        } else {
            this.eventBus.notice({}, "fieldEmpty");
        }
        [
            this.mobileIdInput,
            this.mobileSourceInput,
            this.mobileDateInput,
            this.mobileVacancyInput,
            this.idInput,
            this.vacancyNameInput,
            this.dateInput,
            this.sourceInput,
        ].forEach(input => {
            const fieldName = this.inputFieldMapping.get(input);
            window.localStorage.setItem(fieldName, input.value);
        });
    }
    getIdFilterInput() {
        return document.querySelector(".table__row-item.title.id>input");
    }
    getVacancyNameInput() {
        return document.querySelector(".table__row-item.title.vacancy-name>input");
    }
    getSourceInput() {
        return document.querySelector(".table__row-item.title.source>input");
    }
    setupEventBus() {
        this.eventBus.addSubscriber(() => {
            this.vacancyNameInput.value = "";
            this.idInput.value = "";
            this.sourceInput.value = "";
            this.dateInput.value = "";
            this.mobileVacancyInput.value = "";
            this.mobileIdInput.value = "";
            this.mobileDateInput.value = "";
            this.mobileSourceInput.value = "";
            this.onInput();
        }, "clearSearch");
        this.eventBus.addSubscriber(event => {
            this.dateInput.value = event.date == this.dateInput.value ? "" : event.date;
            this.dateInput.dispatchEvent(new Event("input"));
            this.onInput();
        }, "dateSetted");
        this.eventBus.addSubscriber(event => {
            this.sourceInput.value = event.source == this.sourceInput.value ? "" : event.source;
            this.sourceInput.dispatchEvent(new Event("input"));
            this.onInput();
        }, "sourceSetted");
        this.eventBus.addSubscriber(() => {
            document.querySelectorAll(".litle-cross")?.forEach(cross => {
                cross.remove();
            });
        }, "clearSearch");
    }
    redrawCrosses() {
        [
            this.mobileVacancyInput,
            this.mobileIdInput,
            this.mobileSourceInput,
            this.mobileDateInput,
            this.idInput,
            this.vacancyNameInput,
            this.dateInput,
            this.sourceInput,
        ].forEach(input => {
            if (input.value && !input.parentElement.querySelector(".litle-cross")) {
                const cross = new Cross(input.parentElement, input);
                cross.setup();
            } else if (!input.value) {
                input.parentElement.querySelector(".litle-cross")?.remove();
            }
        });
    }
    setup() {
        this.setupEventBus();

        [
            this.mobileVacancyInput,
            this.mobileIdInput,
            this.mobileSourceInput,
            this.mobileDateInput,
            this.idInput,
            this.vacancyNameInput,
            this.dateInput,
            this.sourceInput,
        ].forEach(input => {
            const fieldName = this.inputFieldMapping.get(input).replace("Mobile", "");

            input.onfocus = async event => {
                const container = input.parentElement;
                this.currentHint = new Hint(
                    this.data.map(vacancy => String(vacancy[fieldName])),
                    container
                );
                this.currentHint.setInitial(event.target.value);
                const result = await this.currentHint.open();
                if (result) {
                    input.value = result;
                    input.dispatchEvent(new Event("input"));
                    this.callback();
                }
            };

            input.onblur = () => {
                this.currentHint?.close();
                this.currentHint = null;
            };

            input.oninput = event => {
                for (const [mobileInput, nonMonileInput] of this.mobileNonMobileMapping.entries()) {
                    if (input == mobileInput) {
                        console.log("wewe");
                        nonMonileInput.value = input.value;
                    } else if (input == nonMonileInput) {
                        mobileInput.value = input.value;
                    }
                }
                this.onInput();
                this.currentHint?.update(event.target.value);
            };
        });
    }

    restoreState() {
        console.log(window.innerWidth);
        const isMobile = window.innerWidth <= 880;
        console.log("isMobile", isMobile);
        [
            this.mobileVacancyInput,
            this.mobileDateInput,
            this.mobileIdInput,
            this.mobileSourceInput,
            this.idInput,
            this.vacancyNameInput,
            this.dateInput,
            this.sourceInput,
        ].forEach(input => {
            const fieldName = this.inputFieldMapping.get(input);
            input.value = window.localStorage.getItem(fieldName.replace("Mobile", ""));
        });

        [
            this.mobileDateInput,
            this.mobileIdInput,
            this.mobileSourceInput,
            this.mobileVacancyInput,
            this.idInput,
            this.vacancyNameInput,
            this.dateInput,
            this.sourceInput,
        ].forEach(input => {
            input.dispatchEvent(new Event("input"));
        });
    }

    filterVacancies(vacancies) {
        let filteredVacancies = vacancies;
        for (let [input, fieldName] of this.inputFieldMapping.entries()) {
            fieldName = fieldName.replace("Mobile", "");
            filteredVacancies = filteredVacancies.filter(el => {
                return String(el[fieldName])
                    .toLowerCase()
                    .replace(/[^A-zА-я0-9]/, "")
                    .startsWith(input.value.toLowerCase().replace(/[^A-zА-я0-9]/, ""));
            });
        }
        return filteredVacancies;
    }
}
