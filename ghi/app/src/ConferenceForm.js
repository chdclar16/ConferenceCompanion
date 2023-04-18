import React, { useEffect, useState } from "react";

export default function ConferenceForm() {
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [description, setDescription] = useState("");
  const [attendees, setAttendees] = useState("");
  const [presentations, setPresentations] = useState("");
  const [locationName, setLocation] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleStarts = (event) => {
    const value = event.target.value;
    setStarts(value);
  };

  const handleEnds = (event) => {
    const value = event.target.value;
    setEnds(value);
  };

  const handleDescription = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleAttendees = (event) => {
    const value = event.target.value;
    setAttendees(value);
  };

  const handlePresentations = (event) => {
    const value = event.target.value;
    setPresentations(value);
  };

  const handleLocation = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.name = name;
    data.starts = starts;
    data.ends = ends;
    data.description = description;
    data.max_attendees = attendees;
    data.max_presentations = presentations;
    data.location = locationName;

    const conferencesUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("fetch", data);
    const response = await fetch(conferencesUrl, fetchConfig);
    console.log(response);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);

      setName("");
      setStarts("");
      setEnds("");
      setAttendees("");
      setDescription("");
      setPresentations("");
      setLocation("");
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8000/api/locations/";

    const response = await fetch(url);
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-location-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">
                  Name
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleStarts} value={starts}
                  required
                  type="date"
                  name="starts"
                  id="starts"
                  className="form-control"
                />
                <label htmlFor="starts">
                  Starts
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleEnds}
                  value={ends}
                  required
                  type="date"
                  name="ends"
                  id="ends"
                  className="form-control"
                />
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="description exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  onChange={handleDescription}
                  value={description}
                  name="description"
                  id="description"
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handlePresentations}
                  value={presentations}
                  placeholder="Maximum presentations"
                  required
                  type="number"
                  name="max_presentations"
                  id="max_presentations"
                  className="form-control"
                />
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleAttendees}
                  value={attendees}
                  placeholder="Maximum attendees"
                  required
                  type="number"
                  name="max_attendees"
                  id="exampleFormControlTextarea1"
                  className="form-control"
                />
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={handleLocation} value={locationName}
                  required
                  id="location"
                  name="location"
                  className="form-select"
                >
                  <option>
                    Choose a location
                  </option>
                  {locations.map((location) => {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.name}
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
