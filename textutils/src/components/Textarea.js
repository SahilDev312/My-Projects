import React from 'react'
import { useState } from 'react'

export default function Textarea(props) {

  const handleUpCase=()=>{
    console.log("button is clicked"+text);
    let newtext = text.toUpperCase();
    settext(newtext);
  }
  
  const handleClearCase=()=>{
    console.log("button is clicked"+text);
    let newtext = " ";
    settext(newtext);
  }
  
  const handledownCase=()=>{
    console.log("button is clicked"+text);
    let newtext = text.toLowerCase();
    settext(newtext);
  }
  const changed=(event)=>{
     console.log("it is changed now");
     settext(event.target.value);
  }
  const [text, settext] = useState("Enter the text here");

  return (
    <>
    
   <div className="containers" >
   <h1>{props.heading}</h1>
  <div className="mb-3">
    <textarea className="form-control" value={text} onChange={changed} id="exampleFormControlTextarea1" rows="13"></textarea>
  </div>

  <div className="btn btn-primary" onClick={handleUpCase}> Convert to UpperCase</div>
  <div className="btn btn-primary mx-2" onClick={handledownCase}> Convert to lowerCase</div>
  <div className="btn btn-primary mx-2" onClick={handleClearCase}> Clear</div>
  </div>

  <div className="container">
   <h1> Your text summary</h1>
   You have {text.split(" ").length} words and {text.length} Characters

   <p>{0.008* text.split(" ").length} Minutes are required to read</p>

  </div>

  
 </>
  )
}
