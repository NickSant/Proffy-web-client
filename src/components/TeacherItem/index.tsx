import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import "./styles.css";

function TeacherItem(){
    return(
        <article className="teacher-item">
          <header>
            <img
              src="https://avatars0.githubusercontent.com/u/60119543?s=460&u=09214c01e7ab88ecf78eeefcaa8bc6cfc63a3386&v=4"
              alt="Nicolas Almeida"
            />
            <div>
              <strong>Nicolas Almeida</strong>
              <span> Matemática</span>
            </div>
          </header>

          <p>
              Entusiasta das melhores formas de cálculo avançado
              <br /><br />
              Apaixonado por fazer contas e cálculos complexos, visando sempre o aprendizado e a curiosidade. O mundo é feito de números!
          </p>

          <footer>
              <p>
                  Preço/hora
                  <strong> R$ 40,00 </strong>
              </p>
              <button>
                  <img src={whatsappIcon} alt="Whatsapp"/>
                  Entrar em contato
              </button>
          </footer>
        </article>
    )
}

export default TeacherItem;