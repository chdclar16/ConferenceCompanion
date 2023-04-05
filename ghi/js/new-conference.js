window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/locations/'

    const response = await fetch(url);
    console.log({"response":response})
    if (response.ok) {
        const data = await response.json();
        console.log({"data": data})
        const locationTag = document.getElementById('location')

        for (let location of data.locations){
            console.log({"location":location})
            const newDiv = document.createElement("option")
            newDiv.value = location.id;
            console.log({"tomato":newDiv.value})
            newDiv.innerHTML = location.name;
            locationTag.appendChild(newDiv)
        }
    }

    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(formTag)
        const json = JSON.stringify(Object.fromEntries(formData));

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: 'post',
            body: json,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            // const newLocation = await response.json();
            // console.log(newLocation)
        }
    });
});
