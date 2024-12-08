import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 text-gray-800">
      <Navbar />
      <div className="container mx-auto py-12 px-4 md:px-8">
        <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-300">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Hi, I’m <span className="font-bold">Rayhan Usmanu</span>, Motivated U.S. Army Soldier, IT Specialist, and Computer Science Major
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
          Driven IT Specialist and U.S. Army Reservist with a focus on Computer Science.
          I am an African American Muslim from New York City, currently pursuing a Computer Science degree at Lehman College. Alongside my academic journey, I serve as a U.S. Army Reservist with certifications as an IT Specialist. My hands-on experience includes computer networking, router and switch configuration, and software installation. I am deeply passionate about software development, website building, and cybersecurity. My goal is to leverage my technical expertise and military leadership experience as I work toward commissioning as a U.S. Army Officer.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            When I’m not coding, you can find me exploring creative pursuits, engaging with my community, or sharing knowledge with fellow enthusiasts. Feel free to connect with me through the links below!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <a
              href="https://www.linkedin.com/in/rayhanusmanu/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-3 mb-4 sm:mb-0 text-center bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/rayhanica1/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-3 mb-4 sm:mb-0 text-center bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:Rayhanusmanu1@gmail.com"
              className="block px-6 py-3 text-center bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition-colors"
            >
              Email Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
