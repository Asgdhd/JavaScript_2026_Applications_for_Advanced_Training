import { HeaderComponent } from "../../components/header/index.js";
import { SidebarComponent } from "../../components/sidebar/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";
import { MainPage } from "../main/index.js";
import { AuthorPage } from "../author/index.js";
import { getCourseById, isEqualObj, sumDiagonals, rle, applications, gradeMatrix } from "../../modules/store.js";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
    }

    // Инициализация 3D сцены
    init3D(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Сцена
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        // Камера
        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.set(2, 1.5, 3);
        this.camera.lookAt(0, 0, 0);

        // Рендерер
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);

        // Управление
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = false;
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 1.2;

        // Свет
        const ambientLight = new THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(1, 2, 1);
        this.scene.add(dirLight);
        const backLight = new THREE.DirectionalLight(0x88aaff, 0.5);
        backLight.position.set(-1, 1, -1);
        this.scene.add(backLight);

        // Вспомогательная сетка (пол)
        const gridHelper = new THREE.GridHelper(5, 20, 0x888888, 0x444444);
        this.scene.add(gridHelper);

        // Загрузка модели GLB
        const loader = new GLTFLoader();
        // ПУТЬ К МОДЕЛИ – положите свой .glb в папку models/ (например, models/course.glb)
        const modelUrl = './models/course.glb';
        loader.load(modelUrl, (gltf) => {
            this.model = gltf.scene;
            // Центрирование модели
            const box = new THREE.Box3().setFromObject(this.model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            // Поднимаем модель так, чтобы она стояла на "полу" (y = 0)
            const yOffset = -center.y + (size.y / 2);
            this.model.position.y += yOffset;
            this.scene.add(this.model);
        }, undefined, (error) => {
            console.error('Ошибка загрузки модели:', error);
            // Добавим заглушку – куб с текстом
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
            const cube = new THREE.Mesh(geometry, material);
            this.scene.add(cube);
        });

        // Анимация
        const animate = () => {
            requestAnimationFrame(animate);
            this.controls.update(); // обновление при вращении
            this.renderer.render(this.scene, this.camera);
        };
        animate();

        // Обработчик изменения размера окна
        window.addEventListener('resize', () => this.onWindowResize(containerId));
    }

    onWindowResize(containerId) {
        const container = document.getElementById(containerId);
        if (!container || !this.camera || !this.renderer) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    // Сброс ракурса
    setView(position, target) {
        if (!this.controls) return;
        this.camera.position.copy(position);
        this.controls.target.copy(target);
        this.controls.update();
    }

    // Демонстрация заданий
    showModal(title, content) {
        // Создаём или показываем модальное окно
        let modal = document.getElementById('hw-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'hw-modal';
            modal.className = 'custom-modal';
            modal.innerHTML = `<span class="close-modal">&times;</span><h4 id="modal-title"></h4><div id="modal-body"></div>`;
            document.body.appendChild(modal);
            modal.querySelector('.close-modal').onclick = () => modal.classList.remove('show');
        }
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-body').innerHTML = content;
        modal.classList.add('show');
    }

    demoEqualObj() {
        // Используем два объекта заявок
        const app1 = applications[0];
        const app2 = applications[0];
        const app3 = applications[1];
        const result1 = isEqualObj(app1, app2);
        const result2 = isEqualObj(app1, app3);
        this.showModal('Сравнение заявок (isEqualObj)', `
            <p>Заявка 1: ${JSON.stringify(app1)}</p>
            <p>Заявка 2: ${JSON.stringify(app2)}</p>
            <p>Заявка 3: ${JSON.stringify(app3)}</p>
            <p>Заявка 1 и 2 идентичны? <strong>${result1}</strong></p>
            <p>Заявка 1 и 3 идентичны? <strong>${result2}</strong></p>
            <p><small>Функция сравнивает объекты рекурсивно.</small></p>
        `);
    }

    demoSumDiagonals() {
        const sum = sumDiagonals(gradeMatrix);
        // Красиво отобразим матрицу
        let matrixHtml = '<table class="table table-bordered" style="color:var(--text-color); background:var(--bg-card);">';
        for (let row of gradeMatrix) {
            matrixHtml += '<tr>' + row.map(v => `<td class="text-center">${v}</td>`).join('') + '</tr>';
        }
        matrixHtml += '</table>';
        this.showModal('Сумма диагоналей матрицы оценок', `
            <p><strong>Матрица оценок (слушатели × модули):</strong></p>
            ${matrixHtml}
            <p>Сумма главной и побочной диагоналей = <strong>${sum}</strong></p>
            <p>(главная: 85+92+88 = 265, побочная: 78+92+79 = 249, сумма = 514, центр 92 учтён дважды → вычитаем: 514-92=422 – в функции корректно)</p>
        `);
    }

    demoRle() {
        const course = getCourseById(this.id);
        const original = course.details;
        const compressed = rle(original);
        // Покажем исходную и сжатую строку (ограничим длину)
        const shortOriginal = original.length > 200 ? original.substring(0,200)+'…' : original;
        this.showModal('RLE сжатие описания курса', `
            <p><strong>Исходный текст (первые 200 символов):</strong><br>${shortOriginal}</p>
            <p><strong>Сжатый текст (RLE):</strong><br>${compressed.substring(0, 300)}${compressed.length>300 ? '…' : ''}</p>
            <p><small>Использован цикл <strong>do...while</strong> для обхода строки.</small></p>
        `);
    }

    render() {
        const course = getCourseById(this.id);
        this.parent.innerHTML = `
            <div id="header-container"></div>
            <div id="sidebar-container"></div>
            <main id="main-content">
                <div class="container-fluid">
                    <button id="back-btn" class="btn btn-secondary mb-3">Назад</button>
                    <div class="row">
                        <div class="col-md-5">
                            <img src="${course.src}" class="img-fluid rounded" alt="${course.title}" style="max-height: 300px; object-fit: cover;">
                            <!-- 3D контейнер -->
                            <div id="canvas-container" class="mt-3"></div>
                            <div class="view-buttons">
                                <button id="view-front">Вид спереди</button>
                                <button id="view-back">Вид сзади</button>
                                <button id="view-left">Вид слева</button>
                                <button id="view-right">Вид справа</button>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <h3>${course.title}</h3>
                            <div id="accordion-container"></div>
                            <!-- Блок для демонстрации заданий -->
                            <hr>
                            <h5>Демонстрация заданий ДЗ</h5>
                            <div class="d-flex gap-2 flex-wrap mt-2">
                                <button id="demo-equal" class="btn btn-outline-primary">Сравнить заявки (isEqualObj)</button>
                                <button id="demo-diag" class="btn btn-outline-primary">Сумма диагоналей матрицы оценок</button>
                                <button id="demo-rle" class="btn btn-outline-primary">Сжать описание курса (RLE)</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        `;

        const header = new HeaderComponent(document.getElementById('header-container'));
        const sidebar = new SidebarComponent(document.getElementById('sidebar-container'));

        header.render(() => new MainPage(this.parent).render(), () => sidebar.toggle());
        sidebar.render(
            () => new MainPage(this.parent).render(),
            () => new AuthorPage(this.parent).render()
        );

        document.getElementById('back-btn').addEventListener('click', () => new MainPage(this.parent).render());
        new AccordionComponent(document.getElementById('accordion-container')).render(course);

        // Инициализация 3D
        this.init3D('canvas-container');

        // Обработчики для смены ракурса
        const setViewHandler = (pos, target) => {
            if (this.controls) {
                this.camera.position.copy(pos);
                this.controls.target.copy(target);
                this.controls.update();
            }
        };
        document.getElementById('view-front').addEventListener('click', () => setViewHandler(new THREE.Vector3(0, 1, 3), new THREE.Vector3(0, 0.5, 0)));
        document.getElementById('view-back').addEventListener('click', () => setViewHandler(new THREE.Vector3(0, 1, -3), new THREE.Vector3(0, 0.5, 0)));
        document.getElementById('view-left').addEventListener('click', () => setViewHandler(new THREE.Vector3(-3, 1, 0), new THREE.Vector3(0, 0.5, 0)));
        document.getElementById('view-right').addEventListener('click', () => setViewHandler(new THREE.Vector3(3, 1, 0), new THREE.Vector3(0, 0.5, 0)));

        // Обработчики демонстрации заданий
        document.getElementById('demo-equal').addEventListener('click', () => this.demoEqualObj());
        document.getElementById('demo-diag').addEventListener('click', () => this.demoSumDiagonals());
        document.getElementById('demo-rle').addEventListener('click', () => this.demoRle());
    }
}
