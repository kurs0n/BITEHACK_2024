import React, { useState } from "react";
import { Categories } from "./FormData"; 
import { Regions } from "./FormData";    

interface VolunteerFormData {
  name: string;
  surname: string;
  email: string;
  telephone_number: string;
  tags: string[];
  voivodeship: string;
}

const VolunteerSignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<VolunteerFormData>({
    name: "",
    surname: "",
    email: "",
    telephone_number: "",
    tags: [],
    voivodeship: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "selectedCategories") {
      const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions, (option) => option.value);
      setFormData({ ...formData, tags: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleCategory = (category: string) => {
    const { tags: selectedCategories } = formData;
    if (selectedCategories.includes(category)) {
      // Usuń kategorię
      setFormData({
        ...formData,
        tags: selectedCategories.filter((item) => item !== category),
      });
    } else {
      // Dodaj kategorię
      setFormData({
        ...formData,
        tags: [...selectedCategories, category],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Przesyłanie danych POST
    try {
      const response = await fetch("http://localhost:3000/create-volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas wysyłania danych");
      }

      const result = await response.json();
      console.log("Odpowiedź z serwera:", result);
      alert("Dziękujemy za przesłanie formularza!");
    } catch (error) {
      console.error("Błąd:", error);
      alert("Wystąpił błąd podczas wysyłania formularza.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <div>
        <label className="block text-stone-600 font-semibold mb-2">Imię</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Wpisz swoje imię"
          required
        />
      </div>
      <div>
        <label className="block text-stone-600 font-semibold mb-2">Nazwisko</label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Wpisz swoje nazwisko"
          required
        />
      </div>
      <div>
        <label className="block text-stone-600 font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Wpisz swój email"
          required
        />
      </div>
      <div>
        <label className="block text-stone-600 font-semibold mb-2">Numer telefonu</label>
        <input
          type="tel"
          name="telephone_number"
          value={formData.telephone_number}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Wpisz swój numer telefonu"
          required
          pattern="^[0-9]{9}$"
        />
      </div>

      <div>
        <label className="block text-stone-600 font-semibold mb-2">Wybierz kategorie pomocy</label>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(Categories).map((key) => {
            const category = Categories[key as keyof typeof Categories];
            const isSelected = formData.tags.includes(category);
            return (
              <button
                type="button"
                key={category}
                className={`px-4 py-2 rounded-md ${
                  isSelected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                } hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <label className="block text-stone-600 font-semibold mb-2">Wybierz województwo</label>
        <select
          name="voivodeship"
          value={formData.voivodeship}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          {Object.keys(Regions).map((key) => (
            <option key={key} value={Regions[key as keyof typeof Regions]}>
              {Regions[key as keyof typeof Regions]}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-stone-600 text-white py-2 px-4 rounded-md hover:bg-stone-700 transition duration-300"
      >
        Wyślij formularz
      </button>
    </form>
  );
};

export default VolunteerSignUpForm;
