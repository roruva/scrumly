import { getNewState } from '../../utilities/utils';
import { NavbarActions } from '../../utilities/constants';

const initialState = {
    open: false,
};

export default function NavbarReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case NavbarActions.TOGGLE_DRAW:
            newState = getNewState(state, { open: !state.open })
            return newState;
    
        default:
            return state;
    }
}