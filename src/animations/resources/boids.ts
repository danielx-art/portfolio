import type { Tbehaviour, Tparticle } from "./types";
import vec from "./vetores";


export default function boids(): Tbehaviour {
  const intensity = [0.002, 100, 0.01, (2 * Math.PI) / 3, 0.0001];

  const forces = (agents: Tparticle[], particle: Tparticle) => {
    const Fres = vec();
    const rcm = vec(); //mean position for cohesion
    let sumWeights = 0; //to calculate rcm at the end
    const dir = vec().copy(particle.vel).setMag(1);
    const pos = particle.position;
    const C = intensity[0];
    const S = intensity[1];
    const A = intensity[2];
    const fov = intensity[3];
    const NoiseFactor = intensity[4];

    if (!(agents.length > 0)) return;

    agents.forEach(function (agent) {
      const viewDir = dir.angleBetween(vec().copy(agent.position).sub(pos));
      const fovFactor = Math.exp(-(viewDir * viewDir) / (fov * fov));
      //let fovFactor = viewDir < fov ? 1 : 0.1;
      const r = vec().copy(agent.position).sub(pos); //from this to agent (positive means attraction)
      const r2 = r.magSquared();

      //cohesion - part 1
      rcm.add(vec().copy(agent.position).mult(fovFactor));

      sumWeights += fovFactor;

      //separation
      const fs = vec()
        .copy(r)
        .setMag((-S * fovFactor) / r2);
      Fres.add(fs);

      //aligment
      const adir = vec().copy(agent.vel).setMag(1);
      const fa = adir.mult((A * fovFactor) / (agents.length * r2));
      Fres.add(fa);

      //ruido
      //let noise = vec().random2D(1).mult(NoiseFactor);
      const noiseTemp = Math.sin(
        ((particle.vel.heading() * (1 + 0.1 + 0.01 + 0.001)) / Math.PI) ** 2
      );
      const noise = vec()
        .copy(particle.vel)
        .rotate((noiseTemp * Math.PI) / 3)
        .mult(NoiseFactor);
      Fres.add(noise);

      //visão limpa

      //aceleração repentina - somente esse repositório - como uma velocidade mínima
      if (particle.vel.magSquared() < 2) Fres.add(vec().copy(dir).setMag(0.01));
    });

    //cohesion - part 2
    rcm.div(sumWeights);
    const fc = vec().copy(rcm).sub(pos).mult(C);
    Fres.add(fc);

    particle.acl.add(Fres.div(particle.inertialMass));
  };

  return {
    name: "boids",
    intensity,
    forces,
  };
}
