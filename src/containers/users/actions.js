import { UserActions } from '../../utilities/constants';
import Store from '../../data-store/store';

const model = 'members';
// CREATE
export function createUser(userData){
    return {
        type: UserActions.CREATE_USER,
        payload: Store.createRecord(model, userData)
    };
}
// READ
export function getAllUsers(){
    return {
        type: UserActions.READ_USERS,
        payload: Store.findAll(model)
    };
}
export function getUser(id){
    return {
        type: UserActions.READ_USER,
        payload: Store.findRecord(model, id)
    };
}
// UPDATE
// DELETE

export function showFormCmp(){
    return {
        type: UserActions.TOGGLE_USER_FORM
    };
}