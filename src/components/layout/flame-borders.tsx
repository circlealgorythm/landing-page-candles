"use client";

import React, { useEffect, useRef } from "react";

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.05;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float dLeft = uv.x;
  float dRight = 1.0 - uv.x;
  float sideDist = min(dLeft, dRight);

  // Боковая зона огня: 20% ширины экрана с каждого края. Центр экрана 100% свободен.
  float maxReach = 0.20;
  if (sideDist > maxReach) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Нормализованная координата от кромки экрана к центру
  float xCoord = sideDist / maxReach;

  // Плавное, неспешное медитативное колыхание пламени свечи
  float t = u_time * 0.22;
  vec2 p = vec2(xCoord * 3.4, uv.y * 3.6 - t);

  // Мягкая вихревая турбулентность пламени
  float q = fbm(p);
  vec2 r = vec2(
    fbm(p + q + vec2(1.7, 9.2) - t * 0.14),
    fbm(p + q + vec2(8.3, 2.8) - t * 0.09)
  );
  float f = fbm(p + r * 1.15);

  // Форма затухания языков пламени в сторону центра
  float flameMask = 1.0 - smoothstep(0.0, 1.0, xCoord);
  flameMask = pow(flameMask, 1.4);

  // Интенсивность языков огня
  float flame = f * flameMask;
  flame = smoothstep(0.12, 0.78, flame);

  if (flame < 0.005) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Мягкая теплая свечная палитра (золото, янтарь, карамель)
  vec3 colSmoke = vec3(0.40, 0.07, 0.01);
  vec3 colAmber = vec3(1.0, 0.46, 0.07);
  vec3 colGold  = vec3(1.0, 0.80, 0.22);
  vec3 colCore  = vec3(1.0, 0.95, 0.82);

  vec3 color = mix(colSmoke, colAmber, smoothstep(0.05, 0.38, flame));
  color = mix(color, colGold, smoothstep(0.38, 0.72, flame));
  color = mix(color, colCore, smoothstep(0.72, 1.0, flame));

  // Очень деликатная, ненавязчивая прозрачность
  float alpha = flame * flameMask * 0.22;

  gl_FragColor = vec4(color * alpha, alpha);
}
`;

export function FlameBorders() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: false, depth: false }) ||
      (canvas.getContext("experimental-webgl", { alpha: true, antialias: false, depth: false }) as WebGLRenderingContext | null);

    if (!gl) return;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let animationFrameId: number;
    const startTime = performance.now();
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    let isTabVisible = !document.hidden;

    const render = () => {
      if (!isTabVisible) return;
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform1f(timeLoc, elapsed);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !isReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 h-full w-full select-none"
    />
  );
}
