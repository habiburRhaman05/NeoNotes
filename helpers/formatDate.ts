export const formatDate = (date:Date)=>{
    const myDate = new Date(date).toLocaleDateString("en-US",{
        month:"short",
        day:"2-digit",
        year:"numeric"
    })

    return myDate
   
}

