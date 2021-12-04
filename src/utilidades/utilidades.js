let crearId = (largo) => {
    let resultado = '';
    let caracter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let largoCaracter = caracter.length;
    for (let i = 0; i < largo; i++) {
        resultado += caracter.charAt(Math.floor(Math.random() * largoCaracter));
    }
    return resultado;
};

export default crearId
