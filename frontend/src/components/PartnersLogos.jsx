import React from "react";

const partners = [
  { name: "Dropbox",  logo: "https://cdn.simpleicons.org/dropbox/1f6c8c"  },
  { name: "Slack",    logo: "https://cdn.simpleicons.org/slack/1f6c8c"    },
  { name: "Spotify",  logo: "https://cdn.simpleicons.org/spotify/1f6c8c"  },
  { name: "Figma",    logo: "https://cdn.simpleicons.org/figma/1f6c8c"    },
  { name: "Notion",   logo: "https://cdn.simpleicons.org/notion/1f6c8c"   },
  { name: "GitHub",   logo: "https://cdn.simpleicons.org/github/1f6c8c"   },
  { name: "LinkedIn", logo: "https://cdn.simpleicons.org/linkedin/1f6c8c" },
  { name: "Google",   logo: "https://cdn.simpleicons.org/google/1f6c8c"   },
];

const marqueeItems = [...partners, ...partners, ...partners];

const PartnersLogos = () => {
  return (
    <div style={{ width: "100%", overflow: "hidden", background: "#f3f3f3", paddingTop: "28px", paddingBottom: "28px" }}>
      <style>{`
        @keyframes marqueeRoll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .pl-track {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: marqueeRoll 20s linear infinite;
        }
        .pl-track:hover { animation-play-state: paused; }
        .pl-mask {
          overflow: hidden;
          width: 100%;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .pl-card {
          flex-shrink: 0;
          width: 110px;
          height: 54px;
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid rgba(31,108,140,0.08);
          box-shadow: 0 2px 8px rgba(31,108,140,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.28s ease, transform 0.28s ease;
        }
        .pl-card:hover {
          box-shadow: 0 6px 18px rgba(31,108,140,0.14);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="pl-mask">
        <div className="pl-track">
          {marqueeItems.map((partner, i) => (
            <div key={i} className="pl-card">
              <img
                src={partner.logo}
                alt={partner.name}
                style={{ height: "20px", width: "auto", maxWidth: "70px", objectFit: "contain", opacity: 0.65 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersLogos;