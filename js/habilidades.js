"use strict";
var plus = document.getElementById("plus");
var caja_adicionar = document.getElementById("caja_adicionar");
var lista_habilidades = document.getElementById("lista_habilidades");
plus.addEventListener("click", function (event) {
    caja_adicionar.classList.replace('d-none', 'd-block');
    event.preventDefault();
    event.stopPropagation();
});
var btn_adicionar = document.getElementById("btn_adicionar");
var text_adicionar = document.getElementById("text_adicionar");
btn_adicionar.addEventListener("click", function (event) {
    if (text_adicionar.value.length > 0) {
        caja_adicionar.classList.replace('d-block', 'd-none');
        var nueva_habilidad_li = document.createElement("li");
        nueva_habilidad_li.className += "col-auto";
        var nueva_habilidad_p = document.createElement("p");
        nueva_habilidad_p.innerHTML = text_adicionar.value;
        nueva_habilidad_li.appendChild(nueva_habilidad_p);
        lista_habilidades.appendChild(nueva_habilidad_li);
        habilidades_ult.push(text_adicionar.value);
        text_adicionar.value = "";
        alert("Habilidad agregada!");
    }
    event.preventDefault();
    event.stopPropagation();
});
