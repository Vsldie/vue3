let eventBus = new Vue()

Vue.component('component', {
    template: `
 
        <div class="columns">
            
            <p class="head_text">Kanban доска</p>
     
                <column_1 :column_1="column_1"></column_1>
                <column_2 :column_2="column_2"></column_2>
                <column_3 :column_3="column_3"></column_3>
                <column_4 :column_3="column_4"></column_4>
        </div>
    `,

    data() {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            errors: [],
        }

    },
})


Vue.component('newCard', {
    template: `
    <div>
        <form>
            <div>
                <div>
                    <input required  type="text" placeholder="Название">
                </div>
            <div>
                <textarea required id="point"  placeholder="Описание"> </textarea>
            </div>
            <div>
                <input required type="date" >
            </div>
            <button type="submit" class="btn">Добавить</button>
            </div>
        </form>
    </div>
`,
    data() {
        return {
            name: null,
            description: null,
            date: null,
            deadline: null
        }
    },
    methods: {}
})

Vue.component('column_1', {
    template: `
        <section>
            <div>
            <p>Запланированные задачи</p>
                <div class="card">
                   <a>Удалить</a>  <a>Редактировать</a>
                   <div>Название</div>
                    <div>Описание</div>
                    <div>Дата создания</div>
                    <div>Крайний срок</div>
                    <div>Последнее изменение</div>
                                     <a>Следующая колонка</a>
                    <div>
                        <form>
                            <p>Новое название: 
                                <input type="text"  placeholder="Название">
                            </p>
                            <p>Новое описание: 
                                <textarea></textarea>
                            </p>
                            <p>
                                <input type="submit" class="btn" value="Изменить карточку">
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `,
    props: {
        column_1: {
            type: Array,
        },
        column_2: {
            type: Array,
        },
        card: {
            type: Object
        },
    },
})

Vue.component('column_2', {
    template: `
        <section>
            <div>
            <p>Задачи в работе</p>
                <div>
                   <a>Редактировать</a>
                   <div>Название</div>
                    <div>Описание</div>
                    <div>Дата создания</div>
                    <div>Крайний срок</div>
                    <div>Причина переноса: <p></p></div>
                    <div>Последнее изменение</div>
                    <a>Следующая колонка</a>
                    <div>
                        <form>
                            <p>Новое название: 
                                <input type="text"  placeholder="Название">
                            </p>
                            <p>Новое описание: 
                                <textarea></textarea>
                            </p>
                            <p>
                                <input type="submit" class="btn" value="Изменить карточку">
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `,
    props: {
        column_2: {
            type: Array,
        },
        card: {
            type: Object
        }
    },
})

Vue.component('column_3', {
    template: `
        <section>
            <div>
            <p>Тестирование</p>
                <div>
                   <a>Редактировать</a>
                   <div>Название</div>
                    <div></div>
                    <div>Дата создания</div>
                    <div>Крайний срок</div>
                    <div>Причина переноса</div>
                    <div>Последнее изменение</div>
                    <a>Предыдущая колонка</a><br>
                    <a>Следующая колонка</a>
                    <div>
                        <form>
                            <p 
                                <input type="text"  placeholder="Название">
                            </p>
                            <p>Новое описание: 
                                <textarea></textarea>
                            </p>
                            <p>
                                <input type="submit" class="btn" value="Изменить карточку">
                            </p>
                        </form>
                    </div>
                    <div>
                        <form>
                            <p>Причина переноса:
                                <input type="text">
                            </p>
                            <p>
                                <input type="submit" value="Перенос">
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `,
    props: {
        column_3: {
            type: Array,
        },
        card: {
            type: Object
        }
    },
})

let app = new Vue({
    el: '#app'
})

