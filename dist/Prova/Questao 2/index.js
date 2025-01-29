"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var botaoCriar = document.getElementById("btnCriar");
    var tipoCampo = document.getElementById("tipoCampo");
    var exibirMultiplos = document.getElementById("exibirMultiplos");
    var opcoesMultiplos = document.getElementById("opcoesMultiplos");
    var qtdOpcoes = document.getElementById("qtdOpcoes");
    botaoCriar === null || botaoCriar === void 0 ? void 0 : botaoCriar.addEventListener("click", () => {
        var _a, _b, _c;
        var vlTipoCampo = tipoCampo === null || tipoCampo === void 0 ? void 0 : tipoCampo.options[tipoCampo.selectedIndex].value;
        exibirMultiplos.hidden = true;
        var idCampo = (_a = document.getElementById("idCampo")) === null || _a === void 0 ? void 0 : _a.value;
        var nameCampo = (_b = document.getElementById("nameCampo")) === null || _b === void 0 ? void 0 : _b.value;
        var placeholderCampo = (_c = document.getElementById("placeholderCampo")) === null || _c === void 0 ? void 0 : _c.value;
        var valores = retiraValoresMultiplos();
        if (vlTipoCampo == "select") {
            criaSelect(opcoesMultiplos, idCampo, nameCampo, placeholderCampo, valores);
        }
        else if (vlTipoCampo == "radio" || vlTipoCampo == "checkbox") {
            criaRadioouCheckbox(vlTipoCampo, opcoesMultiplos, idCampo, nameCampo, placeholderCampo, valores);
        }
        else if (vlTipoCampo == "text" || vlTipoCampo == "number") {
            criaTextOuNumber(vlTipoCampo, opcoesMultiplos, idCampo, nameCampo, placeholderCampo);
        }
        else if (vlTipoCampo == "textarea") {
            criaTextArea(vlTipoCampo, opcoesMultiplos, idCampo, nameCampo, placeholderCampo);
        }
    });
    tipoCampo === null || tipoCampo === void 0 ? void 0 : tipoCampo.addEventListener("change", () => {
        var vlTipoCampo = tipoCampo === null || tipoCampo === void 0 ? void 0 : tipoCampo.options[tipoCampo.selectedIndex].value;
        if (vlTipoCampo == "select" || vlTipoCampo == "radio" || vlTipoCampo == "checkbox") {
            exibirMultiplos.hidden = false;
        }
        exibirMultiplos.hidden = true;
    });
    qtdOpcoes.addEventListener("change", (ev) => {
        var valor = parseInt(qtdOpcoes.value);
        limpaCampo(opcoesMultiplos);
        for (var i = 0; i < valor; i++) {
            var label = document.createElement("label");
            label.setAttribute("for", "label_" + i);
            label.textContent = `Valor do Campo ${i}`;
            var campoTexto = document.createElement("input");
            campoTexto.setAttribute('type', "text");
            campoTexto.setAttribute("id", "label_" + i);
            opcoesMultiplos.appendChild(label);
            opcoesMultiplos.appendChild(campoTexto);
        }
    });
});
var criaSelect = (campo, idCampo, nameCampo, placeholderCampo, valores) => {
    var select = document.createElement("select");
    select.setAttribute("name", nameCampo);
    select.setAttribute("id", idCampo);
    select.setAttribute("placeholder", placeholderCampo);
    valores.forEach(element => {
        var option = document.createElement("option");
        option.textContent = element;
        select.appendChild(option);
    });
    campo.appendChild(select);
};
var criaRadioouCheckbox = (tipo, campo, idCampo, nameCampo, placeholderCampo, valores) => {
    valores.forEach(element => {
        var campoRadioOuCheckbox = document.createElement("input");
        campoRadioOuCheckbox.setAttribute("name", nameCampo);
        campoRadioOuCheckbox.setAttribute("id", idCampo);
        campoRadioOuCheckbox.value = element;
        campo.appendChild(campoRadioOuCheckbox);
    });
};
var criaTextOuNumber = (tipo, campo, idCampo, nameCampo, placeholderCampo) => {
    var campoText = document.createElement("input");
    campoText.setAttribute("type", tipo);
    campoText.setAttribute("name", nameCampo);
    campoText.setAttribute("id", idCampo);
    campoText.setAttribute("placeholder", placeholderCampo);
    campo.appendChild(campoText);
};
var criaTextArea = (tipo, campo, idCampo, nameCampo, placeholderCampo) => {
    var campoText = document.createElement("textarea");
    campoText.setAttribute("name", nameCampo);
    campoText.setAttribute("id", idCampo);
    campoText.setAttribute("placeholder", placeholderCampo);
    campo.appendChild(campoText);
};
var limpaCampo = (campo) => {
    var campoInterno;
    while (campoInterno = campo === null || campo === void 0 ? void 0 : campo.firstChild) {
        campo.removeChild(campoInterno);
    }
};
var retiraValoresMultiplos = () => {
    var _a;
    var campos = document.getElementsByTagName("input");
    var retorno = [];
    for (var i = 0; i < campos.length; i++) {
        if ((_a = campos[i].getAttribute("id")) === null || _a === void 0 ? void 0 : _a.includes("label_")) {
            retorno.push(campos[i].value);
        }
    }
    return retorno;
};
