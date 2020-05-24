import {createReducer, on} from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import {User} from '../../../core/models/http/responses/sign-in.response';

export const userFeatureKey = 'user';

export interface State {
    data: User;
}

export const initialState: State = {
    data: null
};


export const reducer = createReducer(
    initialState,

    on(UserActions.loadUsers, state => state),
    on(UserActions.loadUsersSuccess, (state, action) => ({...state, data: action.data})),
    on(UserActions.loadUsersFailure, (state, action) => ({...state, error: action.error})),
    on(UserActions.clearUsers, (state, action) => ({data: null, error: null})),
);

