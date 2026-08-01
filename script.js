let sub = localStorage.getItem("ixxy_sub");


window.onload = () => {

    if(sub){

        document.getElementById("subLink").value=sub;

        document.getElementById("status").innerHTML =
        "🟢 Подписка сохранена";

    }

};



function saveSub(){

    let link =
    document.getElementById("subLink").value;


    if(!link){

        alert("Вставьте ссылку");

        return;

    }


    localStorage.setItem(
        "ixxy_sub",
        link
    );


    document.getElementById("status").innerHTML =
    "🟢 Подписка сохранена";

}



function connect(){

    let link =
    localStorage.getItem("ixxy_sub");


    if(!link){

        alert("Сначала сохраните подписку");

        return;

    }


    window.location.href =
    "happ://add/sub?url=" 
    + encodeURIComponent(link);

}



function copySub(){

    let link =
    localStorage.getItem("ixxy_sub");


    if(link){

        navigator.clipboard.writeText(link);

        alert("Ссылка скопирована");

    }

}