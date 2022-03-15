import bcrypt from "bcryptjs";

export const encript = async(palabra)=>{
    let hash = await bcrypt.hash(palabra, 10)
    return hash
}
export const compare = async(palabraPlana, palabraHasheada) => {
    return await bcrypt.compare(palabraPlana, palabraHasheada)
}

