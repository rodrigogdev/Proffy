import React, { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Textarea from "../../components/TextArea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";
import api from "../../services/api";

function TeacherForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setbio] = useState("");
  
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function handleCreateClass(e: FormEvent ) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso');

      navigate("/");
    }).catch(() => {
      alert('Erro no cadastro!');
    })

  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItem);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher o formulário de descrição."
      />

      <main>
        <form onSubmit={handleCreateClass} >
          <fieldset>
            <legend>Seus Dados</legend>
              <Input name="name" label="Nome Completo" value={name} onChange={ (e) => { setName(e.target.value) } } />
              <Input name="avatar" label="Avatar" value={avatar} onChange={ (e) => { setAvatar(e.target.value) } } />
              <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={ (e) => { setWhatsapp(e.target.value) } } />
              <Textarea name="bio" label="Biografia" value={bio} onChange={ (e) => { setbio(e.target.value) } } />
          </fieldset>

          <fieldset>
            <legend>Sobre a Aula</legend>
              <Select 
                name="subject"
                label="Matéria"
                value={subject}
                onChange={(e) => { setSubject(e.target.value) }}
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Biologia', label: 'Biologia' },
                  { value: 'Ciências', label: 'Ciências' },
                  { value: 'Educação Física', label: 'Educação Física' },
                  { value: 'Matemática', label: 'Matemática' },
                  { value: 'Física', label: 'Física' },
                  { value: 'Química', label: 'Química' },
                  { value: 'História', label: 'História' },
                  { value: 'Português', label: 'Português' },
                ]}
              />
              <Input 
                name="cost" 
                label="Custo da sua hora por Aula" 
                value={cost}
                onChange={(e) => { setCost(e.target.value) }}
              />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis
              <button type="button" onClick={addNewScheduleItem}>+ Novo Horário</button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
              <Select 
                name="week-day"
                label="Dia da Semana"
                value={scheduleItem.week_day}
                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                options={[
                  { value: '0', label: 'Domingo' },
                  { value: '1', label: 'Segunda-Feira' },
                  { value: '2', label: 'Terça-Feira' },
                  { value: '3', label: 'Quarta-Feira' },
                  { value: '4', label: 'Quinta-Feira' },
                  { value: '5', label: 'Sexta-Feira' },
                  { value: '6', label: 'Sábado' },
                ]}
              />
              <Input 
                name="from" 
                label="Das" 
                type="time"
                value={scheduleItem.from}
                onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
              />
              <Input 
                name="to" 
                label="Até" 
                type="time"
                value={scheduleItem.to}
                onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
              />
            </div>
              )
            })}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;