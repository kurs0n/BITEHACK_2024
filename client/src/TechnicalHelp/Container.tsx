import React from 'react';

// Komponent funkcyjny bez propsów
const Container: React.FC = () => {
  return (
    <div>
    <div>
      <h1>Witaj, w czym mogę ci dzisiaj pomóc?</h1>

      <div>
        <span>Jak zmienić czcionkę na większą?</span>
        <span>➤</span>
      </div>

      <ol>
        <li>Kliknij w ikonę ustawień</li>
        <li>Wpisz w pasku wyszukiwania "czcionka"</li>
        <li>Kliknij w pierwszą opcję od góry</li>
        <li>Kliknij w opcje "Czcionka i Rozmiar"</li>
        <li>Dostosuj suwakiem preferowany rozmiar</li>
      </ol>
    </div>
  </div>
  );
};

// Eksport komponentu
export default Container;

