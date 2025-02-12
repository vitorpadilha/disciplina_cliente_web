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
    (_a = document.getElementById("btnFiltrar")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => __awaiter(void 0, void 0, void 0, function* () {
        ev.preventDefault();
        const nome = document.getElementById("nome").value;
        yield listarVendas(nome);
    }));
}));
function listarVendas(nome) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/vendas?nome_like=${nome}`);
            limparTabelaVendad(document.getElementById("tabelaVendasLista"));
            if (!response.ok) {
                throw new Error(`Erro ao carregar vendas: ${response.statusText}`);
            }
            const data = yield response.json();
            data.forEach((venda) => {
                console.log(venda);
                adicionaVendaTabela2(venda);
            });
        }
        catch (error) {
            console.error('Erro ao carregar vendas:', error);
        }
    });
}
function removerVenda(venda, idLinhaARemover) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield fetch('http://localhost:3000/vendas/' + venda.id, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Erro ao excluir: ${response.statusText}`);
            }
            alert("Venda excluído com sucesso!");
            (_a = document.getElementById(idLinhaARemover)) === null || _a === void 0 ? void 0 : _a.remove();
            //limparTabelaVendad(document.getElementById("tabelaVendasLista") as HTMLTableElement);
            //const nome = (document.getElementById("nome") as HTMLInputElement).value;
            //listarVendas(nome);
        }
        catch (error) {
            console.error('Erro ao excluir venda:', error);
        }
    });
}
function editarVenda(venda) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const formulario = document.getElementById("formEditar");
            const campoIdVenda = document.getElementById("idVenda");
            campoIdVenda.setAttribute("value", venda.id);
            formulario.submit();
            //limparTabelaVendad(document.getElementById("tabelaVendasLista") as HTMLTableElement);
            //listarVendas();
        }
        catch (error) {
            console.error('Erro ao buscar venda:', error);
        }
    });
}
function limparTabelaVendad(tabela) {
    tabela.querySelectorAll("tbody").forEach((corpoTabela) => {
        corpoTabela.innerHTML = "";
    });
}
function adicionaVendaTabela2(venda) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        (_a = document.getElementById("tabelaVendasLista")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("tbody").forEach((corpoTabela) => {
            var linha = document.createElement("tr");
            linha.id = "linhaTabelaVenda" + venda.id;
            var colunaNome = document.createElement("td");
            colunaNome.textContent = venda.nome;
            var colunaModelo = document.createElement("td");
            colunaModelo.textContent = venda.modelo;
            var colunaValor = document.createElement("td");
            colunaValor.textContent = venda.valorVenda;
            var colunaDataVenda = document.createElement("td");
            colunaDataVenda.textContent = new Date(venda.dataVenda).toLocaleDateString("pt-BR");
            var colunaRemover = document.createElement("td");
            var link = document.createElement("a");
            link.addEventListener('click', (ev) => { removerVenda(venda, "linhaTabelaVenda" + venda.id); });
            link.textContent = "Remover";
            link.href = "#";
            colunaRemover.appendChild(link);
            var colunaEditar = document.createElement("td");
            var linkEd = document.createElement("a");
            linkEd.addEventListener('click', (ev) => { editarVenda(venda); });
            linkEd.textContent = "Editar";
            linkEd.href = "#";
            colunaEditar.appendChild(linkEd);
            linha.appendChild(colunaNome);
            linha.appendChild(colunaModelo);
            linha.appendChild(colunaValor);
            linha.appendChild(colunaDataVenda);
            linha.appendChild(colunaRemover);
            linha.appendChild(colunaEditar);
            corpoTabela.appendChild(linha);
        });
    });
}
