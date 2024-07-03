    import {ENV} from '../utils/constants';

    const {BASE_PATH, API_ROUTES} = ENV;

    export class Auth{
        baseApi = BASE_PATH;
    
        register = async (data) => {
            const url = `${this.baseApi}/${API_ROUTES.REGISTER}`;
            console.log(url);
            const params = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            console.log(params);
            try {
                const response = await fetch(url, params);
                console.log(response);
                const result = await response.json();
                console.log(result);
                return result;
            }catch(e){
                console.log(e);
            }
        }

    login = async(data) => {
        const url = `${this.baseApi}/${API_ROUTES.LOGIN}`;
        console.log(url);
        const params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log('params: ', params);

        try {
            const response = await fetch(url, params);
            console.log(response);
            const result = await response.json();
            console.log(result);
            return result;
        }catch(e){
            console.log(e);
        }
    }

    sendEmail = async(data) => {
        const url = `${this.baseApi}/${API_ROUTES.SEND_EMAIL}`;
        console.log(url);
        const params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log('params: ', params);

        try {
            const response = await fetch(url, params);
            console.log(response);
            const result = await response.json();
            console.log(result);
            return result;
        }catch(e){
            console.log(e);
        }
    }

    

    resetPassword = async(data, token) => {
        console.log('Token: ', token);
        const url = `${this.baseApi}/${API_ROUTES.RESET_PASSWORD}/${token}`;
        console.log(url);
        const params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log('params: ', params);

        try {
            const response = await fetch(url, params);
            console.log(response);
            const result = await response.json();
            console.log(result);
            return result;
        }catch(e){
            console.log(e);
        }
    }
}