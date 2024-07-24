import {AUTO_LOGIN_ACTION, LOGIN_ACTION, LOGOUT_ACTION, SIGNUP_ACTION} from "@/store/storeconstants";
import axios from "axios";
import ValidationsService from "@/services/ValidationsService";

export default {
    [LOGOUT_ACTION](context) {
        localStorage.removeItem('userData');
        context.commit('SET_USER_DATA_MUTATION', {
            access_token: '',
            token_type: '',
            name: '',
            email: '',
            id: '',
        });
    },
    async [LOGIN_ACTION](context, payload) {
        await axios.post(
            'login',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        ).then(response => {
            if (response.status === 200) {
                localStorage.setItem('userData', JSON.stringify(response.data))
                context.commit('SET_USER_DATA_MUTATION', response.data);
            }
        }).catch(error => {
            let errorMessage = ValidationsService.getLoginErrors(error.response.data)
            throw errorMessage;
        });
    },
    [AUTO_LOGIN_ACTION](context){
        let userData = localStorage.getItem('userData');
        if (userData) {
            context.commit('SET_USER_DATA_MUTATION', JSON.parse(userData));
        }
    },
    async [SIGNUP_ACTION](context, payload) {
        await axios.post(
            'register',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        ).then(response => {
            if (response.status === 200) {
                localStorage.setItem('userData', JSON.stringify(response.data))
                context.commit('SET_USER_DATA_MUTATION', response.data);
            }
        }).catch(error => {
            let errorMessage = ValidationsService.getSignupErrors(error.response.data.errors);
            throw errorMessage;
        })
    }
};