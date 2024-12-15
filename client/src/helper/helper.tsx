import React, { useState } from "react";

interface HelperModalProps {
  src: string; // Ścieżka do obrazka (string)
}
const HelperModal: React.FC<HelperModalProps> = ({ src }) => {
  const [isOpen, setIsOpen] = useState(false); // Stan otwarcia modala

  const openModal = () => setIsOpen(true); // Funkcja otwierająca modal
  const closeModal = () => setIsOpen(false); // Funkcja zamykająca modal

  return (
    <div>
      <div className="p-2 text-stone-700 bg-1 rounded-l-full">
            <i onClick= {openModal} className="fa-regular fa-xl fa-circle-question text-stone-800"></i>
        </div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div className="relative max-w-screen max-h-screen rounded-3xl overflow-hidden">
            {/* Przycisk zamykający modal */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-stone-800 text-3xl font-bold hover:text-red-600"
            >
              &#x2715;
            </button>
            {/* Obrazek */}
            <img
              src= {src}
              alt="Zdjęcie"
              className="h-[60vh] object-cover"
            />
        </div>
      </div>
      )}
    </div>
  );
};

export default HelperModal;
