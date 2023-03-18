console.log('Client side rendering')



const weatherForm = document.querySelector('form')

const searchItem = document.querySelector('input')

const message1 = document.querySelector('#error-message1')
const message2 = document.querySelector('#error-message2')

message1.textContent = '';
message2.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchItem.value

    message1.textContent = 'Loading....'
    message2.textContent = '';

    fetch(`/weather?address=${location}`).then((response)=> {
    response.json().then((data)=>{
        if(data.error){
            return message1.textContent= data.error
        }
        message1.textContent= data.placeName
        message2.textContent= data.forecast
    })
})
})