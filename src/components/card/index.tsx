import React, { SyntheticEvent, useState} from 'react'
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import Status from '../status';
import "./index.css"
import { Link, useSubmit, useParams, redirect } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { cardStEnum } from "../status"
import { updateApplications } from "../../api/requests"


export interface cardProps {
    isrc: string,
    title: string,
    company: string,
    avatar: string,
    status: number,
    id?:string
}

export const action = async ({params, request}:any)=>{
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log(updates._id, parseInt(updates.newState));
    await updateApplications(params.user, {
        _id: updates._id,
        newSt: parseInt(updates.newState)
    })
    return redirect(`/applications/${params.user}`)
}

type cardStStrings = keyof typeof cardStEnum;
export default function MyCard(props:cardProps) {
    const [refresh, setrefresh] = useState(false)
    const settingHandler = (e:SyntheticEvent)=>{
        console.log("Setting");
    }
    const submit = useSubmit()
    const { user } = useParams();
    const stateChangeHandler = (e:SyntheticEvent)=>{
        let formData = new FormData();
        const selectedSt = (e.target as HTMLElement).innerHTML as cardStStrings
        const newState = cardStEnum[selectedSt].toString()
        console.log(props);
        formData.append("_id", props.id as string)
        formData.append("newState", newState)
        submit(formData, {
            action: `/applications/${user}/stateupdate/`,
            method: "post",
        })
        setrefresh(!refresh)
    }
    const cardStArray = ["Preparing",
                        "Progressing",
                        "Rejected",
                        "Passed"].filter((v,i)=>i!=props.status)

    const items: MenuProps['items'] = cardStArray.map((v,i)=>{
        let key:string = (i + 1).toString()
        return (
            {
                key: key,
                label: (
                    <div onClick={stateChangeHandler}>
                        {v}
                    </div>
                ),
            }
        )
    }) 
    
      

  return (

    <div className="my-card-wrapper">
        <div className="card">
            <div className="card-image">
                <img src={props.isrc} alt={`company ${props.company}`} />
            </div>
            <div className="card-info">
                <div className="card-avatar">
                    <img src={props.avatar} alt={"Avatar"} />
                </div>
                <div className="card-description">
                    <div className="card-title">{props.title}</div>
                    <div className="card-company">{props.company}</div>
                    <div className="status">
                        <Status status={props.status}/>
                    </div>
                </div>
                
            </div>
            <div className="card-footer">
                <Link to={`/applications/Lawi/details/${props.id}`}>
                    <EditOutlined style={{fontSize:20, color:"grey"}} />
                </Link>
                <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <SettingOutlined style={{fontSize:20, color:"grey"}} onClick={settingHandler}/>
                </Dropdown>
            </div>
        </div>
        
  </div>
  )
}
