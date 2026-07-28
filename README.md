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
- **Next.js (App Router)**.
- **CSS Vanilla (Puro)** estruturado utilizando a rigorosa metodologia **BEM** (Block Element Modifier), garantindo total separação entre lógica HTML/JS e estilos, sem uso de *frameworks* de CSS.
- **React Context API** para o gerenciamento de estado global (Carrinho).
- **GitHub Actions (CI/CD)** implementado para *builds* de deploy automatizados.

### Funcionalidades Front-end Concluídas
- [x] **Catálogo e Vitrine:** Filtro dinâmico por categorias e exibição criativa de produtos através de "Capas de Livros 3D" desenvolvidas 100% via CSS nativo, sem dependência de imagens locais.
- [x] **Carrinho de Compras Global:** Adição e remoção de itens em tempo real, subtotal dinâmico, *Toast notifications* de feedback e badge reativo no topo da página.
- [x] **Calculadora de Frete (Visual):** Formulário de CEP que simula as tarifas das transportadoras no carrinho.
- [x] **Página de Checkout (Finalização):** Fluxo isolado para inserção de dados pessoais, endereço e duas abas de pagamento (Cartão de Crédito e PIX — com a renderização de um QR Code gerado visualmente).
- [x] **Persistência do Carrinho:** Salvamento automático dos itens no `localStorage` para persistência entre sessões.
- [x] **Página 404 Customizada:** Página de erro amigável com design alinhado à identidade visual da marca.
- [x] **Validação de Formulários:** Validação em tempo real dos campos do Checkout (email, CEP, telefone, cartão de crédito) com mensagens de erro claras.
- [x] **Página de Detalhes do Produto:** Rota `/produto/[id]` com informações detalhadas do livro, capa 3D e botão de adicionar ao carrinho.
- [x] **Loading Skeletons:** Componentes de carregamento visual (Skeleton, SkeletonCard, SkeletonText) para melhorar a UX durante requisições.
- [x] **Páginas Estáticas:** Páginas `/sobre` (história, missão e valores da editora) e `/faq` (perguntas frequentes com accordion interativo).

---

## 4. Roadmap (Próximos Passos e Integrações)
A base visual está consolidada. O roadmap a seguir lista os requisitos ainda pendentes baseados no escopo inicial do projeto. Eles dependem da instanciação do backend (WordPress) e conexão de chaves (APIs).

### A. Integração com Backend (WooCommerce)
- [ ] **Configuração do Servidor CMS:** Levantar um servidor (PHP 8+, MySQL/MariaDB, HTTPS) com WordPress e WooCommerce instalado.
- [ ] **Conexão API REST:** Substituir os arquivos *mockados* no frontend (`services/api.js`) por requisições autênticas para a API REST do WooCommerce (usando as variáveis `WC_CONSUMER_KEY`).
- [ ] **Autenticação de Clientes:** Habilitar área do cliente para *login*, registro e visualização do histórico de pedidos.
- [ ] **Segurança e Níveis de Acesso:** Configurar no painel do WordPress os perfis exigidos (Admin, Editor, Vendedor) e os devidos logs de atividade.

### B. Módulos de Terceiros e Logística
- [ ] **Gateway de Pagamento Real:** Substituir a validação simulada de Checkout para comunicar-se com um Gateway (Mercado Pago, PagSeguro, Stripe, etc), habilitando o aceite real de cartões (Visa, MasterCard, Elo) e geração verídica de QR Code/Chave PIX Aleatória.
- [ ] **Cálculo de Frete Real:** Conectar o componente de cálculo de CEP na API dos Correios ou transportadoras privadas, atualizando as modalidades na tela.
- [ ] **Fluxo de Distribuição:**
  - Integrar disparos automáticos de e-mail transacional (confirmação, envio, rastreio).
  - Desenvolver a lógica e linkagem segura (área restrita) para a entrega automática de produtos digitais (e-books).

### C. Melhorias de Frontend (Extra)
- [ ] **Páginas de Autores:** Listagem e perfil dos autores da editora.
- [ ] **Sistema de Busca:** Campo de busca para encontrar produtos por título, autor ou categoria.
- [ ] **Wishlist:** Funcionalidade de lista de desejos para salvar produtos.
- [ ] **Testes Unitários:** Configurar Jest + testes para components e services.
- [ ] **SEO Avançado:** Sitemap dinâmico, Open Graph tags, structured data (JSON-LD).
- [ ] **Página de Contato:** Formulário de contato com validação e envio.

---

## 5. Como rodar o projeto localmente

Para visualizar a interface atual e o simulador do e-commerce rodando em sua máquina:

1. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`
2. Inicie o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   \`\`\`
3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
