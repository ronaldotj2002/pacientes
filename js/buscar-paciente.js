var botaoAdicionar = document.querySelector("#buscar");

botaoAdicionar.addEventListener("click", function(){
    
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    xhr.addEventListener("load", function(){

        if(xhr.status == 200) {

            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta)
    
            pacientes.forEach( function(paciente){
                adicionaPacienteNaTabela(paciente);

                console.log(xhr.status);

            }); 

        } else {

            console.log(xhr.status);
            console.log(xhr.responseText);
            
        }

    });
   
    xhr.send();
})