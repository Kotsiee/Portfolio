precision highp float;

in float vInfluence;
out vec4 fragColor;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  // Base color + brighter where influence is stronger
  vec3 base = mix(vec3(0.0, 0.7, 0.7), vec3(0.9, 0.0, 1.0), vInfluence * 4.0);
  fragColor = vec4(base, 1.0);
}