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

  function removeSchedule(index: number) {
    setScheduleItems([
      ...scheduleItems.slice(0, index),
      ...scheduleItems.slice(index + 1, scheduleItems.length)
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
      alert('Successfully registered.');

      navigate("/");
    }).catch(() => {
      alert('Error during registration!');
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
        title="It's awesome that you want to teach."
        description="
        The first step is to fill in the description form."
      />

      <main>
        <form onSubmit={handleCreateClass} >
          <fieldset>
            <legend>Your information</legend>
              <Input name="name" label="Complete Name" value={name} onChange={ (e) => { setName(e.target.value) } } />
              <Input name="avatar" label="Avatar image's URL" value={avatar} onChange={ (e) => { setAvatar(e.target.value) } } />
              <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={ (e) => { setWhatsapp(e.target.value) } } />
              <Textarea name="bio" label="Biography" value={bio} onChange={ (e) => { setbio(e.target.value) } } />
          </fieldset>

          <fieldset>
            <legend>About the class</legend>
              <Select 
                name="subject"
                label="Subject"
                value={subject}
                onChange={(e) => { setSubject(e.target.value) }}
                options={[
                  { value: 'Math', label: 'Math' },
                  { value: 'English', label: 'English' },
                  { value: 'History', label: 'History' },
                  { value: 'Cience', label: 'Cience' },
                ]}
              />
              <Input 
                name="cost" 
                label="How much do you charge per hour/class" 
                value={cost}
                onChange={(e) => { setCost(e.target.value) }}
              />
          </fieldset>

          <fieldset>
            <legend>
              Available Schedule
              <button type="button" onClick={addNewScheduleItem}>+ New time</button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
              <Select 
                name="week-day"
                label="Week day"
                value={scheduleItem.week_day}
                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                options={[
                  { value: '0', label: 'Sunday' },
                  { value: '1', label: 'Monday' },
                  { value: '2', label: 'Tuesday' },
                  { value: '3', label: 'Wednesday' },
                  { value: '4', label: 'Thursday' },
                  { value: '5', label: 'Friday' },
                  { value: '6', label: 'Saturday' },
                ]}
              />
              <Input 
                name="from" 
                label="From" 
                type="time"
                value={scheduleItem.from}
                onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
              />
              <Input 
                name="to" 
                label="To" 
                type="time"
                value={scheduleItem.to}
                onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
              />
              <div className="button-holder">
              <button className="button" type="button" onClick={() => removeSchedule(index) } >X</button>

              </div>
            </div>
              )
            })}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Warning" />
              Warning! <br/>
              Fill all the information
            </p>
            <button type="submit">Save register</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;