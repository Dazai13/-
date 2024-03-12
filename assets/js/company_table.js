class VacanciesTable {
    constructor(data, paginator, filterQuery, popupFactory, sortQuery, eventBus) {
        this.paginator = paginator;
        this.dataTable = document.querySelector(".table.vacancies");
        this.data = data;
        this.filteredContent = [];
        this.paginatedContent = [];
        this.sortedContent = [];
        this.filterQuery = filterQuery;
        this.popupFactory = popupFactory;
        this.sortQuery = sortQuery;
        this.eventBus = eventBus;
    }

    filteredVacancies() {
        return this.data;
    }

    update() {
        this.filteredContent = this.filterQuery.filterVacancies(this.data);
        this.sortQuery.sort(this.filteredContent);
        this.paginatedContent = this.paginator.paginateContent(this.filteredContent);
        this.paginator.update();
        this.render();
        this.setupRowsControl();
    }

    setupRowsControl() {
        document.querySelectorAll(".row-wrapper").forEach(row => {
            row.querySelector(".edit").onclick = async () => {
                const vacancyId = Number(row.querySelector(".id>p").textContent);
                const vacancy = this.data.find(vacancy => {
                    return vacancy.id == vacancyId;
                });
                const vacancyIdInData = this.data.findIndex(vacancy => {
                    return vacancy.id == vacancyId;
                });
                const editVacancyPopup = this.popupFactory.build(this.popupFactory.EDIT);
                editVacancyPopup.setEventBus(this.eventBus);
                editVacancyPopup.setContext(vacancy);
                if ((await editVacancyPopup.open()) == editVacancyPopup.CANCEL) {
                    return;
                }
                this.data[vacancyIdInData] = editVacancyPopup.result;
                this.update();
            };

            row.querySelector(".delete").onclick = async () => {
                const vacancyId = Number(row.querySelector(".id>p").textContent);
                const vacancy = this.data.find(vacancy => {
                    return vacancy.id == vacancyId;
                });
                const vacancyIdInData = this.data.findIndex(vacancy => {
                    return vacancy.id == vacancyId;
                });
                const deleteVacancyPopup = this.popupFactory.build(this.popupFactory.DELETE);
                deleteVacancyPopup.setContext(vacancy);
                if ((await deleteVacancyPopup.open()) == deleteVacancyPopup.CANCEL) {
                    return;
                }

                this.data.splice(vacancyIdInData, 1);
                this.update();
            };

            const date = row.querySelector(".table__row-item.date");
            date.onclick = () => {
                const dateContent = date.textContent.trim();
                this.eventBus.notice({ date: dateContent }, "dateSetted");
            };

            const source = row.querySelector(".table__row-item.source");
            source.onclick = () => {
                const sourceContent = source.textContent.trim();
                this.eventBus.notice({ source: sourceContent }, "sourceSetted");
            };
        });
    }

    setupEventBusCallbacks() {
        this.eventBus.addSubscriber(event => {
            this.data.length = 0;
            this.update();
        }, "deleteEverything");

        this.eventBus.addSubscriber(event => {
            event.id =
                this.data.reduce(
                    (prev, curr) => {
                        return prev.id > curr.id ? prev : curr;
                    },
                    { id: 0 }
                ).id + 1;
            this.data.push(event);
            this.update();
        }, "addVacancy");

        this.eventBus.addSubscriber(event => {
            const searchResult = this.data.find(el => {
                return el.vacancyName == event.data;
            });
            if (searchResult != undefined) {
                event.callback(searchResult);
            }
        }, "vacancyNameInput");

        this.eventBus.addSubscriber(() => {
            this.update();
        }, "filtersChanged");
    }

    setup() {
        this.paginatedContent = this.paginator.paginateContent(this.data);
        this.paginator.setPageChangedCallback(() => {
            console.log("callback");
            this.render();
        });
        this.filterQuery.setup();
        this.filterQuery.setCallback(() => {
            this.update();
        });
        this.filterQuery.restoreState();
        this.setupRowsControl();
    }

    setCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
    }

    clear() {
        document.querySelectorAll(".row-wrapper").forEach(el => {
            el.remove();
        });
    }

    render() {
        this.clear();
        const inTotalMarkup = document.querySelector(".control-panel__segment.in-total>p>span");
        inTotalMarkup.textContent = this.paginatedContent.flat(1).length;
        if (this.paginatedContent.length < 1) {
            return;
        }
        let number = 1 + 500 * (this.paginator.currentPage - 1);
        for (const vacancy of this.paginatedContent[this.paginator.currentPage - 1]) {
            const itemNumberHTML = `<div class='mobile-wrapper__row mobile-wrapper__row-number'>
                                    <p class="mobile-wrapper__row-extra-content caption">№</p>
                                    <div class="table__row-item center selectable">
                                      <p>${number}</p>
                                    </div>
                              </div>`;

            const idHTML = `<div class='mobile-wrapper__row mobile-wrapper__row-id'>
                        <p class="mobile-wrapper__row-extra-content caption">ID</p>
                        <div class="table__row-item center selectable id">
                            <p>${vacancy.id}</p>
                        </div>
                    </div>`;

            const vacancyName = `<div class='mobile-wrapper__row mobile-wrapper__row-vacancy-name '>
                              <div class="table__row-item selectable non-border table__row-item-vacancy-name">
                                    <p class="table__row-item-vacancy-name-text">${vacancy.vacancyName}</p>
                              </div>
                            </div>`;
            const edit = `
                      <div class="mobile-wrapper__row mobile-wrapper__row-edit">
                        <div tooltip="редактировать вакансию" class="table__row-item title selectable non-border edit">
                            <span class="icon control-edit edit"></span>
                        </div>
                        <div tooltip="удалить вакансию" class="table__row-item title selectable non-border edit delete">
                            <span class="icon control-edit delete"></span>
                        </div>
                      </div>
                        `;
            const frequency = `
                <div class="mobile-wrapper__row mobile-wrapper__row-frequency"> 
                    <p class="mobile-wrapper__row-extra-content caption">Частота</p>
                    <div class="table__row-item">
                    <p class="">${vacancy.frequency ? vacancy.frequency : ''}</p>
                    </div>
                </div>
            `;
            const source = `
                        <div class="mobile-wrapper__row mobile-wrapper__row-source"> 
                          <p class="mobile-wrapper__row-extra-content caption">Источник добавления</p>
                          <div class="table__row-item source">
                            <p class="source ${vacancy.source == "Published" ? "published" : ""}">${vacancy.source}</p>
                          </div>
                        </div>`;
            const date = `
                  <div class="mobile-wrapper__row mobile-wrapper__row-date"> 
                  <p class="mobile-wrapper__row-extra-content caption">Дата</p>
                    <div class="table__row-item date">
                        <p class="date">${vacancy.date}</p>
                    </div>
                  </div>
                  `;
            this.dataTable.insertAdjacentHTML(
                "beforeend",
                `<div class="row-wrapper">${itemNumberHTML + idHTML + vacancyName + edit + frequency + source + date}</div>`
            );
            number++;
        }
        this.setupRowsControl();
    }
}
