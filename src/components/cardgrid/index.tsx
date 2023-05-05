import MyCard, {cardProps} from '../card'
import { Col, Row } from 'antd';
import { getApplications, createApplications } from '../../api/requests';
import { redirect, useLoaderData } from 'react-router-dom';
import React, {useState, useRef} from 'react'
import { Form } from 'react-router-dom'
import "./index.css"
import { Button } from 'antd'


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

interface applicationsInterface {
    status: number,
    data: {
        "_id"?: string,
        "card": cardProps,
        "infos": string,
        "user": string
    }[],
  }
  
  interface LoaderData {
    applications: applicationsInterface;
  }

export default function CardGrid() {
  const [showForm, setShowForm] = useState(false)
  const [refresh, setrefresh] = useState(false)
  const { applications } = useLoaderData() as LoaderData
  const formWrapperRef = useRef<HTMLDivElement>(null)
  return (
    <div>
        <div className='new-app-wrapper'>
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
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 },{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
            {
                applications.data.map((app)=>{
                    return (
                        <Col className="gutter-row" xs={24} md={12} lg={8} xxl={6} key={app._id}>
                            <MyCard status={app.card.status} isrc={app.card.isrc} title={app.card.title} company={app.card.company} avatar={app.card.avatar} id={app._id}></MyCard>
                        </Col>
                    )
                })
            }
        </Row>
    
    </div>
  )
}
