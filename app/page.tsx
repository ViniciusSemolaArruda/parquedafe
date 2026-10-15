import Atracoes from "@/src/components/Atracoes/Atracoes";
import Experiencia from "@/src/components/Experiencia/Experiencia";
import Footer from "@/src/components/Footer/Footer";
import Header from "@/src/components/Header/Header";
import Hero from "@/src/components/Hero/Hero";
import Mapa from "@/src/components/Mapa/Mapa";
import Sobre from "@/src/components/Sobre/Sobre";



export default function Home() {
  return (
    <>
      {/* Menu de navegação */}
      <Header />

      <main>
        {/* Apresentação principal do parque */}
        <Hero />

        {/* Principais atrações */}
        <Atracoes />
        {/* Sobre o Parque da Fé */}
        <Sobre />

        

        {/* Experiência e vídeo institucional */}
        <Experiencia />

        <Mapa />
      </main>

      {/* Rodapé */}
      <Footer />
    </>
  );
}
