<template>
    <section class="main__container history__container">
        <h3 class="history__title">История платежей</h3>
        <div class="history__info"
             v-if="historyPayments.length < 1">Платежей не было</div>
        <div v-for="payment in historyPayments"
             :key="payment.id" class="history__color">
            <div class="history__flex">
                <div class="history__info history__text">Номер счёта:</div>
                <div class="history__value">{{ payment.accountNumber }}</div>
            </div>
            <div class="history__flex">
                <div class="history__info history__text">Сумма:</div>
                <div class="history__value">{{ payment.amount }}</div>
            </div>
            <div class="history__flex">
                <div class="history__info history__text">Дата платежа:</div>
                <div class="history__value">{{ payment.date }}</div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "history",
        data(){
            return {
                historyPayments: this.$parent.historyPayments,
            }
        }
    }
</script>

<style scoped>

</style>