document.addEventListener('DOMContentLoaded', function() {
    async function obtenerCotizacionDolarBlue() {
        const url = 'https://api.bluelytics.com.ar/v2/latest'; // URL pública para el dólar blue
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            document.getElementById('cotizacion-dolar-blue').innerHTML = `Dólar Blue: Compra $${data.blue.value_buy} - Venta $${data.blue.value_sell}`;
            return data.blue.value_sell; // Devolver el valor de venta del dólar blue
        } catch (error) {
            console.error('Error al obtener la cotización:', error);
            return null;
        }
    }

    obtenerCotizacionDolarBlue().then(tipoCambio => {
        if (tipoCambio === null) {
            console.error('Error: No se pudo obtener la cotización del dólar blue.');
            return;
        }

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

                        // Actualizar "Precio Ars" y "Valor Venta" al seleccionar el precio
                        selectPrecios.addEventListener('change', function() {
                            const selectedPrecio = parseFloat(this.value); // Precio en USD
                            const precioArs = (selectedPrecio * tipoCambio).toFixed(2); // Convertir a ARS
                            const valorConTransferencia = (precioArs * 1.10).toFixed(2);

                            const precioArsElement = document.getElementById('precioArs');
                            const valorVentaElement = document.getElementById('valorVenta');
                            
                            if (precioArsElement) {
                                precioArsElement.innerHTML = `Precio Ars: $${precioArs}`;
                            } else {
                                console.error('Error: Elemento "precioArs" no encontrado');
                            }

                            if (valorVentaElement) {
                                valorVentaElement.innerHTML = `Valor más transferencia: $${valorConTransferencia}`;
                            } else {
                                console.error('Error: Elemento "valorVenta" no encontrado');
                            }
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
});
