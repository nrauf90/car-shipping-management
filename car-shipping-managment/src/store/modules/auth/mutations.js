export default {
    SET_USER_DATA_MUTATION(state, payload) {
        state.access_token = payload.access_token;
        state.token_type = payload.token_type;
        state.name = payload.name;
        state.email = payload.email;
        state.id = payload.id;
    }
};