const prod = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: prod ? false : true,
});

const nextConfig = {
  devIndicators: false,
};

module.exports = withPWA({
  ...nextConfig,
  async redirects() {
    return [
      {
        source: '/official-website/deeplearning',
        destination: 'https://learn.deeplearning.ai/accomplishments/b97023e9-0bae-4cdf-8924-6886f112626f?usp=sharing',
        permanent: true,
      },
      {
        source: '/official-website/graphacademy',
        destination: 'https://graphacademy.neo4j.com/c/eae960cb-4b90-4580-a379-6509ded1a8f7/',
        permanent: true,
      },
      {
        source: '/official-website/guvi',
        destination: 'https://www.guvi.in/verify-certificate?id=SY17r4C46JR9100975',
        permanent: true,
      },
    ];
  },
});
