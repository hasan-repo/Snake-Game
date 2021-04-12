let auroraBtn = document.querySelector("#button-1");
let mountainBtn = document.querySelector("#button-2");
let seaBtn = document.querySelector("#button-3");
let flameBtn = document.querySelector("#button-4");
let mcropsBtn = document.querySelector("#button-5");

auroraBtn.addEventListener("click",() =>{
    document.body.style.backgroundImage = "url('/img/Aurora.jpg')";
});

mountainBtn.addEventListener("click",() =>{
    document.body.style.backgroundImage = "url('/img/Mountain.jpg')";
})

seaBtn.addEventListener("click",() =>{
    document.body.style.backgroundImage = "url('/img/Sea-Side.jpg')";
})

flameBtn.addEventListener("click",() =>{
    document.body.style.backgroundImage = "url('/img/Flame.jpg')";
})

mcropsBtn.addEventListener("click",() =>{
    document.body.style.backgroundImage = "url('/img/Mountain-Crops.jpg')";
})