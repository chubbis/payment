<template>
    <section class="main__container successful__container">
        <h3 class="successful__title">Платеж произведен успешно</h3>
        <p class="successful__info">Информация о платеже:</p>
        <div class="successful__flex">
            <div class="successful__info successful__text">Номер счёта:</div>
            <div class="successful__value">{{ lastPayment.accountNumber }}</div>
        </div>
        <div class="successful__flex">
            <div class="successful__info successful__text">Сумма:</div>
            <div class="successful__value">{{ lastPayment.amount }}</div>
        </div>
        <div class="successful__flex">
            <div class="successful__info successful__text">Держатель карты:</div>
            <div class="successful__value">{{ lastPayment.cardHolder }}</div>
        </div>
        <div class="successful__flex">
            <div class="successful__info successful__text">Дата платежа:</div>
            <div class="successful__value">{{ lastPayment.date }}</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "successfulPayment",
        data() {
            return {
                lastPayment: this.$parent.historyPayments[this.$parent.historyPayments.length - 1],
                prevRoute: null
            }
        },
        methods: {
            reroute() {
                if (this.$route.path === "/successful" && !this.$parent.canGoToPage) {
                    this.$router.push("/");
                } else {
                    this.$parent.canGoToPage = false;
                }


            },
        },
        mounted() {
            this.reroute();
        }
    }
</script>

<style scoped>

</style>