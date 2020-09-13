
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#m1')
const messagetwo= document.querySelector('#m2')


weatherForm.addEventListener('submit',(e)=>
{

        e.preventDefault()
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
        messagetwo.textContent = data.location
        messageOne.textContent = data.forecast
            }
        })
    })

})

