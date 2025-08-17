import type { Tbehaviour, Tparticle } from "./types";
import type { RoughCanvas } from "roughjs/bin/canvas";
import vec from "./vetores";

/* --------------------------------------------------------------
-----------------------------------------------------------------
---------------------THE PARTICLE FACTORY------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------*/

export default function createParticle({
  index = 0,
  position = vec(),
  direction = vec(0, -1),
  inertialMass = 0.1,
  momentInertia = 0.1,

  initialVelocity = vec(),
  initialAngularVelocity = vec(),

  maxForce = 0.001,
  maxTorque = 0.5,
  maxSpeed = 2,
  maxAngVel = 0.1,
  translationDamping = 0.999,
  rotationDamping = 0.7,

  behaviours = [] as (() => Tbehaviour)[],
}): Tparticle {
  const vel = initialVelocity;
  const angvel = initialAngularVelocity;
  const acl = vec();
  const angacl = vec();

  const physics = {} as { [name: string]: Tbehaviour };
  behaviours.forEach((behaviour) => {
    const phys = behaviour();
    physics[phys.name] = phys;
  });

  const self: Tparticle = {
    index,
    position,
    direction,
    inertialMass,
    momentInertia,
    vel,
    angvel,
    acl,
    angacl,
    maxForce,
    maxTorque,
    maxSpeed,
    maxAngVel,
    translationDamping,
    rotationDamping,
    physics,
    applyForces: (agents: Tparticle[]) => {
      Object.keys(physics).forEach((phenom) => {
        physics[phenom].forces(agents, self);
      });
    },
    move: function (
      customMaxSpeed,
      customMaxForce,
      customMaxAngVel,
      customMaxTorque
    ) {
      //console.log("acl:", acl); //debugg
      acl.limit((customMaxForce || maxForce) / inertialMass);
      //console.log("acl:", acl); //debugg
      vel.add(acl);
      //console.log("vel:", vel); //debugg
      vel.mult(translationDamping);
      //console.log("vel:", vel); //debugg
      if (vel.mag() > (customMaxSpeed || maxSpeed)) vel.mult(0.99);
      //vel.limit(customMaxSpeed || maxSpeed);
      //console.log("vel:", vel); //debugg

      position.add(vel);
      acl.mult(0);

      //rotation
      angacl.limit((customMaxTorque || maxTorque) / momentInertia);
      angvel.add(angacl);
      angvel.mult(rotationDamping);
      angvel.limit(customMaxAngVel || maxAngVel);
      const deltadir = angvel.cross(direction);
      direction.add(deltadir).setMag(1);
      angacl.mult(0);
    },
    get x() {
      return this.position.x;
    },

    get y() {
      return this.position.y;
    },

    get z() {
      return this.position.z;
    },
    showAsBox: function (
      canvasContext: RoughCanvas,
      particleSize: { x: number; y: number },
      color: string
    ) {
      const pos = this.position;
      const mainAxis = vec(this.direction.x, this.direction.y, 0).setMag(
        particleSize.y / 2
      );
      const crossAxis = vec(this.direction.x, this.direction.y, 0)
        .cross(vec(0, 0, 1))
        .setMag(particleSize.x / 2);
      const v1 = vec().copy(pos).sub(mainAxis).sub(crossAxis);
      const v2 = vec().copy(pos).sub(mainAxis).add(crossAxis);
      const v3 = vec().copy(pos).add(mainAxis).add(crossAxis);
      const v4 = vec().copy(pos).add(mainAxis).sub(crossAxis);
      // let particleHeading = this.direction.heading();
      // let v1 = vec()
      //   .copy(pos)
      //   .add(vec(-particleSize.x / 2, -particleSize.y / 2))
      //   .rotate(particleHeading, this.position)
      //   .add(this.position);
      // let v2 = vec()
      //   .copy(pos)
      //   .add(vec(-particleSize.x / 2, +particleSize.y / 2))
      //   .rotate(particleHeading, this.position)
      //   .add(this.position);
      // let v3 = vec()
      //   .copy(pos)
      //   .add(vec(+particleSize.x / 2, +particleSize.y / 2))
      //   .rotate(particleHeading, this.position)
      //   .add(this.position);
      // let v4 = vec()
      //   .copy(pos)
      //   .add(vec(+particleSize.x / 2, -particleSize.y / 2))
      //   .rotate(particleHeading, this.position)
      //   .add(this.position);

      canvasContext.polygon(
        [
          [v1.x, v1.y],
          [v2.x, v2.y],
          [v3.x, v3.y],
          [v4.x, v4.y],
        ],
        {
          stroke: "none",
          fill: color,
        }
      );
    },
  };

  return self;
}
