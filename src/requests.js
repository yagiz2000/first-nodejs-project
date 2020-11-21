export class Requests{
    constructor(url){
        this.url = url;
    }
    async get(){
        const response = await fetch(this.url);
        const data = await response.json();
        return data;
    }
    async post(newData){
        const response = await fetch(this.url,{
            method:"POST",
            body:JSON.stringify(newData),
            headers :{
                'Content-type': 'application/json; charset=UTF-8',

            }
        })
        const responseData = await response.json();
        return responseData;
    }
    async put(changedData,id){//ID'YE GÖRE DEĞİŞTİRCEĞİMİZ KİŞİYİ BELİRLİCEZ
        const response = await fetch(this.url+"/"+id,{
            method:"PUT",
            body:JSON.stringify(changedData),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',

            }
        })
        const responseData = await response.json();
        return responseData;
    }
    async delete(id){
        const response = await fetch(this.url+"/"+id,{
            method:"DELETE"
        });
        const emptyObject = await response.json();
        return emptyObject+" silindi";
    }

}