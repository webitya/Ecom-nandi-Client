const TermsConditionsHero = () => {
    return (
        <>
            <div className="terms-conditions-container bg-gray-100 py-16">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800">Terms and Conditions</h1>
                        <p className="text-lg text-gray-600 mt-4">
                            Please read these terms and conditions carefully before using our services.
                        </p>
                    </div>

                    <div className="space-y-10">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                            <p className="text-gray-600 leading-relaxed">
                                These terms and conditions govern your use of the Ecom Nandi platform. By accessing or using our services, you agree to comply with these terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Eligibility</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Users must be at least 18 years old to create an account or make purchases on our platform. By using our services, you confirm that you meet this requirement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Responsibilities</h2>
                            <p className="text-gray-600 leading-relaxed">
                                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prohibited Activities</h2>
                            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
                                <li>Engaging in fraudulent activities or submitting false information.</li>
                                <li>Using the platform for any unlawful purposes.</li>
                                <li>Disrupting or interfering with the platform’s operations.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
                            <p className="text-gray-600 leading-relaxed">
                                All content on the Ecom Nandi platform, including text, images, and logos, is the intellectual property of Ecom Nandi. Unauthorized use is prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Ecom Nandi is not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to update these terms and conditions at any time. Continued use of our platform constitutes acceptance of the updated terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have any questions or concerns about these terms, please contact us at <a href="mailto:support@ecomnandi.com" className="text-blue-600 hover:underline">support@ecomnandi.com</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsConditionsHero;
