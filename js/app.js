"use strict";
var btn_crear = document.getElementById("btn_crear");
btn_crear.addEventListener("click", function (event) {
    if (validaciones() == true) {
        console.log("OK");
        guardarCliente();
        crearCliente();
        refreshComuna();
        alert("Cliente agregado exitosamente");
        event.preventDefault();
        event.stopPropagation();
    }
    else {
        alert("Complete todos los campos");
    }
});
var nombre = document.getElementById("nombre");
var edad = document.getElementById("edad");
var g_hombre = document.getElementById("g_hombre");
var g_mujer = document.getElementById("g_mujer");
var fecha_nacimiento = document.getElementById("fecha_nacimiento");
var direccion = document.getElementById("direccion");
var telefono = document.getElementById("telefono");
var observaciones = document.getElementById("observaciones");
function validaciones() {
    var countOK = 0;
    if (nombre.value.length > 0)
        countOK++;
    if (edad.value.length > 0)
        countOK++; //debe ser numero
    if (g_hombre.checked || g_mujer.checked)
        countOK++;
    if (fecha_nacimiento.value.length > 0)
        countOK++;
    if (region.value != 0 && comuna.value != 0)
        countOK++;
    if (direccion.value.length > 0)
        countOK++;
    if (telefono.value.length > 0)
        countOK++; //debe ser numero
    if (observaciones.value.length > 20)
        countOK++;
    if (countOK == 8)
        return true;
    else
        return false;
}
var region = document.getElementById("region");
region === null || region === void 0 ? void 0 : region.addEventListener("change", refreshComuna);
var comuna = document.getElementById("comuna");
function quitarOpcionesComuna() {
    while (comuna.firstChild) {
        comuna.removeChild(comuna.firstChild);
    }
    ;
}
function agregarOpcionesComuna(lista) {
    var fragmento = document.createDocumentFragment();
    for (var i = 0; i < lista.length; i++) {
        var opcion_actual = document.createElement("option");
        opcion_actual.innerHTML = lista[i];
        opcion_actual.value = i;
        fragmento.appendChild(opcion_actual);
    }
    //agregarlos al DOM
    comuna.appendChild(fragmento);
}
function refreshComuna() {
    // eliminar opciones 
    quitarOpcionesComuna();
    var lista_opciones = ['-- Selecciona una Comuna --'];
    switch (region.value) {
        case "0": // vacio
            break;
        case "1": // magallanes
            quitarOpcionesComuna();
            lista_opciones.push('Natales', 'Torres del Paine', 'Laguna Blanca', 'San Gregorio', 'R??o Verde', 'Punta Arenas', 'Primavera', 'Porvenir', 'Timaukel', 'Cabo de Hornos', 'Ant??rtica');
            break;
        case "2": { // Atacama
            lista_opciones.push('Cha??aral', 'Diego de Almagro', 'Caldera', 'Copiap??', 'Tierra Amarilla', 'Alto del Carmen', 'Freirina', 'Huasco', 'Vallenar');
            break;
        }
    }
    agregarOpcionesComuna(lista_opciones);
}
var btn_reset = document.getElementById("btn_reset");
btn_reset.addEventListener("click", function (event) {
    while (lista_habilidades.firstChild) {
        lista_habilidades.removeChild(lista_habilidades.firstChild);
    }
    ;
    btn_reset.type = "reset";
});
var lista_clientes = document.getElementById("lista_clientes");
var Cliente = /** @class */ (function () {
    function Cliente(p_nombre, p_edad, p_genero, p_fechaNacimiento, p_region, p_comuna, p_direccion, p_telefono, p_observaciones, p_habilidasdes) {
        this.a_nombre = p_nombre;
        this.a_edad = p_edad;
        this.a_genero = p_genero;
        this.a_fechaNacimiento = p_fechaNacimiento;
        this.a_region = p_region;
        this.a_comuna = p_comuna;
        this.a_direccion = p_direccion;
        this.a_telefono = p_telefono;
        this.a_observaciones = p_observaciones;
        this.a_habilidasdes = p_habilidasdes;
    }
    return Cliente;
}());
var lista_clientes_OBJ = [];
var habilidades_ult = [];
function guardarCliente() {
    var _va_genero;
    if (g_mujer.checked)
        _va_genero = 'Mujer';
    else
        _va_genero = 'Hombre';
    var nuevoClienteActual = new Cliente(nombre.value, edad.value, _va_genero, fecha_nacimiento.value, region.options[region.value].text, comuna.options[comuna.value].text, direccion.value, telefono.value, observaciones.value, habilidades_ult);
    // console.log(nuevoClienteActual);
    lista_clientes_OBJ.push(nuevoClienteActual);
    // console.log(lista_clientes_OBJ.length);
    habilidades_ult = [];
}
var indice_registro = 0;
// podria obtener todo desde el array de lista_clientes, pero hacerlo directo es mas rapido
function crearCliente() {
    var _div = document.createElement("div");
    _div.className += "col-12 py-2";
    _div.className += "ELIM";
    _div.className += indice_registro;
    var _ul = document.createElement("ul");
    _ul.className += "row list-unstyled";
    // genero
    var _genero = document.createElement("li");
    _genero.className += "text-center col-1";
    var icono_genero = document.createElement("span");
    icono_genero.className += "material-icons-outlined";
    if (g_mujer.checked)
        icono_genero.innerHTML = "female";
    else
        icono_genero.innerHTML = "male";
    _genero.appendChild(icono_genero);
    //id
    var _id = document.createElement("li");
    _id.className += "text-center col-1";
    _id.innerHTML = edad.value;
    //nombre//
    var _nombre = document.createElement("li");
    _nombre.className += "text-center col-2";
    _nombre.innerHTML = nombre.value;
    //region//
    var _region = document.createElement("li");
    _region.className += "text-center col-2";
    _region.innerHTML = region.options[region.value].text;
    //comuna//
    var _comuna = document.createElement("li");
    _comuna.className += "text-center col-2";
    _comuna.innerHTML = comuna.options[comuna.value].text;
    //habilidad
    var _habilidades = document.createElement("li");
    _habilidades.className += "text-center col-3 ul_lista_habilidades";
    var _hab_ul = document.createElement("ul");
    _hab_ul.className += "row list-unstyled";
    var cantidadHabilidades = lista_clientes_OBJ[lista_clientes_OBJ.length - 1].a_habilidasdes.length;
    for (var i = 0; i < cantidadHabilidades; i++) {
        var li_actual_hab = document.createElement("li");
        li_actual_hab.className += "col-auto m-2 p-2";
        li_actual_hab.innerHTML = lista_clientes_OBJ[lista_clientes_OBJ.length - 1].a_habilidasdes[i];
        _hab_ul.appendChild(li_actual_hab);
    }
    _habilidades.appendChild(_hab_ul);
    //eliminar
    var _eliminar = document.createElement("li");
    _eliminar.className += "text-center col-1";
    var _elim_btn = document.createElement("button");
    _elim_btn.id = indice_registro;
    _elim_btn.addEventListener("click", function (event) {
        //bsucar elemento
        var elemDelete = document.getElementsByClassName(event.target.id);
        console.log(elemDelete[0]);
        lista_clientes.removeChild(elemDelete[0]);
        //eliminar
    });
    var _elim_span = document.createElement("span");
    _elim_span.className += "material-icons-outlined";
    _elim_span.innerHTML = "delete";
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
    indice_registro++;
    lista_clientes.appendChild(_div);
}
