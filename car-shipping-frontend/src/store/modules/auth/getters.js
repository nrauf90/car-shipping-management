import {IS_AUTHENTICATED_GETTER, USER_TOKEN_GETTER} from "../../storeconstants";

export default {
    [USER_TOKEN_GETTER]: state => {
        return state.access_token
    },
    [IS_AUTHENTICATED_GETTER](state){
        return !!state.access_token;
    }
};