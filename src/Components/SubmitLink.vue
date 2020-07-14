<template>
    <div class="row">
            <div class="col-8 offset-2 col-md-4 offset-md-4 submit_link">
                <router-link tag="button" to="/add-link" class="submit_link_button btn">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </router-link>
                <div class="submit_link_desc">Submit A Link</div>
            </div>
        </div>
</template>


<style scoped lang="scss">
$color : #ececec;
.submit_link{
    background-color: $color;
    padding: 10px;
    display: flex;
    position: relative;
    border-radius: 10px;
    border: 1px solid silver;
        .submit_link_button{
            margin-left: 10px;
            padding: 10px 20px;
            font-size: 45px;
            border: 1px solid #868686;
            border-radius: 5px;
            background-color: #d6d6d6;
            transition: all 0.4s ease;
            &:hover{
                background-color: #c2c2c2;
                border-color: #6b6b6b;
            }
        }
        .submit_link_desc{
            position: relative;
            align-self: center;
            font-size: 25px;
            margin-left: 20px;
            color: #000;
            text-transform: uppercase;
            font-weight: 500;
            font-family: 'Ubuntu', sans-serif;
        }
}
</style>