import React from 'react'
import MyCard, {cardProps} from '../card'
import { Col, Row } from 'antd';
import { getApplications } from '../../api/requests';
import { useLoaderData } from 'react-router-dom';

export async function loader({params}:any){
    const applications = await getApplications(params.user)
    return { applications }
}

interface applicationsInterface {
    status: number,
    data: {
        "_id": string,
        "card": cardProps,
        "infos": string,
        "user": string
    }[],
  }
  
  interface LoaderData {
    applications: applicationsInterface;
  }

export default function CardGrid() {

  const { applications } = useLoaderData() as LoaderData
  return (
    <div>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 },{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
            {
                applications.data.map((app)=>{
                    return (
                        <Col className="gutter-row" xs={24} md={12} lg={8} key={app._id}>
                            <MyCard status={app.card.status} isrc={app.card.isrc} title={app.card.title} company={app.card.company} avatar={app.card.avatar} id={app._id}></MyCard>
                        </Col>
                    )
                })
            }
        </Row>
    
    </div>
  )
}
