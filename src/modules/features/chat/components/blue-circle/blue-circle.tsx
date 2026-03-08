// Componente do círculo azul com gradiente
export const BlueCircle = ({ size = 200 }: { size?: number }) => {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Círculo principal com gradiente */}
      <div
        className="relative rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
        style={{
          width: size,
          height: size,
          boxShadow: `
            0 20px 60px rgba(59, 130, 246, 0.3),
            0 8px 24px rgba(59, 130, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
          `,
        }}
      >
        {/* Brilho interno superior */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-white/40 to-transparent"
          style={{
            top: size * 0.15,
            left: size * 0.2,
            width: size * 0.3,
            height: size * 0.3,
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* Sombra de fundo */}
      <div
        className="absolute rounded-full bg-gray-200/60 blur-sm"
        style={{
          bottom: -size * 0.05,
          left: "50%",
          transform: "translateX(-50%)",
          width: size * 0.8,
          height: size * 0.15,
          zIndex: -1,
        }}
      />
    </div>
  );
};
