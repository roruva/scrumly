//  Utils
import { getNewState } from '../../utilities/utils';
import { UserActions } from '../../utilities/constants';

const initialState = {
    users: [],
    user: {},
    showForm: false,
    loading: true
};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case UserActions.CREATE_USER_SUCCESS:{
            const { payload } = action;
            let users = state.users;
            users.push(payload);
            return getNewState(state, { users, showForm: false });
        }
        case UserActions.READ_USERS_SUCCESS:{
            const { payload: { response = [] } } = action;
            return getNewState(state, { users: response, loading: false });
        }
        case UserActions.TOGGLE_USER_FORM:{
            return getNewState(state, { showForm: !state.showForm });
        }
        default:
            return state;
    }
}