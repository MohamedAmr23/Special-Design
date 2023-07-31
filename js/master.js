//setting box
let settingBox=document.querySelector(".settings-box")
let gear=document.querySelector(".gear")

gear.addEventListener("click",function(){

    settingBox.classList.toggle("open")

    this.classList.toggle("fa-spin")

})
//////////////////////////////////////////////////////////////
document.addEventListener('click',(e)=>{
    if(e.target!=settingBox && e.target!=gear){
        if(settingBox.classList.contains("open")){
            settingBox.classList.toggle("open")
            gear.classList.toggle("fa-spin")

        }
    }
})
///////////////////////////////////////////////////////////
//check if found color option on local storage
let maincolor=localStorage.getItem("color_option")

if(maincolor!==null){
    
    document.documentElement.style.setProperty("--main-color",maincolor)

      //remove active class from all colors list item
    
         document.querySelectorAll(".colors-list li").forEach((ele)=>{

            ele.classList.remove("active")
            //add active class
            if(ele.dataset.color===maincolor){
            ele.classList.add("active")
            }
        })
}
//rondom background option
let backgroundOption=true;

//clear interval background
let backgroundClear;
//check if there is a local storage rondom backgrounds
let backgroundLocal=localStorage.getItem("background_option")
if(backgroundLocal!==null){
if(backgroundLocal==='true'){
    backgroundOption=true;
}else{
    backgroundOption=false;
}
//remove active class from all spans
document.querySelectorAll(".rondom-backgrounds span").forEach(ele=>{
ele.classList.remove("active")
})
if(backgroundLocal==='true'){
    document.querySelector(".rondom-backgrounds .yes").classList.add("active")
}else{
    document.querySelector(".rondom-backgrounds .no").classList.add("active")

}
}
 

//switch colors
const colorsli=document.querySelectorAll(".colors-list li")
//start loop
    colorsli.forEach(li=>{
    //click to setProperty
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color)
        
        //set color on local storage
        localStorage.setItem("color_option",e.target.dataset.color)

    handleActive(e);
 
    })
})

//switch rondom backgrounds options
const rondombackel=document.querySelectorAll(".rondom-backgrounds span")
//start loop on all spans
rondombackel.forEach(span=>{

    //click on every span
    span.addEventListener("click",(e)=>{
        

       handleActive(e)

        if(e.target.dataset.background==='yes'){
           backgroundOption=true;
           rondomimgs()
           localStorage.setItem("background_option",true)
        }else{
            backgroundOption=false;
            clearInterval(backgroundClear)
            localStorage.setItem("background_option",false)

        }
    })
   
})
//select landing page
let landingPage=document.querySelector(".landing-page")

//array of imgs
let imgsarray=["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"] 

//function to rondom imgs
function rondomimgs(){
   if(backgroundOption===true){
   backgroundClear= setInterval(()=>{
        //get rondom number
        let rondomNumber=Math.floor(Math.random()*imgsarray.length)
        //change background
        landingPage.style.backgroundImage='url("imgs/' +imgsarray[rondomNumber]+ '")'
        },5000)
   }
}
rondomimgs()

//select skills
let ourSkills=document.querySelector(".our-skills")

window.onscroll=function(){
    //skills offset top
let skillOffsetTop=ourSkills.offsetTop;

//skills outer height
let skillsOffsetHeight=ourSkills.offsetHeight;

//window lenght
let windowHeight=this.innerHeight;

//window scroll top
let windowTopScroll=this.scrollY;


if(windowTopScroll >(skillOffsetTop + skillsOffsetHeight - windowHeight)){
    
    let skills=document.querySelectorAll(".skill-box .skill-progress span")
    skills.forEach(skill=>{
        skill.style.width=skill.dataset.progress
    })
}
}
//gallery
let gallery=document.querySelectorAll(".gallery img")
gallery.forEach(img=>{
    img.addEventListener("click",(e)=>{
//create overlay
let overlay=document.createElement("div")
//Add class to overlay
overlay.className="pop-overlay"
//append overlay to body
document.body.appendChild(overlay)

//create pop box
let popBox=document.createElement("div")

//Add class to pop Box
popBox.className="pop-box"

if(img.alt!==null){
    //create head img
let imgHead=document.createElement("h3")

   //create text img
let imgText=document.createTextNode(img.alt)

//append text to head
imgHead.appendChild(imgText)

//append head to pop box
popBox.appendChild(imgHead)
}
//create pop img
let popImg=document.createElement("img")

//Add src to img
popImg.src=img.src

//append pop img to pop pox
popBox.appendChild(popImg)

//append pop box to body
document.body.appendChild(popBox)

//create close span
let closeSpan=document.createElement("span")

//Add class name
closeSpan.className="close-span"

//create text in it
let textSpan=document.createTextNode("X")

closeSpan.appendChild(textSpan)
popBox.appendChild(closeSpan)

    })
})
//close span
document.addEventListener('click',(e)=>{
if(e.target.className=="close-span"){

    e.target.parentNode.remove()
    
    document.querySelector(".pop-overlay").remove()
}

})
//select all bulets
 let allBulets=document.querySelectorAll(".nav-bullets .bullets")

//select all links
let allLinks=document.querySelectorAll(".links")
//function scroll smooth
function scrollsmooth(ele){

    ele.forEach(e=>{

        e.addEventListener('click',(e)=>{

        e.preventDefault()

          document.querySelector(e.target.dataset.section).scrollIntoView({

           behavior:'smooth'

           })

        })
        })


}
scrollsmooth(allLinks)
scrollsmooth(allBulets)

function handleActive(ev){
 ev.target.parentElement.querySelectorAll(".active").forEach(ele=>{
    ele.classList.remove("active")
 })

    //Add class active on target element
    ev.target.classList.add("active")
}
//select bullets spans
let bulletsSpans=document.querySelectorAll(".bull-option span")

let bulletsContainer=document.querySelector(".nav-bullets")

let localbullets=localStorage.getItem("bull-option")
if(localbullets!==null){

bulletsSpans.forEach(span=>{
span.classList.remove("active")

});

if(localbullets==='block'){
    bulletsContainer.style.display='block'
    document.querySelector(".bull-option .yes").classList.add("active")
}else{
    bulletsContainer.style.display='none'
    document.querySelector(".bull-option .no").classList.add("active")

}
}

bulletsSpans.forEach(span=>{

span.addEventListener('click',(e)=>{

if(span.dataset.display ==="show"){

    bulletsContainer.style.display="block"

   localStorage.setItem("bull-option","block")
}else{
    bulletsContainer.style.display="none"

  localStorage.setItem("bull-option","none")

}

handleActive(e)

})
})
//default settings
document.querySelector(".reset-option").onclick=function(){

    localStorage.clear()

    window.location.reload()
}
//toggle menu
let toggleBtn=document.querySelector(".toggle-menu")
let Tlinks=document.querySelector(".links")
toggleBtn.onclick=function(e){
e.stopPropagation()
    this.classList.toggle("menu-active")

    Tlinks.classList.toggle("opend")

}
//touch anywhere on screen to end togglemenu
document.addEventListener('click',function(e){
if(e.target!=toggleBtn && e.target!=Tlinks){

        if(Tlinks.classList.contains("opend")){
            toggleBtn.classList.toggle("menu-active")

            Tlinks.classList.toggle("opend")

        }
}
})

//stop propagation on menu
Tlinks.addEventListener('click',function(e){
    e.stopPropagation()
})