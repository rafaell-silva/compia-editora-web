# COMPIA Editora - E-commerce (Headless WordPress + Next.js)

## 1. Apresentação
A **COMPIA Editora** é uma iniciativa voltada para a publicação e disseminação de conteúdos de alta qualidade na área de Inteligência Artificial. Seu propósito é oferecer livros, revistas e materiais digitais que auxiliem tanto estudantes quanto profissionais a aprofundarem seus conhecimentos em temas como arquitetura de software inteligente, inteligência artificial, blockchain, criptografia e cibersegurança. 

A editora se destaca por unir rigor técnico com uma linguagem acessível, tornando-se uma ponte entre o mundo acadêmico e o mercado de trabalho. Com foco em inovação e excelência editorial, a COMPIA se consolida como parceira estratégica para instituições de ensino, pesquisadores e profissionais da área de TI.

## 2. Objetivo e Estratégia
**Objetivo:** Desenvolver uma plataforma de e-commerce robusta, de forma que seja de fácil gerenciamento por pessoas sem conhecimento técnico avançado, aceite múltiplos métodos de pagamento (PIX e Cartões) e ofereça logística de distribuição híbrida (livros físicos e digitais).

**Motivação:** Superar a barreira logística e permitir a venda virtual de todos os itens produzidos pela editora para um público interessado nas áreas de Tecnologia e Inteligência Artificial.

**Estratégia Arquitetural:** 
Para alcançar um desenvolvimento rápido (1 mês), moderno e fácil de gerenciar, a plataforma utiliza a arquitetura **Headless**. 
O projeto é dividido em:
- **Frontend (Este Repositório):** Construído com React (Next.js) visando alta performance e hospedagem otimizada na **Vercel**.
- **Backend (Gerenciador):** A ser hospedado separadamente usando **WordPress + WooCommerce** (PHP/MySQL), entregando facilidade gerencial máxima para a equipe da editora através de um painel amigável.

---

## 3. Estado Atual do Repositório (Frontend)
A interface visual estática e de comportamento (UX/UI) já foi estruturada baseada em boas práticas de programação:
- **Next.js 16 (App Router)** com React 19.
- **CSS Vanilla (Puro)** estruturado utilizando a rigorosa metodologia **BEM** (Block Element Modifier), garantindo total separação entre lógica HTML/JS e estilos, sem uso de *frameworks* de CSS.
- **React Context API** para o gerenciamento de estado global (Carrinho, Pedidos, Autenticação).
- **GitHub Actions (CI/CD)** implementado para builds, lint, testes e security audit.
- **Jest + Testing Library** para testes unitários.

### Funcionalidades Front-end Concluídas

#### Gestão de Catálogo de Produtos
- [x] **Catálogo e Vitrine:** Filtro dinâmico por categorias e exibição criativa de produtos através de "Capas de Livros 3D" desenvolvidas 100% via CSS nativo.
- [x] **Dados de Produtos:** 11 produtos mockados com descrições completas, preços, estoque, formato (físico/e-book/kit), tags e ISBN.
- [x] **Página de Detalhes do Produto:** Rota `/produto/[id]` com informações detalhadas, descrição, metadados e botão de adicionar ao carrinho.
- [x] **Wishlist:** Funcionalidade de lista de desejos.
- [x] **Sistema de Busca:** Busca por título, autor, categoria ou tags.
- [x] **Autores:** Dados de autores com biografia e listagem de livros.

#### Carrinho e Finalização de Compra
- [x] **Carrinho de Compras Global:** Adição e remoção de itens em tempo real, subtotal dinâmico, *Toast notifications* e badge reativo no header.
- [x] **Persistência do Carrinho:** Salvamento automático dos itens e frete selecionado no `localStorage`.
- [x] **Calculadora de Frete:** Formulário de CEP com 3 opções simuladas (Correios PAC, Sedex, Retirada na Loja).
- [x] **Frete Integrado:** Valor do frete selecionado é levado para o checkout corretamente.
- [x] **Checkout com Validação:** Validação em tempo real de todos os campos (nome, email, telefone, CEP, endereço, cartão).

#### Pagamentos
- [x] **Múltiplos Métodos:** Seleção entre Cartão de Crédito e PIX.
- [x] **Cartão de Crédito:** Formulário completo com detecção automática de bandeira (Visa, MasterCard, Elo, Amex, Discover).
- [x] **PIX com QR Code:** QR Code visual, chave aleatória gerada dinamicamente e botão **Copiar funcional** com feedback visual.
- [x] **Validação de Pagamento:** Campos do cartão validados (número, nome, validade MM/AA, CVV).

#### Gestão de Pedidos e Clientes
- [x] **Sistema de Pedidos:** Criação, armazenamento e consulta de pedidos via `localStorage`.
- [x] **Área do Cliente:** Página `/pedidos` com histórico de compras e status de cada pedido.
- [x] **Fluxo de Pedido:** Do checkout ao sucesso, com ID do pedido gerado automaticamente.
- [x] **Detalhes do Pedido:** Itens, total, método de pagamento e timeline de status.

#### Autenticação e Segurança
- [x] **Sistema de Login/Registro:** Página `/login` com formulário de autenticação mockado.
- [x] **Perfis de Usuário:** Suporte a roles (admin, customer).
- [x] **Área Administrativa:** Página `/admin` com gerenciamento de pedidos e visualização de produtos.
- [x] **Controle de Acesso:** Rotas protegidas por autenticação e perfil.

#### Distribuição dos Itens
- [x] **Opção de Retirada:** "Retirada na Loja" como opção de frete gratuita.
- [x] **Informações de Entrega:** Prazo estimado exibido no carrinho e no detalhe do produto.

#### Facilidade de Gerência
- [x] **Painel Administrativo:** Página `/admin` com abas de Pedidos e Produtos.
- [x] **Gerenciamento de Pedidos:** Alteração de status com timeline (Pendente → Confirmado → Preparando → Enviado → Entregue).
- [x] **Visualização de Produtos:** Tabela completa com estoque, preço, categoria e formato.

#### UX/UI e Performance
- [x] **Loading Skeletons:** Componentes de carregamento visual (Skeleton, SkeletonCard, SkeletonText).
- [x] **Página 404 Customizada:** Página de erro amigável com design da marca.
- [x] **Páginas Estáticas:** `/sobre` (história e valores) e `/faq` (perguntas frequentes com accordion).
- [x] **Design Responsivo:** Layout adaptativo em 768px e 900px.

#### Testes e Qualidade
- [x] **Testes Unitários:** 22 testes com Jest + Testing Library (API, CartContext, OrderContext, AuthContext).
- [x] **Lint:** ESLint configurado com regras do Next.js.
- [x] **Security Audit:** npm audit no pipeline CI/CD.

---

## 4. Rotas Disponíveis

| Rota | Descrição | Autenticação |
|------|-----------|--------------|
| `/` | Catálogo principal | Não |
| `/sobre` | Sobre a editora | Não |
| `/faq` | Perguntas frequentes | Não |
| `/contato` | Formulário de contato | Não |
| `/produto/[id]` | Detalhes do produto | Não |
| `/carrinho` | Carrinho de compras | Não |
| `/checkout` | Finalização da compra | Não |
| `/wishlist` | Lista de desejos | Não |
| `/login` | Login / Registro | Não |
| `/pedidos` | Histórico de pedidos | Sim |
| `/admin` | Painel administrativo | Sim (admin) |

---

## 5. Roadmap (Próximos Passos e Integrações)

### A. Integração com Backend (WooCommerce)
- [ ] **Configuração do Servidor CMS:** Levantar um servidor (PHP 8+, MySQL/MariaDB, HTTPS) com WordPress e WooCommerce instalado.
- [ ] **Conexão API REST:** Substituir os arquivos *mockados* no frontend (`services/api.js`) por requisições autênticas para a API REST do WooCommerce.
- [ ] **Autenticação Real:** Integrar JWT ou session-based auth com WordPress.
- [ ] **Segurança e Níveis de Acesso:** Configurar no WordPress os perfis (Admin, Editor, Vendedor) e logs de atividade.

### B. Módulos de Terceiros e Logística
- [ ] **Gateway de Pagamento Real:** Integrar Stripe, Mercado Pago ou PagSeguro para processamento real de cartões e geração de QR Code PIX.
- [ ] **Cálculo de Frete Real:** Conectar API dos Correios ou transportadoras privadas.
- [ ] **E-mails Transacionais:** Integração com SendGrid, Mailgun ou SES para confirmação, envio e rastreio.
- [ ] **Entrega de E-books:** Link de download seguro ou área restrita para produtos digitais.

---

## 6. Como rodar o projeto localmente

### Pré-requisitos
- Node.js 20+
- npm

### Instalação
```bash
# Clonar o repositório
git clone https://github.com/rafaell-silva/compia-editora-web.git
cd compia-editora-web

# Instalar dependências
npm install
```

### Comandos Disponíveis
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar em produção
npm start

# Rodar lint
npm run lint

# Corrigir lint automaticamente
npm run lint:fix

# Rodar testes
npm test

# Rodar testes em watch mode
npm run test:watch

# Rodar testes com cobertura
npm run test:coverage
```

### Acessos Demo (Login)
- **Admin:** admin@comperia.com.br / admin123

---

## 7. Estrutura do Projeto

```
src/
├── app/                    # Rotas (App Router)
│   ├── page.js            # Página inicial (Catálogo)
│   ├── layout.js          # Layout raiz
│   ├── globals.css        # Estilos globais
│   ├── not-found.js       # Página 404
│   ├── carrinho/          # Carrinho de compras
│   ├── checkout/          # Finalização da compra
│   ├── login/             # Login / Registro
│   ├── pedidos/           # Histórico de pedidos
│   ├── admin/             # Painel administrativo
│   ├── sobre/             # Sobre a editora
│   ├── faq/               # Perguntas frequentes
│   └── produto/[id]/      # Detalhes do produto
├── components/            # Componentes reutilizáveis
│   ├── Cart/              # Carrinho
│   ├── Catalog/           # Catálogo
│   ├── Checkout/          # Checkout
│   ├── FAQ/               # FAQ accordion
│   ├── Footer/            # Rodapé
│   ├── Header/            # Cabeçalho
│   ├── ProductList/       # Lista de produtos
│   └── Skeleton/          # Loading skeletons
├── context/               # React Context API
│   ├── AuthContext.jsx    # Autenticação mockada
│   ├── CartContext.jsx    # Estado do carrinho
│   └── OrderContext.jsx   # Sistema de pedidos
├── services/              # Serviços de dados
│   └── api.js             # Mock de dados (pronto para WooCommerce)
└── __tests__/             # Testes unitários
    ├── api.test.js
    ├── AuthContext.test.jsx
    ├── CartContext.test.jsx
    └── OrderContext.test.jsx
```

---

## 8. Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16.2.12 | Framework React |
| React | 19.2.4 | Biblioteca UI |
| CSS (BEM) | - | Estilização |
| Jest | 30.x | Testes unitários |
| Testing Library | 16.x | Testes de componentes |
| ESLint | 9.x | Análise de código |
| GitHub Actions | - | CI/CD |
