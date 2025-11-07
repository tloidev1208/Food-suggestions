import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold text-red-600 mb-2">Liên hệ với chúng tôi</h1>
      <p className="text-gray-600 mb-6 text-center max-w-lg">
        Nếu bạn có bất kỳ thắc mắc nào về dinh dưỡng, món ăn hoặc dịch vụ của NutriAI,
        hãy để lại thông tin và chúng tôi sẽ phản hồi sớm nhất có thể.
      </p>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Form liên hệ */}
        <form className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Nhập họ tên của bạn"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nội dung
            </label>
            <textarea
              placeholder="Nhập nội dung bạn muốn gửi..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Gửi liên hệ
          </button>
        </form>

        {/* Thông tin liên hệ */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Thông tin liên hệ</h2>

            <p className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-red-500" /> 62 đường 100 phường Tân Phú Quận 9, TP.HCM
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <Phone className="w-5 h-5 text-red-500" /> (028) 1234 5678
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <Mail className="w-5 h-5 text-red-500" /> qizapy@nutriai.vn
            </p>

            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-600 transition">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Google Map (tùy chọn) */}
          <div className="mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6017582158687!2d106.6799836745196!3d10.7626226593637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ecbb2a60c97%3A0xd0a1d17a16283cf7!2zMjczIEFuIMSQxrDhu51uZyBWxrDhu6NuZywgUGjGsOG7nW5nIDE0LCBRdeG6rW4gNSwgSOG7kyBDaMOtbmgsIFZpZXRuYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
