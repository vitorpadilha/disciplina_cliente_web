# disciplina_cliente_web

# Comandos básicos

# iniciar um projeto node. Deve ser executado somente uma vez, ao iniciar o projeto.

npm init

# instalar um pacote no projeto (criará o package.json).

# Deve ser executado toda vez que se deseja instalar uma biblicota nova.

npm install nome_do_pacote@versao

# Exemplo de instalação do pacote typescript.

npm install typescript

# Criar um arquivo de configuração (tsconfig.json) do TypeScript.

# Deve ser executado somente uma vez, após a instalação do pacote typescript

# Após executado a criação do arquivo, altere a propriedade "outDir" no arquivo tsconfig.json para apontar para um diretório diferente do fonte, para não misturar os arquivos. Sugiro "outDir": "./dist"

npx tsc -init

# Transcrever o código em TypeScript para JavaScript

# Deve ser toda vez que deseja executar um script escrito em TypeScript

# DEVE SER EXECUTADO NA RAIZ DO PROJETO (onde está o package.json)

npx tsc

# Executa o código na linha de comando (Terminal)

# Deve ser toda vez que deseja executar um script já transcrito pelo comando "npx tsc"

node ./dist/caminho_do_arquivo.js
