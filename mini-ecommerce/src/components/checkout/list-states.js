function ListStates () {

    const states = [
        { 'abbreviation': '',   'name': 'Selecione o estado' },
		{ 'abbreviation': 'AC', 'name': 'Acre (AC)' },
		{ 'abbreviation': 'AL', 'name': 'Alagoas (AL)' },
		{ 'abbreviation': 'AP', 'name': 'Amapá (AP)' },
		{ 'abbreviation': 'AM', 'name': 'Amazonas (AM)' },
		{ 'abbreviation': 'BA', 'name': 'Bahia (BA)' },
		{ 'abbreviation': 'CE', 'name': 'Ceará (CE)' },
		{ 'abbreviation': 'DF', 'name': 'Distrito Federal (DF)' },
		{ 'abbreviation': 'ES', 'name': 'Espírito Santo (ES)' },
		{ 'abbreviation': 'GO', 'name': 'Goiás (GO)' },
		{ 'abbreviation': 'MA', 'name': 'Maranhão (MA)' },
		{ 'abbreviation': 'MT', 'name': 'Mato Grosso (MT)' },
		{ 'abbreviation': 'MS', 'name': 'Mato Grosso do Sul (MS)' },
		{ 'abbreviation': 'MG', 'name': 'Minas Gerais (MG)' },
		{ 'abbreviation': 'PA', 'name': 'Pará (PA)' },
		{ 'abbreviation': 'PB', 'name': 'Paraíba (PB)' },
		{ 'abbreviation': 'PR', 'name': 'Paraná (PR)' },
		{ 'abbreviation': 'PE', 'name': 'Pernambuco (PE)' },
		{ 'abbreviation': 'PI', 'name': 'Piauí (PI)' },
		{ 'abbreviation': 'RJ', 'name': 'Rio de Janeiro (RJ)' },
		{ 'abbreviation': 'RN', 'name': 'Rio Grande do Norte (RN)' },
		{ 'abbreviation': 'RS', 'name': 'Rio Grande do Sul (RS)' },
		{ 'abbreviation': 'RO', 'name': 'Rondônia (RO)' },
		{ 'abbreviation': 'RR', 'name': 'Roraima (RR)' },
		{ 'abbreviation': 'SC', 'name': 'Santa Catarina (SC)' },
		{ 'abbreviation': 'SP', 'name': 'São Paulo (SP)' },
		{ 'abbreviation': 'SE', 'name': 'Sergipe (SE)' },
		{ 'abbreviation': 'TO', 'name': 'Tocantins (TO)' }
    ];

    return states.map(state => 
        <option
            key={state.abbreviation}
            value={state.abbreviation}
            data-testid={state.abbreviation}>
            {state.name}
        </option>
    );
}

export default ListStates;