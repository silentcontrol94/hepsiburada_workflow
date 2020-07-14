<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-4 offset-4">
                    <div class="link_div">
                        <router-link tag="a" to="/" class="route_list">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            Return to List
                        </router-link>
                        <a href="" class="route_list">
                        </a>
                    </div>
                    <h2 class="addlink_title">Add New Link</h2>
                    <div class="form-group link_name">
                        <label class="addlink_label">Link Name:</label>
                        <input v-model="linkName" type="text" class="form-control" id="addLinkName">
                    </div>
                    <div class="form-group link_url">
                        <label class="addlink_label">Link URL:</label>
                        <input v-model="linkUrl" type="text" class="form-control" id="addLinkUrl">
                    </div>
                    <button @click="addLink" id="addLinkButton" :disabled="isDisable" type="button" class="btn btn-dark">ADD</button>
                    <div class="added hidden">
                        <div class="added_text">
                            {{ linkName }} Added
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            linkUrl : "",
            linkName : "",
            keyID : 0
        }
    },
    methods: {
        addLink(){
            this.keyID++
            this.$store.state.linksLog.unshift({linkUrl : this.linkUrl, linkName : this.linkName, hitpoint : 0,Key : this.keyID});
            $(".added").removeClass("hidden");
            setTimeout(() => {
                $(".added").addClass("hidden");
            },1500)
            localStorage.setItem('storedLinks', JSON.stringify(this.$store.state.linksLog));
        }
    },
    computed : {
        isDisable(){
            if(this.linkUrl != "" && this.linkUrl != undefined && this.linkName != "" && this.linkName != undefined){
                return false
            }else{
                return true
            }
        }
    },
}
</script>

<style scoped lang="scss">
$font : 'Ubuntu', sans-serif;

.hidden{
    opacity: 0;
    transition: opacity 0.5s ease;
}
.link_div{
    text-align: left;
    margin: 25px 0;
    .route_list{
        color: #000;
        font-family: $font;
        letter-spacing: 1.5px;
        text-decoration: none;
        transition: all 0.3s ease;
        &:hover{
            letter-spacing: 2px;
            color: #0b6dc1;
        }
    }
}
.addlink_title{
    font-family: $font;
    letter-spacing: 2px;
    color: #000;
    margin-bottom: 25px;
    text-align: left;
}
.addlink_label{
        display: flex;
        margin-left: 7px;    
        font-family: $font;
        position: relative;
        top: 5px;
        font-weight: 400;
    }
#addLinkButton{
    margin-left: auto;
    display: block;   
    padding: 7px 40px;
    border-radius: 25px;
    font-family: $font;
}
.added{
        position: absolute;
        width: 90%;
        top: -50px;
        height: 70px;
        background-color: #cfffcf;
        border: 1px solid green;
        border-radius: 10px;
        box-shadow: 0 0 5px lightgreen;
        transition: opacity 0.4s ease;
    }
    .added_text{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        color: darkgreen;
        font-size: 22px;
        font-weight: 500;
    }
</style>