console.log("Javascript from public file is loaded!");
// fetch("https://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })
// fetch("http://localhost:3000/weather?address=!").then((response=>{
//     response.json().then((data)=>{
//         if(data.error){
//           return console.log(data.error);
//         }
//         console.log(data.forecast);
//         console.log(data.location);
//         console.log(data.address);
//     })
// }))
let weatherForm=document.querySelector('form')
let search=document.querySelector('input')
let messageOne=document.querySelector('#message1')
let messageTwo=document.querySelector('#message2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent="Loading..."
    messageTwo.textContent="";
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
            return   messageOne.textContent=data.error;
            }
            messageOne.textContent=data.forecast;
            messageTwo.textContent=data.location;
            // console.log(data.forecast);
            // console.log(data.location);
            //console.log(data.address);
        })
    })
 search.value=""
  
})