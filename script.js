let subLink = "";



async function loadUser(){


let id = 
document.getElementById("userId").value;



if(!id){

alert("Введите Telegram ID");

return;

}



subLink =
"https://raw.githubusercontent.com/" +
"bdtvyz76b6-blip/vpn-sub/main/users/" +
id +
".txt";



try{


let response =
await fetch(subLink);



if(!response.ok){

throw new Error();

}



let text =
await response.text();



let title =
text.match(/#profile-title:(.*)/)?.[1]
|| "ixxy VPN";



let announce =
text.match(/#announce:(.*)/)?.[1]
|| "Нет данных";



let servers =
(text.match(/vless:\/\//g)||[]).length;



document.getElementById("status").innerHTML = `

🟢 Подписка найдена

<br><br>

👑 ${title}

<br>

📅 ${announce}

<br>

🌐 Серверов: ${servers}

`;



localStorage.setItem(
"ixxy_id",
id
);



localStorage.setItem(
"ixxy_sub",
subLink
);



}

catch{


document.getElementById("status").innerHTML =

`
🔴 Подписка не найдена

<br><br>

Проверь ID

`;

}



}





function connect(){



if(!subLink){

subLink =
localStorage.getItem("ixxy_sub");

}



if(!subLink){

alert("Сначала загрузите подписку");

return;

}



window.location.href =

"happ://add/sub?url="

+

encodeURIComponent(subLink);



}





function copySub(){


if(!subLink){

subLink =
localStorage.getItem("ixxy_sub");

}



if(subLink){


navigator.clipboard.writeText(subLink);


alert("Ссылка скопирована");


}

}