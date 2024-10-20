document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3001/opciones')
        .then(response => response.json())
        .then(data => {
            const selectModelos = document.getElementById('opciones');
            const selectPrecios = document.getElementById('precios');
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.innerHTML = "Elige un modelo";
            selectModelos.appendChild(defaultOption);

            data.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.patente;
                opt.innerHTML = option.modelo;
                selectModelos.appendChild(opt);
            });

            selectModelos.addEventListener('change', function() {
                const selectedPatente = this.value;
                const selectedOption = data.find(option => option.patente === selectedPatente);
                if (selectedOption) {
                    document.getElementById('detallesForm').style.display = 'block';
                    selectPrecios.style.display = 'block';

                    document.getElementById('patente').value = selectedOption.patente || '';
                    document.getElementById('modelo').value = selectedOption.modelo || '';
                    document.getElementById('version').value = selectedOption.version || '';
                    document.getElementById('anio').value = selectedOption.anio || '';
                    document.getElementById('kilometros').value = selectedOption.kilometros || '';
                    document.getElementById('color').value = selectedOption.color || '';

                    selectPrecios.innerHTML = ''; // Limpiar opciones anteriores

                    const precios = [
                        { tipo: 'Precio Lista', valor: selectedOption.precioLista },
                        { tipo: 'Precio Medio', valor: selectedOption.precioMedio },
                        { tipo: 'Precio Mínimo', valor: selectedOption.precioMinimo }
                    ];

                    precios.forEach(precio => {
                        const opt = document.createElement('option');
                        opt.value = precio.valor;
                        opt.innerHTML = `${precio.tipo}: $${precio.valor}`;
                        selectPrecios.appendChild(opt);
                    });
                } else {
                    document.getElementById('detallesForm').style.display = 'none';
                    selectPrecios.style.display = 'none';
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
