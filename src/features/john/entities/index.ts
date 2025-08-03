import { PlayerEntity } from "./PlayerEntity";
import { EnemyEntity } from "./EnemyEntity";

// Registry des composants React par type d'entité
export const EntityRenderers = {
  "player": PlayerEntity,
  "enemy": EnemyEntity,
  // "projectile": ProjectileEntity,
  // etc...
} as const;

export { PlayerEntity, EnemyEntity };

export type EntityType = keyof typeof EntityRenderers;