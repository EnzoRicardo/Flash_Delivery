import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center p-10 bg-black text-white">
      <h1 className="text-4xl font-bold">
        Sua entrega na <span className="text-yellow-400">velocidade</span> da sua <span className="text-red-500">fome</span>
      </h1>
      <p className="mt-4 text-lg text-gray-300">
        Do seu restaurante favorito direto para a sua porta, na velocidade que você merece!
      </p>
      <button className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition">
        Pedir
      </button>
    </section>
  );
};

export default Hero;
