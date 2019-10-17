<template>
    <nav class="menu__container">
        <div class="menu__icon" v-show="showMiniMenu" @click="showMenu=!showMenu">
            <div class="menu__icon_container">
                <button class="menu__icon__button">Menu</button>
            </div>
        </div>
        <ul class="menu" v-show="showMenu">
            <li>
                <div class="menu__icon_container menu__list menu__nav">
                    <p class="menu__text">Личный кабинет</p>
                </div>
            </li>
            <li>
                <router-link to="/" tag="button" class="menu__icon_container menu__list menu__nav menu__text">
                    Платежи
                </router-link>
            </li>
            <li>
                <router-link to="/history" tag="button" class="menu__icon_container menu__list menu__nav menu__text">
                    История платежей
                </router-link>
            </li>
            <li>
                <div class="menu__icon_container menu__list menu__settings">
                    <p class="menu__text">Настройки</p>
                </div>
            </li>
            <li>
                <div class="menu__icon_container menu__list menu__exit">
                    <p class="menu__text menu__exit-text">Выйти</p>
                </div>
            </li>
        </ul>
    </nav>
</template>


<script>
    export default {
        name: "menuList",
        data() {
            return {
                showMenu: null,
                showMiniMenu: null,
                windowSize: document.documentElement.clientWidth,
            }
        },
        methods: {
            resizeWindow() {
                window.addEventListener('resize', () => {
                    if (document.documentElement.clientWidth < 768) {
                        this.showMenu = false;
                        this.showMiniMenu = true;
                    } else {
                        this.showMenu = true;
                        this.showMiniMenu = false;
                    }
                })
            },
            getWindowSize() {
                if (document.documentElement.clientWidth < 768) {
                    this.showMenu = false;
                    this.showMiniMenu = true;
                } else {
                    this.showMenu = true;
                    this.showMiniMenu = false;
                }
            }

        },
        mounted() {
            this.getWindowSize();
            this.resizeWindow();
        }

    }
</script>
