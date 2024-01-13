<template>
    <div class="abc-box" tabindex="0" @keydown="keyboard($event)">
        <div class="one">
            <div v-for="i in abc1" :key="i" class="abc">{{ i }}</div>
        </div>
        <div class="two">
            <div v-for="i in abc2" :key="i" class="abc">{{ i }}</div>
        </div>
        <div class="three">
            <div v-for="i in abc3" :key="i" class="abc">{{ i }}</div>
        </div>

        <div class="gameData">
            <div class="left btn">
                <a-button type="primary" @click="startGame">开始</a-button>
            </div>
            <div class="datas">
                <span style="color: green">正确数：{{ yes }}</span>
                <span style="color: red">错误数：{{ nums - yes }}</span>
                <span style="color: blue"> 总数量：{{ nums }}</span>
                <span style="color: green">
                    正确率：{{
                        ((yes * 100) / nums).toFixed(2) == 'NaN'
                            ? 0
                            : ((yes * 100) / nums).toFixed(2)
                    }}%
                </span>
                <span style="color: red">
                    错误率：{{
                        (((nums - yes) * 100) / nums).toFixed(2) == 'NaN'
                            ? 0
                            : (((nums - yes) * 100) / nums).toFixed(2)
                    }}%
                </span>
                <span style="color: blue">总数率：100.00%</span>
            </div>
            <div class="right btn">
                <a-button type="primary" danger @click="endGame">暂停</a-button>
            </div>
        </div>
        <div class="foot">
            <a-radio-group
                v-model:value="value"
                button-style="solid"
                :disabled="timer == null ? false : true"
            >
                <a-radio-button :value="5000">简单</a-radio-button>
                <a-radio-button :value="2000">普通</a-radio-button>
                <a-radio-button :value="500">困难</a-radio-button>
                <a-radio-button :value="10">地狱</a-radio-button>
            </a-radio-group>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, onBeforeUnmount } from 'vue';
    let timer: any = ref(null);
    let nums = ref(0);
    let yes = ref(0);
    let keyA = ref();
    let value = ref(2000);
    let abc1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    let abc2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    let abc3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    const keyboard = (event: any) => {
        let str = event.key.toUpperCase();
        let abcs = document.querySelectorAll('.abc');
        if (keyA.value === str) {
            yes.value++;
            keyA.value = '';
            clearInterval(timer.value);
            timer.value = null;
            nums.value++;
            games();
        }
        for (let i = 0; i < abcs.length; i++) {
            abcs[i].classList.remove('success');
            const element = abcs[i];
            if (element.innerHTML === str) {
                abcs[i].classList.add('success');
                setTimeout(() => {
                    abcs[i].classList.remove('success');
                }, 100);
            }
        }
    };
    const games = () => {
        selects();

        timer.value = setInterval(() => {
            selects();
            nums.value++;
        }, value.value);
    };
    const selects = () => {
        let num = Math.floor(Math.random() * 26);
        let abc = [...abc1, ...abc2, ...abc3];
        let abcs = document.querySelectorAll('.abc');
        keyA.value = abc[num];
        for (let i = 0; i < abcs.length; i++) {
            abcs[i].classList.remove('keydown');
            const element = abcs[i];
            if (element.innerHTML === abc[num]) {
                abcs[i].classList.add('keydown');
            }
        }
    };
    const startGame = () => {
        if (!timer.value) {
            nums.value++;
            games();
        }
    };
    const endGame = () => {
        clearInterval(timer.value);
        timer.value = null;
    };
    onMounted(() => {});
    onBeforeUnmount(() => {
        clearInterval(timer.value);
        timer.value = null;
    });
</script>

<style lang="scss" scoped>
    .abc-box {
        margin-top: 100px;
        padding: 20px;

        .one,
        .two,
        .three {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
        }

        .abc {
            height: 80px;
            width: 80px;
            font-size: 40px;
            font-weight: bold;
            text-align: center;
            line-height: 80px;
            border: 1px solid grey;
        }

        .gameData {
            margin-top: 20px;
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;

            .datas {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }
        }

        .btn {
            text-align: center;

            button {
                width: 100px;
            }
        }

        .foot {
            text-align: center;
            margin-top: 20px;
        }
    }

    .keydown {
        background-color: red;
        color: white;
    }

    .success {
        background-color: green;
        color: white;
    }
</style>
