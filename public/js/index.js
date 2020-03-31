console.log("hello");

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne=document.querySelector("#messageOne");
const messageTwo=document.querySelector("#messageTwo");
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
  const value=input.value;
    messageOne.textContent="Loading..."
    messageTwo.textContent=''
  fetch("/weather?address=" + value).then(response => {
    response.json().then((data) => {
      if (data.err){
        messageOne.textContent=data.err
      } 
     
      else {
        messageOne.textContent=data.location;
        messageTwo.textContent=data.forecast;
      }
    });
  });
});
