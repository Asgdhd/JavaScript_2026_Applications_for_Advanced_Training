export class CourseCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card m-2" style="width: 18rem;">
                <img class="card-img-top" src="${data.src}" alt="${data.title}" style="height: 180px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text flex-grow-1">${data.shortText}</p>
                    <div class="d-flex justify-content-between mt-2">
                        <button class="btn btn-primary btn-sm" id="btn-more-${data.id}" data-id="${data.id}">Подробнее</button>
                        <button class="btn btn-danger btn-sm" id="btn-delete-${data.id}" data-id="${data.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, onMoreClick, onDeleteClick) {
        document.getElementById(`btn-more-${data.id}`).addEventListener("click", onMoreClick);
        document.getElementById(`btn-delete-${data.id}`).addEventListener("click", onDeleteClick);
    }

    render(data, onMoreClick, onDeleteClick) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, onMoreClick, onDeleteClick);
    }
}
