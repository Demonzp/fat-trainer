const createId = (length)=>{
    const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    let id = '';

    for (let i = 0; i < length; i++) {
        id += chars[Math.floor(Math.random()*chars.length)];
        
    }

    return id;
}

const getUrlParams = (location)=>{
    return location
        .search
        .replace('?','')
        .split('&')
        .reduce((p,e)=>{
                const a = e.split('=');
                p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            {}
        );
}

const parseDate = (date)=>{
    return `${date.getDate()}-${date.getMonth()+1}-${String(date.getFullYear()).slice(2)}`;
}

const downInArray = (id, array) =>{
    const idx = array.findIndex((el)=>el.id===id);

    if(idx>=array.length-1){
      return array;
    }

    const newArr = [
      ...array.slice(0, idx),
      {
        ...array[idx+1],
        zIndex: array[idx].zIndex
      },
      {
        ...array[idx],
        zIndex: array[idx+1].zIndex
      },
      ...array.slice(idx + 2)
    ];

    return newArr;
}

const upInArray = (id, array) =>{
    const idx = array.findIndex((ex)=>ex.id===id);

    if(idx===0){
      return array;
    }

    const newArr = [
      ...array.slice(0, idx-1),
      {
        ...array[idx],
        zIndex: array[idx-1].zIndex
      },
      {
        ...array[idx-1],
        zIndex: array.zIndex
      },
      ...array.slice(idx+1)
    ];

    return newArr;
}

module.exports = {
    createId,
    getUrlParams,
    parseDate,
    downInArray,
    upInArray
};