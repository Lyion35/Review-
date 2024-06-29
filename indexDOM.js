const c= console.log
w=window
//!!!!!!!!!!!!!!!!!!!!!!!!!menu de hamburguesa!!!!!!!!!!!!!!!!!!!!!!!!!!//
function hamburgerMenu(panelBtn,panel,menuLink){

    document.addEventListener("click",e=>{
    if(e.target.matches(panelBtn)||e.target.matches(`${panelBtn} *`)){
        document.querySelector(panel).classList.toggle("is-active")
        
    }
    if(e.target.matches(menuLink)){
        document.querySelector(panel).classList.remove("is-active")
    }
})
}
document.addEventListener("DOMContentLoaded",e=>{
    hamburgerMenu(".panel-btn",".panel",".menu a")
    reloj("#Reloj_y_Alarma","#Activar-R","#Desactivar-R")
    alarma( "assets/ATS.mp3","#Activar-A","#Desactivar-A")
    temporizador("CountDown","Feb 17,2025 12:00:00","Happy Anniversary Honey")
    arriba(".scroll")
    responsiveMedia("youtube","(min-width: 1024px)","Contenido Móvil","Contenido Escritorio")
    responsiveMedia("pic","(min-width: 1024px)","Contenido Móvil","Contenido Escritorio")
    responsiveTester("responsiveTester")
    UserDeviceInfo("UserDevice")
    GetGeo("geolocation")
    draw("#winner",".player","ganador")
    scrollSpy()
})
CambiarModo(".ModeToggler","oscuro")
networkStatus()
 //Funciones de Reloj Digital//

function reloj(clock,btnPlay,btnStop){
document.addEventListener("click",e=>{
    if(e.target.matches(btnPlay)){
       clockTempo= setInterval(() => {
            let clockHour=new Date().toLocaleTimeString()
            document.querySelector(clock).textContent=`${clockHour}`
        }, 1000);
        e.target.disabled=true
       
    }
    if(e.target.matches(btnStop)){
        clearInterval(clockTempo)
        document.querySelector(clock).innerHTML=null
        document.querySelector(btnPlay).disabled=false
    }
   
})

}
 //Funciones de Alarma Sonora//
 
 
 function alarma(alarm,btnPlay,btnStop){
    const sound=document.createElement("audio")
    let alarmTempo
    sound.src=alarm
    sound.volume=0.2
    document.addEventListener("click",e=>{
        if(e.target.matches(btnPlay)){
             alarmTempo= setTimeout(() => {
                sound.play()
            }, 2000);
           e.target.disabled=true
        }
        if(e.target.matches(btnStop)){
            document.querySelector(btnPlay).disabled=false
            clearTimeout(alarmTempo)
            sound.pause()
            sound.currentTime=0
        }
    })
 }
 

 //////////////Eventos del teclado///////////////
 let x=0
    y=0
function teclado(e,stage,ball){
const $stage=document.querySelector(stage)
$ball=document.querySelector(ball)
lball=$ball.getBoundingClientRect()
lstage=$stage.getBoundingClientRect()


switch (e.keyCode) {
    case 37:
        if(lball.left>lstage.left){
            e.preventDefault()
            x--
        }
        break;
    case 38:
        if(lball.top>lstage.top){
            e.preventDefault()
            y--
        }
        break;
    case 39:
        if(lball.right<lstage.right){
            e.preventDefault()
            x++
        }
        break;
    case 40:
        if(lball.bottom<lstage.bottom){
            e.preventDefault()
            y++
        }
        break;

    default:
        break;
        
}
$ball.style.transform=`translate(${x*50}px, ${y*50}px)`
}
document.addEventListener("keydown",e=>{
    teclado(e,".stage",".ball")
   if(e.keyCode===67)console.clear()
  
})

/////////////////Cuenta Regresiva de un año//////////////////


function temporizador(id,Ld,finalMess) {
    const CountDown=document.getElementById(id)
    
   let CountDownTempo=setInterval(() => {
    const timeBack=new Date().getTime()
    CountDownDate=new Date(Ld).getTime()
    let time=CountDownDate-timeBack,
    days =Math.floor(time/(1000*60*60*24)),
    hours=Math.floor(time%(1000*60*60*24)/(1000*60*60)) ,
    minutes=Math.floor(time%(1000*60*60)/(1000*60)),
    seconds=Math.floor(time%(1000*60)/(1000));
    CountDown.textContent=`Faltan ${days} días,${hours} horas,${minutes} minutos y ${seconds} segundos`
    if(time<0){
        CountDownTempo.clearInterval()
        CountDown.textContent=`${finalMess}`
    }
   }, 1000);
  
}
////////////////////Scroll up/////////////////////
function arriba(scroll) {
    const $scroll=document.querySelector(scroll)
    
     window.addEventListener("scroll",e=>{
        distancia=document.documentElement.scrollTop
        if(distancia>1000){
            $scroll.classList.remove("hidden")
         }  else{
            $scroll.classList.add("hidden")
         }
       $scroll.addEventListener("click",e=>{
        document.documentElement.scrollTo("0","0")
       })
     })
 
}
/////////////////Modos Claro y Oscuro//////////////////
function CambiarModo(boton,clase) {
    const $boton=document.querySelector(boton)
    LS=localStorage
    $selector=document.querySelectorAll("[data-dark]")
    let sun="L",moon="D"
    const Dark=()=>{
        $selector.forEach(el=>{
        el.classList.add(clase)
        $boton.textContent=sun   
    })}
    Light=()=>{
        $selector.forEach(el => {
            el.classList.remove(clase)
            $boton.textContent=moon
           });
    }
    $boton.addEventListener("click",e=>{
        if($boton.textContent===sun){
          Light()
          LS.setItem("theme","light")
         
        }
        else{
            Dark()
            LS.setItem("theme","dark")
        }
    })
    document.addEventListener("DOMContentLoaded",e=>{
        if(LS.getItem("theme")===null)LS.setItem("theme","Light")
        if(LS.getItem("theme")==="light")Light()
        if(LS.getItem("theme")==="dark")Dark()
    }
    )
} 

function responsiveMedia(id,mq,MobCont,DeskCont){
    let breakpoint=w.matchMedia(mq)
    const responsive=(e)=>{
        if(e.matches){
            document.getElementById(id).innerHTML=DeskCont
        } else{
            document.getElementById(id).innerHTML=MobCont
        }
        
    }
    breakpoint.addListener(responsive)
    responsive(breakpoint)
}
function responsiveTester(form) {
    let $form =document.getElementById(form)
    let tester
    document.addEventListener("submit",e=>{
        if(e.target===$form){
            e.preventDefault()
            alert("Formulario enviado")
           
        }
    })
    document.addEventListener("click",e=>{
        if(e.target===$form.cerrar){
            tester.close()
        }
    })
}
function UserDeviceInfo(id) {
    let n=navigator,
    ua=n.userAgent
   const $id = document.getElementById(id)
   isMob={
    android:()=>ua.match(/android/i),
    ios:()=>ua.match(/ios/|/pad/|/ipod/i),
    windows:()=>ua.match(/windows phone/i),
    any:function (){
        return this.android()||this.ios()||this.windows();
    }
   },
   isDesk={
    windows:()=>ua.match(/windows nt/i),
    linux:()=>ua.match(/linux/i),
    mac:()=>ua.match(/mac os/i),
    any:function(){
        return this.windows()||this.linux()||this.mac();
    }
   },
   isBrowser={
    chrome:()=>ua.match(/chrome/i),
    firefox:()=>ua.match(/firefox/i),
    edge:()=>ua.match(/edge/i),
    safari:()=>ua.match(/safari/i),
    ie:()=>ua.match(/msie|iemobile/i),
    opera:()=>ua.match(/opera|opera mini/i),
    any:function(){
        return this.chrome() || this.safari() || this.opera()
 ||this.ie() || this.edge() || thisfirefox();
    }
   };
    $id.innerHTML=
    `<ul>
        <li>User Agent: <b>${ua}</b></li>
        <li>Plataforma: <b>${isMob.any()? isMob.any(): isDesk.any()}</b></li>
    </ul>` 
     console.log(isDesk.any())
}
function networkStatus(){
    const isOnline=()=>{
        const $div=document.createElement("div")
        
        
        if(navigator.onLine){
            $div.textContent="Conexión reestablecida"
            $div.classList.add("online")
            $div.classList.remove("offline")
        }else{
            $div.textContent="Conexión Perdida"
            $div.classList.add("offline")
            $div.classList.remove("online")
        }
        document.body.insertAdjacentElement("afterbegin",$div)
        setTimeout(() => {
            document.body.removeChild($div)
        }, 2000);
    }
    window.addEventListener("online",(e)=>isOnline())
    window.addEventListener("offline",(e)=>isOnline())
}
function GetGeo(id){
    const $id=document.getElementById(id),
        options={
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0
        };
    const success=position=>{
        console.log(position)
    }
    const error=err=>{
        console.log(err)
    }
    navigator.geolocation.getCurrentPosition(success,error,options)
}
  
function draw(btn,selector,id) {
    const getWinner=(selector)=>{
        const $players = document.querySelectorAll(selector),
        random = Math.floor(Math.random() * $players.length),
        winner = $players[random]
        

        return `El ganador es: ${winner.textContent}`
    }

    document.addEventListener("click",e=>{
        if(e.target.matches(btn)){
            let result=getWinner(selector)
          const $id= document.getElementById(id)
          $id.textContent=result
           
        }
    })
}
function scrollSpy() {
    
}




   
