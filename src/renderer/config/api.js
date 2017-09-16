import axios from 'axios';
axios.interceptors.request.use(
    config => {
        //add token
        let token = localStorage.getItem('token') || ''
        console.log(token)
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.common['X-Nideshop-Token'] = token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

export const rootUrl = 'http://sun.zwjk.com/admin';

export const login = params => { return axios.post(`${rootUrl}/auth/login`, params).then(res => res.data); };

export const userList = params => {return axios.get(`${rootUrl}/user`, { params:params}).then(res => res.data);};

export const deleteUser = params => {return axios.post(`${rootUrl}/user/destory`, params).then(res => res.data);};


export const topicList = params => {return axios.get(`${rootUrl}/topic`, { params:params}).then(res => res.data);};

export const topicInfo = params => {return axios.get(`${rootUrl}/topic/info`, { params:params}).then(res => res.data);};

export const addTopic = params => {return axios.post(`${rootUrl}/topic/store`, params).then(res => res.data);};

export const deleteTopic = params => {return axios.post(`${rootUrl}/topic/destory`, params).then(res => res.data);};


export const orderList = params => {return axios.get(`${rootUrl}/order`, { params:params}).then(res => res.data);};

export const addOrder = params => {return axios.post(`${rootUrl}/order/store`, params).then(res => res.data);};

export const deleteOrder = params => {return axios.post(`${rootUrl}/order/destory`, params).then(res => res.data);};


export const goodsList = params => {return axios.get(`${rootUrl}/goods`, { params:params}).then(res => res.data);};

export const deleteGoods = params => {return axios.post(`${rootUrl}/goods/destory`, params).then(res => res.data);};


export const brandList = params => {return axios.get(`${rootUrl}/brand`, { params:params}).then(res => res.data);};

export const brandInfo = params => {return axios.get(`${rootUrl}/brand/info`, { params:params}).then(res => res.data);};

export const addBrand = params => {return axios.post(`${rootUrl}/brand/store`, params).then(res => res.data);};

export const deleteBrand = params => {return axios.post(`${rootUrl}/brand/destory`, params).then(res => res.data);};



export const categoryList = params => {return axios.get(`${rootUrl}/category`, { params:params}).then(res => res.data);};

export const categoryInfo = params => {return axios.get(`${rootUrl}/category/info`, { params:params}).then(res => res.data);};

export const topCategory = params => {return axios.get(`${rootUrl}/category/topCategory`, { params:params}).then(res => res.data);};

export const addCategory = params => {return axios.post(`${rootUrl}/category/store`, params).then(res => res.data);};

export const deleteCategory = params => {return axios.post(`${rootUrl}/category/destory`, params).then(res => res.data);};