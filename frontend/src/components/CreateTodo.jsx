import React, { useState } from 'react'

function CreateTodo() {
    const [title, setTitle] =useState("");
    const[description,setDescription]=useState("");

   

    const handleaddTodo= async ()=>{
        if (!title || !description) {
            alert("Title and description are required");
            return;
          }

          const newtodo={
            title:title,
            description:description,
            completed:false,
        };

        const response = await fetch("http://localhost:3000/todo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newtodo),
          });

          const data=await response.json();
          if (response.ok) {
            alert("Todo added successfully!");
       
            setTitle('');
            setDescription('');
          } else {
            alert(`Failed to add todo: ${data.msg}`);
          }
    }


  return (
    <div>
        <input style={{
            padding:10,
            margin:10
        }} type="text" placeholder='title' onChange={function(e){
            const value=e.target.value;
            setTitle(e.target.value);
        }}></input><br />
        <input style={{
            padding:10,
            margin:10
        }} type="text" placeholder='description' onChange={function(e){
            const value=e.target.value;
            setDescription(e.target.value);
        }}></input><br />
        <button style={{
            padding:10,
            margin:10
        }} onClick={handleaddTodo}>Add a Todo</button>

    </div>
  )
}

export default CreateTodo