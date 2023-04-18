    import React, { useEffect, useState } from "react";

    export default function PresentationForm() {
    const [conferences, setConference] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [presenterName, setPresenterName] = useState("");
    const [presenterEmail, setPresenterEmail] = useState("");
    const [presentationTitle, setPresentationTitle] = useState("");
    const [presentationSynopsis, setPresentationSynopsis] = useState("");
    const [conferenceName, setConferenceName] = useState("");

    const fetchData = async () => {
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setConference(data.conferences);
        console.log("fetchdata", data.conferences);
    }
    };

    useEffect(() => {
    fetchData();
    }, []);

    const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.conference = conferenceName;
    data.presenter_name = presenterName;
    data.presenter_email = presenterEmail;
    data.title = presentationTitle;
    data.synopsis = presentationSynopsis;
    data.company_name = companyName;

    console.log("data" , data)
    const presentationURL = `http://localhost:8000${data.conference}presentations/`;
    const fetchOptions = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        "Content-Type": "application/json",
        },
    };
    const attendeeResponse = await fetch(presentationURL, fetchOptions);
    console.log("response" ,attendeeResponse);
    if (attendeeResponse.ok) {
        setConferenceName('');
        setPresenterName('');
        setPresenterEmail('');
        setPresentationTitle('');
        setPresentationSynopsis('');
        setCompanyName('');
    }
    };

    const handleCompanyChange = (event) => {
    const value = event.target.value;
    setCompanyName(value);
    };

    const handleNameChange = (event) => {
    const value = event.target.value;
    setPresenterName(value);
    };

    const handleEmailChange = (event) => {
    const value = event.target.value;
    setPresenterEmail(value);
    };

    const handleTitleChange = (event) => {
    const value = event.target.value;
    setPresentationTitle(value);
    };

    const handleSynopsisChange = (event) => {
    const value = event.target.value;
    setPresentationSynopsis(value);
    };

    const handleConferenceChange = (event) => {
    const value = event.target.value;
    setConferenceName(value);
    };

    return (
    <div className="container">
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="form-floating mb-3">
                <input
                    placeholder="Presenter name"
                    required
                    type="text"
                    name="presenter_name"
                    id="presenter_name"
                    className="form-control"
                    onChange={handleNameChange}
                    value={presenterName}
                />
                <label htmlFor="presenter_name">Presenter name</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    placeholder="Presenter email"
                    required
                    type="email"
                    name="presenter_email"
                    id="presenter_email"
                    className="form-control"
                    onChange={handleEmailChange}
                    value={presenterEmail}
                />
                <label htmlFor="presenter_email">Presenter email</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    placeholder="Company name"
                    type="text"
                    name="company_name"
                    id="company_name"
                    className="form-control"
                    onChange={handleCompanyChange}
                    value={companyName}
                />
                <label htmlFor="company_name">Company name</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    placeholder="Title"
                    required
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    onChange={handleTitleChange}
                    value={presentationTitle}
                />
                <label htmlFor="title">Title</label>
                </div>
                <div className="mb-3">
                <label htmlFor="synopsis">Synopsis</label>
                <textarea
                    className="form-control"
                    id="synopsis"
                    rows="3"
                    name="synopsis"
                    onChange={handleSynopsisChange}
                    value={presentationSynopsis}
                ></textarea>
                </div>
                <div className="mb-3">
                <select
                    required
                    name="conference"
                    id="conference"
                    className="form-select"
                    onChange={handleConferenceChange}
                >
                    <option>Choose a conference</option>
                    {conferences.map(conference => {
                    return (
                        <option key={conference.href} value={conference.href}>
                        {conference.name}
                        </option>
                    );
                    })}
                </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
            </div>
        </div>
        </div>
    </div>
    );
    }
