import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div style={{
      position: "fixed", // fixed so it always fills screen
      inset: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,         // behind your main content
      pointerEvents: "none" // so you can click buttons/links through it
    }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        style={{ width: "100%", height: "100%" }}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 100, density: { enable: true, area: 800 } },
            color: { value: "#bdbdbd" },
            links: {
              enable: true,
              color: "#ff0000",
              distance: 120,
              opacity: 0.25,
              width: 1,
            },
            move: { enable: true, speed: 2 },
            size: { value: 3 },
            opacity: { value: 0.6 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
          },
          fullScreen: { enable: false }, // IMPORTANT: disables default fullScreen mode
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
