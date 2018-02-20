import { TeamActions, TodoActions } from '../../utilities/constants';
import Store from '../../data-store/store';

const model = 'teams';
const modelTodo = '/add-to-do';
// CREATE
export function createTeam(data){
    return {
        type: TeamActions.CREATE_TEAM,
        payload: Store.createRecord(model, data),
    };
}

// READ
export function getAllTeams(){
    return {
        type: TeamActions.READ_TEAMS,
        payload: Store.findAll(model),
    };
}

export function toggleTeamForm(){
    return {
        type: TeamActions.TOGGLE_TEAM_FORM
    };
}

export function toggleTeamTodo(team){
    return {
        type: TeamActions.TOGGLE_TEAM_TODO,
        team,
    };
}

export function toogleTodoForm(team){
    return {
        type: TeamActions.TOGGLE_TODO_FORM,
        team,
    };
}

export function addTeamTodo(teamId, data){
    return {
        type: TodoActions.ADD_TODO,
        payload: Store.updateRecord(`${model}/${teamId}${modelTodo}`, data),
    };
}