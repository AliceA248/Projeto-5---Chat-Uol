let conteudoMensagem = document.querySelector("header");
let escreverMensagem = document.querySelector("footer");
let loadingS = document.querySelector("section");
let userName = document.querySelector(".name");
let loading = document.querySelector(".loading");
let send = document.querySelector("send");
let sendMessage = document.querySelector("footer input");
let MensageBackgroun = document.querySelector(".changeMensageBackground");
let sidebar = document.querySelector("aside");
let list = document.querySelector("ul");
let responseChat = null;
let higher = null;
let users = document.querySelector(".users");
let to = null;
let type = "message";

//////////check user name//////////
function checkName(){
    userName = userName.value;
    let name = {   
                name: userName
               }
    let promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", name);
    
    promisse.then(placeChat);
    promisse.catch(erroName);
}

//////////Nome não compatível//////////
function erroName(erro){
    let statusCode = erro.responseChat.status;
    alert("Este nome já esta sendo usado");
}

//////////sucesso no login//////////
function loadingChat(){
    loading.classList.remove("hidden");
    setTimeout(hiddenLoadingChat,3000);
}
function hiddenLoadingChat(){
    loading.classList.add("hidden");
}
function placeChat(){
    loadingChat();
    conteudoMensagem.classList.remove("hidden");
    escreverMensagem.classList.remove("hidden")
    loadingS.classList.add("hidden");
    setInterval(loadMessages,3000);
}

//////////requisição das ultimas 100 mensagens na tela//////////
function loadMessages(){
    let promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promisse.then(placeMensage);
}

//////////insere as mensagens no html//////////
function placeMensage(responseChat){
    responseChat = responseChat.data;
    list.innerHTML = "";
    let i = 0;
    responseChat.forEach(element => {
        let type = checkMensageType(element);
        list.innerHTML += `<li id="${i}" class="area ${type}" data-identifier="message">
                            <a><b>
                            (${element.time}) 
                            </b>
                            <strong>${element.from}</strong>  
                            ${element.text}
                            </a>
                        </li>`;
                        i++;
    });
    scrollMessages();
    setInterval(keepConection, 5000);
}

//////////verifica e retorna o tipo de mensagem//////////
function checkMensageType(element){
    if(element.type == "status"){
        return("status");
    }else if (element.type == "message"){
        return("message")
    }else if (element.type == "private_message"){
        return("private_message");
    }
}

//////////scroll all message//////////
function scrollMessages(){
    let lastMessage = document.getElementById("99")
    lastMessage.scrollIntoView();
}


//////////keep user connected//////////
function keepConection(){
    let request = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",{name: userName})
}

//////////setting of the menssage//////////
function settingsMessage(){
    sidebar.classList.remove("hidden");
    MensageBackgroun.classList.add("dark");
    placeUsers();
}
function exitSettings(){
    sidebar.classList.add("hidden");
    MensageBackgroun.classList.remove("dark")
}

//////////search users/////////
function placeUsers(){
    let request = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    request.then(insertUsers);
    request.catch(criticalError);
}
//////////place users//////////
function insertUsers(arrayUsers){
    arrayUsers.data.forEach(element =>{
        users.innerHTML += `<div onclick = "select(this)" class="username"><img class="image-users" src="/img/user.png"><a>${element.name}</a></div>`
    })
}
//////////chose user to send menssage//////////
function select(element){
    let check = document.querySelectorAll(".check");
    check.forEach(element => {
        element.classList.add("hidden");
    })
    element.innerHTML += "<img class='check' src='./img/check.png'>";
    to = element.innerText;
}
//////////choose the privacity of the mensage//////////
function privacy(a){
    let check = document.querySelectorAll(".check");
    check.forEach(element => {
        element.classList.add("hidden");
    })
    a.innerHTML += "<img class='check' src='./img/check.png'>";
    if(a.innerText == "private_message"){
        type = "message";
    }else{
        type = "private_message";
    }
}
//////////sent mensage//////////
function sendTo(){
    let message = {
        from: `${userName}`,
	    to: `${to}`,
	    text: `${sendMessage.value}`,
	    type: `${type}`
    }

    let request = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", message);
    request.then();
    request.catch(criticalError);
}
document.addEventListener("keypress", function(e){
    if(e.key === 'Enter'){
        let btn = document.querySelector('#send');
        btn.click();
    }
})
//////////  Error / //////////
function criticalError(erro){
    window.location.reload();
}