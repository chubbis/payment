<template>
    <div class="main">
        <main class="main__container">
            <form class="main__payment">
                <p class="main__hint-text">Информация об оплате:</p>
                <div class="main__info-margin">
                    <div class="main__info-flex">
                        <div class="main__hint-text main__hint-text_info">Номер счёта:</div>
                        <label><input type="text" class="main__account-number"
                                      v-model="currentPayment.accountNumber"
                                      :class="{ error: errors.accountNumber }"></label>
                    </div>
                    <div class="main__info-flex">
                        <div class="main__hint-text main__hint-text_info">Сумма платежа:</div>
                        <label><input type="text" class="main__payment-amount"
                                      v-model="currentPayment.amount"
                                      :class="{ error: errors.amount }"> руб.</label>
                    </div>
                </div>
                <h3 class="main__title">Данные банковской карты</h3>
                <div class="card__block">
                    <div class="card card__front">
                        <p class="main__hint-text card__front_number-text">Номер карты</p>
                        <div class="card__front_number">
                            <label><input type="text" class="card__front_number_input"
                                          v-model="card.firstDigits"
                                          :class="{ error: errors.firstDigits }"></label>
                            <label><input type="text" class="card__front_number_input"
                                          v-model="card.secondDigits"
                                          :class="{ error: errors.secondDigits }"></label>
                            <label><input type="text" class="card__front_number_input"
                                          v-model="card.thirdDigits"
                                          :class="{ error: errors.thirdDigits }"></label>
                            <label><input type="text" class="card__front_number_input"
                                          v-model="card.fourthDigits"
                                          :class="{ error: errors.fourthDigits }"></label>
                        </div>
                        <p class="main__hint-text card__front_date-text">Срок действия</p>
                        <div class="card__front_date">
                            <label>
                                <select class="card__front_date-select">
                                    <option class="card__front_date-select-text"
                                            v-for="month in months"
                                            :key="month">{{ month }}
                                    </option>
                                </select>
                            </label>
                            <label>
                                <select class="card__front_date-select">
                                    <option class="card__front_date-select-text"
                                            v-for="year in years"
                                            :key="year">{{ year }}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <label>
                            <input type="text" placeholder="Держатель карты" class="card__front_holder"
                                   v-model="currentPayment.cardHolder"
                                   :class="{ error: errors.cardHolder }">
                        </label>
                    </div>
                    <div class="card card__cvv">
                        <div class="card__cvv_magnetic-strip"></div>
                        <div class="main__hint-text card__cvv_code">Код CVV2 / CVC2</div>
                        <div class="card__cvv_img-position">
                            <label><input type="text" class="card__cvv_input"
                                          v-model="card.cvv"
                                          :class="{ error: errors.cvv }"></label>
                            <img :src="imgHint" alt="hint" class="card__cvv_input-hint">
                        </div>
                    </div>
                </div>
                <button class="main__send" @click.prevent="send()">Оплатить</button>
            </form>
        </main>
    </div>
</template>

<script>
    export default {
        name: "payment",
        data() {
            return {
                imgHint: './src/img/hint.png',
                currentPayment: {
                    id: null,
                    cardHolder: '',
                    accountNumber: null,
                    amount: null,
                    date: "",
                },

                card: {
                    firstDigits: null,
                    secondDigits: null,
                    thirdDigits: null,
                    fourthDigits: null,
                    fullNumber: null,
                    cvv: null,
                },
                months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                years: [],
                errors: {
                    accountNumber: false,
                    amount: false,
                    firstDigits: false,
                    secondDigits: false,
                    thirdDigits: false,
                    fourthDigits: false,
                    cardHolder: false,
                    cvv: false,
                },
                dateOptions: {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                }
            }
        },
        methods: {
            getYears() {
                const currentYear = new Date().getFullYear();
                for (let i = 0; i < 5; i++) {
                    this.years.push(currentYear + i);
                }
            },
            validation() {
                this.validateAccountNumberAndAmount();
                this.validationCardNumbers();
                this.validationCardHolder();
                this.validationCvv();
                return (!this.errors.accountNumber
                    && !this.errors.amount
                    && !this.errors.firstDigits
                    && !this.errors.secondDigits
                    && !this.errors.thirdDigits
                    && !this.errors.fourthDigits
                    && !this.errors.cardHolder
                    && !this.errors.cvv
                );

            },
            validateAccountNumberAndAmount() {
                let regExp = /^\d{1,25}$/;
                regExp.test(this.currentPayment.accountNumber)
                    ? this.errors.accountNumber = false
                    : this.errors.accountNumber = true;
                regExp.test(this.currentPayment.amount)
                    ? this.errors.amount = false
                    : this.errors.amount = true
            },
            validationCardNumbers() {
                let regExp = /^\d{4}$/;
                regExp.test(this.card.firstDigits)
                    ? this.errors.firstDigits = false
                    : this.errors.firstDigits = true;
                regExp.test(this.card.secondDigits)
                    ? this.errors.secondDigits = false
                    : this.errors.secondDigits = true;
                regExp.test(this.card.thirdDigits)
                    ? this.errors.thirdDigits = false
                    : this.errors.thirdDigits = true;
                regExp.test(this.card.fourthDigits)
                    ? this.errors.fourthDigits = false
                    : this.errors.fourthDigits = true;
            },
            validationCardHolder() {
                let regExp = /([a-z]){4,}$/;
                regExp.test(this.currentPayment.cardHolder)
                    ? this.errors.cardHolder = false
                    : this.errors.cardHolder = true;
            },
            validationCvv() {
                let regExp = /^\d{3}$/;
                regExp.test(this.card.cvv)
                    ? this.errors.cvv = false
                    : this.errors.cvv = true;
            },
            setId() {
                let lastId = this.$parent.historyPayments[this.$parent.historyPayments.length - 1].id;
                if (lastId === undefined) {
                    this.currentPayment.id = 0;
                } else {
                    this.currentPayment.id = ++lastId;
                }
            },
            setDate() {
                const date = new Date;
                this.currentPayment.date = date.toLocaleString("ru", this.options);
            },
            send() {
                if (this.validation()) {
                    this.setId();
                    this.setDate();
                    this.$parent.canGoToPage = true;
                    this.$parent.historyPayments.push(this.currentPayment);
                    this.$router.push("/successful");
                }
            },
        },
        mounted() {
            this.getYears();
        }
    }

</script>

<style scoped>

</style>