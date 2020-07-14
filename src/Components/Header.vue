<template>
    <div class="container">
        <div class="row">
            <div class="col-12 header">
                <div class="app_logo"></div>
                <div class="header_title">
                    <span class="t1">Link</span>
                    <span class="t2">Vote</span>
                    <span class="t3">Challenge</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style scoped lang="scss">
$color : #ececec;
$font : 'Ubuntu', sans-serif;

.header{
    display: flex;    
    justify-content: space-between;
}
.app_logo{
    background: url(../Images/appLogo.png);
    filter: grayscale(100%);
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 50px;
}
.container{
    border-bottom: 1px solid silver;
    padding-bottom: 15px;
}
.header_title{
    font-family: $font;
    align-self:center;
}
.t1 {
    font-size: 25px;
    font-weight: 600;
}
.t2 {
    font-size: 25px;
    font-weight: 400;
    font-family: sans-serif;
}
.t3 {
    font-size: 25px;
    font-weight: 500;
    font-family: sans-serif;
}
</style>