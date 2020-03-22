import {AuthService} from '../services/AuthService';

export function handleResponse(response) {
    if(response.ok){
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            return data;
        });
    }else{
        if ([401, 403].indexOf(response.status) !== -1) {
            AuthService.logout();
            window.location.reload(true);
        }
        return Promise.reject(response.json());
    }
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if ([401, 403].indexOf(response.status) !== -1) {
    //             // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
    //             AuthService.logout();
    //             window.location.reload(true);
    //         }
    //         // const error = (data && data.message) || response.statusText;
    //         return Promise.reject(data);
    //     }
    //     return data;
    // });
}
