function DataBase(data){
    return new Promise((resolved, reject)=>{
        let internet = Math.floor(Math.random()*11);
        if(internet>4){
            resolved("Yayy resolved");
        }else{
            reject("Opps something went wrong");
        }
    })
}

DataBase("Jatin Maurya");