import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nihil
            consequatur eum similique pariatur nemo est natus animi voluptatibus
            maiores aspernatur, delectus, laboriosam necessitatibus et, magni
            quam. Repudiandae, cum velit!
          </p>
          <p>
            Qui, quaerat animi. Quo animi reprehenderit neque dolorem!
            Consequuntur sit odio nam facere.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            dicta ea pariatur dolore, laboriosam unde reiciendis voluptatum
            voluptas a atque sed, similique aliquid facilis eum fuga amet!
            Voluptatibus, ratione ducimus.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance: </b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur explicabo modi officiis tenetur labore quas quos ipsa
            quam accusantium repudiandae doloribus illum, consectetur, facilis
            deleniti ipsam culpa assumenda nisi. Fugiat.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience: </b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur explicabo modi officiis tenetur labore quas quos ipsa
            quam accusantium repudiandae doloribus illum, consectetur, facilis
            deleniti ipsam culpa assumenda nisi. Fugiat.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur explicabo modi officiis tenetur labore quas quos ipsa
            quam accusantium repudiandae doloribus illum, consectetur, facilis
            deleniti ipsam culpa assumenda nisi. Fugiat.
          </p>
        </div>
      </div>

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

export default About;
