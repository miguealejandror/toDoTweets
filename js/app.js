// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const contenido = document.querySelector('#contenido');
let tweets = [];


// Event listeners
eventListeners();
function eventListeners(){
    formulario.addEventListener('submit',agregarTweet);

    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}
// Funciones
function agregarTweet(e){

    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    if(tweet === ''){
        mostrarError('Un Tweet no puede ir vacio');

        return;
    }
    //Objeto de Tweets
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    // Añadir tweets
    tweets = [...tweets, tweetObj];

    // HTML
    crearHTML();

    formulario.reset();

}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    // Insertar Error
    contenido.appendChild(mensajeError);
    //Eliminar Mensaje de Error
    setTimeout(()=>{
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){
    limpiarHTML();
    if(tweets.length>0){
        tweets.forEach(tweet=>{
            //Btn Eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';
            //Funcion Eliminar
            btnEliminar.onclick = () =>{
                eliminarTweet(tweet.id);
            }
            // Lista de Tweets
            const li = document.createElement('li');
            li.innerText = tweet.tweet
            li.appendChild(btnEliminar);
            //Agregar al HTML

            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
function eliminarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}