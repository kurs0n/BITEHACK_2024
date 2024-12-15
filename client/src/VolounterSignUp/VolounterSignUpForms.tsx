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
      setFormData({
        ...formData,
        tags: selectedCategories.filter((item) => item !== category),
      });
    } else {
      setFormData({
        ...formData,
        tags: [...selectedCategories, category],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-1 p-4 sm:p-6 md:p-8 rounded-3xl w-full max-w-5xl"
    >
      <h2 className="col-span-1 sm:col-span-2 text-3xl font-bold text-center text-stone-800 mb-4">
        Zapisz Się jako Wolontariusz
      </h2>
      <div>
        <label className="block text-stone-600 font-semibold mb-2">Imię</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
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
          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
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
          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
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
          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
          placeholder="Wpisz swój numer telefonu"
          required
          pattern="^[0-9]{9}$"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-stone-600 font-semibold mb-2">Wybierz kategorie pomocy</label>
        <div className="flex flex-wrap gap-4">
          {Object.keys(Categories).map((key) => {
            const category = Categories[key as keyof typeof Categories];
            const isSelected = formData.tags.includes(category);
            return (
              <button
                type="button"
                key={category}
                className={`px-6 py-2 rounded-full border-2 font-semibold text-sm transition-all shadow-md focus:outline-none ${
                  isSelected
                    ? "bg-lime-400 border-lime-600 text-stone-900"
                    : "bg-stone-200 border-stone-400 text-stone-800 hover:bg-stone-300"
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
      <div className="sm:col-span-2 flex justify-center">
        <select
          name="voivodeship"
          value={formData.voivodeship}
          onChange={handleChange}
          className="w-1/2 sm:w-1/4 px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          <option value="" disabled>
            Wybierz województwo
          </option>
          {Object.keys(Regions).map((key) => (
            <option key={key} value={Regions[key as keyof typeof Regions]}>
              {Regions[key as keyof typeof Regions]}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2 flex justify-center">
        <button
          type="submit"
          className="bg-stone-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-stone-700 transition duration-300 w-1/2"
        >
          Wyślij formularz
        </button>
      </div>
    </form>
  );
};

export default VolunteerSignUpForm;
