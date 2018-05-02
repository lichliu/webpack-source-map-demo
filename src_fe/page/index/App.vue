<template>
    <div id="app">
        hello {{user}}
        <A></A>
        <B></B>
    </div>
</template>
<script>
    import A from '../../views/A';
    import B from '../../views/B';
    export default {
        name: 'index',
        data() {
            return {
                user: "lichliu"
            };
        },
        components: {
            A,
            B
        }
    };
</script>
<style lang="less">
    div {
        color: red;
    }
    
</style>


