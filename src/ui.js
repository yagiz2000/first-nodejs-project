export class UI{
    constructor(){
        this.typeInput = document.getElementById("type");
        this.quantityInput = document.getElementById("quantity");
        this.priceInput = document.getElementById("price");
        this.table = document.getElementById("employees");
        this.firstCardBody = document.querySelectorAll(".card-body")[0];
        this.nonDisplayedUpdateBtn = document.getElementById("update");
        this.alertContainer = document.getElementById("alert-container");


    }
    loadDatasToUI(datas){
        let text = "";
        datas.forEach(data => {
            text +=`
            <tr>
                                            
            <td class ="types">${data.tipi}</td>
            <td>${data.quantity}</td>
            <td>${data.price}</td>
            <td>${data.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>`;

        });
        this.table.innerHTML = text;        
    }
    addGoodToUI(newGood){
        this.table.innerHTML += `<tr>
                                            
        <td class ="types">${newGood.tipi}</td>
        <td>${newGood.quantity}</td>
        <td>${newGood.price}</td>
        <td>${newGood.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>`;
        this.deleteInputs();
    }
    createAlert(type,msg){
        let newElement = document.createElement("div");
        newElement.className = `alert alert-${type}`;
        newElement.textContent = msg;
        this.alertContainer.appendChild(newElement);
        setTimeout(function(){
            newElement.remove();
        },2000);

    }
    deleteGood(comingParentElement){
        comingParentElement.remove();
    }
    toggleUpdetBtn(good){//good burada güncelle butonuna tıkladığımız tr olarak geliyor.

        if(this.nonDisplayedUpdateBtn.style.display ==="none"){
            this.nonDisplayedUpdateBtn.style.display ="block";
            this.addGoodInfoToInput(good);
        }
        else{
            this.nonDisplayedUpdateBtn.style.display = "none";
            this.deleteInputs(); //Inputları temizledik.

        }
    }
    deleteInputs(){
        this.typeInput.value ="";
        this.quantityInput.value ="";
        this.priceInput.value ="";

    }
    addGoodInfoToInput(good){//good burada güncelle butonuna tıkladığımız tr olarak geliyor.
        this.typeInput.value= good.children[0].textContent;
        this.quantityInput.value = good.children[1].textContent;
        this.priceInput.value = good.children[2].textContent;

    }
    updateGoodOnUI(updatedGood,comingTr){//ComingTr = tıkladığımız yerdeki tr elementi gelecek.
        comingTr.innerHTML = `                              
        <td class ="types">${updatedGood.tipi}</td>
        <td>${updatedGood.quantity}</td>
        <td>${updatedGood.price}</td>
        <td>${updatedGood.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        `;
        this.nonDisplayedUpdateBtn.style.display = "none";
        this.createAlert("success","Ürün başarıyla güncellendi.");
    }
  
} 