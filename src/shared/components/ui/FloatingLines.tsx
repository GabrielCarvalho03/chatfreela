import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SimpleFloatingLinesProps {
  backgroundColor?: string;
  lineColor?: string;
  lineCount?: number;
  animationSpeed?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  lineThickness?: number;
  interactive?: boolean;
}

export default function SimpleFloatingLines({
  backgroundColor = "#ffffff",
  lineColor = "#3b82f6", // blue-500
  lineCount = 5,
  animationSpeed = 1.0,
  waveAmplitude = 0.3,
  waveFrequency = 2.0,
  lineThickness = 0.02,
  interactive = true,
}: SimpleFloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(backgroundColor); // Fundo branco configurável
    container.appendChild(renderer.domElement);

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Fragment shader
    const fragmentShader = `
      precision highp float;
      
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_lineCount;
      uniform float u_animationSpeed;
      uniform float u_waveAmplitude;
      uniform float u_waveFrequency;
      uniform float u_lineThickness;
      uniform vec3 u_lineColor;
      uniform bool u_interactive;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec3 color = vec3(0.0);
        
        float time = u_time * u_animationSpeed;
        
        for (float i = 0.0; i < u_lineCount; i++) {
          float offset = i * 0.5;
          float wave = sin(uv.x * u_waveFrequency + time + offset) * u_waveAmplitude;
          
          // Interatividade com mouse
          if (u_interactive) {
            vec2 mouseInfluence = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
            float mouseDistance = length(uv - mouseInfluence);
            wave += sin(mouseDistance * 10.0 - time * 2.0) * 0.1 * exp(-mouseDistance * 2.0);
          }
          
          float linePosition = (i / (u_lineCount - 1.0)) * 2.0 - 1.0; // De -1 a 1
          float line = u_lineThickness / abs(uv.y - linePosition - wave * 0.5);
          
          color += u_lineColor * line * (0.5 + 0.5 * sin(time + offset));
        }
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Uniforms
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2() },
      u_lineCount: { value: lineCount },
      u_animationSpeed: { value: animationSpeed },
      u_waveAmplitude: { value: waveAmplitude },
      u_waveFrequency: { value: waveFrequency },
      u_lineThickness: { value: lineThickness },
      u_lineColor: { value: new THREE.Color(lineColor) },
      u_interactive: { value: interactive },
    };

    // Material and mesh
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Clock for animation
    const clock = new THREE.Clock();

    // Resize handler
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
    };

    // Mouse handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;

      const rect = container.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;

      uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
    };

    // Initial setup
    handleResize();
    window.addEventListener("resize", handleResize);

    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        container.removeEventListener("mousemove", handleMouseMove);
      }

      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    backgroundColor,
    lineColor,
    lineCount,
    animationSpeed,
    waveAmplitude,
    waveFrequency,
    lineThickness,
    interactive,
  ]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ backgroundColor }} // Fallback CSS
    />
  );
}
