var botaoAdicionar = document.querySelector("#adicionar-paciente");

    botaoAdicionar.addEventListener("click", function(event){

        event.preventDefault();
     
        var form =  document.querySelector("#adiciona-novo");

        var paciente = obtemPaciente(form);

        var erros = validaPaciente(paciente);
        console.log(erros);

        if(erros.length > 0){
            exibeMensagensDeErro(erros);            
            return;
        }
        
        adicionaPacienteNaTabela(paciente);

        // limpar o formulário após submeter os dados
        form.reset();

        //Limpando a menssagem de erro quando o formulário for validado
        var exibeMensagensErro = document.querySelector("#mensagens-erro");
        exibeMensagensErro.innerHTML = "";

});

function adicionaPacienteNaTabela(paciente){

    var pacienteTr = montarTr(paciente);

    // passando o id da tabela para uma variável 
    var tabela = document.querySelector("#tabela-pacientes");

    // passando os elementos td e seus respectivos valores como filho para o tr
    tabela.appendChild(pacienteTr);

}

function exibeMensagensDeErro(erros) {

    var ul = document.querySelector("#mensagens-erro");
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
        
    }); 
}

function obtemPaciente(form) {

    var paciente = {
        nome    : form.nome.value,
        peso    : form.peso.value,
        altura  : form.altura.value,
        gordura : form.gordura.value,
        imc     : calcularImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montarTr(paciente) {

    //Criando o elemento tr
    var pacienteTr = document.createElement("tr");

    //Adicionando a classe 'paciente'
    pacienteTr.classList.add("paciente");
    
    //criando o elemento td e adicionando a classe
    var nomeTd    = montarTd(paciente.nome,    "info-nome");
    var pesoTd    = montarTd(paciente.peso,    "info-peso");
    var alturaTd  = montarTd(paciente.altura,  "info-altura");
    var gorduraTd = montarTd(paciente.gordura, "info-gordura");
    var imcTd     = montarTd(paciente.imc,     "info-imc");
    var removerTd = montarTd(paciente.remover, "info-remover");

    // Adicionando o valor dentro do elemento
    nomeTd.textContent    = paciente.nome;
    pesoTd.textContent    = paciente.peso;
    alturaTd.textContent  = paciente.altura;
    gorduraTd.textContent = paciente.gordura;
    imcTd.textContent     = paciente.imc;
    removerTd.textContent = paciente.innerHTML = "X";
    
    // Passando o elemento td com os valores como filho do elemento tr
    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);
    pacienteTr.appendChild(removerTd);

    return pacienteTr;

    
}
    function montarTd(dado, classe) {
        var td = document.createElement("td");
        td.textContent = dado;
        td.classList.add(classe);

        return td;
    }

    function validaPaciente(paciente) {

        var erros = [];

        if (!validaPeso(paciente.peso)){

            erros.push("Peso é inválido")
        } 

        if(!validaAltura(paciente.altura)){

            erros.push("Altura é inválida")
        }

        return erros;

    }