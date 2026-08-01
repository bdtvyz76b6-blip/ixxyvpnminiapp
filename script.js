let subLink = "";

const GITHUB =
"https://raw.githubusercontent.com/bdtvyz76b6-blip/vpn-sub/main/users/";


window.onload = () => {

    let saved =
    localStorage.getItem("ixxy_id");


    if(saved){

        document.getElementById("userId").value = saved;

        loadUser();

    }

};





async function loadUser(){


    let id =
    document.getElementById("userId").value.trim();



    if(!id){

        alert("Введите Telegram ID");

        return;

    }



    subLink =
    GITHUB + id + ".txt";



    try{


        let response =
        await fetch(subLink);



        if(!response.ok){

            throw new Error();

        }



        let text =
        await response.text();



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



        let serverNames =
        getServers(text);



        let expired =
        text.includes("⛔");



        document.getElementById("status").innerHTML = `


        <span class="${expired ? "expired":"active"}">

        ${expired ? "🔴 Подписка закончилась":"🟢 Подписка активна"}

        </span>


        <br><br>


        👑 ${title}


        <br>


        📅 ${announce}


        <br>


        🌐 Серверов:
        ${servers.length}


        `;



        if(serverNames.length){


            document.getElementById("servers").innerHTML =
            
            serverNames.map(s =>

            `
            <div class="server">
            🟢 ${s}
            </div>
            `

            ).join("");

        }




    }


    catch{


        document.getElementById("status").innerHTML =

        `
        🔴 Пользователь не найден

        <br><br>

        Проверь Telegram ID

        `;


    }


}







function getValue(text,key){


    let line =
    text.split("\n")
    .find(x=>x.startsWith(key));


    if(!line)
    return "Не указано";



    return line
    .replace(key,"")
    .trim();

}







function getServers(text){


    let lines =
    text.split("\n");



    let result=[];



    for(let line of lines){


        if(line.startsWith("vless://")){


            let hash =
            line.split("#")[1];



            if(hash){

                result.push(hash);

            }

            else{

                result.push(
                "Сервер"
                );

            }


        }


    }



    return result;


}








function connect(){


    if(!subLink){

        subLink =
        localStorage.getItem("ixxy_sub");

    }



    if(!subLink){

        alert(
        "Сначала загрузите подписку"
        );

        return;

    }



    location.href =

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


        alert(
        "Ссылка скопирована"
        );


    }


}








function renew(){


    location.href =
    "https://t.me/orelvpntopbot";


}