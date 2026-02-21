/* =========================
IMAGENS SOBRE / INSTITUCIONAL
========================= */

const instImgs = [
"imagens/Bill.jpg",
 "imagens/Ndombele.jpg",
 "imagens/Mae.jpg"
];

let instI = 0;

setInterval(()=>{
 const el = document.getElementById("imgInst");
 if(!el) return;

 el.classList.add("fade");

 setTimeout(()=>{
   instI = (instI+1)%instImgs.length;
   el.src = instImgs[instI];
   el.classList.remove("fade");
 },400);

},5000);


/* =========================
ANÚNCIOS
========================= */

const ads = [
 "imagens/Bill.jpg",
 "imagens/Ndombele.jpg",
 "imagens/Mae.jpg"
];

let adI = 0;

setInterval(()=>{
 const el = document.getElementById("imgAds");
 if(!el) return;

 el.classList.add("fade");

 setTimeout(()=>{
   adI = (adI+1)%ads.length;
   el.src = ads[adI];
   el.classList.remove("fade");
 },400);

},5000);
