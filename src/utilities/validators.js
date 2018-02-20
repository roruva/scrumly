/**
 * Generic Class to validate forms.
 */ 
import { isEmpty } from './utils';

class ValidateForm {
    constructor(fields2validate){
        this.errors = {};
        this.fields2validate = fields2validate;
    }

    validate(values){
        this.fields2validate.forEach(fieldName => {
            let fn = this[fieldName];
            let fieldValue = values[fieldName];
            if (typeof fn === "function") {
                fn.call(this, fieldValue);
            }else if(fn === undefined){
                this.required(fieldName, fieldValue);
            }
        });
        return this.errors;
    }
    
    required(field, value){
        if (!value) {
            this.errors[field] = 'Required';
        }
    }

    username(username){
        if (!username) {
            this.errors.username = 'Required';
        } else if (username.length > 15) {
            this.errors.username = 'Must be 15 characters or less';
        } else if (username.length < 4) {
            this.errors.username = 'Must be 4 characters or more';
        }
    }

    fullname(fullname){
        if (!fullname) {
            this.errors.fullname = 'Required'
        } else if (fullname.length > 50) {
            this.errors.fullname = 'Must be 50 characters or less'
        }
    }

    notes(notes){
        if (notes) {
            if (notes.length > 0){
                let notesArrayErrors = [];
                notes.forEach( (note, index) => {
                    if (isEmpty(note)) {
                        notesArrayErrors[index] = "Note can't be empty";
                    }
                });
                if (notesArrayErrors.length) {
                    this.errors.notes = notesArrayErrors;
                }
            }
        }
    }

}

export default ValidateForm;