
// check local storage
if(localStorage.getItem("colorexist")!==null){
    document.documentElement.style.setProperty("--main-color",localStorage.getItem("colorexist"))
    document.querySelectorAll(".option li").forEach(el=>{
        el.classList.remove("active")
        if(el.dataset.color===localStorage.getItem("colorexist")){
            el.classList.add("active")
        }
    })
}

// global variable
let randomback;
backgroundopt=true;
// end global variable

if(localStorage.getItem("backoption")!==null){
    document.querySelectorAll(".random-background span").forEach(span=>{
        span.classList.remove("active")
        if(span.dataset.background===localStorage.getItem("backoption")){
            span.classList.add("active")
        }
        if(localStorage.getItem("backoption")==="yes"){
            backgroundopt=true
        }
        else{
            backgroundopt=false
        }
    })
}
//end checking

// start handling setting for page

document.querySelector(".icon i").onclick =function(){
    this.classList.toggle("fa-spin");

    document.querySelector(".setting-box").classList.toggle("open");
}
// end handling setting for page

// start handling color
let color_list=document.querySelectorAll(".option li")
color_list.forEach(li=>{
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color)
        localStorage.setItem("colorexist",e.target.dataset.color)
        handle_active(e)
    })
    
})

// end handling color
//start background handling
let random_background=document.querySelectorAll(".random-background span")
random_background.forEach(span=>{
    span.addEventListener("click",(e)=>{
        handle_active(e)

        localStorage.setItem("backoption",e.target.dataset.background)

        if(e.target.dataset.background==="yes"){
            backgroundopt=true;
            run_random_background()
        }
        else{
            backgroundopt=false;
            clearInterval(randomback)
        }
    })
    
})

//end background handling



// start handle changing background for landing page
let landingPage=document.querySelector(".landing-page");

let imgarr=["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];
// end handle changing background for landing page
function run_random_background(){
    if(backgroundopt===true){
        randomback=setInterval(()=>{
            let randomnum=Math.floor(Math.random()*imgarr.length)
            landingPage.style.backgroundImage=`url("../images/${imgarr[randomnum]}")`
            },1000)
        }
}
run_random_background()

// start handle our skills
let ourSkills=document.querySelector(".our_skills")
let skills=document.querySelectorAll(".our_skills .skill_prog span")
window.onscroll=function(){
    if(window.scrollY>=ourSkills.offsetTop){
        skills.forEach((skill)=>{
            skill.style.width=skill.dataset.prog;
           })
    }
}

// end handle our skills


// start handling images popup

let images=document.querySelectorAll(".galary .galary_box img");

images.forEach(img=>{
    img.addEventListener("click",function(){

        let popup_layout=document.createElement("div");
        popup_layout.className="popup_layout";
        document.body.appendChild(popup_layout)
        
        let popup_box=document.createElement("div");
        popup_box.className="popup_box";
        document.body.append(popup_box)

        if(img.alt!=null){
            let hedding=document.createElement("h3")
            let hiddingtext=document.createTextNode(img.alt)
            hedding.appendChild(hiddingtext)
            popup_box.appendChild(hedding)
        }
        let img_pop=document.createElement("img");
        img_pop.src=img.src;
        popup_box.appendChild(img_pop);

        let close_span=document.createElement("span")
        close_span.className="close_span";
        let close_text=document.createTextNode("X")
        close_span.appendChild(close_text)
        popup_box.appendChild(close_span)

    })
})
document.addEventListener("click",function(e){
    if(e.target.className=="close_span"){
        e.target.parentElement.remove()
        document.querySelector(".popup_layout").remove()
    }
})

// end handling images popup 
// start handling bullet
let bullets=document.querySelectorAll(".nav_bullet .bullet");
bullets.forEach(bullet=>{

    bullet.addEventListener("click",(e)=>{
        document.querySelector(e.target.dataset.sec).scrollIntoView({
            behavior: 'smooth'
        })
    })

})
// end handling bullet
//start handling bullet inlocal storage .
let bulletspans=document.querySelectorAll(".customize_bollet span");
let navbullet=document.querySelector(".nav_bullet");
if(localStorage.getItem("bullet_show")!=null){
    bulletspans.forEach(span=>{
        span.classList.remove("active")
    })
    if(localStorage.getItem("bullet_show")=="block"){
        navbullet.style.display="block"
        document.querySelector(".customize_bollet .yes").classList.add("active")
    }
    else{
        navbullet.style.display="none"
        document.querySelector(".customize_bollet .no").classList.add("active")
    }
}
bulletspans.forEach(span=>{
    span.addEventListener("click",(e)=>{
        handle_active(e)
        if(e.target.dataset.display==="show"){
           navbullet.style.display="block"
           localStorage.setItem("bullet_show","block")
        }
        else{
           navbullet.style.display="none"
           localStorage.setItem("bullet_show","none")

        }
    })
})

//end handling bullet inlocal storage 
// start handle reset button
document.querySelector(".reset").onclick=function(){
    localStorage.clear();
    window.location.reload();
}
// end handle reset button

// start handle meun icon
let menue=document.querySelector(".menue");
let links=document.querySelector(".links");
menue.onclick=function(){
    this.classList.toggle("arrow")
    links.classList.toggle("open")
}
document.addEventListener("click",(e)=>{
    if(e.target!==document.querySelector(".menue i")&&e.target!==links){
        if(links.classList.contains("open")){
            menue.classList.toggle("arrow")
            links.classList.toggle("open")
        }
    }
})
links.onclick=function(e){
    e.stopPropagation()
}
// end handle meun icon
//function handling active

function handle_active(e){
    e.target.parentElement.querySelectorAll(".active").forEach(el=>{
        el.classList.remove("active")
    })
    e.target.classList.add("active")
}
