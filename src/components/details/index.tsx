import React, { useState, useEffect } from 'react'
import Editer from '../editor';
import { Button, Divider } from 'antd';
import { useLoaderData, useSubmit, redirect, useParams } from 'react-router-dom';
import { getDetails, updateDetails } from '../../api/requests';

import "./index.css"

export async function loader({params}:any){
  const infos = await getDetails(params.user, params.id)
  // const initHtml:string = `<h1>${params["id"]}</h1>`
  // const initHtml:string =  `<h1>${infos.data["header"]}</h1>${infos.data["body"]}`
  return { infos }
}

export async function action({params, request}:any){
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(updates.newHtml);
  await updateDetails(params.user, params.id, updates.newHtml)
  return redirect(`/applications/${params.user}/details/${params.id}/`);
}


interface LoaderData {
  initHtml: string;
}

export default function Details() {
  
  const [innerHtml, setInnerHtml] = useState<string[]>([])
  const [showEditor, setShowEditor] = useState(false)
  const { user, id } = useParams();
  const { infos } = useLoaderData() as any;
  
  const submit = useSubmit()
  const saveHandler = ()=>{
    
    const panel = document.querySelector(".panel");
    let formData = new FormData();
    formData.append("newHtml", (panel as Element)!.innerHTML)
    submit(formData, {
      action: `/applications/${user}/details/${id}/update`,
      method: "post",
    })
    setInnerHtml([])
    setShowEditor(false)
  }
  const returnHandler = ()=>{
    if (innerHtml.length > 0) {
      const deletedElement = innerHtml.pop();
      setInnerHtml([...innerHtml]);
      console.log(`Deleted element: ${deletedElement}`);
    } else {
      console.log("Cannot delete. Array is empty.");
    }
  }
  useEffect(() => {
    const panel = document.querySelector(".panel");
    (panel as Element)!.innerHTML = infos.data.body;
    innerHtml.map((v)=>{
      (panel as Element)!.innerHTML += v;
      return v
    })
    
  });

  return (
    <div className='Info-wrapper'>
      <h1>{infos.data["header"]}</h1>
      <div className='panel'>
        
      </div>
      <Divider/>
      <Button type='primary' onClick={()=>{setShowEditor(true)}}>Edit</Button>
      {showEditor&&(<div className='editor-wrapper'>
        <div style={{marginTop:10, marginBottom:10,}}>
          <Button style={{ marginRight:10, width:75}} onClick={returnHandler}>Back</Button>
          <Button style={{ marginRight:10, width:75}} onClick={saveHandler}>Save</Button>

          {/* <Form action="update" style={{display:"inline"}}>
            <button style={{width:75}} type="submit" className='ant-btn'>Save</button>
          </Form> */}
        </div>
        <Editer getInnerHtml={(value)=>{setInnerHtml([...innerHtml, value])}}/>
        </div>)}

    </div>
    
  );
}

