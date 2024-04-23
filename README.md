# Teste Full Stack Shopper

## Pré-requisitos

- Node >= 18.17.0
- NPM

## Começando

1. Clone o repositório para a sua máquina local.

```bash
git clone git@github.com:gialencar/teste-shopper.git
```

2. Navegue até a pasta do projeto

```bash
cd teste-shopper
```

3. Instale as dependências do projeto:
   `isso irá instalar as dependências do projeto e do backend e frontend.`

```bash
npm install
```

## Configurando o banco de dados

crie um arquivo .env na raiz do projeto backend (pasta `server`) e adicione as seguintes variáveis de ambiente:

> Você pode usar o arquivo `.env.example` para preencher

```
PORT - porta do servidor
DATABASE_HOST - host do banco de dados
DATABASE_PORT - porta do banco de dados
DATABASE_USERNAME - usuário do banco de dados
DATABASE_PASSWORD - senha do banco de dados
DATABASE_NAME - nome do banco de dados
TYPEORM_SYNC - sincronizar o banco de dados
```

## Rodando o projeto

1. inicie ambos os serviços backend e frontend:

```bash
npm run start:both
```

2. Acesse o aplicativo em [http://localhost:3001](http://localhost:3001)

## Tecnologias

Backend:

- Typecript
- NestJS
- Mysql 8
- TypeORM

Frontend:

- Typecript
- NextJS
- TailwindCSS
