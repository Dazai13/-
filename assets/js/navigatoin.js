class DrawStrategy {
    constructor(container) {
        this.container = container;
    }
    drawPages() {}
    drawFromTo(from, to, activePage) {
        const pivotElement = this.getPivot();
        for (let index = from; index <= to; index++) {
            const pageNumber = document.createElement("div");
            pageNumber.classList.add("pagination__page-number");
            pageNumber.textContent = index;
            pageNumber.setAttribute("index", index);
            console.log(`active page - is ${activePage}`);
            index == activePage ? pageNumber.classList.add("active") : null;
            pivotElement.insertAdjacentElement("beforebegin", pageNumber);
        }
    }

    getPivot() {
        const pagination = this.container.querySelector(".pagination");
        const pages = pagination.querySelectorAll(".page-control-element");
        const pivotElement = pages[pages.length - 1];
        return pivotElement;
    }
}

class DefaultDrawStrategy extends DrawStrategy {
    constructor(container, pagesToDraw) {
        super(container);
        this.pagesToDraw = pagesToDraw;
    }
    drawPages() {
        this.drawFromTo(1, this.pagesToDraw);
    }
}

class OverflowDrawStrategy extends DrawStrategy {
    constructor(container, pagesToDraw, currentPage, pagesCanBeDrawed) {
        super(container);
        this.pagesToDraw = pagesToDraw;
        this.currentPage = currentPage;
        this.pagesCanBeDrawed = pagesCanBeDrawed;
    }

    drawEllipses(index) {
        const pivotElement = this.getPivot();
        const ellipsis = document.createElement("div");
        ellipsis.classList.add("pagination__page-number");
        ellipsis.classList.add("ellipsis");
        ellipsis.setAttribute("index", index);
        ellipsis.textContent = "...";
        pivotElement.insertAdjacentElement("beforebegin", ellipsis);
    }

    drawPages() {
        const countOfPagesFromCurrentPagesToEnd = Number(this.pagesToDraw) - Number(this.currentPage);
        if (countOfPagesFromCurrentPagesToEnd <= this.pagesCanBeDrawed) {
            const startPage = this.pagesToDraw - this.pagesCanBeDrawed;
            this.drawFromTo(startPage, this.pagesToDraw);
        } else {
            const countOfPagesBeforeEllipsis = Number(this.pagesCanBeDrawed) - 2;
            this.drawFromTo(this.currentPage, Number(this.currentPage) + Number(countOfPagesBeforeEllipsis), this.currentPage);
            this.drawEllipses(this.currentPage + countOfPagesBeforeEllipsis);
            this.drawFromTo(this.pagesToDraw, this.pagesToDraw);
        }
    }
}

class OverflowDrawStrategyWithThresholds extends OverflowDrawStrategy {
    constructor(container, pagesToDraw, currentPage, pagesCanBeDrawed) {
        super(container, pagesToDraw, currentPage, pagesCanBeDrawed);
    }
    drawPages() {
        const countOfPagesFromCurrentPagesToEnd = this.pagesToDraw - this.currentPage;
        if (countOfPagesFromCurrentPagesToEnd < this.pagesCanBeDrawed) {
            const startPage = this.pagesToDraw - this.pagesCanBeDrawed;
            this.drawFromTo(startPage + 1, this.pagesToDraw, this.currentPage);
        } else {
            const countOfPagesBeforeEllipsis = this.pagesCanBeDrawed - 2;
            const numberOfRange = Math.floor((this.currentPage - 1) / countOfPagesBeforeEllipsis);
            const startPage = countOfPagesBeforeEllipsis * numberOfRange + 1;
            this.drawFromTo(startPage, startPage + countOfPagesBeforeEllipsis - 1, this.currentPage);
            this.drawEllipses(startPage + countOfPagesBeforeEllipsis);
            this.drawFromTo(this.pagesToDraw, this.pagesToDraw);
            console.log(`from - ${startPage} to - ${startPage + countOfPagesBeforeEllipsis}`);
            console.log(
                `can be drawed - ${this.pagesCanBeDrawed} type - ${typeof this.pagesCanBeDrawed} current page - ${this.currentPage} ${typeof this
                    .currentPage} number of range - ${numberOfRange} start page - ${startPage}`
            );
        }
    }
}

class PaginatorRenderer {
    constructor(container, numberOfPages) {
        this.container = container;
        this.numberOfPages = numberOfPages;
    }
    initialRender() {
        const styles = `
            <style>
                @media (width <= 750px) {
                    pagination-control {
                        display: none;
                    }
                }
                @media (width <= 880px) {
                    div.pagination {
                        display: flex;
                        margin-top: 20px;
                    }
                    .pagination__page-number {
                        width: 50px;
                        height: 50px;
                    }
                    .control-panel {
                        width: 100%;
                    }
                    div.pagination__specify-page {
                        display: none;
                    }
                    .pagination__specify-page > input {
                        width: 50px;
                        height: 45px;
                    }
                    .pagination__pages-control {
                        width: 100%;
                        justify-content: center;
                        gap: 10px;
                    }
                    .pagination__specify-page-text {
                        display: none;
                    }
                    .pagination__go-button {
                        width: 50px;
                        height: 45px;
                    }
                }
                pagination-control {
                    width: 100%;
                }
                .pagination__specify-page > input {
                    box-sizing: border-box;
                    width: 76px;
                    height: 100%;
                    outline: none;
                    border: 2px solid lightgray;
                    font-size: 15px;
                    padding: 10px;
                    color: #414141;
                }
                .pagination__pages-control {
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                }
                .pagination {
                    width: 100%;
                    margin-top: 70px;
                    height: 50px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .pagination__specify-page {
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 20px;
                }
                .pagination__page-number {
                    box-sizing: border-box;
                    width: 50px;
                    height: 50px;
                    box-sizing: border-box;
                    border: 2px solid var(--blue);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: 0.5s;
                }
                .pagination__page-number.active {
                    background-color: var(--blue);
                    color: var(--yellow);
                }
                .pagination__page-number > * {
                    cursor: pointer;
                }
                .pagination__page-number.inactive {
                    border: 2px solid lightgray;
                    color: lightgray;
                    cursor: default;
                }
                .pagination__page-number.inactive > span.icon {
                    color: lightgray;
                    cursor: default;
                }
                .pagination__page-number.inactive:hover {
                    color: lightgray;
                    border: 2px solid lightgray;
                    background: none;
                    cursor: default;
                }
                .pagination__page-number.inactive:hover > span.icon {
                    color: lightgray;
                    cursor: default;
                }
                .pagination__page-number.inactive:hover > p {
                    cursor: default;
                }
                .page-control-element > p {
                    cursor: pointer;
                }
                .page-control-element > span.icon {
                    cursor: pointer;
                    color: var(--blue);
                    transition: 0.5s;
                }
                .page-control-element:hover > span.icon {
                    transition: 0.5s;
                    color: white;
                }
                .pagination__page-number:hover {
                    background-color: var(--blue);
                    color: white;
                    transition: 0.5s;
                }
                .pagination__go-button {
                    box-sizing: border-box;
                    border: 2px solid var(--blue);
                    color: var(--blue);
                    width: 76px;
                    height: 50px;
                    font-size: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                .pagination__go-button.inactive {
                    border-color: lightgray;
                    color: lightgray;
                    cursor: default;
                }
            </style>
        `;
        this.container.innerHTML =
            `
                <div class="pagination">
                    <div class="pagination__specify-page">
                        <p class="pagination__specify-page-text">Укажите страницу</p>
                        <input type="text" />
                        <div class="pagination__go-button inactive">Go</div>
                    </div>
                    <div class="pagination__pages-control">
                        <div class="pagination__page-number page-control-element">
                            <span class="icon"></span>
                        </div>
                        <div class="pagination__page-number page-control-element">
                            <p>First</p>
                        </div>
                        <!--<div class="pagination__page-number page-control-element">
                            <p>Last</p>
                        </div>-->
                        <div class="pagination__page-number page-control-element">
                            <span class="icon"></span>
                        </div>
                    </div>
                </div>
            ` + styles;
    }
    deleteLastPages() {
        this.container.querySelectorAll(".pagination__page-number:not(.page-control-element)").forEach(el => {
            el.remove();
        });
    }
    render(currentPage) {
        this.deleteLastPages();
        this.drawPages(this.numberOfPages, currentPage);
    }
    calculatePagesCanBeDrawed() {
        const pagesControlContainer = this.container.querySelector(".pagination__pages-control");
        pagesControlContainer.style.setProperty("flex", "1");
        const availableWidth = pagesControlContainer.clientWidth;
        pagesControlContainer.style.setProperty("flex", "0");
        const numberOfPagesCanDraw = Math.floor(availableWidth / 60) - 4;
        return numberOfPagesCanDraw;
    }
    drawPages(numberOfPages, currentPage) {
        const numberOfPagesCanDraw = this.calculatePagesCanBeDrawed();

        if (numberOfPages > numberOfPagesCanDraw) {
            new OverflowDrawStrategyWithThresholds(this.container, numberOfPages, currentPage, numberOfPagesCanDraw).drawPages();
        } else {
            console.log(`${numberOfPages} < ${numberOfPagesCanDraw} default draw`);
            new DefaultDrawStrategy(this.container, numberOfPages).drawPages();
        }
    }
}

class Paginator extends HTMLElement {
    constructor() {
        super();
        this.currentPage = 1;
        this.numberOfPages = 1;
        this.paginationRender = new PaginatorRenderer(this, this.numberOfPages);
        this.callback = () => {};
        this.prevRenderCall = null;
    }
    connectedCallback() {
        this.paginationRender.initialRender();
        this.paginationRender.render();
    }

    update() {
        this.paginationRender = new PaginatorRenderer(this, this.numberOfPages);
        this.paginationRender.render(this.currentPage);
        this.setupControl();
    }

    setPageChangedCallback(callable) {
        this.callback = callable;
    }

    onCurrentPageChanged() {
        this.callback();
        this.update();
    }

    setupPageInput() {
        const specifyPage = this.querySelectorAll(".pagination__specify-page");
        specifyPage.forEach(el => {
            const specifyPageInput = el.querySelector("input");
            const specifyPageGoButton = el.querySelector(".pagination__go-button");
            specifyPageGoButton.onclick = () => {
                if (specifyPageGoButton.classList.contains("inactive")) {
                    return;
                } else {
                    this.currentPage = Number(specifyPageInput.value);
                    this.onCurrentPageChanged();
                }
            };

            specifyPageInput.oninput = () => {
                const convertedUserInput = Number(specifyPageInput.value);
                if (!isNaN(convertedUserInput) && convertedUserInput >= 1 && convertedUserInput <= this.numberOfPages) {
                    specifyPageGoButton.classList.remove("inactive");
                } else {
                    specifyPageGoButton.classList.add("inactive");
                }
            };
        });
    }

    setupControl() {
        this.setupPageInput();
        this.querySelectorAll(".pagination").forEach(paginationElement => {
            const prev = 0,
                first = 1,
                next = 2;
            const controlElements = paginationElement.querySelectorAll(".pagination__page-number.page-control-element");
            controlElements[prev].onclick = () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.onCurrentPageChanged();
                }
            };
            controlElements[first].onclick = () => {
                this.currentPage = 1;
                this.onCurrentPageChanged();
            };
            controlElements[next].onclick = () => {
                if (this.currentPage + 1 <= this.numberOfPages) {
                    this.currentPage++;
                    this.onCurrentPageChanged();
                }
            };
            const pageNumbers = paginationElement.querySelectorAll(".pagination__page-number:not(.page-control-element)");
            pageNumbers.forEach(pageNumber => {
                pageNumber.onclick = event => {
                    const pageNumberToBeSetted = event.target.getAttribute("index");
                    this.currentPage = Number(pageNumberToBeSetted);
                    this.onCurrentPageChanged();
                };
            });
            window.addEventListener("resize", () => {
                clearTimeout(this.prevRenderCall);
                this.prevRenderCall = setTimeout(() => {
                    this.update();
                }, 100);
            });
        });
    }

    paginateContent(itemsArray) {
        const itemsInPage = 500;
        const pages = [];
        for (let i = 0; i < itemsArray.length; i += itemsInPage) {
            const page = itemsArray.slice(i, i + itemsInPage);
            pages.push(page);
        }
        if (pages.length == 0) {
            pages.push([]);
        }
        this.currentPage = pages.length > this.currentPage ? this.currentPage : pages.length;

        this.numberOfPages = pages.length;
        return pages;
    }
}

customElements.define("pagination-control", Paginator);
