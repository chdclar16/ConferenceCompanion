window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/states/'

    const response = await fetch(url);
    console.log({"response":response})
    if (response.ok) {
        const data = await response.json();
        // console.log({"data": data})
        const stateTag = document.getElementById('state')

        for (let state of data){
            const newDiv = document.createElement('option')
            newDiv.value = state.abbreviation;
            newDiv.innerHTML = state.name;
            stateTag.appendChild(newDiv)
        }
    }

    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(formTag)
        const json = JSON.stringify(Object.fromEntries(formData));

        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
            method: 'post',
            body: json,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            // const newLocation = await response.json();
            // console.log(newLocation)
        }

    });
});
