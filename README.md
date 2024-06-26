# Documentação da API
Esta API foi desenvolvida para armazenar e gerenciar eventos de dispositivos IoT. Abaixo você encontrará instruções para configurar e iniciar o ambiente de teste da API.

# Pré-requisitos
Antes de iniciar, certifique-se de que você tem o Node.js instalado em seu sistema. Você pode baixar o Node.js aqui.

# Instalação
Para configurar a API no seu ambiente local, siga estas etapas:

Clone o repositório para a sua máquina local usando o seguinte comando:


git clone [URL_DO_REPOSITORIO]
Navegue até o diretório do projeto:


cd [NOME_DO_DIRETORIO]
Instale todas as dependências necessárias usando o npm (Node Package Manager):


npm install
Executando a API em Modo de Teste
Para executar a API em modo de teste, que configura o ambiente com dados e configurações específicas para testes, utilize o seguinte comando:


npm run start:testing
Este comando inicializa o servidor e configura a API para operar em um ambiente de teste, facilitando a verificação e o desenvolvimento de novas funcionalidades.

# Testando a API
Após iniciar a API em modo de teste, você pode utilizar ferramentas como Postman ou diretamente através de localhost:3000/swagger para fazer requisições HTTP aos endpoints definidos e testar as diversas funcionalidades da API.
