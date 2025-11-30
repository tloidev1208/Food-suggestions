'use client';

import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Facebook, Instagram, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20 bg-gradient-to-r from-orange-200 via-orange-100 to-white border-t border-orange-300/40">
            <div className="px-8 py-10 mx-auto max-w-full">

                {/* Logo + mô tả */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-400 rounded-xl text-white shadow-md">
                            <UtensilsCrossed size={22} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Food AI</h2>
                    </div>

                    <p className="text-gray-600 md:text-right max-w-lg">
                        Gợi ý món ăn thông minh dựa trên sở thích và dinh dưỡng của bạn.  
                        Ăn ngon – sống khoẻ cùng AI.
                    </p>
                </div>

                {/* Đường phân cách */}
                <div className="my-8 border-t border-orange-300/40" />

                {/* Links + Social */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">

                    {/* Terms + Privacy */}
                    <div className="flex gap-6 mb-6 md:mb-0">
                        <Link href="#" className="text-gray-700 text-sm hover:text-orange-600 transition">
                            Terms
                        </Link>
                        <Link href="#" className="text-gray-700 text-sm hover:text-orange-600 transition">
                            Privacy
                        </Link>
                    </div>

                    {/* Social icons */}
                    <div className="flex items-center gap-4">
                        <Link href="#" className="p-2 rounded-lg bg-white shadow hover:shadow-md transition">
                            <Facebook size={18} className="text-gray-700 hover:text-orange-600 transition" />
                        </Link>
                        <Link href="#" className="p-2 rounded-lg bg-white shadow hover:shadow-md transition">
                            <Instagram size={18} className="text-gray-700 hover:text-orange-600 transition" />
                        </Link>
                        <Link href="#" className="p-2 rounded-lg bg-white shadow hover:shadow-md transition">
                            <Github size={18} className="text-gray-700 hover:text-orange-600 transition" />
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} Food AI. All Rights Reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
