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
    let campoProduto = document.getElementById("produto");
    carregaProdutosRelatorio(campoProduto);
    campoProduto === null || campoProduto === void 0 ? void 0 : campoProduto.addEventListener('change', (ev2) => {
        console.log("Mudou");
        const vlVendedor = campoProduto.value;
        limparTabela(document.getElementById("tabelaVendasProduto"));
        carregaDadosTabela(vlVendedor);
        ev.preventDefault();
    });
});
function carregaProdutosRelatorio(select) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/produtos');
            if (!response.ok) {
                throw new Error(`Erro ao carregar produtos: ${response.statusText}`);
            }
            const data = yield response.json();
            data.forEach((produto) => {
                var option = document.createElement("option");
                option.value = JSON.stringify(produto);
                option.textContent = produto.nome;
                select.appendChild(option);
            });
        }
        catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    });
}
function carregaDadosTabela(produtoParam) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/vendas');
            if (!response.ok) {
                throw new Error(`Erro ao carregar produtos: ${response.statusText}`);
            }
            const data = yield response.json();
            let totalVenda = 0;
            data.filter((venda) => {
                return venda.produtos.filter((produto) => {
                    console.log(produto.idProduto);
                    console.log(produtoParam);
                    return produto.idProduto == JSON.parse(produtoParam).id;
                }).length > 0;
            }).forEach((venda) => {
                console.log(venda);
                adicionaProduto(venda, produtoParam);
                totalVenda++;
            });
            const totalCompraElement = document.getElementById("presentesEmVendas");
            if (totalCompraElement) {
                totalCompraElement.textContent = totalVenda.toString();
            }
        }
        catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    });
}
function adicionaProduto(venda, produtoParam) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        (_a = document.getElementById("tabelaVendasProduto")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("tbody").forEach((corpoTabela) => {
            var linha = document.createElement("tr");
            var produto = venda.produtos.filter((produto) => {
                return produto.idProduto == JSON.parse(produtoParam).id;
            }).pop();
            var colunaVendedor = document.createElement("td");
            colunaVendedor.textContent = venda.vendedor;
            var colunaQuantidade = document.createElement("td");
            colunaQuantidade.textContent = produto.quantidade;
            var colunaSubTotal = document.createElement("td");
            colunaSubTotal.textContent = produto.subTotal;
            var colunaDataVenda = document.createElement("td");
            colunaDataVenda.textContent = venda.dataVenda;
            linha.appendChild(colunaVendedor);
            linha.appendChild(colunaQuantidade);
            linha.appendChild(colunaSubTotal);
            linha.appendChild(colunaDataVenda);
            corpoTabela.appendChild(linha);
        });
    });
}
function limparTabela(tabela) {
    tabela.querySelectorAll("tbody").forEach((corpoTabela) => {
        corpoTabela.innerHTML = "";
    });
}
