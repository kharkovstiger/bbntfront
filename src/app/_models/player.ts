export class Player {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
  team: string;
  manager: string;
  bio: string;
  lastUpdate: Date;
  lastUps: {[key: string]:Skill[]};
  gameShape: number;
  potential: number;
  salary: number;
  age: number;
  height: number;
  dmi: number;
  inDB: boolean;
  skills: {[key: string]: number};
  jumpShot: string;
  range: string;
  outsideDef: string;
  handling: string;
  driving: string;
  passing: string;
  insideShot: string;
  insideDef: string;
  rebound: string;
  block: string;
  stamina: string;
  freeThrow: string;
  experience: string;
}

export enum Skill {
  jumpShot,
  range,
  outsideDef,
  handling,
  driving,
  passing,
  insideShot,
  insideDef,
  rebound,
  block,
  stamina,
  freeThrow,
  experience
}
