// import { API } from '../../utilities/endpoints';
import Request from '../../utilities/api';

const model = 'members';

class UsersAPI {
    // var req = axios.create({
    //     baseURL: baseURL
    // });
    static getAllUsers(){
        return Request.findAll(model);
    }

    static getUser(id){
        // return axios.get(`${API.USERS}/${id}`).then( res => { console.log('RES',res);
        //     return res;
        // });
    }

    static saveUser(data){
        return {};
    }

    static createMember(data){
        return Request.createRecord(model, data);
    }
}

export default UsersAPI;