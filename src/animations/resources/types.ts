import type { RoughCanvas } from "roughjs/bin/canvas";
import type { vector } from "./vetores";

export interface Ishape {
  center: vector;
  x: number;
  y: number;
  z: number;
  contains: (point: unknown) => boolean;
  intersects: (other: Iparallelepiped) => boolean;
}

export interface Iparallelepiped extends Ishape {
  width: number;
  height: number;
  depth: number;
  w: number;
  h: number;
  d: number;
  hw: number;
  hh: number;
  hd: number;
  intersectsSphere: (sphere: Isphere) => boolean;
}

export interface Isphere extends Ishape {
  radius: number;
}

export type Tposgeneratorfunction = (
  num: number,
  boundary: Iparallelepiped
) => vector[];

export type Tposgenerator = {
  function: Tposgeneratorfunction;
  name: string;
};

export type Tparticle = {
  index: number;
  position: vector;
  direction: vector;
  inertialMass: number;
  momentInertia: number;
  vel: vector;
  acl: vector;
  angvel: vector;
  angacl: vector;
  maxForce: number;
  maxTorque: number;
  maxSpeed: number;
  maxAngVel: number;
  translationDamping: number;
  rotationDamping: number;
  physics: { [name: string]: Tbehaviour };
  applyForces: (agents: Tparticle[]) => void;
  move: (maxSpeed?: number, maxForce?: number, maxAngVel?:number, maxTorque?:number) => void;
  x: number;
  y: number;
  z: number;
  showAsBox: (
    canvasContext: RoughCanvas,
    particleSize: { x: number; y: number },
    color: string
  ) => void;
};

export type Tbehaviour = {
  name: string;
  forces: (agents: Tparticle[], particle: Tparticle) => void;
  [otherProperties: string]: unknown;
};
