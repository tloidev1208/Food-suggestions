'use client';

import Link from 'next/link';
import React from 'react';

const Signup = () => {
    return (
        <div className="h-screen w-screen overflow-hidden flex">
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/auth.avif')" }}
            ></div>
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
                <div className="w-full max-w-md px-6">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Đăng ký tài khoản mới</h2>
                     <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Nhập tên của bạn"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
                        Tiếp tục
                    </button>

                    <p className="mt-4 text-sm text-gray-500 text-center">
                        Bạn đã có tài khoản? <Link href="/sign-in" className="text-green-600 hover:underline">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
