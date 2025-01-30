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
    document.getElementById("oculta").style.display = "none";
    yield carregaProdutos(document.getElementById("produto"));
    (_a = document.getElementById("vendedor")) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (ev2) => {
        const vlVendedor = document.getElementById("vendedor").value;
        if (vlVendedor != "") {
            document.getElementById("oculta").style.display = "block";
        }
        else {
            document.getElementById("oculta").style.display = "none";
        }
        ev.preventDefault();
    });
    (_b = document.getElementById("addProduto")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (ev2) => {
        ev2.preventDefault();
        var form = new FormData(document.getElementById("formVenda"));
        adicionaProdutoTabela(form);
    });
    (_c = document.getElementById("finalizarCompra")) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (ev2) => {
        ev2.preventDefault();
        var form = new FormData(document.getElementById("formVenda"));
        finalizarCompras(form);
    });
}));
function finalizarCompras(dados) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var corpo = { vendedor: dados.get("vendedor"), produtos: produtosComprados, dataVenda: new Date() };
            const response = yield fetch('http://localhost:3000/vendas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(corpo),
            });
            if (!response.ok) {
                throw new Error(`Erro ao finalizar venda: ${response.statusText}`);
            }
            alert("Venda finalizada com sucesso!");
        }
        catch (error) {
            console.error('Erro ao finalizar venda:', error);
        }
    });
}
function carregaProdutos(select) {
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
let produtosComprados = [];
let varTotal = 0;
function adicionaProdutoTabela(dados) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        (_a = document.getElementById("tabelaProdutos")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("tbody").forEach((corpoTabela) => {
            var _a, _b, _c, _d;
            var linha = document.createElement("tr");
            var obj = JSON.parse((_b = (_a = dados.get("produto")) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "");
            var colunaNome = document.createElement("td");
            colunaNome.textContent = obj.nome;
            var quantidade = parseFloat((_d = (_c = dados.get("quantidade")) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "0");
            var colunaQuantidade = document.createElement("td");
            colunaQuantidade.textContent = quantidade.toString().replace(".", ",");
            var valorProduto = obj.preco;
            var colunaValor = document.createElement("td");
            colunaValor.textContent = "R$" + parseFloat(valorProduto).toFixed(2).replace(".", ",");
            var colunaSubTotal = document.createElement("td");
            colunaSubTotal.textContent = "R$" + (valorProduto * quantidade).toFixed(2).replace(".", ",");
            varTotal += (valorProduto * quantidade);
            linha.appendChild(colunaNome);
            linha.appendChild(colunaQuantidade);
            linha.appendChild(colunaValor);
            linha.appendChild(colunaSubTotal);
            corpoTabela.appendChild(linha);
            produtosComprados.push({ idProduto: obj.id, subTotal: (valorProduto * quantidade).toFixed(2), quantidade: quantidade });
            const totalCompraElement = document.getElementById("totalCompra");
            if (totalCompraElement) {
                totalCompraElement.textContent = "R$" + varTotal.toFixed(2).replace(".", ",");
            }
        });
    });
}
