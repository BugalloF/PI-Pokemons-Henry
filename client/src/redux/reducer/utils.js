export const sortPoke = (sortOrder,array) =>{
    switch(sortOrder){
        case 'A-Z':
            return array.sort((a,b)=>{
                return a.name.localeCompare(b.name)
            })
        case 'Z-A':
            return array.sort((a,b)=>{
                return b.name.localeCompare(a.name)
            })
        case 'Stronger':
            return array.sort((a,b)=>{
                return b.attack - a.attack
            })
        case 'Weaker':
                return array.sort((a,b)=>{
                    return a.attack - b.attack
                })  
            default:
                return array
    }
}
export const filterPoke=(filterBy,array)=>{
    switch(filterBy){
        case 'FromApi':
            return array.filter(poke => typeof poke.id === 'number')
        case 'FromDataBase':
            return array.filter(poke => typeof poke.id === 'string')
            default:
                return array
    }
}
export const filterByType = (type, array) => {
  return array.filter((poke) => poke.type.find(e=>e.includes(type)));
};