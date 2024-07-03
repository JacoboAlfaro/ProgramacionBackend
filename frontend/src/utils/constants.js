const SERVER_IP = 'localhost:3001';

export const ENV={
    BASE_PATH: `http://${SERVER_IP}`,
    API_ROUTES:{
        REGISTER: `auth/signup`,
        LOGIN: `auth/login`,
        SEND_EMAIL: `auth/reset-password`,
        RESET_PASSWORD: `auth/request-password`

    },
    JWT:{
        ACCESS: 'access'
    }
}