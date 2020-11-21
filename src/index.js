import {Requests} from "./requests";
import {UI} from "./ui"



const typeInput = document.getElementById("type");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const form = document.getElementById("goods-form");
const table = document.getElementById("employees");
const nonDisplayedUpdateBtn = document.getElementById("update");
const searchInput = document.getElementById("search-area");


const request = new Requests("http://localhost:3000/envanter");
const ui = new UI();
let updateState = null;

eventListeners();
function  eventListeners(){
    form.addEventListener("submit",addGood);
    document.addEventListener("DOMContentLoaded",loadDatas);
    table.addEventListener("click",deleteOrUpdate);
    nonDisplayedUpdateBtn.addEventListener("click",updateGood);
    searchInput.addEventListener("keyup",searchGood);
    
};

function searchGood(){
   let filterValue = searchInput.value.toLowerCase();
   const typesTexts = document.querySelectorAll(".types");
    typesTexts.forEach(tip=>{
        
        let text = tip.textContent.toLowerCase()
        if(text.indexOf(filterValue)===-1){
            tip.parentElement.setAttribute("style","display:none !important")
            console.log(tip.parentElement.parentElement);

        }
        else{
            tip.parentElement.setAttribute("style","display: table-row")
        }
    })

}
function deleteOrUpdate(e){
    if(e.target.id==="delete-employee"&&confirm("Silme işleminden emin misiniz ?")){
        let id = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;//Id'yi string şekilde aldık.
        request.delete(Number(id))
        .then(()=>{
            ui.createAlert("success","Silme işlemi başarıyla yapıldı.");
            ui.deleteGood(e.target.parentElement.parentElement);

        })
        .catch(err=> console.log(err));
    }
    else if (e.target.id==="update-employee"){
        updateGoodControllerForm(e.target.parentElement.parentElement);//seçtiğim tr tagini gönderiyorum.
    }
}
function updateGoodControllerForm(target){
    ui.toggleUpdetBtn(target);
    if(updateState === null){
        updateState = {updateId:Number(target.children[3].textContent),//target burada tr elementimiz. Target.children[3] ise id'mizi vverecek.
        updateParent:target};// updateParent'a da ui için parent element bilgisini veriyoruz.
        console.log(updateState);
    }
    else{
        updateState = null;
    }
}
function updateGood(){
    if(updateState){//Update state bilgi taşıdığı zaman true olarak gözükür. Yani bu blok update state doluysa çalışacak.
        let updatedData = {tipi:typeInput.value.trim(), quantity:quantityInput.value.trim(),price:Number(priceInput.value.trim())}
        
        request.put(updatedData,updateState.updateId)
        .then(updatedGood=> {
            console.log("updateGood put çalıştı.");
            console.log(updatedGood);
            ui.updateGoodOnUI(updatedGood,updateState.updateParent);
            ui.deleteInputs();
            location.reload();
        })
        .catch(err=> console.log(err));

    }
    if(updateState ===null){
        console.log("Update state null");
    }
}

function addGood(e){

    let newType = typeInput.value;
    let newQuantity = quantityInput.value;
    let newPrice = priceInput.value;
    let willBeQuistonedType = newType.toLowerCase();
    const typesTexts = document.querySelectorAll(".types");
    let liste = [];
    typesTexts.forEach(tip=>{
        
        let text = tip.textContent.toLowerCase();
        liste.push(text);
       
    })

    
    if(newType ==="" ||newQuantity===""||newPrice===""){
        ui.createAlert("danger","Hiç bir alan boş kalmamalıdır.");
    }
    else if (liste.includes(willBeQuistonedType)){// ürün tipine göre duplicate etmemek için
        alert("Bu ürünü daha önce eklediniz. Lütfen farklı bir ürün ekleyiniz");
    }
    else{
        request.post({tipi:newType,quantity:newQuantity,price:Number(newPrice)})//Ekleme işlemi burda gerçekleşti.
        .then(addedOne => {
            ui.addGoodToUI(addedOne);
            ui.createAlert("success","Ürün başarıyla eklendi.")
        })
        .catch(err=> console.log(err));
        e.preventDefault();
    }
    
}

function loadDatas(){
    request.get()
    .then(datas=> {
        ui.loadDatasToUI(datas);//ui ile sayfa yenilendiğinde ekleme işlemi yaptık.
    })
    .catch(err=>console.error(err));
}


