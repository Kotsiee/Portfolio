precision highp float;

out vec4 fragColor;

in vec2 vUv;
uniform float time;
uniform float spotlightIntensity;
uniform vec2 pointer;
uniform vec2 resolution;

vec4 permute(vec4 x) {
  return mod((x * 34.0 + 1.0) * x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float perlinNoise3D(vec3 P) {
  const vec3 C = vec3(1.0 / 6.0, 1.0 / 3.0, 0.16666666666);
  const vec3 D = vec3(0.0, 0.5, 1.0);

  vec3 Pi0 = mod(floor(P), 289.0);
  vec3 Pi1 = mod(Pi0 + 1.0, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - 1.0;

  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.y, Pi0.y, Pi1.y, Pi1.y);
  vec4 iz0 = vec4(Pi0.z);
  vec4 iz1 = vec4(Pi1.z);

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = fract(ixy0 / 7.0) * 2.0 - 1.0;
  vec4 gy0 = fract(floor(ixy0 / 7.0) / 7.0) * 2.0 - 1.0;
  vec4 gz0 = 1.0 - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = fract(ixy1 / 7.0) * 2.0 - 1.0;
  vec4 gy1 = fract(floor(ixy1 / 7.0) / 7.0) * 2.0 - 1.0;
  vec4 gz1 = 1.0 - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(
    vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110))
  );
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;

  vec4 norm1 = taylorInvSqrt(
    vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111))
  );
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = smoothstep(0.0, 1.0, Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

float transition(float u_time, float duration, float x1, float x2, float delay) {
  float elapsed = u_time - delay;

  // If the transition hasn't started yet
  if (elapsed < 0.0) {
    return x1;
  }

  // If the transition is over
  if (elapsed >= duration) {
    return x2;
  }

  // Normalised progress (0 to 1)
  float t = elapsed / duration;

  // You can use smoothstep for easing or linear mix
  return mix(x1, x2, smoothstep(0.0, 1.0, t));
}

void main() {
  vec2 uv = vUv;
  vec2 centeredUv = (uv - 0.5) * vec2(resolution.x / resolution.y, 1.0);

  vec3 pos = vec3(centeredUv, time * 0.2);
  float n = perlinNoise3D(pos * 1.0);
  float delay = 0.9;
  float duration = 1.0;

  // vec3 color1 = vec3(0.02, 0.08, 0.12);
  // vec3 color2 = vec3(0.0, 0.4, 0.45);
  // vec3 color3 = vec3(0.0, 0.0, 0.25);
  // vec3 color4 = vec3(0.2, 0.65, 0.6);

  vec3 color1 = vec3(    
    transition(time, duration, 0.0, 0.02, delay),
    transition(time, duration, 0.0, 0.08, delay),
    transition(time, duration, 0.0, 0.12, delay));
  vec3 color2 = vec3(    
    transition(time, duration, 0.0, 0.0, delay),
    transition(time, duration, 0.0, 0.4, delay),
    transition(time, duration, 0.0, 0.45, delay));
  vec3 color3 = vec3(
        transition(time, duration, 0.0, 0.0, delay),
    transition(time, duration, 0.0, 0.0, delay),
    transition(time, duration, 0.0, 0.25, delay)
  );
  vec3 color4 = vec3(
    transition(time, duration, 0.0, 0.2, delay),
    transition(time, duration, 0.0, 0.65, delay),
    transition(time, duration, 0.0, 0.6, delay)
  );

  float t = 0.5 * n;
  float t2 = 0.9 * n;

  vec3 colorNoise = mix(color1, color2, t);
  vec3 colorLight = mix(color3, color4, t2);

  vec2 lightPos = (pointer - 0.5) * vec2(resolution.x / resolution.y, 1.0);
  float dist = length(centeredUv - lightPos);
  float radius = 0.15;

  float spotlight = smoothstep(radius, radius - 0.125, dist);
  spotlight = pow(spotlight, 1.2);
  spotlight *= spotlightIntensity * transition(time, duration, 0.0, 1.0, delay);

  vec3 color0 = colorNoise + colorLight * 1.0 * 0.5;
  vec3 color00 = mix(color0, colorLight + vec3(0.5, 0.5, 0.5), 1.0 - t2);
  vec3 color = mix(color0, color00, spotlight);

  fragColor = vec4(color, 1.0);
}
