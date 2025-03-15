import { Home } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="max-w-[1440px] mx-auto flex flex-col items-center justify-center text-secondary px-4 md:px-8 lg:px-16 overflow-x-hidden">
      <p className="text-4xl font-semibold text-center text-secondary mt-8">
        Why Choose Us
      </p>
      <p className="text-center text-secondary mt-4 w-full md:w-[70%] lg:w-[60%]">
        Choose from our wide range of services. We offer a variety of options to
        suit your needs.
      </p>
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:flex-row justify-between items-center mt-8">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-sm">
          <div className="space-y-8">
            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-center gap-2">
                <Home className="text-primary text-lg" />
                <h3 className="text-lg font-semibold text-secondary">
                  Smart Home Design
                </h3>
              </div>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur. Convallis neque ut
                tellus suscipit leo at. Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>

            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-center gap-2">
                <Home className="text-primary text-lg" />
                <h3 className="text-lg font-semibold text-secondary">
                  Energy Efficient
                </h3>
              </div>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur. Convallis neque ut
                tellus suscipit leo at. Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>

            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-center gap-2">
                <Home className="text-primary text-lg" />
                <h3 className="text-lg font-semibold text-secondary">
                  Modern Amenities
                </h3>
              </div>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur. Convallis neque ut
                tellus suscipit leo at. Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full hidden md:w-1/2 md:flex justify-center">
          <img
            src="/image4.jpeg"
            alt="Modern Home"
            className="w-full max-w-md rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
