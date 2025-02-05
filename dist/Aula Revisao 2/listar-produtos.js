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
    yield listarProdutos();
}));
function listarProdutos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/produtos');
            if (!response.ok) {
                throw new Error(`Erro ao carregar produtos: ${response.statusText}`);
            }
            const data = yield response.json();
            data.forEach((produto) => {
                console.log(produto);
                adicionaProdutoTabela2(produto);
            });
        }
        catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    });
}
function removerProduto(produto, idLinhaARemover) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield fetch('http://localhost:3000/produtos/' + produto.id, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Erro ao excluir: ${response.statusText}`);
            }
            alert("Produto excluído com sucesso!");
            (_a = document.getElementById(idLinhaARemover)) === null || _a === void 0 ? void 0 : _a.remove();
            //limparTabelaProdutod(document.getElementById("tabelaProdutosLista") as HTMLTableElement);
            //listarProdutos();
        }
        catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    });
}
function editarProduto(produto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const formulario = document.getElementById("formEditar");
            const campoIdProduto = document.getElementById("idProduto");
            campoIdProduto.setAttribute("value", produto.id);
            formulario.submit();
            //limparTabelaProdutod(document.getElementById("tabelaProdutosLista") as HTMLTableElement);
            //listarProdutos();
        }
        catch (error) {
            console.error('Erro ao buscar produto:', error);
        }
    });
}
function limparTabelaProdutod(tabela) {
    tabela.querySelectorAll("tbody").forEach((corpoTabela) => {
        corpoTabela.innerHTML = "";
    });
}
function adicionaProdutoTabela2(produto) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        (_a = document.getElementById("tabelaProdutosLista")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("tbody").forEach((corpoTabela) => {
            var linha = document.createElement("tr");
            linha.id = "linhaTabelaProduto" + produto.id;
            var colunaNome = document.createElement("td");
            colunaNome.textContent = produto.nome;
            var colunaPreco = document.createElement("td");
            colunaPreco.textContent = produto.preco;
            var colunaFabricante = document.createElement("td");
            colunaFabricante.textContent = produto.fabricante;
            var colunaRemover = document.createElement("td");
            var link = document.createElement("a");
            link.addEventListener('click', (ev) => { removerProduto(produto, "linhaTabelaProduto" + produto.id); });
            link.textContent = "Remover";
            link.href = "#";
            colunaRemover.appendChild(link);
            var colunaEditar = document.createElement("td");
            var linkEd = document.createElement("a");
            linkEd.addEventListener('click', (ev) => { editarProduto(produto); });
            linkEd.textContent = "Editar";
            linkEd.href = "#";
            colunaEditar.appendChild(linkEd);
            linha.appendChild(colunaNome);
            linha.appendChild(colunaPreco);
            linha.appendChild(colunaFabricante);
            linha.appendChild(colunaRemover);
            linha.appendChild(colunaEditar);
            corpoTabela.appendChild(linha);
        });
    });
}
