import { initCardState, getCardValue, setCardValue, startRequest1, startRequest2 } from "../../modules/promiseStore.js";

export class CourseCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Инициализируем состояние для этой карточки
        initCardState(data.id);
        const currentValue = getCardValue(data.id);

        return `
            <div class="card m-2" style="width: 18rem;">
                <img class="card-img-top" src="${data.src}" alt="${data.title}" style="height: 180px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text flex-grow-1">${data.shortText}</p>
                    <div class="mb-2">
                        <label>Значение: </label>
                        <input type="number" id="field-${data.id}" value="${currentValue}" class="form-control form-control-sm" style="width:80px; display:inline;" readonly>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <button class="btn btn-primary btn-sm" id="btn-more-${data.id}" data-id="${data.id}">Подробнее</button>
                        <button class="btn btn-danger btn-sm" id="btn-delete-${data.id}" data-id="${data.id}">Удалить</button>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <button class="btn btn-outline-secondary btn-sm" id="btn-req1-${data.id}">Запрос 1</button>
                        <button class="btn btn-outline-secondary btn-sm" id="btn-req2-${data.id}">Запрос 2</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, onMoreClick, onDeleteClick) {
        document.getElementById(`btn-more-${data.id}`).addEventListener("click", onMoreClick);
        document.getElementById(`btn-delete-${data.id}`).addEventListener("click", onDeleteClick);

        // Запрос 1
        document.getElementById(`btn-req1-${data.id}`).addEventListener("click", () => {
            const promise = startRequest1(data.id);
            if (promise) {
                promise.then(() => {
                    document.getElementById(`field-${data.id}`).value = getCardValue(data.id);
                });
            }
        });

        // Запрос 2
        document.getElementById(`btn-req2-${data.id}`).addEventListener("click", () => {
            startRequest2(data.id).then(() => {
                document.getElementById(`field-${data.id}`).value = getCardValue(data.id);
            });
        });
    }

    render(data, onMoreClick, onDeleteClick) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, onMoreClick, onDeleteClick);
    }
}
