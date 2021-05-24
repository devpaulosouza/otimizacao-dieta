
let values = {
    nomesAlimentos: [],
    custosAlimento: [],
    minimosAlimento: [],
    maximosAlimento: [],
    nomesNutrientes: [],
    minimosNutrientes: [],
    maximosNutrientes: [],
    quantidades: [],
}

const criarInput = (id, index) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.id = `${id}-${index}`;

    return input;
}

const avancarQuantidades = () => {
    const elements = {
        form: document.getElementById('form'),
        quantidadeAlimentos: document.getElementById('quantidadeAlimentos'),
        quantidadeNutrientes: document.getElementById('quantidadeNutrientes'),
        quantidades: document.getElementById('quantidades'),
        alimentos: document.getElementById('alimentos'),
        tableAlimentos: document.getElementById('tableAlimentos'),
        tableNutrientes: document.getElementById('tableNutrientes'),
    };



    const quantidadeAlimentos = elements.quantidadeAlimentos.value;
    const quantidadeNutrientes = elements.quantidadeNutrientes.value;

    if (!quantidadeAlimentos || !quantidadeNutrientes) {
        return;
    }

    for (let i = 0; i < quantidadeAlimentos; ++i) {

        const tr = document.createElement('tr');

        const tdIndex = document.createElement('th');
        const tdNome = document.createElement('td');
        const tdPreco = document.createElement('td');
        const tdMinimo = document.createElement('td');
        const tdMaximo = document.createElement('td');

        tdIndex.innerHTML = i + 1 ;

        tdNome.appendChild(criarInput('alimento-nome', i));
        tdPreco.appendChild(criarInput('alimento-preco', i));
        tdMinimo.appendChild(criarInput('alimento-minimo', i));
        tdMaximo.appendChild(criarInput('alimento-maximo', i));


        tr.appendChild(tdIndex);
        tr.appendChild(tdNome);
        tr.appendChild(tdPreco);
        tr.appendChild(tdMinimo)
        tr.appendChild(tdMaximo)

        elements.tableAlimentos.querySelectorAll('tbody')[0].appendChild(tr);
    }

    for (let i = 0; i < quantidadeNutrientes; ++i) {
        const tr = document.createElement('tr');

        const tdIndex = document.createElement('th');
        const tdNome = document.createElement('td');
        const tdMinimo = document.createElement('td');
        const tdMaximo = document.createElement('td');

        tdIndex.innerHTML = i + 1 ;

        tdNome.appendChild(criarInput('nutriente-nome', i));
        tdMinimo.appendChild(criarInput('nutriente-minimo', i));
        tdMaximo.appendChild(criarInput('nutriente-maximo', i));


        tr.appendChild(tdIndex);
        tr.appendChild(tdNome);
        tr.appendChild(tdMinimo)
        tr.appendChild(tdMaximo)

        elements.tableNutrientes.querySelectorAll('tbody')[0].appendChild(tr);
    }

    elements.quantidades.style.display = 'none';
    elements.alimentos.style.display = 'block';
}

const avancarNomes = () => {

    const elements = {
        alimentos: document.getElementById('alimentos'),
        tabela: document.getElementById('tabela'),
        tableAlimentos: document.querySelectorAll('#tableAlimentos > tbody'),
        tableNutrientes: document.querySelectorAll('#tableNutrientes > tbody'),
    };


    let nomesAlimentos = [];
    let custosAlimentos = [];
    let minimosAlimentos = [];
    let maximosAlimentos = [];

    let nomesNutrientes = [];
    let minimosNutrientes = [];
    let maximosNutrientes = [];

    const rowsAlimentos = elements.tableAlimentos[0].children;

    for (let i = 0; i < rowsAlimentos.length; ++i) {
        const nome = rowsAlimentos[i].children[1].children[0].value;
        const custo = rowsAlimentos[i].children[2].children[0].value;
        const minimo = rowsAlimentos[i].children[3].children[0].value;
        const maximo = rowsAlimentos[i].children[4].children[0].value;
        

        if (!nome.length || !custo.length || !minimo.length || !maximo.length) {
            return;
        }

        nomesAlimentos.push(nome);
        custosAlimentos.push(custo);
        minimosAlimentos.push(minimo);
        maximosAlimentos.push(maximo);
        
    }

    const rowsNutrientes = elements.tableNutrientes[0].children;
    for (let i = 0; i < rowsNutrientes.length; ++i) {
        const nome = rowsNutrientes[i].children[1].children[0].value;
        const minimo = rowsNutrientes[i].children[2].children[0].value;
        const maximo = rowsNutrientes[i].children[3].children[0].value;
        

        if (!nome.length || !minimo.length || !maximo.length) {
            return;
        }

        nomesNutrientes.push(nome);
        minimosNutrientes.push(minimo);
        maximosNutrientes.push(maximo);
        
    }

    values.nomesAlimentos = nomesAlimentos;
    values.custosAlimento = custosAlimentos;
    values.minimosAlimento = minimosAlimentos;
    values.maximosAlimento = maximosAlimentos;

    values.nomesNutrientes = nomesNutrientes;
    values.minimosNutrientes = minimosNutrientes;
    values.maximosNutrientes = maximosNutrientes;

    console.log(values)

    const tableHead = elements.tabela.querySelector('table > thead > tr');
    const tableBody = elements.tabela.querySelector('table > tbody');
    
    values.nomesNutrientes.forEach(nomeNutriente => {

        const head = document.createElement('th');

        head.innerHTML = nomeNutriente;
        head.scope = 'col';

        tableHead.appendChild(head);

    });

    values.nomesAlimentos.forEach((nomeAlimento, i) => {
        const row = document.createElement('tr');


        const th = document.createElement('th');

        th.scope = 'row';
        th.innerHTML = nomeAlimento;

        row.appendChild(th);


        values.nomesNutrientes.forEach((nomeNutriente, j) => {

            const td = document.createElement('td');
            
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'form-control';
            input.id = `quantidade-${i}-${j}`;
            
            td.appendChild(input);
            row.appendChild(td);
        });

        tableBody.appendChild(row);
    });


    elements.tabela.style.display = 'block';
    elements.alimentos.style.display = 'none';

}

const avancarTabela = async () => {

    const elements = {
        tabela: document.getElementById('tabela'),
        resultado: document.getElementById('resultado'),
        melhorCusto: document.getElementById('melhorCusto'),
        listaCompras: document.getElementById('listaCompras'),

    }

    const nutrientes = [];

    for (let i = 0; i < values.nomesNutrientes.length; ++i) {
        nutrientes.push([]);

        for(let j = 0; j < values.nomesAlimentos.length; ++j) {
            const quantidade = document.getElementById(`quantidade-${j}-${i}`).value;

            if (!quantidade.length) {
                return;
            }

            nutrientes[i].push(quantidade)
        }
    }

    values.quantidades = nutrientes;

    const solucao = await requestSolucao();

    elements.resultado.style.display = 'block';
    elements.tabela.style.display = 'none';
    elements.melhorCusto.innerHTML = solucao.custoTotal.toFixed(2);

    for (let i = 0; i <values.nomesAlimentos.length; ++i) {
        const alimento = document.createElement('div');
        const nome = document.createElement('b');
        const valor = document.createElement('span');

        nome.innerHTML = values.nomesAlimentos[i] + ': ';
        valor.innerHTML = solucao.listaDeCompras[i].toFixed(2);
        alimento.appendChild(nome);
        alimento.appendChild(valor);

        elements.listaCompras.appendChild(alimento);
    }

};


const requestSolucao = async () => {
    const response = await fetch('/dieta', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            alimentos: values.nomesAlimentos,
            custos: values.custosAlimento,
            minimosAlimento: values.minimosAlimento,
            maximosAlimento: values.maximosAlimento,
            nutrientes: values.nomesNutrientes,
            minimosNutriente: values.minimosNutrientes,
            maximosNutriente: values.maximosNutrientes,
            quantidades: values.quantidades,
        })
    })
    const resultados = await response.json();

    console.log(resultados)

    return resultados;
}

const rollback = () => {
    window.location.reload();
};

