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
document.addEventListener('DOMContentLoaded', (ev) => {
    var _a;
    (_a = document.getElementById("btnCadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        var form = new FormData(document.getElementById("formCadastro"));
        const campoId = document.getElementById("idProduto");
        if (validaCampos(form)) {
            if (campoId.value != "") {
                cadastrarEditarProduto(form, "editar");
            }
            else {
                cadastrarEditarProduto(form, "cadastrar");
            }
        }
        ev.preventDefault();
    }));
    if (window.location.search != "" && window.location.search.includes("idProduto=")) {
        console.log("Editar produto");
        const idProduto = window.location.search.split("=")[1];
        console.log(idProduto);
        recuperaDadosProduto(idProduto);
    }
});
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
function cadastrarEditarProduto(produto, op) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = 'http://localhost:3000/produtos' + (op == "cadastrar" ? '' : '/' + produto.get("id"));
            const response = yield fetch(url, {
                method: op == "cadastrar" ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(produto)),
            });
            if (!response.ok) {
                throw new Error(`Erro ao cadastrar produto: ${response.statusText}`);
            }
            const data = yield response.json();
            //setTimeout(()=>{}, 2000);
            console.log("Dentro da funcao async");
            alert('Produto cadastrado com sucesso');
        }
        catch (error) {
            console.error('Erro ao cadastrar produto:', error);
        }
    });
}
function recuperaDadosProduto(idProduto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/produtos/' + idProduto, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Erro ao excluir: ${response.statusText}`);
            }
            const dadosProduto = yield response.json();
            carregaDadosEditarNoFormulario(dadosProduto);
            //limparTabelaProdutod(document.getElementById("tabelaProdutosLista") as HTMLTableElement);
            //listarProdutos();
        }
        catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    });
}
function carregaDadosEditarNoFormulario(produto) {
    var form = document.getElementById("formCadastro");
    console.log(produto);
    form.querySelectorAll("input").forEach((input) => {
        input.setAttribute("value", produto[input.name]);
    });
    form.querySelectorAll("select").forEach((select) => {
        select.setAttribute("value", produto[select.name]);
        marcaSelect(select, produto[select.name]);
    });
}
function marcaSelect(campo, valor) {
    campo.querySelectorAll("option").forEach((opcao) => {
        if (opcao.value == valor) {
            opcao.setAttribute("selected", "selected");
        }
    });
}
