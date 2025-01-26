let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numMaximo = 10;

function asignarTextoElementos(elemento, texto) {
    let elementoHTML = document.querySelector(elemento); // Seleccionar elemento
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let inputUsuario = parseInt(document.getElementById('inputNumero').value); // Obtener elemento por ID y con .value se obtiene específicamente el valor de dicho elemento
    // ParseInt engloba un input y lo convierte a entero
    // inputUsuario === numeroSecreto ? alert('Adivinaste el número') : alert('No adivinaste el número')

    if(inputUsuario === numeroSecreto) {
        asignarTextoElementos('p', 'Acertaste en ' + intentos + (intentos == 1 ? ' intento. ' : ' intentos. ')  + numeroSecreto + ' era el número secreto')
        document.getElementById('reiniciar').removeAttribute('disabled') // Seleccionamos por ID y con removeAttribute seleccionamso el atributo que deseamos eliminar
    } else {
       if (inputUsuario > numeroSecreto) {
        asignarTextoElementos('p', 'No acertaste. El número secreto es menor')
       } else {
        asignarTextoElementos('p', 'No acertaste. El número secreto es mayor')
       }
       intentos++;
       
       vaciarCampo();
    }
    return;
}


function generarNumeroAleatorio(){
    let numeroGenerado = Math.floor(Math.random()*numMaximo) + 1;
    // Math floor redondea al número más bajo
    // Math.random genera un número entre el 0 y el 0.999...
    // Multiplicar Math.random es para darle un rango entre el 0 y el 9.999...
    // +1 es para garantizar que siempre nos encontremos arriba de 1 en caso de que el redondeo o multiplicación sea cero
    // console.log(numeroGenerado);
    // console.log(listaNumerosSorteados);

    if(listaNumerosSorteados.length == numMaximo) {
        asignarTextoElementos('.texto__parrafo', '¡Concluiste el juego! Ya no hay más números aleatorios por adivinar');    
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {  // Verificar si dentro del array ya existe el número generado
            return generarNumeroAleatorio();
        } else {
            listaNumerosSorteados.push(numeroGenerado) // Integrar este número sorteado al Array
            return numeroGenerado;
        }
    }
}

function vaciarCampo(){
    document.getElementById('inputNumero').value = '';
}

function condicionesIniciales(){
    asignarTextoElementos('h1', 'Número secreto');
    asignarTextoElementos('.texto__parrafo', 'Ingresa un número entre el 1 y el ' + numMaximo);
    numeroSecreto = generarNumeroAleatorio();
    intentos = 1;
}

function reiniciarJuego(){
    vaciarCampo();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled','true'); // A diferencia de remove, en esta instrucción se requieren dos parametros 
}

condicionesIniciales();