<template>
    <div class="container">
        <menu-list></menu-list>
        <div class="main">
            <router-view></router-view>
            <additional-info></additional-info>
        </div>
    </div>
</template>

<script>
    import MenuList from './components/Menu.vue';
    import AdditionalInfo from './components/AdditionalInfo.vue';


    export default {
        name: "app",
        data() {
            return {
                historyPayments: [],
                canGoToPage: false,
            }
        },
        components: {
            MenuList,
            AdditionalInfo,
        },
        methods: {
            getJson(url) {
                return fetch(url)
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        mounted() {
            this.getJson('./src/db/data.json')
                .then(data => {
                    console.log(data);
                    this.historyPayments = data;
                })
        }
    }
</script>
