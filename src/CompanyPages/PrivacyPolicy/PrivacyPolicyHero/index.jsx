const PrivacyPoliciesHero = () => {
    return (
        <>
            <div className="privacy-policies-container bg-gray-100 py-16">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800">Privacy Policies</h1>
                        <p className="text-lg text-gray-600 mt-4">
                            Your privacy is important to us. Learn more about how we handle your data.
                        </p>
                    </div>

                    <div className="space-y-10">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                            <p className="text-gray-600 leading-relaxed">
                                At Ecom Nandi, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
                                <li>Personal information, such as name, email address, and phone number, provided during account creation or purchases.</li>
                                <li>Payment information for processing transactions securely.</li>
                                <li>Browsing data, including cookies, IP address, and usage logs, to enhance your experience.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We use your data to provide and improve our services, process orders, and communicate with you about updates, promotions, and support.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Protection</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Ecom Nandi employs advanced security measures to ensure your data is stored and processed securely. Access to your information is restricted to authorized personnel only.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sharing Your Information</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We do not sell or share your personal information with third parties, except as required by law or to provide essential services (e.g., payment processors).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
                            <p className="text-gray-600 leading-relaxed">
                                You have the right to access, update, or delete your personal information. Contact us at <a href="mailto:privacy@ecomnandi.com" className="text-blue-600 hover:underline">privacy@ecomnandi.com</a> for assistance.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Policy Updates</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may update our Privacy Policy periodically. We encourage you to review this page regularly for the latest information on our practices.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have any questions about our Privacy Policy, feel free to reach out to us at <a href="mailto:privacy@ecomnandi.com" className="text-blue-600 hover:underline">privacy@ecomnandi.com</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPoliciesHero;
