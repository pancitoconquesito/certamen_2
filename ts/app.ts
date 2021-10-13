let btn_crear:any=document.getElementById("btn_crear");
btn_crear.addEventListener("click", function(event:any){
    // validaciones
    // if ok agregado 
    
    if(validaciones()==true){
        console.log("OK");
        guardarCliente();
        crearCliente();
        // reset
        event.preventDefault();
        event.stopPropagation();
    }else{
        // btn_crear.type="submit";
        console.log("NO OK");
    }
    
});

    let nombre:any=document.getElementById("nombre");
    let edad:any=document.getElementById("edad");
    let g_hombre:any=document.getElementById("g_hombre");
    let g_mujer:any=document.getElementById("g_mujer");
    let fecha_nacimiento:any=document.getElementById("fecha_nacimiento");
    // let region:any=document.getElementById("region");
    // let comuna:any=document.getElementById("comuna");
    let direccion:any=document.getElementById("direccion");
    let telefono:any=document.getElementById("telefono");
    let observaciones:any=document.getElementById("observaciones");
function validaciones():boolean{
    let countOK:number=0;
    if(nombre.value.length>0)countOK++;//ok
    if(edad.value.length>0)countOK++;//debe ser numero//ok
    if(g_hombre.checked || g_mujer.checked)countOK++;
    if(fecha_nacimiento.value.length>0)countOK++;
    if(region.value!=0 && comuna.value!=0)countOK++;
    if(direccion.value.length>0)countOK++;//ok
    if(telefono.value.length>0)countOK++;//debe ser numero//ok
    if(observaciones.value.length>20)countOK++;//ok

    console.log(countOK);
    
    if(countOK==8)  return true;
    else return false;
}
let region:any=document.getElementById("region");
region?.addEventListener("change", refreshComuna);


let comuna:any=document.getElementById("comuna");

function quitarOpcionesComuna():void{
    while (comuna.firstChild){
        comuna.removeChild(comuna.firstChild);
    };
}

function agregarOpcionesComuna(lista:string[]):void{
    let fragmento:any=document.createDocumentFragment();
    for(let i=0;i<lista.length;i++){
        let opcion_actual:any=document.createElement("option");
        opcion_actual.innerHTML = lista[i];
        opcion_actual.value=i;
        fragmento.appendChild(opcion_actual);
    }
    //agregarlos al DOM
    comuna.appendChild(fragmento);
}

function refreshComuna():void {
    // eliminar opciones 
    quitarOpcionesComuna();
    let lista_opciones:string[]=['-- Selecciona una Comuna --'];
    switch (region.value) {
        case "0":// vacio
            break;
        case "1": // magallanes
        quitarOpcionesComuna();
            lista_opciones.push('Natales','Torres del Paine','Laguna Blanca','San Gregorio','Río Verde','Punta Arenas','Primavera','Porvenir','Timaukel','Cabo de Hornos','Antártica');
            break;
        case "2":{ // Atacama
            lista_opciones.push('Chañaral','Diego de Almagro','Caldera','Copiapó','Tierra Amarilla','Alto del Carmen','Freirina','Huasco','Vallenar');
            break;
        }
    }
    agregarOpcionesComuna(lista_opciones); 
}

let btn_reset:any=document.getElementById("btn_reset");
btn_reset.addEventListener("click", function(event:any){
    while (lista_habilidades.firstChild){
        lista_habilidades.removeChild(lista_habilidades.firstChild);
    };
    btn_reset.type="reset";
});

let lista_clientes:any=document.getElementById("lista_clientes");


class Cliente {
    a_nombre:string;
    a_edad:number;
    a_genero:string;
    a_fechaNacimiento:string;
    a_region:string;
    a_comuna:string;
    a_direccion:string;
    a_telefono:number;
    a_observaciones:string;
    a_habilidasdes:string[];
    constructor(
        p_nombre:string,
        p_edad:number,
        p_genero:string,
        p_fechaNacimiento:string,
        p_region:string,
        p_comuna:string,
        p_direccion:string,
        p_telefono:number,
        p_observaciones:string,
        p_habilidasdes:string[]) {
            this.a_nombre=p_nombre;
            this.a_edad=p_edad;
            this.a_genero=p_genero;
            this.a_fechaNacimiento=p_fechaNacimiento;
            this.a_region=p_region;
            this.a_comuna=p_comuna;
            this.a_direccion=p_direccion;
            this.a_telefono=p_telefono;
            this.a_observaciones=p_observaciones;
            this.a_habilidasdes=p_habilidasdes;
     }
}
let lista_clientes_OBJ:Cliente[]=[];
let habilidades_ult:string[]=[];

function guardarCliente():void{
    let _va_genero:string;
    if(g_mujer.checked)_va_genero='Mujer';
    else _va_genero='Hombre';
    let nuevoClienteActual:Cliente = new Cliente(
        nombre.value,
        edad.value,
        _va_genero,
        fecha_nacimiento.value,
        region.options[region.value].text,
        comuna.options[comuna.value].text,
        direccion.value,
        telefono.value,
        observaciones.value,
        habilidades_ult);
    // console.log(nuevoClienteActual);
    lista_clientes_OBJ.push(nuevoClienteActual);
    // console.log(lista_clientes_OBJ.length);
    habilidades_ult=[];
}
let indice_registro:number=0;
// podria obtener todo desde el array de lista_clientes, pero hacerlo directo es mas rapido
function crearCliente():void{
    let _div:any=document.createElement("div");
    _div.className += "col-12 py-2";
    _div.className += indice_registro+'a';
    let _ul:any=document.createElement("ul");
    _ul.className += "row list-unstyled";
    // genero
    let _genero:any=document.createElement("li");
    _genero.className += "text-center col-1";
    let icono_genero=document.createElement("span");
    icono_genero.className += "material-icons-outlined";
    if(g_mujer.checked)icono_genero.innerHTML="female";
    else icono_genero.innerHTML="male";
    _genero.appendChild(icono_genero);
    //id
    let _id:any=document.createElement("li");
    _id.className += "text-center col-1";
    _id.innerHTML=edad.value;
    //nombre//
    let _nombre:any=document.createElement("li");
    _nombre.className += "text-center col-2";
    _nombre.innerHTML=nombre.value;
    //region//
    let _region:any=document.createElement("li");
    _region.className += "text-center col-2";
    _region.innerHTML=region.options[region.value].text;
    //comuna//
    let _comuna:any=document.createElement("li");
    _comuna.className += "text-center col-2";
    _comuna.innerHTML=comuna.options[comuna.value].text;
    //habilidad
    let _habilidades:any=document.createElement("li");
    _habilidades.className += "text-center col-3";
    let _hab_ul:any=document.createElement("ul");
    _hab_ul.className+="row list-unstyled";
    let cantidadHabilidades:number=lista_clientes_OBJ[lista_clientes_OBJ.length-1].a_habilidasdes.length;
    for(let i=0;i<cantidadHabilidades;i++){
        let li_actual_hab:any=document.createElement("li");
        li_actual_hab.className+="col-auto m-2 p-2";
        li_actual_hab.innerHTML=lista_clientes_OBJ[lista_clientes_OBJ.length-1].a_habilidasdes[i];
        _hab_ul.appendChild(li_actual_hab);
    }
    _habilidades.appendChild(_hab_ul);
    //eliminar
    let _eliminar:any=document.createElement("li");
    _eliminar.className += "text-center col-1";
    let _elim_btn:any=document.createElement("button");
    _elim_btn.id=indice_registro+'a';
    _elim_btn.addEventListener("click", function(event:any){
        //bsucar elemento
        let elemDelete:any=document.getElementById(event.target.id+'a');
        //eliminar
    });
    let _elim_span:any=document.createElement("span");
    _elim_span.className += "material-icons-outlined";
    _elim_span.innerHTML="delete";
    _elim_btn.appendChild(_elim_span);
    _eliminar.appendChild(_elim_btn);
    
    _ul.appendChild(_genero);
    _ul.appendChild(_id);
    _ul.appendChild(_nombre);
    _ul.appendChild(_region);
    _ul.appendChild(_comuna);
    _ul.appendChild(_habilidades);
    _ul.appendChild(_eliminar);
    _div.appendChild(_ul);

    lista_clientes.appendChild(_div);
}

