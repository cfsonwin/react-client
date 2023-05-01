import React from 'react'
import { Badge } from 'antd';

interface stProps {
    status: number
}

export default function Status(props:stProps) {
    switch (props.status) {
        case 0:
            return (
                <div><Badge status="default" />&nbsp;&nbsp;Preparing</div>
              )
        case 1:
            return (
                <div><Badge status="processing" />&nbsp;&nbsp;Progressing</div>
              )
        case 2:
            return (
                <div><Badge status="warning" />&nbsp;&nbsp;Rejected</div>
                )
        case 3:
            return (
                <div><Badge status="success" />&nbsp;&nbsp;Passed</div>
                )
        default:
            return (
                <div><Badge status="error" />&nbsp;&nbsp;Unknown</div>
              )
    }
  
}
