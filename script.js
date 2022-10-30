//////////variaveis globais//////////
let high = document.querySelector("header");
let bot = document.querySelector("footer");
let log = document.querySelector("section");
let userName = document.querySelector(".name");
let loading = document.querySelector(".loading");
let send = document.querySelector("send");
let sendMessage = document.querySelector("footer input");
let middle = document.querySelector(".middle");
let sidebar = document.querySelector("aside");
let list = document.querySelector("ul");
let responseLoaded = null;
let higher = null;
let users = document.querySelector(".users");
let to = null;
let type = "message";

//////////validar o nome do usuário//////////
function checkName(){
    userName = userName.value;
    let name = {   
                name: userName
               }
    let promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", name);
    
    promisse.then(displayChat);
    promisse.catch(reloadName);
}

//////////Nome não compatível//////////
function reloadName(erro){
    let statusCode = erro.response.status;
    alert("Este nome já esta sendo usado");
}

//////////sucesso no login//////////
function screenload(){
    loading.classList.remove("hidden");
    setTimeout(hiddenscreenload,3000);
}
function hiddenscreenload(){
    loading.classList.add("hidden");
}
function displayChat(){
    screenload();
    high.classList.remove("hidden");
    bot.classList.remove("hidden")
    log.classList.add("hidden");
    setInterval(loadMessages,3000);
}

//////////requisição das ultimas 100 mensagens na tela//////////
function loadMessages(){
    let promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promisse.then(insertMessages);
}

//////////insere as mensagens no html//////////
function insertMessages(response){
    responseLoaded = response.data;
    list.innerHTML = "";
    let i = 0;
    responseLoaded.forEach(element => {
        let type = checkType(element);
        list.innerHTML += `<li id="${i}" class="area ${type}" data-identifier="message">
                            <p><b>
                            (${element.time}) 
                            </b>
                            <strong>${element.from}</strong>  
                            ${element.text}
                            </p>
                        </li>`;
                        i++;
    });
    scrollMessages();
    setInterval(keepConection, 5000);
}

//////////verifica e retorna o tipo de mensagem//////////
function checkType(element){
    if(element.type == "status"){
        return("status");
    }else if (element.type == "message"){
        return("message")
    }else if (element.type == "private_message"){
        return("private_message");
    }
}

//////////escrolar a pagina para a ultima mensagem enviada//////////
function scrollMessages(){
    let lastMessage = document.getElementById("99")
    lastMessage.scrollIntoView();
}


//////////manter o usuário conctado ao servidor//////////
function keepConection(){
    let request = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",{name: userName})
}

//////////configurações da mensagem//////////
function settingsMessage(){
    sidebar.classList.remove("hidden");
    middle.classList.add("dark");
    findUsers();
}
function exitSettings(){
    sidebar.classList.add("hidden");
    middle.classList.remove("dark")
}

//////////procurar pelos usuários no servidor//////////
function findUsers(){
    let request = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    request.then(insertUsers);
    request.catch(deuxabu);
}
//////////inserir os usuários dinâmicamente//////////
function insertUsers(arrayUsers){
    arrayUsers.data.forEach(element =>{
        users.innerHTML += `<div onclick = "select(this)" class="name-users"><img class="Vector" src="/img/Vector.png" alt="usuário"><p>${element.name}</p></div>`
    })
}
//////////escolher o usuário para enviar a mensagem//////////
function select(element){
    let check = document.querySelectorAll(".icon4");
    check.forEach(element => {
        element.classList.add("hidden");
    })
    element.innerHTML += "<img class='icon4' src='./assets/greenchek.png' alt='check'>";
    to = element.innerText;
}
//////////escolher a privacidade da mesnsagem//////////
function privacy(p){
    let check = document.querySelectorAll(".icon5");
    check.forEach(element => {
        element.classList.add("hidden");
    })
    p.innerHTML += "<img class='icon5' src='./assets/greenchek.png' alt='check'>";
    if(p.innerText == "private_message"){
        type = "message";
    }else{
        type = "private_message";
    }
}
//////////enviar mensagens//////////
function sendTo(){
    let message = {
        from: `${userName}`,
	    to: `${to}`,
	    text: `${sendMessage.value}`,
	    type: `${type}`
    }

    let request = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", message);
    request.then();
    request.catch(deuxabu);
}
document.addEventListener("keypress", function(e){
    if(e.key === 'Enter'){
        let btn = document.querySelector('#send');
        btn.click();
    }
})
//////////  :/ //////////
function deuxabu(erro){
    window.location.reload();
}