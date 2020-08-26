function registrar(){
    let name= document.getElementById("name");
    let email= document.getElementById("email");
    let pass= document.getElementById("pass");


    let objUsuario= {nombre:name.value, correo:email.value, contrasena:pass.value};
    console.log(objUsuario)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(objUsuario);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/usuarios", requestOptions)
    .then(response => {
        if(response.ok)
        {
            response.json()
        }
        else{
            throw new Error("revise sus datos")
        }

    })
    .then(result => {       
            alert("usuario registrado ok")
        
        console.log(result)
    })
    .catch(error => {
        alert(error)
        console.log('error', error)
    });
}