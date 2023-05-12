import React, { SyntheticEvent, useState, useRef} from 'react'
import { redirect, useLoaderData, Form, Link, useSubmit, useParams } from 'react-router-dom';
import { Button, Segmented, Col, Row, SegmentedProps } from 'antd'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Space, Table, Tag, Dropdown, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import "./index.css"
import MyCard, {cardProps} from '../card'
import { getApplications, createApplications } from '../../api/requests';
import {cardStEnum} from "../status"

export async function loader({params}:any){
    const applications = await getApplications(params.user)
    return { applications }
}

export async function action({params, request}:any){
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const newApp:applicationsInterface["data"] = [{
        card: {
            isrc: (data as formData).image,
            title: (data as formData).name,
            company: (data as formData).company,
            avatar: (data as formData).avatar,
            status: 0,
        },
        infos: "",
        user: params.user
    }]
    const returnStatus = await createApplications(params.user, newApp[0])
    console.log(returnStatus);
    return redirect(`/applications/${params.user}`);
}

interface formData {
    image: string,
    name: string,
    company: string,
    avatar: string,
}

interface cardData {
    "_id"?: string,
    "card": cardProps,
    "infos": string,
    "user": string
}

interface applicationsInterface {
    status: number,
    data: cardData[],
  }
  
interface LoaderData {
applications: applicationsInterface;
}

enum tableTagColor {
    "gray",
    "blue",
    "red",
    "green"
}

export default function CardGrid() {
  const [showForm, setShowForm] = useState(false)
  const [layout, setlayout] = useState("Kanban")
  const [refresh, setrefresh] = useState(false)
  const { user } = useParams();
  const submit = useSubmit()
  const { applications } = useLoaderData() as LoaderData
  const [appList, setappList] = useState(applications)
  const handleChange = (value: string)=>{
    if(value==="All"){
        setappList(applications)
    }else{
        setappList({
            status:  applications["status"],
            data: applications["data"].filter(v=>{
                return cardStEnum[v.card.status] === value
            })
        })
    }
    
  }
  const formWrapperRef = useRef<HTMLDivElement>(null)
  const stateChangeHandler = (target:HTMLElement, _id:string)=>{
    let formData = new FormData();
    const selectedSt = target.innerHTML as keyof typeof cardStEnum
    const newState = cardStEnum[selectedSt].toString()
    formData.append("newState", newState)
    formData.append("_id", _id as string)
    submit(formData, {
        action: `/applications/${user}/stateupdate/`,
        method: "post",
    })
}
  const switchChangeHandler = (value:SegmentedProps["defaultValue"])=>{
    console.log(value);
    if(value === "List"){
        setlayout("List")
    }else{
        setlayout("Kanban")
    }
  }
  const columns: ColumnsType<cardData> = [
    {
      title: 'Job titel',
      dataIndex: 'card',
      key: 'Job',
      render: (card:cardProps) => <p>{card.title.substring(0,1).toUpperCase() + card.title.substring(1)}</p>,
    },
    {
      title: 'Company',
      dataIndex: 'card',
      key: 'Company',
      render: (card:cardProps) => <p>{card.company}</p>,
    },
    {
        title: 'State',
        key: 'tags',
        render: (_, { card, _id }) => (
        <>
            <Tag color={tableTagColor[card.status]} key={_id}>{cardStEnum[card.status]}</Tag>
        </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, {_id, card}) => {
            const cardStArray = ["Preparing",
                "Progressing",
                "Rejected",
                "Passed"].filter((v,i)=>i!=card.status)

            const items: MenuProps['items'] = cardStArray.map((v,i)=>{
                let key:string = (i + 1).toString()
                return (
                {
                key: key,
                label: (
                <div onClick={ (e:SyntheticEvent) => stateChangeHandler(e.target as HTMLElement, _id as string) }>
                {v}
                </div>
                ),
                }
                )
            }) 
            return (
          <Space size="middle">
            <Link to={`/applications/Lawi/details/${_id}`}>
                    <EditOutlined style={{fontSize:20, color:"grey"}} />
            </Link>
            <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                <SettingOutlined style={{fontSize:20, color:"grey"}}/>
            </Dropdown>
          </Space>
        )},
      },
  ];
  return (
    <div>
        <div className='new-app-wrapper'>
            <div className="function-wrapper">
                <Segmented
                    defaultValue={ 'Kanban' }
                    options={[
                    {
                        value: 'Kanban',
                        icon: <AppstoreOutlined />,
                    },
                    {
                        value: 'List',
                        icon: <BarsOutlined />,
                    },
                    ]}
                    onChange={ switchChangeHandler }
                />
                <Select
                    defaultValue="All"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options= {["All", "Preparing",
                    "Progressing",
                    "Rejected",
                    "Passed"].map((v)=>{return {"value": v, "label": v}})}
                />
                <Button id='btn01' onClick={(e)=>{
                    if(!showForm){
                        (formWrapperRef.current as HTMLDivElement).style.width = "300px";
                        (e.target as HTMLElement).innerHTML = "<span>Cancle</span>"
                        
                    }else{
                        (formWrapperRef.current as HTMLDivElement).style.width = "0";
                        (e.target as HTMLElement).innerHTML = "<span>Create New Application</span>"
                    }
                    setShowForm(!showForm)
                }}>Create New Application</Button>
                <Button id='btn02' onClick={(e)=>{
                    if(!showForm){
                        (formWrapperRef.current as HTMLDivElement).style.height = "420px";
                        (formWrapperRef.current as HTMLDivElement).style.border = "1px solid black";
                        (e.target as HTMLElement).innerHTML = "<span>Cancle</span>"
                        
                    }else{
                        (formWrapperRef.current as HTMLDivElement).style.height = "0";
                        (formWrapperRef.current as HTMLDivElement).style.border = "none";
                        (e.target as HTMLElement).innerHTML = "<span>Create New Application</span>"
                    }
                    setShowForm(!showForm)
                }}>Create New Application</Button>
            </div>
        
        
        
        <div className='new-app-form' ref={ formWrapperRef }>
            <Form method='post' action='add'>
                <p style={{"fontSize": 26}}>Add a new Application</p>
                <label htmlFor="name">Job Title</label>
                <input type="text" name='name' id='name' required/>
                <label htmlFor="company">Company Name</label>
                <input type="text" name='company' id='company' required/>
                <label htmlFor="image">Company Image</label>
                <input type="text" name='image' id='image' required/>
                <label htmlFor="avatar">Avatar Link</label>
                <input type="text" name='avatar' id='avatar' required/>
                <button type='submit' className='ant-btn' onClick={()=>{
                    setrefresh(!refresh)
                }}>Submit</button>
            </Form>
        </div>
      </div>
      {(layout==="Kanban")?(<Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 },{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
            {
                appList.data.map((app)=>{
                    return (
                        <Col className="gutter-row" xs={24} md={12} lg={8} xxl={6} key={app._id}>
                            <MyCard status={app.card.status} isrc={app.card.isrc} title={app.card.title} company={app.card.company} avatar={app.card.avatar} id={app._id}></MyCard>
                        </Col>
                    )
                })
            }
        </Row>):(
            <Table columns={columns} dataSource={appList.data} rowKey={(record)=>record._id?record._id:0}/>
        )
        }
    
    </div>
  )
}
