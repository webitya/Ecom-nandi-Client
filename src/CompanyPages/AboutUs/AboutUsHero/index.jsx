const AboutUsHero = () => {
    return (
        <>
            <div className="about-us-container bg-gray-100 py-16">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800">About Ecom Nandi</h1>
                        <p className="text-lg text-gray-600 mt-4">
                            Welcome to Ecom Nandi - Your trusted partner in seamless online shopping.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <img 
                                src="/path-to-your-image.jpg" 
                                alt="About Ecom Nandi" 
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                At Ecom Nandi, our mission is to provide top-notch products and services that bring convenience and joy to your everyday life. 
                                We aim to connect people with high-quality, affordable, and sustainable products through a seamless online shopping experience.
                            </p>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
                            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
                                <li>Customer-first approach</li>
                                <li>Commitment to quality and sustainability</li>
                                <li>Innovation and adaptability</li>
                                <li>Empowering local businesses</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose Ecom Nandi?</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            With Ecom Nandi, you gain access to a wide range of products, user-friendly navigation, and exceptional customer service. 
                            Experience the difference in online shopping with us!
                        </p>
                        <div className="flex flex-wrap justify-center gap-8">
                            <div className="w-full md:w-1/4 text-center">
                                <div className="p-6 bg-white shadow-lg rounded-lg">
                                    <h3 className="text-xl font-bold text-gray-800">Wide Product Range</h3>
                                    <p className="text-gray-600 mt-4">
                                        From electronics to fashion, we have everything you need in one place.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 text-center">
                                <div className="p-6 bg-white shadow-lg rounded-lg">
                                    <h3 className="text-xl font-bold text-gray-800">Customer Satisfaction</h3>
                                    <p className="text-gray-600 mt-4">
                                        Our team is dedicated to ensuring you have the best shopping experience.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 text-center">
                                <div className="p-6 bg-white shadow-lg rounded-lg">
                                    <h3 className="text-xl font-bold text-gray-800">Fast Delivery</h3>
                                    <p className="text-gray-600 mt-4">
                                        Enjoy quick and reliable delivery right to your doorstep.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 bg-blue-50 p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-semibold text-blue-700">Join the Ecom Nandi Community</h2>
                        <p className="text-gray-700 mt-4 leading-relaxed">
                            Be part of our journey to revolutionize e-commerce. Stay updated with the latest products, offers, and community initiatives.
                        </p>
                        <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsHero;