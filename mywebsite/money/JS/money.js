const withdrawReason =document.getElementById("withdraw-reason")
const withdrawAmount =document.getElementById("withdraw-amount")
const withdrawButton =document.getElementById("withdraw-button")
const depositSource =document.getElementById("deposit-source")
const depositAmount =document.getElementById("deposit-amount")
const withdraw= document.getElementById("withdraw")
const depositButton =document.getElementById("deposit-button")
const mylist = document.getElementById("mylist")
const mytotal = document.getElementById("mytotal")
const tWithdraw = document.getElementById("t-withdraw")
const tDeposit = document.getElementById("t-deposit")
let total=(mytotal.textContent) * 1
let tWith=0;
let tdep=0;


const withdrawDisplay =((myreason,myamount,mybutton) => {
    mybutton.addEventListener("click",function(){
          let reasons=myreason.value
          let amount=myamount.value
         
          if (reasons == "") {
            alert("First state the reason")
            return
          }
          if (amount == "") {
            alert("The amount is needed")
            return
          } 
          else{
            if (total>=amount) {
              mylist.innerHTML +=`
              <li class="d-flex justify-content-between bot">
              <span id="display-reason" class="myreason">${reasons} </span>
              <span class="mx-2" id="amount">${amount} $</span>
              </li>
              ` 
              total= total-amount*1
              tWith =tWith + amount*1
              tWithdraw.innerText=tWith
              mytotal.innerText=total
              myreason.value=""
              myamount.value=""
              return    
            }
            if(total<amount){
                alert("Please recharge your account")
            }
          }
          mytotal.innerText=total
         myreason.value=""
         myamount.value=""
     })
 })
 const depositDisplay =((myreasons,myamounts,mybuttons) => {
  mybuttons.addEventListener("click",function(){
        let reasons=myreasons.value
        let amount=myamounts.value
        if (reasons == "") {
          alert("First state the reason")
          return
        }
        if (amount == "") {
          alert("The amount is needed")
          return
        } 
        if (reasons != "" || amount!="") {
          if(amount>0){
              mylist.innerHTML +=`
              <li class="d-flex justify-content-between ">
              <span id="display-reason" class="mysource">${reasons}</span>
              <span class="mx-2" id="amount">${amount} $</span>
            
              </li>
              `
              total = total+ (amount*1)
              tdep =tdep + amount*1
              tDeposit.innerText=tdep
              mytotal.innerText=total
            }
        }
       
       myreasons.value=""
       myamounts.value=""
       
   })
})

 withdrawDisplay(withdrawReason,withdrawAmount,withdrawButton)
 depositDisplay(depositSource,depositAmount,depositButton)


