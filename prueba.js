
function esNumeroEntero(numero) {

   var diferencia = numero - Math.floor(numero)
    if (diferencia === 0){
        console.log(true);
    }
    else{
        console.log(false);
    }
 }
  esNumeroEntero(3.1416)
