const drop = 'dropdown'
const stat = 'static'
const sheet = 'sheet'



const CheckActivePill = (i, path) => {
    var active = false

    // console.log(path);
    if(i.type===stat) 
    {
        if(i.route === path){
            return true
        }
        return false
    }
    // else if(i.type === drop){
    //     i.drop.find(s=>{
    //         if(s.type===stat && s.route===path) return true
    //         if(s.type===drop){
    //             if(s.drop.find(p=>{
    //                 return p.route==path
    //             })) return true
    //         }
    //     })
    // }

    // if(i.type === drop) {
    //      i.drop.map(j=>{
    //         if(CheckActivePill(j,path)) {
    //             console.log('here',j,path);
    //             return true
    //         }
    //     })
    //     return false
    // }

    if(i.type===drop){
        i.drop.map((j,path)=>{

            if(j.type===stat){
                if(i.route === path){
                    active = true
                    return true
                }
                return false
            }

            if(j.type===drop){
                j.drop.map((k,path)=>{
                    if(k.route===path){
                        active = true
                        return true
                        }
                    return false
                })
            }
        })
    }
    if(i?.route === path){
        return true
    }

    if(active==true) return true
    return false
}

export default CheckActivePill