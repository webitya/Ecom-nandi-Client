const ContactUsHero = () => {
    return (
        <>
            <div className="contact-us-container bg-gray-100 py-16">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
                        <p className="text-lg text-gray-600 mt-4">
                            We value your feedback and inquiries. Reach out to us anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Have a question, comment, or suggestion? Fill out the form below, and we’ll get back to you as soon as possible.
                            </p>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-gray-800 font-semibold mb-2" htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-800 font-semibold mb-2" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Your Email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-800 font-semibold mb-2" htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Your Message"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                You can also reach us through the following contact details:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <span className="text-blue-600 font-semibold mr-2">Address:</span>
                                    123 Ecom Street, Nandi City, ND 56789
                                </li>
                                <li className="flex items-center">
                                    <span className="text-blue-600 font-semibold mr-2">Phone:</span>
                                    +1 (234) 567-8900
                                </li>
                                <li className="flex items-center">
                                    <span className="text-blue-600 font-semibold mr-2">Email:</span>
                                    support@ecomnandi.com
                                </li>
                            </ul>

                            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Follow Us</h2>
                            <div className="flex space-x-4">
                                <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                                <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                                <a href="#" className="text-blue-600 hover:text-blue-800">Instagram</a>
                                <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUsHero;