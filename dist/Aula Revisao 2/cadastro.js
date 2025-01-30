"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', (ev) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    (_a = document.getElementById("btnCadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
        var form = new FormData(document.getElementById("formCadastro"));
        if (validaCampos(form)) {
            console.log("Antes await");
            cadastrarProduto(form);
            console.log("Depois do depois await");
        }
        ev.preventDefault();
    });
}));
function validaCampos(form) {
    let campos = ["nome", "preco", "fabricante", "tipoUnidade"];
    let valido = true;
    let informacoes = "";
    campos.forEach((campo) => {
        var _a;
        if (!form.has(campo) || ((_a = form.get(campo)) === null || _a === void 0 ? void 0 : _a.toString().trim()) == "") {
            valido = false;
            informacoes += `Campo ${campo} não foi preenchido\n`;
        }
    });
    if (informacoes != "") {
        alert(informacoes);
    }
    return valido;
}
function cadastrarProduto(produto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(produto)),
            });
            if (!response.ok) {
                throw new Error(`Erro ao cadastrar produto: ${response.statusText}`);
            }
            const data = yield response.json();
            setTimeout(() => { }, 2000);
            console.log("Dentro da funcao async");
            console.log('Produto cadastrado com sucesso:', data);
        }
        catch (error) {
            console.error('Erro ao cadastrar produto:', error);
        }
    });
}
