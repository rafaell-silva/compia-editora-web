import './sobre.css';

export const metadata = {
  title: 'Sobre | COMPIA Editora',
  description: 'Conheça a história e a missão da COMPIA Editora.',
};

export default function Sobre() {
  return (
    <div className="sobre">
      <section className="sobre__hero">
        <h1>Sobre a COMPIA Editora</h1>
        <p className="sobre__tagline">Conectando o conhecimento ao futuro da tecnologia</p>
      </section>

      <section className="sobre__content">
        <div className="sobre__section">
          <h2>Nossa História</h2>
          <p>
            A COMPIA Editora nasceu da paixão por tecnologia e educação. Fundada por profissionais
            da área de TI, nosso objetivo sempre foi tornar o conhecimento em Inteligência Artificial,
            Engenharia de Software e Cibersegurança acessível a todos.
          </p>
        </div>

        <div className="sobre__section">
          <h2>Nossa Missão</h2>
          <p>
            Publicar e disseminar conteúdos de alta qualidade na área de Tecnologia e Inteligência
            Artificial. Oferecemos livros, revistas e materiais digitais que auxiliam tanto estudantes
            quanto profissionais a aprofundarem seus conhecimentos.
          </p>
        </div>

        <div className="sobre__section">
          <h2>Nossos Valores</h2>
          <div className="sobre__values">
            <div className="sobre__value">
              <h3>Excelência</h3>
              <p>Rigor técnico com linguagem acessível em todas as nossas publicações.</p>
            </div>
            <div className="sobre__value">
              <h3>Inovação</h3>
              <p>Conteúdo atualizado que acompanha as tendências do mercado.</p>
            </div>
            <div className="sobre__value">
              <h3>Acessibilidade</h3>
              <p>Preparando material para todos os níveis de conhecimento.</p>
            </div>
          </div>
        </div>

        <div className="sobre__section">
          <h2>Equipe</h2>
          <p>
            Nossa equipe é composta por profissionais experientes nas áreas de:
          </p>
          <ul className="sobre__list">
            <li>Inteligência Artificial e Machine Learning</li>
            <li>Engenharia de Software</li>
            <li>Cibersegurança e Criptografia</li>
            <li>Blockchain e Web3</li>
            <li>Computação em Nuvem</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
