import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'antd';

interface editerProps {
  getInnerHtml: (content:string)=>void
}

export default function Editer(props:editerProps) {
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
  ];

  function handleChange(value:any) {
    setContent(value);
  }

  return (
    <>
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        style={{width: 800}}
        placeholder="Write something amazing..."
      />
      <Button style={{ marginTop:10, width:75, textAlign:"center"}} onClick={()=>{
        props.getInnerHtml(content);
        setContent("");
      }}>Confirm</Button>
    </>
    
  );
}

