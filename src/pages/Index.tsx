import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import WeddingCalendar from "@/components/WeddingCalendar";
import RSVPForm from "@/components/RSVPForm";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Featured />
      <WeddingCalendar />
      <RSVPForm />
      <Promo />
      <Footer />
    </main>
  );
};

export default Index;