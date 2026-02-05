import { useState, useEffect } from 'react';
import { Button, List, Modal, Form, Input, Typography } from 'antd';
import { api } from './services/api';
import type { Note } from './types/Note';

const { Title } = Typography;

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [open, setOpen] = useState(false);
  const [form] =Form.useForm();

  async function loadNotes(){
    const res = await api.get<Note[]>('/notes');
    setNotes(res.data);
  }

  async function createNote(values: {title: string, content: string}){
    await api.post('/notes', values);
    form.resetFields();
    setOpen(false);
    loadNotes()
  }

  async function deleteNote(id: string){
    await api.delete(`/notes/${id}`);
    loadNotes()
  }

  useEffect(() => {
    loadNotes()
  }, []);

  
  return (
    <>
  <div style={{ maxWidth: 600, margin: '40px auto' }}>
    <Title level={2}>Notes</Title>
    <Button type='primary' onClick={()=> setOpen(true)}>
      New Note
    </Button>

    <List style={{ marginTop: 24}} bordered dataSource={notes} renderItem={(note) => (
      <List.Item actions={[ <Button danger onClick={()=> deleteNote(note.id)}>Delete</Button>]}>
        <List.Item.Meta title={note.title} description={note.content}/>
      </List.Item>
    )}>
     

    </List>

    <Modal title='Create note' open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>

      <Form form={form} layout='vertical' onFinish={createNote}>
        <Form.Item name='title' label='Title' rules={[{required: true}]}> <Input/> </Form.Item>
        <Form.Item name='content' label='Content' rules={[{required: true}]}> <Input.TextArea rows={4}/> </Form.Item>
      </Form>

    </Modal>


  </div>
    </>
  )
}

export default App
