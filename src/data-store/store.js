import Request from '../utilities/request';

class Store {
    static findRecord(modelName, id){
        return Request.findOne(modelName, id);
    }
    static findAll(modelName){
        return Request.findAll(modelName);
    }
    static createRecord(modelName, data){
        return Request.createRecord(modelName, data);
    }
    static updateRecord(modelName, data){
        return Request.updateRecord(modelName, data);
    }
}

export default Store;