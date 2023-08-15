const form = document.getElementById('registerForm');


form.addEventListener('submit', e=>{
    console.log("Submit register")
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/session/register',{
        method:'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=>{
        console.log(result)
        if(result.status == 200){
            window.location.replace('/')
        }
    })
})