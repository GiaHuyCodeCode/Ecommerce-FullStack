import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
      <df-messenger
        intent="WELCOME"
        chat-title="Test_ai_chat"
        agent-id="6c58e675-abcd-4013-a456-7f26e8666a14"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default Home;
