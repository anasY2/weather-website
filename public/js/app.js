
let weatherForm=document.querySelector('form')
let search=document.querySelector('input')
let messageOne=document.querySelector('#message1')
let messageTwo=document.querySelector('#message2')
let messageThree=document.querySelector('#message3')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent="Loading..."
    messageTwo.textContent="";
    messageThree.textContent="";
    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
            return   messageOne.textContent=data.error;
            }
            messageOne.textContent=data.forecast;
            messageTwo.textContent=data.location;
            messageThree.textContent="Date and Time: "+data.dateAndTime
           
        })
    })
 search.value=""
  
})