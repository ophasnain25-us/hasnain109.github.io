const loader = document.getElementById("loader");
window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 650));

document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => document.querySelector(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"}));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const hearts = document.getElementById("hearts");
function makeHeart(){
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = Math.random() > .5 ? "♥" : "♡";
  h.style.left = Math.random()*100 + "vw";
  h.style.bottom = "-30px";
  h.style.fontSize = (10 + Math.random()*18) + "px";
  h.style.animationDuration = (6 + Math.random()*7) + "s";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),14000);
}
setInterval(makeHeart, 900);
for(let i=0;i<8;i++) setTimeout(makeHeart,i*350);

const envelope = document.getElementById("envelope");
envelope.addEventListener("click", ()=> envelope.classList.toggle("open"));

const yesBtn = document.getElementById("yesBtn");
const timeBtn = document.getElementById("timeBtn");
const answer = document.getElementById("answer");

function burst(){
  for(let i=0;i<55;i++){
    const h=document.createElement("span");
    h.className="heart";
    h.textContent=["♥","♡","✦"][Math.floor(Math.random()*3)];
    h.style.left=(40+Math.random()*20)+"vw";
    h.style.bottom=(25+Math.random()*20)+"vh";
    h.style.fontSize=(12+Math.random()*24)+"px";
    h.style.animationDuration=(2+Math.random()*3)+"s";
    hearts.appendChild(h);
    setTimeout(()=>h.remove(),6000);
  }
}
yesBtn.addEventListener("click",()=>{
  answer.textContent="Thank you, my love. I promise I'll keep choosing you. ♥";
  burst();
});
timeBtn.addEventListener("click",()=>{
  answer.textContent="Take all the time you need, Areeba. I'll be here. ♡";
});

document.addEventListener("mousemove", e=>{
  const glow=document.querySelector(".cursor-glow");
  if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";}
});

// Optional music: put a file named music.mp3 in the root folder and it will work.
const musicBtn=document.getElementById("musicBtn");
let audio=null, playing=false;
musicBtn.addEventListener("click",()=>{
  if(!audio){
    audio=new Audio("music.mp3");
    audio.loop=true;
  }
  if(!playing){
    audio.play().then(()=>{
      playing=true; musicBtn.textContent="Ⅱ";
    }).catch(()=>{
      musicBtn.textContent="♪";
      alert("Music ke liye root folder mein music.mp3 add karein, phir button dobara press karein.");
    });
  }else{
    audio.pause(); playing=false; musicBtn.textContent="♪";
  }
});
