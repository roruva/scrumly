// import queryString from 'query-string';
import $ from 'jquery';

import config from '../config/index';

// AJAX -Jquery
class Request {
    static findAll(model){
        const getPromise = async () => {
            let url = `${config.api.baseUrl}/${model}`;
            try {
                const response = await this.makeRequest(url);
                return { response };
            } catch(e) {
                throw e;
            }
        };
    
        return getPromise();
    }
    
    static findOne(model, id){
        const getPromise = async () => {
            let url = `${config.api.baseUrl}/${model}/${id}`;
            try {
                const response = await this.makeRequest(url);
                return { response };
            } catch(e) {
                throw e;
            }
        };
    
        return getPromise();
        // return this.getPromise(`${model}/${id}`);
    }
    
    // POST's
    
    static createRecord(model, data){
        const getPromise = async () => {
            let url = `${config.api.baseUrl}/${model}`;
            try {
                const response = await this.makeRequest(url, 'POST', data);
                return response;
            } catch(e) {
                throw e;
            }
        };
    
        return getPromise();
    }
    
    static updateRecord(model, data){
        const getPromise = async () => {
            let url = `${config.api.baseUrl}/${model}`;
            try {
                const response = await this.makeRequest(url, 'PATCH', data);
                return response;
            } catch(e) {
                console.error('Pathc >> ERR:', e);
            }
        };
    
        return getPromise();
    }
    
    static getPromise(url, method, data) {
        const getPromiseAsync = async () => {
            try {
                const response = await this.makeRequest(url, method, data);
                return response;
            } catch(e) {
                console.error('Pathc >> ERR:', e);
            }
        }
        return getPromiseAsync();
    };
    
    static makeRequest(url, method, data){
    
        let newOptions = {
            url,
            type: method? method : "GET"
        };
    
        if (data) { newOptions.data = data; }
    
        return $.ajax(newOptions);
    }

}

export default Request;
