import { getTodoList, addNewTodo, deleteTodo } from '../../api/requests'
import { useLoaderData, Form, redirect, } from 'react-router-dom';
import { Space, Table, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useRef, useState } from 'react'

import "./index.css"

export type todoItemT = {
  "_id"?: string,
  "user": string,
  "content": string,
  "start-time": string,
  "finish-before": string,
  "priority": number,
  "status": number
}

enum priorityEnum {
  "Very High"=5,
  "High"=4,
  "Medium"=3,
  "Low"=2,
  "Very Low"=1
}

enum statusEnum {
  "Pending" = 0,
  "In Progress",
  "Finished"
}

interface todoListInterface {
  status: number,
  data: todoItemT[],
}

interface LoaderData {
  todoList: todoListInterface;
}

export async function loader({ params }:any ) {
  const todoList = await getTodoList(params.user);
  return { todoList };
}

export async function action({ request, params } : any) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const newTodo:todoItemT = {
    user: params.user,
    content: updates["content"],
    'start-time': updates["start-time"],
    'finish-before': updates["finish-before"],
    priority: parseInt(updates["priority"]),
    status: parseInt(updates["status"])
  }
  await addNewTodo(newTodo);
  return redirect(`/${params.user}/todolist/`);
}

export async function todoDelete({ params }:any ) {
  deleteTodo(params.id, params.user)
  return redirect(`/${params.user}/todolist/`);
}

const columns: ColumnsType<todoItemT> = [
  {
    title: 'content',
    dataIndex: 'content',
    key: 'content',
    render: (text:string) => <p>{text.substring(0,1).toUpperCase() + text.substring(1)}</p>,
  },
  {
    title: 'start-time',
    dataIndex: 'start-time',
    key: 'start-time',
    render: (st) => <p>{st?st:"--"}</p>,
  },
  {
    title: 'finish-before',
    dataIndex: 'finish-before',
    key: 'finish-before',
    render: (fb) => <p>{fb?fb:"--"}</p>,
  },
  {
    title: 'Tags',
    key: 'tags',
    render: (_, { priority, status }) => (
      <>
        <Tag color={'green'} key={priority}>{priorityEnum[priority]}</Tag>
        <Tag color={'geekblue'} key={status}>{statusEnum[status]}</Tag>
        
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, {_id}) => (
      <Space size="middle">
        <Form
          method="delete"
          action={`delete/${_id}`}
          onSubmit={(event) => {
            if (
              !window.confirm("Please confirm you want to delete this record.")
            ) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className='ant-btn ant-btn-link'>Delete</button>
        </Form>
      </Space>
    ),
  },
];

export default function ToDoList(){
  const [showForm, setShowForm] = useState<boolean>(false)
  const { todoList } = useLoaderData() as LoaderData;
  const myForm = useRef<HTMLFormElement>(null)
  return (
    <div>
      <div className='table-wrapper'>
        <Table columns={columns} dataSource={todoList.data} rowKey={(record)=>record._id?record._id:0}/>
        
      </div>
      <Button type="primary" onClick={()=>{
          if(!showForm)setShowForm(true)
        }}>Add New Todo</Button>

      {showForm&&(<div className='form-wrapper'>
        <Form method="post" ref={myForm} action="add">
          <div className='todo-group'>
            <label className='ant-label todo-label'>Content</label>
            <input className="ant-input todo-input" name="content" id="content" required></input>
          </div>
          <div className='todo-group'>
            <label className='ant-label todo-label'>Start Time</label>
            <input className="ant-input todo-input" name="start-time" id="start-time" required></input>
          </div>
          <div className='todo-group'>
            <label className='ant-label todo-label'>Finish Before</label>
            <input className="ant-input todo-input" name="finish-before" id="finish-before" required></input>
          </div>
          <div className='todo-group-2'>
            <div className='todo-group'>
              <label className='ant-label todo-label'>priority</label>
              <select id="priority" name='priority' className='todo-input' defaultValue={3}>
                <option value={1}>Very High</option>
                <option value={2}>High</option>
                <option value={3}>Medium</option>
                <option value={4}>Low</option>
                <option value={5}>Very Low</option>
              </select>
            </div>
            <div className='todo-group'>
              <label className='ant-label todo-label'>status</label>
              <select name="status" id="status" className='todo-input' defaultValue={0}>
                <option value={0}>Pending</option>
                <option value={1}>In Progress</option>
                <option value={2} disabled>Finished</option>
              </select>
            </div>
          </div>
          <div>
            <button type='submit' className="ant-btn ant-btn-primary todo-submit">Create</button>
            <button type='submit' className="ant-btn" onClick={()=>{
              if(showForm)setShowForm(false)
            }}>Close</button>
          </div>
        </Form>

      </div>)}
    </div>
    
  )
}

