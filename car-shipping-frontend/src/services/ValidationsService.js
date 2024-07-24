import Validations from "@/services/Validations";

export default class ValidationsService{
    constructor(email, password, name='') {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    checkLoginValidation(){
        let errors = [];

        // email validations
        if(!Validations.isRequired(this.email)){
            errors['email'] = "Email is Required";
        }
        else if(!Validations.checkEmail(this.email)){
            errors['email'] = "Invalid email";
        }

        // password validation
        if(!Validations.isRequired(this.password)){
            errors['password'] = "Password is Required";
        }
        else if(!Validations.minLength(this.password, 6)){
            errors['password'] = "Password must be at least 6 characters";
        }

        return errors;
    }

    checkSignupValidation(){
        let errors = [];

        // name validations
        if(!Validations.isRequired(this.name)){
            errors["name"] = "Name is Required";
        }

        if(!Validations.isRequired(this.email)){
            errors['email'] = "Email is Required";
        }
        else if(!Validations.checkEmail(this.email)){
            errors['email'] = "Invalid email";
        }

        // password validation
        if(!Validations.isRequired(this.password)){
            errors['password'] = "Password is Required";
        }
        else if(!Validations.minLength(this.password, 6)){
            errors['password'] = "Password must be at least 6 characters";
        }

        return errors;
    }

    static getSignupErrors(errors){
        let errorMessages = [];
        for(let key in errors){
            errorMessages[key] = errors[key][0];
        }

        return errorMessages;
    }

    static getLoginErrors(errors){
        let errorMessages = [];
        for(let key in errors){
            errorMessages[key] = errors[key];
        }

        return errorMessages;
    }
}