document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadButton');

    downloadButton.addEventListener('click', function() {
        fetch('https://raw.githubusercontent.com/blakek/us-zips/master/array.js')
            .then(response => response.text())
            .then(data => {
                // Remove module.exports and evaluate the array data
                const cleanArrayData = data.replace(/^module\.exports\s*=\s*/, '');
                const arrayData = eval(cleanArrayData);

                if (Array.isArray(arrayData)) {
                    const formattedData = arrayData.map(item => ({
                        "latitude": item.latitude,
                        "longitude": item.longitude,
                        "zipCode": item.zipCode
                    }));

                    const formattedDataString = JSON.stringify(formattedData, null, 4);
                    const blob = new Blob([formattedDataString], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'formatted_data.json';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } else {
                    console.error('Error processing array data.');
                }
            })
            .catch(error => {
                console.error('Error fetching array data:', error);
            });
    });
});
