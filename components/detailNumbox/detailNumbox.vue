<template>
    <u-number-box v-model="value" @change="updateNum($event)">
        <view
            slot="minus"
            class="minus"
        >
            <u-icon
                name="minus"
                size="12"
            ></u-icon>
        </view>
        <text
            slot="input"
            style="width: 50px;text-align: center;"
            class="input"
        >{{value}}</text>
        <view
            slot="plus"
            class="plus"
        >
            <u-icon
                name="plus"
                color="#FFFFFF"
                size="12"
            ></u-icon>
        </view>
    </u-number-box>
</template>

<script>
export default {
    props:["good"],
    data(){
        return {
            value:this.good.goodNum
        }
    },
    methods: {
        updateNum({value}){
            this.$set(this.good,"goodNum",value)
            this.$emit("getNum",this.good)
        }
    },
}
</script>

<style lang="scss">
	.minus {
		width: 22px;
		height: 22px;
		border-width: 1px;
		border-color: #E6E6E6;
		border-top-left-radius: 100px;
		border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
		border-bottom-right-radius: 100px;
		@include flex;
		justify-content: center;
		align-items: center;
	}

	.input {
		padding: 0 10px;
	}

	.plus {
		width: 22px;
		height: 22px;
		background-color: #FF0000;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
	}
</style>
