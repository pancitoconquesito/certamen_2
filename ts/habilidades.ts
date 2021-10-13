let plus:any=document.getElementById("plus");
let caja_adicionar:any=document.getElementById("caja_adicionar");
let lista_habilidades:any=document.getElementById("lista_habilidades");


plus.addEventListener("click", function(event:any){

    caja_adicionar.classList.replace('d-none', 'd-block');
    event.preventDefault();
    event.stopPropagation();
});

let btn_adicionar:any=document.getElementById("btn_adicionar");
let text_adicionar:any=document.getElementById("text_adicionar");
btn_adicionar.addEventListener("click", function(event:any){

    
    if(text_adicionar.value.length>0){
        
        caja_adicionar.classList.replace( 'd-block','d-none');

        let nueva_habilidad_li:any=document.createElement("li");
        nueva_habilidad_li.className += "col-auto";
        let nueva_habilidad_p:any=document.createElement("p");
        nueva_habilidad_p.innerHTML=text_adicionar.value;
        nueva_habilidad_li.appendChild(nueva_habilidad_p);
        lista_habilidades.appendChild(nueva_habilidad_li);
        habilidades_ult.push(text_adicionar.value);
        text_adicionar.value="";
        alert("Habilidad agregada!");
    }
    
    event.preventDefault();
    event.stopPropagation();
});