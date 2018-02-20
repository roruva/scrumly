// Utils
import { getNewState } from '../../utilities/utils';
import { getFirstAndLastDayWeek } from '../../utilities/utils';
import { DashboardActions } from '../../utilities/constants';

const initialState = {
    currentView: 'week',
    tasks: [],
    showTaskForm: false,
    date: new Date(),
    loadingTask: true,
};

export default function dashboardReducer(state = initialState, action){
    let newState;
    switch (action.type) {
        case DashboardActions.CREATE_TASK_SUCCESS:
            const { payload } = action;
            let tasks = state.tasks;
            tasks.push(payload);
            return getNewState(state, { tasks, showTaskForm: false });
        case DashboardActions.TOGGLE_TASK_FORM:
            newState = getNewState(state, { showTaskForm : !state.showTaskForm });
            return newState;
        case DashboardActions.READ_TASKS_SUCCESS:
            const { payload: { response = [] } } = action;
            newState = getNewState(state, { tasks : response });
            return newState;
        case DashboardActions.READ_TASK_SUCCESS: {
            let { payload: { response = {} } } = action;
            let tasks = state.tasks;
            tasks.push(response);
            newState = getNewState(state, { tasks });
            return newState;
        }
        
        case DashboardActions.CHANGE_VIEW:
            const currentView = action.view;
            newState = getNewState(state, { currentView });
            return newState;

        case DashboardActions.CHANGE_MONTH:
            let isPrev = action.isPrev;
            let currentDate = new Date(state.date);
            
            let newMonth = isPrev? currentDate.setMonth(state.date.getMonth() - 1) : currentDate.setMonth(state.date.getMonth() + 1);
            let newDate = new Date(newMonth);

            newState = getNewState(state, { date: newDate });
            return newState;

        case DashboardActions.CHANGE_DATE:
            let { backward, date, forWeek } = action;
            
            let targetDate = date;
            if (forWeek) {
                let [ firstDayWeek, lastDayWeek ] = getFirstAndLastDayWeek(date);
                if (backward) {
                    targetDate = firstDayWeek;
                }else{
                    targetDate = lastDayWeek;
                }
            }

            let nextDate;
            let isSunday = targetDate.getDay() === 1;
            if (backward) {
                nextDate = new Date(targetDate);
                let amount = isSunday && forWeek? 2 : 1;
                nextDate.setDate(targetDate.getDate() - amount);
            }else{
                nextDate = new Date(targetDate);
                nextDate.setDate(targetDate.getDate() + 1);
            }

            newState = getNewState(state, { date: nextDate });
            return newState;
        case DashboardActions.TOGGLE_TASK_NOTES: {
            let tasks = state.tasks.filter( (task) => {
                if (task.id === action.task.id) {
                    task.showNotes = !task.showNotes;
                }
                return task;
            });
            return getNewState(state, { tasks });
        }
        case DashboardActions.TOGGLE_TASK_OPTS: {
            let tasks = state.tasks.filter( (task) => {
                if (task.id === action.task.id) {
                    task.showOpts = !task.showOpts;
                }
                return task;
            });
            return getNewState(state, { tasks });
        }
        default:
            return state;
    }
}