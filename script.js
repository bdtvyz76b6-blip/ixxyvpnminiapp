let subLink="";


const GITHUB =
"https://raw.githubusercontent.com/bdtvyz76b6-blip/vpn-sub/main/users/";





window.onload=()=>{


let id=
localStorage.getItem("ixxy_id");


if(id){

document.getElementById("userId").value=id;

loadUser();

}



setTimeout(()=>{

document.getElementById("loader").style.display="none";

},1200);



};







async function loadUser(){


let id=
document.getElementById("userId").value.trim();



if(!id){

alert("Введите ID");

return;

}



subLink =
GITHUB + id + ".txt";



try{


let r =
await fetch(subLink);



if(!r.ok)
throw Error();



let text =
await r.text();



localStorage.setItem(
"ixxy_id",
id
);



localStorage.setItem(
"ixxy_sub",
subLink
);




let title =
getValue(
text,
"#profile-title"
);



let announce =
getValue(
text,
"#announce"
);



let servers =
text.match(/vless:\/\//g)
|| [];



let names =
getServers(text);



let expired =
text.includes("⛔");



document.getElementById("status").innerHTML=`

<span class="${expired?'expired':'active'}">

${expired?
"🔴 Подписка закончилась":
"🟢 Подписка активна"}

</span>

<br><br>

👑 ${title}

<br>

📅 ${announce}

<br>

🌐 Серверов: ${servers.length}

`;




document.getElementById("servers").innerHTML =

names.map(x=>

`
<div class="server">

🟢 ${x}

</div>

`

).join("");




}

catch{


document.getElementById("status").innerHTML=

"🔴 Пользователь не найден";


}


}








function getValue(text,key){


let line =
text.split("\n")
.find(x=>x.startsWith(key));


return line?
line.replace(key,"").trim():
"Нет данных";


}








function getServers(text){


let result=[];


text.split("\n").forEach(line=>{


if(line.startsWith("vless://")){


let name =
line.split("#")[1];


result.push(
name || "Сервер"
);


}


});


return result;


}








function connect(){


if(!subLink)

subLink =
localStorage.getItem("ixxy_sub");



location.href=

"happ://add/sub?url="+
encodeURIComponent(subLink);


}







function copySub(){


navigator.clipboard.writeText(
localStorage.getItem("ixxy_sub")
);


alert("Скопировано");


}








function renew(){


location.href=
"https://t.me/orelvpntopbot";


}








function showQR(){


let link =
localStorage.getItem("ixxy_sub");


let qr =

"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="

+

encodeURIComponent(link);



document.getElementById("qr").src=qr;


document.getElementById("qrBox").style.display="block";


}






function closeQR(){


document.getElementById("qrBox").style.display="none";


}







if(
"serviceWorker" in navigator
){

navigator.serviceWorker.register(
"service-worker.js"
);


}