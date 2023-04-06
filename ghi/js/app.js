window.addEventListener('DOMContentLoaded',async () => {
    const url = 'http://localhost:8000/api/conferences/'

function createCard(title, description, pictureUrl, dateStart, dateEnd, location) {
    return `
        <div class="col-md-6 col-lg-3 mb-4">
        <div class="card shadow p-3 mb-5 bg-body-tertiary rounded m-0">
            <img src="${pictureUrl}" class="card-img-top img-fluid w-100 rounded-start" style="object-fit: cover;" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                <p class="card-text">${description}</p>
                <div class="card-footer border-success">${dateStart.toLocaleDateString()} - ${dateEnd.toLocaleDateString()}</div>
            </div>
        </div>
        </div>
    `;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
          // Figure out what to do when the response is bad
        throw new Error('Response not ok');
        } else {
        const data = await response.json();

        for (let conference of data.conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                const title = details.conference.name;
                const description = details.conference.description;
                const pictureUrl = details.conference.location.picture_url;
                const dateStart = new Date(details.conference.starts)
                const dateEnd = new Date(details.conference.ends)
                const location = details.conference.location.name
                const html = createCard(title, description, pictureUrl, dateStart, dateEnd, location);
                const column = document.querySelector('.row')
                column.innerHTML += html;
            }
        }

        }
        } catch (e) {
            // Figure out what to do if an error is raised
            console.error('error', error);
        }

    });
