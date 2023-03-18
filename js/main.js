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
                <column_4 :column_4="column_4"></column_4>

        </div>
    </section>
    `,

    data() {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            column_4: []
        }
    },

    mounted() {
        eventBus.$on('addColumn_1', card => {
            this.column_1.push(card)
        })
        eventBus.$on('addColumn_2', card => {
            this.column_2.push(card)
        })
        eventBus.$on('addColumn_3', card => {
            this.column_3.push(card)
        })
        eventBus.$on('addColumn_4', card => {
            this.column_4.push(card)
            if (card.date > card.deadline) {
                card.status = false
            }
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
                date: new Date(),
                deadline: new Date(this.deadline),
                reason: [],
                transfer: false,
                edit: false,
                editDate: null,
                efDate: null,
                status: true

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
        <section class="sct">
            <div>
            <p class="table_name">Запланированные задачи</p>
                <div v-for="card in column_1" class="data_table">
                   <div>Название: {{ card.name }}</div>
                    <div>Описание: {{ card.description }}</div>
                    <div>Дата создания: {{ card.date }}</div>
                    <div>Крайний срок: {{ card.deadline }}</div>
                    <div  v-if="card.editDate != null">Последнее изменение: {{ card.editDate }}</div><br>
                    <a @click="deleteCard" class="delet">Удалить</a> 
                    <a @click="card.edit = true" class="edit">Редактировать</a><br>
                    <a @click="nextColumn(card)" class="next">Следующая колонка</a>
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
            eventBus.$emit('addColumn_2',card)
        },
        deleteCard(card){
            this.column_1.splice(this.column_1.indexOf(card),1)
        },
        updateTask(card){
            card.edit = false
            this.column_1.push(card)
            this.column_1.splice(this.column_1.indexOf(card), 1)
            card.editDate = new Date()
        }
    }
})

Vue.component('column_2', {
    template: `
        <section class="sct">
            <div>
            <p class="table_name">Задачи в работе</p>
                <div  v-for="card in column_2" class="data_table">
                    <div>Название: {{ card.name }}</div>
                    <div>Описание: {{ card.description }}</div>
                    <div>Дата создания: {{ card.date }}</div>
                    <div>Крайний срок: {{ card.deadline }}</div>
                    <div v-if="card.editDate != null">Последнее изменение: {{ card.editDate }}</div><br>
                    <div class="tasks" v-if="card.reason.length">Причина переноса: <p v-for="reason in card.reason">{{ reason }}</p></div><br>
                    <a @click="card.edit = true" class="edit">Редактировать</a><br>
                    <a @click="nextColumn(card)" class="next">Следующая колонка</a>
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
        column_2: {
            type: Array,
        },
        card: {
            type: Object
        }
    },
    methods: {
        nextColumn(card) {
            this.column_2.splice(this.column_2.indexOf(card), 1)
            eventBus.$emit('addColumn_3', card)
        },

        updateTask(card) {
            card.editDate = new Date()
            card.edit = false
            this.column_2.push(card)
            this.column_2.splice(this.column_2.indexOf(card), 1)
        }
    }
})

Vue.component('column_3', {
    template: `
        <section class="sct">
            <div>
            <p class="table_name">Тестирование</p>
                <div v-for="card in column_3" class="data_table">
                   <div>Название: {{ card.name }}</div>
                   <div>Описание: {{ card.description }}</div>
                    <div>Дата создания: {{card.date}}</div>
                    <div>Крайний срок: {{card.deadline}}</div>
                    <div v-if="card.editDate != null">Последнее изменение: {{ card.editDate }}</div><br>
                    <a @click="card.edit = true" class="edit">Редактировать</a><br>
                    <a @click="card.transfer = true" class="next">Предыдущая колонка</a> <a @click="nextColumn(card)" class="next">Следующая колонка</a>
                    <div v-if="card.edit">
                        <form @submit.prevent="updateTask(card)">
                            <p> Новое название
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
                    <div v-if="card.transfer">
                        <form @submit.prevent="lastColumn(card)">
                            <p >Причина переноса:
                                <input type="text" id="reason">
                            </p>
                            <p>
                                <input class="btn" type="submit" value="Перенос">
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
    methods:{
        nextColumn(card) {
            this.column_3.splice(this.column_3.indexOf(card), 1)
            eventBus.$emit('addColumn_4', card)
        },
        updateTask(card){
            card.editDate = new Date()
            card.edit = false
            this.column_3.push(card)
            this.column_3.splice(this.column_3.indexOf(card), 1)
        },
        lastColumn(card) {
            let reasonValue = document.getElementById('reason').value;
            card.reason.push(reasonValue)
            card.transfer = false
            this.column_3.splice(this.column_3.indexOf(card), 1)
            eventBus.$emit('addColumn_2', card)
        },
    }
})

Vue.component('column_4', {
    template: `
        <section class="sct">
            <div>
            <p class="table_name">Выполненные задачи</p>
                <div v-for="card in column_4" class="data_table">
                    <div>Название: {{ card.name }}</div>
                    <div>Описание: {{ card.description }}</div>
                    <div>Дата создания: {{ card.date }}</div>
                    <div>Крайний срок: {{ card.deadline }}</div><br>
                    <p v-if="card.status">Завершено</p>
                    <p v-else>Задание больше не действительно</p> 
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
})


let app = new Vue({
    el: '#app'
})

