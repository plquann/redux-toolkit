// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import firebase from 'firebase';

const getFireBaseToken = async () => {
    const currentUser = firebase.auth().currentUser;
    console.log("🚀 ~ currentUser", currentUser);
    if (currentUser) return currentUser.getIdToken();

    //not logged in
    const hasRememberedToken = localStorage.getItem('firebaseui::rememberedAccounts');
    console.log("🚀 ~ hasRememberedToken", hasRememberedToken);
    
    if(!hasRememberedToken) return null;

    //Logged in but current user is not fetch ->> waiting
    return new Promise((resolve, reject) => {
        const waitTimer = setTimeout(() => {
            reject(null);
            console.log("🚀 ~ reject timeout",);
        }, 10000);

        const unregisterAuthObserver = firebase.auth().onAuthStateChanged( async user => {
            if (!user){
                reject(null);
            }
    
            const token  = await user.getIdToken();
            console.log("🚀 ~ token[AXIOS]", token);
            resolve(token);

            unregisterAuthObserver();
            clearTimeout(waitTimer);
        });
    })
}

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...


    // const currentUser = firebase.auth().currentUser;
    // if (currentUser) {
    //     const token = await currentUser.getIdToken();
    //     config.headers.Authorization = `Bearer ${token}`;
    // }

    const token = await getFireBaseToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default axiosClient;