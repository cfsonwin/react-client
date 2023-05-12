import React from 'react'
import { Badge } from 'antd';

interface stProps {
    status: number
}
export enum cardStEnum {
    "Preparing"=0,
    "Progressing",
    "Rejected",
    "Passed", 
}
enum badgeStEnum {
    "default",
    "processing",
    "warning",
    "success",
    "error" 
}
type badgeType = "success" | "processing" | "error" | "default" | "warning" | undefined
export default function Status(props:stProps) {
    return  <div><Badge status={badgeStEnum[props.status] as badgeType} />&nbsp;&nbsp;{cardStEnum[props.status]}</div>
}
