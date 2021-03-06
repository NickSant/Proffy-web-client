import React, { useState, FormEvent } from "react";

import TeacherItem, { Teacher } from "../../components/TeacherItem";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Select from "../../components/Select";

import "./styles.css";
import api from "../../services/api";

function TeachersList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    
    setTeachers(response.data.classes);
    
  }


  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
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
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
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
            label="Hora"
            name="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />

          <button type="submit"> Procurar </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  );
}

export default TeachersList;
