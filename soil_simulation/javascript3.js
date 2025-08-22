document.addEventListener('DOMContentLoaded', () => {
    const plantSelect = document.getElementById('plant-select');
    const soilSelect = document.getElementById('soil-select');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('result-text');
    const plantElement = document.querySelector('.plant');

    const compatibility = {
        Ashwagandha: {
            Sandy: 'grows well',
            Clay: 'survives but grows late',
            Loamy: 'grows well',
            Rocky: 'cannot survive'
        },
        Tulsi: {
            Sandy: 'survives but grows late',
            Clay: 'survives but grows late',
            Loamy: 'grows well',
            Rocky: 'cannot survive'
        },
        Turmeric: {
            Sandy: 'survives but grows late',
            Clay: 'grows well',
            Loamy: 'grows well',
            Rocky: 'cannot survive'
        },
        Clove: {
            Sandy: 'cannot survive',
            Clay: 'survives but grows late',
            Loamy: 'grows well',
            Rocky: 'cannot survive'
        },
        Cardamom: {
            Sandy: 'survives but grows late',
            Clay: 'cannot survive',
            Loamy: 'grows well',
            Rocky: 'cannot survive'
        }
    };

    function checkCompatibility() {
        const selectedPlant = plantSelect.value;
        const selectedSoil = soilSelect.value;

        plantElement.className = 'plant';
        resultText.textContent = '';

        if (selectedPlant && selectedSoil) {
            const result = compatibility[selectedPlant][selectedSoil];
            displayResult(result);
        }
    }

    function displayResult(result) {
        let message = '';
        let icon = '';

        switch (result) {
            case 'grows well':
                message = 'The plant grows well';
                icon = '✅';
                plantElement.classList.add('grows');
                break;
            case 'survives but grows late':
                message = 'The plant survives but grows late';
                icon = '⚠️';
                plantElement.classList.add('grows'); // A slower growth animation could be implemented here
                break;
            case 'cannot survive':
                message = 'The plant cannot survive in this soil';
                icon = '❌';
                plantElement.classList.add('wilts');
                break;
            default:
                message = 'Please select both a plant and a soil type.';
        }

        resultText.innerHTML = `${icon} ${message}`;
    }

    plantSelect.addEventListener('change', checkCompatibility);
    soilSelect.addEventListener('change', checkCompatibility);
});