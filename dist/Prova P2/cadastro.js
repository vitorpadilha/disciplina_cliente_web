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
    var _a, _b, _c;
    yield carregaMarcas();
    (_a = document.getElementById("marca")) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        carregaModelos(document.getElementById("marca").value);
    }));
    (_b = document.getElementById("modelo")) === null || _b === void 0 ? void 0 : _b.addEventListener('change', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        carregaCoresEValor(document.getElementById("modelo").value);
    }));
    if (window.location.search != "" && window.location.search.includes("idVenda=")) {
        const idVenda = window.location.search.split("=")[1].split("&")[0];
        yield recuperaDadosVenda(idVenda);
        const campoId = document.getElementById("idVenda");
        if (campoId.value != "") {
            document.getElementById("btnCadastrar").textContent = "Alterar Venda";
        }
    }
    (_c = document.getElementById("btnCadastrar")) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        ev.preventDefault();
        var form = new FormData(document.getElementById("formCadastro"));
        const campoId = document.getElementById("idVenda");
        if (validaCamposForm(form)) {
            if (campoId.value != "") {
                cadastrarEditarVenda(form, "editar");
            }
            else {
                cadastrarEditarVenda(form, "cadastrar");
            }
        }
    }));
}));
function carregaMarcas() {
    return __awaiter(this, void 0, void 0, function* () {
        let marcas = [];
        try {
            const response = yield fetch('http://localhost:3000/modelosCarros/', {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Erro ao excluir: ${response.statusText}`);
            }
            const modelosCarros = yield response.json();
            modelosCarros.forEach((modelo) => {
                if (!marcas.includes(modelo.marca)) {
                    marcas.push(modelo.marca);
                }
            });
        }
        catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
        const campo = document.getElementById("marca");
        limpaSelect(campo);
        marcas.forEach((marca) => {
            let option = document.createElement("option");
            option.value = marca;
            option.text = marca;
            campo.appendChild(option);
        });
    });
}
function carregaModelos(marca) {
    return __awaiter(this, void 0, void 0, function* () {
        if (marca == "") {
            return;
        }
        try {
            const response = yield fetch('http://localhost:3000/modelosCarros/?marca=' + marca, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Erro ao excluir: ${response.statusText}`);
            }
            const modelosCarros = yield response.json();
            const campo = document.getElementById("modelo");
            limpaSelect(campo);
            modelosCarros.forEach((modelo) => {
                let option = document.createElement("option");
                option.value = modelo.modelo;
                option.text = modelo.modelo;
                campo.appendChild(option);
            });
        }
        catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    });
}
function limpaSelect(campo) {
    campo.querySelectorAll("option").forEach((opcao) => {
        if (opcao.value != "") {
            campo.removeChild(opcao);
        }
    });
}
const formataMoeda = (valor) => {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};
function carregaCoresEValor(modelo) {
    return __awaiter(this, void 0, void 0, function* () {
        if (modelo == "") {
            return;
        }
        try {
            const response = yield fetch('http://localhost:3000/modelosCarros/?modelo=' + modelo, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Erro ao excluir: ${response.statusText}`);
            }
            const modelosCarros = yield response.json();
            const campo = document.getElementById("cor");
            limpaSelect(campo);
            modelosCarros.forEach((modelo) => {
                const campoValor = document.getElementById("valor");
                campoValor.value = formataMoeda(modelo.valor);
                const campoValorVenda = document.getElementById("valorVenda");
                campoValorVenda.value = formataMoeda(modelo.valor);
                modelo.cores_disponiveis.forEach((cor) => {
                    let option = document.createElement("option");
                    option.value = cor;
                    option.text = cor;
                    campo.appendChild(option);
                });
            });
        }
        catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    });
}
function validaCamposForm(form) {
    let campos = ["nome", "marca", "modelo", "cor"];
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
function cadastrarEditarVenda(venda, op) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            venda.set("dataVenda", new Date().toISOString());
            venda.set("valorVenda", document.getElementById("valor").value);
            console.log(venda.get("valorVenda"));
            if (venda.has("id") && venda.get("id") == "") {
                venda.delete("id");
            }
            const url = 'http://localhost:3000/vendas' + (op == "cadastrar" ? '' : '/' + venda.get("id"));
            const response = yield fetch(url, {
                method: op == "cadastrar" ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(venda)),
            });
            if (!response.ok) {
                throw new Error(`Erro ao cadastrar venda: ${response.statusText}`);
            }
            const data = yield response.json();
            op == "cadastrar" ? alert('Venda cadastrada com sucesso') : alert('Venda alterada com sucesso');
        }
        catch (error) {
            console.error('Erro ao cadastrar venda:', error);
        }
    });
}
function recuperaDadosVenda(idVenda) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(idVenda);
            const response = yield fetch(`http://localhost:3000/vendas/${idVenda}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Erro ao excluir: ${response.statusText}`);
            }
            const dadosVenda = yield response.json();
            yield carregaModelos(dadosVenda.marca);
            yield carregaCoresEValor(dadosVenda.modelo);
            carregaDadosEditarNoForm(dadosVenda);
        }
        catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    });
}
function carregaDadosEditarNoForm(produto) {
    var form = document.getElementById("formCadastro");
    form.querySelectorAll("input").forEach((input) => {
        console.log(input.name + " - " + produto[input.name]);
        input.setAttribute("value", produto[input.name]);
        if (input.name == "valor") {
            input.setAttribute("value", formataMoeda(produto["valorVenda"]));
        }
    });
    form.querySelectorAll("select").forEach((select) => {
        marcaSelectCampo(select, produto[select.name]);
    });
}
function marcaSelectCampo(campo, valor) {
    campo.querySelectorAll("option").forEach((opcao) => {
        if (opcao.value == valor) {
            opcao.setAttribute("selected", "selected");
        }
    });
}
