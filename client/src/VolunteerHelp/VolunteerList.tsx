import React, { useState, useEffect } from "react";
import Modal from "./Modal";

type Volunteer = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  category: string;
  voivodeship: string;
  photoUrl: string;
};

const VolunteerList: React.FC = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>(""); // To store user input (prompt)
  const [voivodeship, setVoivodeship] = useState<string>("Mazowieckie"); // Default voivodeship (can be dynamically set)

  // Fetch the volunteer list based on the user's input and voivodeship
  const fetchVolunteers = async () => {
    if (userInput.trim() === "") return; // Skip fetching if no input is provided

    setIsLoading(true);
    try {
      const response = await fetch("/list-volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userInput,
          voivodeship: voivodeship,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const formattedVolunteers = data.map((volunteer: any) => ({
          name: volunteer.name,
          surname: volunteer.surname,
          email: volunteer.email,
          phoneNumber: volunteer.telephone_number,
          category: volunteer.tags.join(", "), // Join tags into a single string
          voivodeship: volunteer.voivodeship,
          photoUrl: volunteer.photo,
        }));
        setVolunteers(formattedVolunteers);
      }
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers(); // Fetch volunteers whenever the input changes or voivodeship is set
  }, [userInput, voivodeship]);

  const handleVolunteerClick = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  const closeModal = () => {
    setSelectedVolunteer(null);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Lista pomocy</h2>

      <div className="mb-4">
        <input
          type="text"
          className="p-2 border border-stone-800 rounded-lg"
          placeholder="Wpisz opis zadania"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <select
          className="p-2 ml-4 border border-stone-800 rounded-lg"
          value={voivodeship}
          onChange={(e) => setVoivodeship(e.target.value)}
        >
          <option value="Mazowieckie">Mazowieckie</option>
          <option value="Małopolskie">Małopolskie</option>
          <option value="Pomorskie">Pomorskie</option>
          {/* Add more voivodeships as needed */}
        </select>
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        <ul className="space-y-4">
          {isLoading ? (
            <li className="text-center">Ładowanie...</li>
          ) : (
            volunteers.map((volunteer, index) => (
              <li
                key={index}
                onClick={() => handleVolunteerClick(volunteer)}
                className="cursor-pointer bg-1 p-4 rounded-lg flex items-center space-x-4 hover:scale-95 transition-all duration-150"
              >
                <img
                  src={volunteer.photoUrl}
                  alt={`${volunteer.name} ${volunteer.surname}`}
                  className="w-16 h-16 rounded-full border-2 border-stone-800"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <i className="fa-solid fa-user text-stone-800"></i>
                    <span className="font-semibold">
                      {volunteer.name} {volunteer.surname}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <i className="fa-solid fa-hand-holding-heart text-stone-800"></i>
                    <span>{volunteer.category}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <i className="fa-solid fa-phone-alt text-stone-800"></i>
                    <span>{volunteer.phoneNumber}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-map-marker-alt text-stone-800"></i>
                  <span>{volunteer.voivodeship}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {selectedVolunteer && <Modal volunteer={selectedVolunteer} onClose={closeModal} />}
    </div>
  );
};

export default VolunteerList;
