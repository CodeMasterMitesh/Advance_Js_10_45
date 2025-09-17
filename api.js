let btn = document.getElementById("getjoke");

let url = "https://official-joke-api.appspot.com/random_joke";
let joketype = document.querySelector(".joketype");
let jokeid = document.querySelector(".jokeid");
let joke_punchline = document.querySelector(".joke_punchline");
let jokesetup = document.querySelector("#joke-setup");

btn.addEventListener("click",(e)=>{
    (async function()
    {
        let response = await fetch(url);
        // console.log(response);

        if(response.ok){
            let data = await response.json();
            console.log(data);
            console.log(data.type);
            joketype.innerText = data.type;
            joke_punchline.innerText = data.punchline;
            jokeid.innerText = data.id;
            jokesetup.innerText = data.setup;
        }
        // console.log(response.status);
    })();
});


// let promise = fetch(url);
// console.log(promise);
// console.log(promise.status);
