import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import WeddingCalendar from "@/components/WeddingCalendar";
import RSVPForm from "@/components/RSVPForm";
import Venue from "@/components/Venue";
import Promo from "@/components/Promo";
import Countdown from "@/components/Countdown";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Featured />
      <WeddingCalendar />
      <Venue />
      <RSVPForm />
      <Promo />
      <Countdown />
      <Footer />
    </main>
  );
};

export default Index;