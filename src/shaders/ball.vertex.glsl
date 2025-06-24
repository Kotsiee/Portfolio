precision highp float;

layout(location = 0) in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec2 pointer;
uniform vec2 resolution;
uniform float spotlightIntensity;

out float vInfluence;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vec4 projected = projectionMatrix * mvPosition;

  // Convert to screen coordinates (pixels)
  vec2 screenPos = (projected.xy / projected.w * 0.5 + 0.5) * resolution;
  vec2 pointerPx = pointer * resolution;

  float dist = distance(screenPos, pointerPx);
  float influence = spotlightIntensity * exp(-dist * 0.9);

  vInfluence = influence;

  // Apply upward lift in clip space (screen Y direction)
  projected.y += influence * 0.9;

  gl_Position = projected;
  gl_PointSize = 4.0;
}