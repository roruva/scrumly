import { getNewState } from '../../utilities/utils';
import { TeamActions, TodoActions } from '../../utilities/constants';

const initialState = {
    team: {},
    teams: [],
    showCreateTeamForm: false,
    showTodoForm: false,
    loading: true
};

export default function teamReducer(state = initialState, action){
    switch (action.type) {
        case TeamActions.CREATE_TEAM_SUCCESS:{
            const { payload } = action;
            let teams = state.teams;
            teams.push(payload);
            return getNewState(state, { teams, showCreateTeamForm: false });
        }
        case TeamActions.READ_TEAMS_SUCCESS:{
            const { payload: { response = [] } } = action;
            return getNewState(state, { teams: response, loading: false });
        }
        case TeamActions.TOGGLE_TEAM_FORM:{
            return getNewState(state, { showCreateTeamForm: !state.showCreateTeamForm });
        }
        case TeamActions.TOGGLE_TEAM_TODO :{
            let teams = state.teams.filter( (team) => {
                if (team.id === action.team.id) {
                    team.showTodos = !team.showTodos;
                }
                return team;
            });
            return getNewState(state, { teams, });
        }
        case TeamActions.TOGGLE_TODO_FORM :{
            let teams = state.teams.filter( (team) => {
                if (team.id === action.team.id) {
                    team.showTodoForm = !team.showTodoForm
                }
                return team;
            });
            return getNewState(state, { teams, });
        }
        case TodoActions.ADD_TODO_SUCCESS:{
            console.log('ADD_TODO_SUCCESS', action);
            return getNewState(state,);
        }
        default:
            return state;
    }
}