'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <section className="w-full bg-gray-200">
            <div className="px-8 py-12 mx-auto max-w-7xl">
                <div className="grid grid-cols-2 gap-10 mb-3 md:grid-cols-3 lg:grid-cols-12 lg:gap-20">
                    {/* Logo và mô tả */}
                    <div className="col-span-3">
                        <Link href="#" className="text-xl font-black leading-none text-gray-900 select-none">
                            SnapToEat.
                        </Link>
                        <p className="my-4 text-xs leading-normal text-gray-500">
                            Beautifully hand-crafted components to help you build amazing pages.
                        </p>
                    </div>

                    {/* Product links */}
                    <nav className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Product</p>
                        {['Features', 'Integrations', 'Documentation', 'FAQs', 'Pricing'].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* About links */}
                    <nav className="col-span-1 md:col-span-1 lg:col-span-2">
                        <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">About</p>
                        {['Our Story', 'Company', 'Privacy', 'Blog'].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Contact links */}
                    <nav className="col-span-2 md:col-span-1 lg:col-span-2">
                        <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Contact</p>
                        {['Advertising', 'Press', 'Email', 'Partners', 'Jobs'].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="flex mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-700"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Subscribe */}
                    <div className="col-span-3">
                        <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                            Subscribe to our newsletter
                        </p>
                        <form action="#" className="mb-2">
                            <div className="relative flex items-center overflow-hidden border border-gray-200 rounded-lg">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 text-base leading-normal transition duration-150 ease-in-out bg-white focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                        <p className="text-xs leading-normal text-gray-500">
                            Get the latest updates and news about our service.
                        </p>
                    </div>
                </div>

                {/* Copyright + Links */}
                <div className="flex flex-col items-start justify-between pt-10 mt-10 border-t border-gray-100 md:flex-row md:items-center">
                    <p className="mb-6 text-sm text-left text-gray-600 md:mb-0">
                        © {new Date().getFullYear()} Food AI. All Rights Reserved.
                    </p>
                    <div className="flex items-start justify-start space-x-6 md:items-center md:justify-center">
                        <Link href="#" className="text-sm text-gray-600 transition hover:text-gray-800">
                            Terms
                        </Link>
                        <Link href="#" className="text-sm text-gray-600 transition hover:text-gray-800">
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
