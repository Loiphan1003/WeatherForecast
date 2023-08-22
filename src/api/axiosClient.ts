import axios from "axios";

export const apiKey = "0de8002a6d4343419c094759230708";

const axiosClient = axios.create({
    headers: {
        'content-type': 'application/json',
        // 'Access-Control-Allow-Origin' : '*',
    },
})

axios.interceptors.response.use(function (response) {
    if(response && response.data){
        return response.data;
    }
    return response;
}, function (error) {

    return Promise.reject(error);
});

export default axiosClient;