const weathrForm = document.querySelector('form');

const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');

const messageTwo = document.querySelector('#message-2');

weathrForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Please Wait....!';
    if (location == '') {
        console.log('Please Enter Any value');
        
    } else {
        fetch('/weather?address='+location).then((res) =>
        {
            res.json().then((data) => {
                if (data.err) {
                    console.log(err);
                    
                } else {
                    console.log(data);
                    
                    messageOne.textContent =  data.summary;
                    messageTwo.textContent = data.temperature;
                }
            })
            // console.log(res);
            
        })
    }
    
})