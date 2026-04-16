export class AccordionComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data) {
        this.parent.innerHTML = `
            <div class="accordion mt-3" id="courseAccordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                            Программа курса
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            ${data.details}
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                            Длительность обучения
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            Курс рассчитан на <strong>${data.duration}</strong>.
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
