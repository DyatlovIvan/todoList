import {TasksType} from "../App";
import {
    addNewTask,
    changeSelectTask,
    removeTask, setTask,
    TasksReducer,
    updateTask
} from "./tasksReducer";
import {TaskPriorities, TaskStatuses} from "../api/todolistsApi";

const todoListId1 = 'todoListId1';
const todoListId2 = 'todoListId2';
let startState: TasksType
beforeEach(() => {
    startState = {
        [todoListId1]: [
            {
                id: '1',
                title: 'HTML',
                status: TaskStatuses.Complete,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId1'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Complete,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId1'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId1'
            },
            {
                id: '4',
                title: 'Redux',
                status: TaskStatuses.New,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId1'
            },
            {
                id: '5',
                title: 'Angular',
                status: TaskStatuses.New,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId1'
            },
            {
                id: '6',
                title: 'CSS',
                status: TaskStatuses.InProgress,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId1'
            }
        ],
        [todoListId2]: [
            {
                id: '1',
                title: 'Milk',
                status: TaskStatuses.New,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId2'
            },
            {
                id: '2',
                title: 'Bread',
                status: TaskStatuses.New,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId2'
            },
            {
                id: '3',
                title: 'Beer',
                status: TaskStatuses.New,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                todoListId: 'todoListId2'
            },
        ]
    }
})


test('remove task', () => {
    const endState = TasksReducer(startState, removeTask(todoListId1, '1'))
    expect(endState[todoListId1].length).toBe(5)
})

test('add task', () => {
    const endState = TasksReducer(startState, addNewTask( {
        id: '1',
        title: 'HTML',
        status: TaskStatuses.Complete,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        todoListId: 'todoListId1'
    }))
    expect(endState[todoListId1].length).toBe(7);
    expect(endState[todoListId2].length).toBe(3);
    expect(endState[todoListId1][0].id).toBeDefined();
    expect(endState[todoListId1][0].title).toBe('new task!');
    expect(endState[todoListId1][0].status).toBe(TaskStatuses.New);
})

test('update task', () => {
    const endState = TasksReducer(startState, updateTask(todoListId1, '1', 'hey'))
    expect(endState[todoListId1][0].title).toBe('hey')
})

test('change is done', () => {
    const endState = TasksReducer(startState, changeSelectTask(todoListId1, '1', TaskStatuses.New))
    expect(endState[todoListId1][0].status).toBe(TaskStatuses.New)
    expect(endState[todoListId2][0].status).toBe(TaskStatuses.New)
})

test('set tasks', () => {
    const endstate = TasksReducer({
        [todoListId1]: [],
        [todoListId2]: []
    }, setTask(startState[todoListId1], 'todoListId1'))
    expect(endstate[todoListId1].length).toBe(6)
})
