import { DashboardActions } from '../../utilities/constants';
import Store from '../../data-store/store';

const model = 'tasks';

export function readTasks(){
    return {
        type: DashboardActions.READ_TASKS,
        payload: Store.findAll(model)
    };
}

export function readTask(id){
    return {
        type: DashboardActions.READ_TASK,
        payload: Store.findRecord(model, id)
    };
}

export function createTask(taskData){
    return {
        type: DashboardActions.CREATE_TASK,
        payload: Store.createRecord(model, taskData)
    };
}

export function changeView(viewSelected){
    return {
        type: DashboardActions.CHANGE_VIEW,
        view: viewSelected
    };
}
export function changeMonth(prevMonth){
    return {
        type: DashboardActions.CHANGE_MONTH,
        isPrev: prevMonth
    };
}
export function changeDate(day, backward, forWeek){
    return {
        type: DashboardActions.CHANGE_DATE,
        date: day,
        backward: backward,
        forWeek: forWeek
    };
}
export function toggleTaskForm(){
    return {
        type: DashboardActions.TOGGLE_TASK_FORM
    };
}
export function toggleNotes(task){
    return {
        type: DashboardActions.TOGGLE_TASK_NOTES,
        task
    };
}
export function toggleTaskOpts(task){
    return {
        type: DashboardActions.TOGGLE_TASK_OPTS,
        task
    };
}