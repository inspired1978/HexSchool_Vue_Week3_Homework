import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {

        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'inspired1978', // 註冊的 API Path
            products: [],
            tempProduct: {},
        }

    },
    methods: {
        checkAdmin() {
            const url = `${this.apiUrl}/api/user/check`;
          
            axios.post(url)
            .then((res) => {
                // console.log(res);
                // 通過驗證, 抓取 products 資料
                this.getData();
            })
            .catch((err) => {
                alert(err.response.data.message);
                window.location = 'login.html';
            })

        },
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;

            axios.get(url)
            .then((response) => {   
                console.log(response);             

                // 將 get 回的資料存到 products array
                this.products = response.data.products;
            })
            .catch((err) => {
                alert(err.response.data.message);
            })            
        },        
        openProduct(item) {
            this.tempProduct = item;
        }

    },
    mounted() {

        // onmounted 載入 token 代入 axios post 的 header
        const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('hexToken='))
        ?.split('=')[1];

        axios.defaults.headers.common['Authorization'] = token;

        // 檢查身分是否合法
        this.checkAdmin();

    }

}).mount('#app');