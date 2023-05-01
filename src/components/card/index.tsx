import React, { SyntheticEvent} from 'react'
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import Status from '../status';
import "./index.css"
import { Link } from 'react-router-dom';
export interface cardProps {
    isrc: string,
    title: string,
    company: string,
    avatar: string,
    status: number,
    id?:string
}

export default function MyCard(props:cardProps) {
    const settingHandler = (e:SyntheticEvent)=>{
        console.log(e.target);
    }

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
                <SettingOutlined style={{fontSize:20, color:"grey"}} onClick={settingHandler}/>
            </div>
        </div>
        
  </div>
  )
}
