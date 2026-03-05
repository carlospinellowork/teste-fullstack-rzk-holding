# Desafio Fullstack RZK Holding - Gestão Financeira com Dashboard BI

Este repositório contém a solução para o desafio técnico da RZK Holding. O projeto consiste em um sistema robusto de gestão de contas a pagar e a receber, com integração em tempo real para conversão de moedas e um dashboard analítico focado em Business Intelligence.

## 🏛️ Decisões de Arquitetura e Engenharia

Como desenvolvedor pleno, foquei em criar uma solução que não apenas entregasse as funcionalidades, mas que fosse **escalável**, **tipada** e **manutenível**.

### Backend (Core / API)
- **Service:** Toda a regra de negócio foi isolada em services, mantendo as controllers limpas e focadas apenas no fluxo de requisição/resposta.
- **Prisma ORM:** Escolhido pela excelente integração com TypeScript e facilidade em lidar com migrações e modelagem de dados complexos.
- **DTOs & Validação:** Implementação de validações rigorosas com **Zod**, garantindo que apenas dados íntegros entrem no banco.
- **Business Intelligence no SQL:** As agregações do dashboard são feitas de forma otimizada via consultas no banco de dados, evitando processamento desnecessário na camada de aplicação.

### Frontend
- **Componentização Avançada (DRY):** Implementei um componente de **GenericTable** que abstrai toda a lógica visual e funcional de tabelas. Através de uma configuração declarativa de colunas, consegui reaproveitar o mesmo componente para Pagar, Receber e Dashboard, mantendo a consistência visual.
- **Gerenciamento de Estado Dinâmico:** Utilização do **TanStack React Query** para cache eficiente e sincronização de dados.
- **Real-time Polling:** Implementado um mecanismo de polling (30s) para garantir que a cotação do dólar e os indicadores financeiros estejam sempre atualizados sem necessidade de refresh manual.
- **Aesthetics & UX:** Interface construída com **Tailwind CSS** e **Shadcn/UI**, focada em um visual clean, Premium e com micro-interações (Skeletons, Toasts, Tooltips).

---

## 🚀 Funcionalidades Principais

- **CRUD Completo:** Gestão completa de Contas a Pagar e Receber com filtros e paginação.
- **Ações Rápidas:** Alteração de status (Pago/Recebido) diretamente na listagem e confirmações de exclusão via dialogs.
- **Dashboard Analítico:** 
  - Gráficos de Barras (Comparativo Mensal), Pizza (Categorias) e Linha (Fluxo de Caixa).
  - 5 Indicadores principais de saúde financeira.
- **Integração ExchangeRate:** Conversão automática do saldo para USD baseada na cotação atual.

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior, como criei um nvmrc no projeto, basta rodar `nvm use`)
- Docker e Docker Compose
- Uma chave da [ExchangeRate-API](https://www.exchangerate-api.com/) (Gratuita)

### 1. Configuração do Backend

1. Entre no diretório: `cd backend`
2. Configure o arquivo `.env` baseando-se no `.env-example`:
   ```bash
   cp .env-example .env
   ```
   *Certifique-se de inserir sua `EXCHANGE_RATE_API_KEY`.*
3. Instale as dependências: `npm install`
4. Inicie o banco de dados via Docker: `docker compose up -d`
5. Execute as migrations do Prisma: `npx prisma migrate dev`
6. (Opcional) Popule o banco com dados de teste: `npm run seed`
7. Inicie o servidor: `npm run dev` (API rodará em `http://localhost:3001`)

### 2. Configuração do Frontend

1. Entre no diretório: `cd frontend`
2. Instale as dependências: `npm install`
3. Configure o `.env` (opcional, padrão é localhost:3001):
   ```bash
   cp .env.example .env.local
   ```
4. Inicie a aplicação: `npm run dev`
5. Acesse: `http://localhost:3000`

---

## Integração Externa (ExchangeRate-API)

O sistema utiliza a **ExchangeRate-API** para fornecer conversão de moeda em tempo real para o saldo projetado:

- **Camada Backend:** Criamos uma classe especializada (`ExchangeRate`) que encapsula o consumo da API externa. O backend busca a cotação atual (BRL -> USD) no momento em que o sumário do dashboard é solicitado.
- **Camada Frontend:** Os indicadores financeiros do dashboard são sincronizados automaticamente com o backend a cada **30 segundos** utilizando a estratégia de **Polling** com o *TanStack React Query*.
- **Resiliência:** O sistema está preparado para exibir os valores em BRL mesmo em caso de falha na API externa ou ausência da chave, garantindo a disponibilidade das funções core de gestão.

---

---
Desenvolvido por **Carlos Eduardo**.

