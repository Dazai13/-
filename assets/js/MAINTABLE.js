class AdsTableContoller {
    constructor(model, renderStrategy, paginatorController) {
        this.model = model;
        this.renderer = renderStrategy;
        this.paginator = paginatorController;
        this.inputs = new Inputs(this);
        this.sortingLinks = new SortingLinks(this);
        this.update = this.updateClosure();
    }

    clearSearch() {
        this.inputs.forEach(input => {
            input.value = "";
        });
    }

    setRenderStrategy(renderStrategy) {
        this.renderer = renderStrategy;
        this.init();
    }

    deleteEverything() {
        this.model.data = [];
        this.update();
    }

    setEventBus(eventBus) {
        this.inputs.eventBus = eventBus;
    }

    getSortInstance(name) {
        return this.model.sortingQuery.getSortInstance(name);
    }

    updateQuery(newSortingInstance) {
        this.model.sortingQuery.updateQuery(newSortingInstance);
    }

    setup() {
        console.log("setup");
        this.sortingLinks.setup();
        this.inputs.setup();
        const rubpSelect = document.querySelector("#rubp");
        if (rubpSelect) {
            rubpSelect.customOnChange = () => {
                const values = rubpSelect.getCheckedValues();
                if (values.includes("all")) {
                    rubpSelect.setValue("По всем");
                    rubpSelect.setChecked([0, 1, 2, 3]);
                } else {
                    rubpSelect.setValue(rubpSelect.computeValue());
                }
            };
            rubpSelect.setDefault(0);
            rubpSelect.customOnInput = () => {
                this.update();
            };
        }

        const statusSelect = document.querySelector("#statuses");
        if (statusSelect) {
            statusSelect.customOnChange = () => {
                const values = statusSelect.getCheckedValues();
                if (values.includes("all")) {
                    statusSelect.setValue("По всем");
                    statusSelect.setChecked([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                } else {
                    statusSelect.setValue(statusSelect.computeValue());
                }
            };

            statusSelect.customOnInput = () => {
                this.update();
            };

            statusSelect?.setDefault(8);
        }

        document.querySelector("#hint-vacancy").setDataToSearch(
            this.model.data.map(el => {
                return el.vacancyName;
            })
        );
        document.querySelector("#hint-id").setDataToSearch(
            this.model.data.map(el => {
                return el.id;
            })
        );
        document.querySelector("#hint-phone").setDataToSearch(
            this.model.data
                .map(el => {
                    return el.phones;
                })
                .flat()
                .map(phone => {
                    return phone.replace(/[^[0-9+]/g, "");
                })
        );
        document.querySelector("#hint-inn").setDataToSearch(
            this.model.data.map(el => {
                return String(el.INN);
            })
        );

        const statuses = document.querySelector("#statuses");
        const rubp = document.querySelector("#rubp");

        if (statuses) {
            statuses.customOnInput = () => {
                this.update();
            };
        }
        if (rubp) {
            rubp.customOnInput = () => {
                this.update();
            };
        }
        this.paginator.setPageChangedCallback(() => {
            this.update();
        });
    }

    async init() {
        this.renderer.initialRender();
        this.setup();
        await this.update();
    }

    setupRows() {
        document.body.querySelectorAll(".description-edit").forEach(description => {
            description.onclick = () => {
                const editPopup = document.createElement("edit-text");
                editPopup.setAttribute("value", description.textContent);
                editPopup.setCallback(value => {
                    if (value != null) {
                        const id = Number(description.getAttribute("itemId"));
                        this.model.data[id].description = value;
                        this.update();
                    }
                });
                document.body.append(editPopup);
            };
        });
        document.body.querySelectorAll(".ads-table__phone").forEach(phone => {
            phone.onclick = () => {
                this.inputs.get("phone").value = phone.textContent;
            };
        });
        document.body.querySelectorAll(".ads-table__inn").forEach(inn => {
            inn.onclick = () => {
                this.inputs.get("inn").value = inn.textContent.trim();
            };
        });
    }

    updateClosure() {
        let lastCall = null;
        return async function update() {
            lastCall ? lastCall.cancel() : null;
            lastCall = new CancellablePromise(async _ => {
                console.log(this.inputs.collectInputValues());
                const filteredData = await this.model.filter(this.inputs.collectInputValues());
                console.log("data filtered!");
                const sortedData = await this.model.sort(filteredData);
                console.log("data sorted!");
                const paginatedData = this.paginator.paginateContent(sortedData);
                console.log("data paginated!");
                const dataToView = paginatedData[this.paginator.currentPage - 1];
                console.log("before render");
                await this.renderer.render(dataToView, 100, 1000);
                console.log("data rendered!");
                this.setupRows();
                this.paginator.update();
            });
            await lastCall;
        };
    }
}
