<template>
    <div>
        <div id="linksPage" class="container">
        <app-submit-link></app-submit-link>
        <div class="row">
            <div class="col-8 offset-2 col-md-4 offset-md-4 seperated_line"></div>
        </div>
        <div class="row">
            <div class="col-8 offset-2 col-md-3 offset-md-4">
                <select @change="changeOrderBy($event)" class="form-control">
                  <option value="1">Most Voted (A > Z)</option>
                  <option value="2">Most Voted (Z > A)</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-4 offset-md-4 list_col">
                <div v-for="item in log" :key="item.urlName" class="list_link_card" :data="item">
                    <div class="card_point"> 
                        <div class="hitpoint">{{ item.hitpoint }}</div>
                        <div class="hitpoint_desc">POINTS</div>
                    </div>
                    <div class="link_values">
                        <div class="link_name"> {{ item.linkName }} </div>
                        <a class="link_url"> ({{ item.linkUrl }}) </a>
                        <div class="votes_link">
                            <div @click="increasePoint" :key="item.urlName">
                                <i class="fa fa-arrow-up hit" aria-hidden="true"></i>
                                Up Vote
                            </div>
                            <div @click="decreasePoint">
                                <i class="fa fa-arrow-down hit" aria-hidden="true"></i>
                                Down Vote
                            </div>
                        </div>
                    </div>
                    <div class="remove_link">
                        <i data-toggle="modal" :data-target="'#'+item.linkName+item.Key" class="fa fa-minus-circle" aria-hidden="true"></i>
                    </div>
                    <div class="modal fade" :id="item.linkName+item.Key" tabindex="-1" role="dialog" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header bg-dark">
                            <h5 class="modal-title text-white">Remove Link</h5>
                            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <p>Do you want to remove:</p>
                            <p class="modal_link_name"> {{ item.linkName }} </p>
                            <div class="modal_buttons">
                                <button data-dismiss="modal" @click="removeLink" class="btn btn-dark">Ok</button>
                                <button data-dismiss="modal" class="btn btn-dark">Cancel</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="remove_confirmed">
                        <div class="remove_text">
                            {{ item.linkName }} removed.
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import SubmitLink from "./SubmitLink"

export default {
    data() {
        return {
            log : Array,
            name : this.$store.state.name,
            delete : false
        }
    },
    components:{
        appSubmitLink : SubmitLink
    },
    methods: {
        increasePoint(e){
            let target = $(e.target).parents(".list_link_card").find(".link_name")[0].innerText
            this.log.forEach(element => {
                if(element.linkName ==  target){
                    element.hitpoint++
                }
            });
            this.log = this.sortByPoint(this.log)
        },
        decreasePoint(e){
            let target = $(e.target).parents(".list_link_card").find(".link_name")[0].innerText
            this.log.forEach(element => {
                if(element.linkName ==  target && element.hitpoint > 0){
                    element.hitpoint--
                }
            });
            this.log = this.sortByPoint(this.log)
        },
        removeLink(e){
            let deletedModal = $(e.target).parents(".list_link_card").find(".remove_confirmed");
            deletedModal.addClass("show");
            let target = $(e.target).parents(".list_link_card").find(".link_name")[0].innerText
            setTimeout(() => {
                this.log.forEach(element => {
                    if(element.linkName ==  target){
                        let position = this.log.map(function(e) { return e.linkName;}).indexOf(target);
                        this.log.splice(position,1)
                        this.delete = true;
                    }
                });
            },1500)
            setTimeout(() => {
                deletedModal.removeClass("show");
            },1250)
        },
        changeOrderBy(event){
            if(event.target.value == 1){
                this.log = this.sortByHitAndNameAZ(this.log)
            }else if (event.target.value == 2){
                this.log = this.sortByHitAndNameZA(this.log)
            }
        },
        sortByPoint: function(log) {
            return log.slice().sort(function(a, b) {
                return b.hitpoint - a.hitpoint
            });
        },
        sortByHitAndNameAZ(log){
            return log.slice().sort(function(a, b) {
                if(b.hitpoint <= a.hitpoint){
                    if (a.linkName < b.linkName)
                        return -1;
                    if (a.linkName > b.linkName)
                        return 1;
                    return 0; 
                }
            });
        },
        sortByHitAndNameZA(log){
            return log.slice().sort(function(a, b) {
                if(b.hitpoint <= a.hitpoint){
                    if (a.linkName < b.linkName)
                        return 1;
                    if (a.linkName > b.linkName)
                        return -1;
                    return 0;
                }
            });
        },
    },
    watch:{
        log(){
        }
    },
    created(){
        this.log = JSON.parse(localStorage.getItem('storedLinks'));
    }
}
</script>

<style scoped lang="scss">
$color : #ececec;
$font : 'Ubuntu', sans-serif;
#linksPage{
    margin-top: 15px;
}
.seperated_line{
    background-color: $color;
    border-radius: 5px;
    height: 5px;
    margin-bottom: 20px;
    margin-top: 20px;
}
.list_link_card {
    display: flex;
    margin : 20px 0;
    padding: 10px;
    &:hover{
        background-color: #f3f3f3;
        border-radius: 15px;
    }
    .card_point{
        background-color: $color;
        border: 1px solid silver;
        border-radius: 10px;
        padding: 8px 10px;
        height: 100px;
        .hitpoint{
            font-size: 30px;
            font-weight: 700;
        }
    }
    .link_values{
        padding: 2px 10px;
        width: 100%;
        text-align: left;
        .link_name{
            font-size: 22px;
            font-weight: 600;
            letter-spacing: 1.2px;
            font-family: $font;
        }
        .link_url{
            color: gray;
            font-size: 14px;
            font-weight: 400;
        }
    }
    .remove_link{
        position: relative;
        top: -20px;
        right: -22px;
    }
    .remove_link i{
        opacity: 0;
        transition: opacity 0.3s ease;
        color: red;
        border: 2px solid white;
        border-radius: 50%;
        font-size: 24px;
        position: absolute;
        right: 0;
        box-shadow: 0 0 3px #3c3c3c;
        width: 32px;
        height: 32px;
        cursor: pointer;
        &::before{
            position: relative;
            top: 1px;
        }
    }
}
.votes_link{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}
.list_link_card:hover .remove_link i{
        opacity: 1;
    }
    .modal_link_name{
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 1.2px;
        font-family: $font;
    }
    .modal_buttons{
        display: flex;
        justify-content: center;
        button{
            margin: 0 5px;
            width: 125px;
            text-align: center;
            border-radius: 25px;
        }
    }
    .remove_confirmed{
        display: none;
        position: absolute;
        width: 90%;
        top: -175px;
        height: 70px;
        background-color: #cfffcf;
        border: 1px solid green;
        border-radius: 10px;
        box-shadow: 0 0 5px lightgreen;
        opacity: 0;
        transition: opacity 0.4s ease;
    }
    .remove_text{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        color: darkgreen;
        font-size: 22px;
        font-weight: 500;
    }
    .show{
        opacity: 1;
        display: block;
    }
    .hit{
        cursor: pointer;
    }
</style>