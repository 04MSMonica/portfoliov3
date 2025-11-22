const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(gltf|glb)$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
