let eventBus = new Vue()

Vue.component('component', {
    template: `
    <section>
        <div class="columns">
            
            <p class="head_text">Kanban доска</p>
            
            <newCard></newCard>
     
                <column_1 :column_1="column_1"></column_1>
                <column_2 :column_2="column_2"></column_2>
                <column_3 :column_3="column_3"></column_3>
                <column_4 :column_3="column_4"></column_4>
        </div>
    </section>
    `,

    data() {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            columns_4: []
        }
    },
    mounted() {
        eventBus.$on('addColumn_1', card => {
            this.column_1.push(card)
        })
    }
})


Vue.component('newCard', {
    template: `
    <div>
        <form @submit.prevent="onSubmit" class="add_colum">
            <div>
                <div>
                    <div сlass="int">
                        <input v-model="name" required  type="text" placeholder="Название">
                    </div>
                <div>
                    <textarea v-model="description" required id="point" class="txt" placeholder="Описание"> </textarea>
                </div>
            </div>    
            <div>
                <input v-model="deadline" class="date" required type="date" >
            </div>
            <button  type="submit" class="btn">Добавить</button>
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
    methods: {
        onSubmit() {
            let card = {
                name: this.name,
                description: this.description,
                date: new Date().toLocaleString(),
                deadline: this.deadline,
                reason: [],
                transfer: false,
                edit: false,
                editDate: null,
                efDate: null
            }
            eventBus.$emit('addColumn_1', card)
            this.name = null
            this.description = null
            this.date = null
            this.deadline = null
        }
    }
})

Vue.component('column_1', {
    template: `
        <section id="sct">
            <div>
            <p>Запланированные задачи</p>
                <div v-for="card in column_1">
                   <a @click="deleteCard(card)">Удалить</a>  
                   <a @click="card.edit = true">Редактировать</a>
                   <div>Название: {{ card.name }}</div>
                    <div>Описание: {{ card.description }}</div>
                    <div>Дата создания: {{ card.date }}</div>
                    <div>Крайний срок: {{ card.deadline }}</div>
                    <div  v-if="card.editDate != null">Последнее изменение: {{ card.editDate }}</div>
                    <a @click="nextColumn(card)">Следующая колонка</a>
                    <div v-if="card.edit">
                        <form @submit.prevent="updateTask(card)">
                            <p>Новое название: 
                                <input v-model="card.name" type="text"  placeholder="Название">
                            </p>
                            <p>Новое описание: 
                                <textarea v-model="card.description"></textarea>
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
    methods: {
        nextColumn(card){
            this.column_1.splice(this.column_1.indexOf(card), 1)
            eventBus.emit('addColumn_2',card)
        },
        deleteCard(card){
            this.column_1.splice(this.column_1.indexOf(card),1)
        },
        updateTask(card){
            card.edit = false
            this.column_1.push(card)
            this.column_1.splice(this.column_1.indexOf(card), 1)
            card.editDate = new Date().toLocaleString()
        }
    }
})

/*Vue.component('column_2', {
    template: `
        <section id="sct">
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
        <section id="sct">
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

Vue.component('column_4', {
    template: `
        <section id="sct">
            <div>
            <p>Выполненные задачи</p>
                <div>
                    <div>Название</div>
                    <div>Описание</div>
                    <div>Дата создания</div>
                    <div>Крайний срок</div>
                    <div>Завершено вовремя</div>
                    <div>Завершено не вовремя</div>
                </div>
            </div>
        </section>
    `,
    props: {
        column_4: {
            type: Array,
        },
        card: {
            type: Object
        }
    },
})*/


let app = new Vue({
    el: '#app'
})

