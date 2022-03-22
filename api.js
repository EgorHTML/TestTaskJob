class Api{
    constructor(url){
        this.url = url
    }

   async getDataJson(){
        let response = await fetch(this.url)
        return response.json()
    }
}

export default Api
