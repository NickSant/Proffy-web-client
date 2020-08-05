import React, { useState, FormEvent } from "react";
import { useHistory } from 'react-router-dom';

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";
import api from "../../services/api";

function TeacherForm() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: "",
      to: "",
    },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function createClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number( cost ),
      schedule: scheduleItems,
    }).then(() => {
      history.push('/');
      alert('Cadastro Realizado com sucesso!!')
    }).catch((err) => {
      console.log(err);
      alert('erro no cadastro');
    })
  }

  return (
    <div id="page-teacher-form">
      <PageHeader
        title="Que incrível que você quer dar aulas!"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={createClass}>
          <fieldset>
            <legend> Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend> Sobre a aula </legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              options={[
                {
                  value: "Artes",
                  label: "Artes",
                },
                {
                  value: "Biologia",
                  label: "Biologia",
                },
                {
                  value: "Ciências",
                  label: "Ciências",
                },
                {
                  value: "Educação Física",
                  label: "Educação Física",
                },
                {
                  value: "Física",
                  label: "Física",
                },
                {
                  value: "Filosofia",
                  label: "Filosofia",
                },
                {
                  value: "Sociologia",
                  label: "Sociologia",
                },
                {
                  value: "História",
                  label: "História",
                },
                {
                  value: "Geografia",
                  label: "Geografia",
                },
                {
                  value: "Matemática",
                  label: "Matamática",
                },
                {
                  value: "Português",
                  label: "Português",
                },
                {
                  value: "Inglês",
                  label: "Inglês",
                },
                {
                  value: "Química",
                  label: "Química",
                },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis{" "}
              <button onClick={addNewScheduleItem} type="button">
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
                    options={[
                      {
                        value: "0",
                        label: "Domingo",
                      },
                      {
                        value: "1",
                        label: "Segunda-feira",
                      },
                      {
                        value: "2",
                        label: "Terça Feira",
                      },
                      {
                        value: "3 ",
                        label: "Quarta-feira",
                      },
                      {
                        value: "4",
                        label: "Quinta-feira",
                      },
                      {
                        value: "5",
                        label: "Sexta-feira",
                      },
                      {
                        value: "6",
                        label: "Sábado",
                      },
                    ]}
                  />
                  <Input
                    type="time"
                    name="from"
                    label="Das"
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    type="time"
                    name="to"
                    label="Até"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Atenção" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
