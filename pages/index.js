import { Shaders, Node, GLSL } from 'gl-react'
import { Surface } from 'gl-react-dom'
import { useTweaks, makeButton } from 'use-tweaks'

import useTime from '../hooks/use-time'
import useWindowSize from '../hooks/use-window-size'

const shaders = Shaders.create({
  interference: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform float t;
uniform vec2 particles[3];

void main() {
  vec4 sum = vec4(0.0);

  for (int i = 0; i < 3; i++) {
    vec2 p = particles[i];
    float d = smoothstep(0., 1., distance(p, uv) + .1);
    sum += pow(d, .23) * (
      // put some random numbers to make it look fancy
      (cos(d * 38. + t / 600.) + 1.) * vec4(0.956862745, .0, 0.290196078, 1.) +
      (sin(d * 30. + t / 900. + .3) + 1.) * vec4(.0, 0.415686275, 0.956862745, 1.) +
      (sin(d * 18. + t / 1200. + .1) + 1.) * vec4(0.125490196, 0.835294118, 0.243137255, 1.)
    ) * .16;
  }

  vec4 c = vec4(
    smoothstep(.4, .9, sum.x * .9),
    smoothstep(.36, .9, sum.y * .75),
    smoothstep(.3, .9, sum.z * .7),
    1.
  );

  gl_FragColor = c;
}
`,
  },
})

export default function Page() {
  const [t, pause] = useTime()
  const { width, height } = useWindowSize()
  const { x, y, speed } = useTweaks('Interference', {
    x: { value: 0.5, min: -0.5, max: 1.5 },
    y: { value: -0.3, min: -1, max: 0 },
    speed: { value: 1, min: 0.2, max: 10 },
    ...makeButton('Pause/Play', pause),
  })

  if (!width || !height) return null

  const size = Math.min(width, height)

  return (
    <Surface width={size} height={size} pixelRatio={1}>
      <Node
        shader={shaders.interference}
        uniforms={{
          t,
          particles: [
            [x, (Math.sin((t * speed) / 3600) + 1) / 3.7 + y],
            [0.495, -0],
            [0.505, -0],
          ],
        }}
      />
    </Surface>
  )
}
