import React from "react";
import { FacebookIcon, MessageCircle, X } from "lucide-react";

const SocialShare = () => {
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

   const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      bg: "bg-blue-600",
      icon: <FacebookIcon size={18} />,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
      bg: "bg-sky-500",
      icon: <X size={18} />,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
      bg: "bg-blue-700",
      icon: <MessageCircle size={18} />,
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`,
      bg: "bg-red-500",
      icon: <MessageCircle size={18} />,
    },
  ];

  return (
    <div className="">
        <h2 className="text-xl font-semibold mb-4 text-center">Chia sẻ SnapToEat với bạn bè:</h2>
         <div className="flex gap-2 justify-center">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link.bg} text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:opacity-80 transition`}
        >
          {link.icon}
          <span className="hidden sm:inline">{link.name}</span>
        </a>
      ))}
    </div>
    </div>
  );
};

export default SocialShare;
