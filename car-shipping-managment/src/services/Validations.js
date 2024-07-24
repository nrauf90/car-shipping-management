export default class Validations{
    static checkEmail(email){
        // check if email is valid email
        if( /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)){
            return true;
        }

        return false;
    }

    static minLength(password, minLen){
        if(password.length < minLen){
            return false;
        }

        return true;
    }

    static isRequired(value){
        if(value === ''){
            return false;
        }

        return true;
    }
}