import type { GameComponent } from "./gameComponent";
import { GameComponentContainer } from "./gameComponentContainer";
import type { System } from "./system";
import type { GameObject } from "./type";

/**
 * The ECS is the main driver; it's the backbone of the engine that
 * coordinates Entities, Components, and Systems. You could have a single
 * one for your game, or make a different one for every level, or have
 * multiple for different purposes.
 */
export class ECS {
  // Main state
  private gameObjects = new Map<GameObject, GameComponentContainer>();
  private systems = new Map<System, Set<GameObject>>();

  // Bookkeeping for gameObjects
  private nextGameObjectID = 0;
  private gameObjectToDestroy = new Array<GameObject>();

  // API: GameObjects
  public addGameObject(): GameObject {
    const gameObject = this.nextGameObjectID++;
    this.gameObjects.set(gameObject, new GameComponentContainer());
    return gameObject;
  }

  public removeGameObject(gameObject: GameObject): void {
    this.gameObjectToDestroy.push(gameObject);
  }

  // API: Components
  public addComponent(gameObject: GameObject, component: GameComponent): void {
    this.gameObjects.get(gameObject)?.add(component);
    // TODO: WHY?
    this.checkGO(gameObject);
  }

  public getComponents(
    gameObject: GameObject
  ): GameComponentContainer | undefined {
    return this.gameObjects.get(gameObject);
  }

  public removeComponent(
    gameObject: GameObject,
    componentClass: Function
  ): void {
    this.gameObjects.get(gameObject)?.delete(componentClass);
    this.checkGO(gameObject);
  }

  // API: Systems

  public addSystem(system: System): void {
    // Checking invariant: systems should not have an empty
    // Components list, or they'll run on every entity. Simply remove
    // or special case this check if you do want a System that runs
    // on everything.
    if (system.gameComponentsRequired.size === 0) {
      console.warn(`System: ${system} not added: empty Component List`);
    }
    // Give system a reference to the ECS so it can actually do anything.
    system.ecs = this;

    // Save system and set who it should track immediately
    this.systems.set(system, new Set());
    for (const gameObject of this.gameObjects.keys()) {
      this.checkGOS(gameObject, system);
    }
  }

  public removeSystem(system: System): void {
    this.systems.delete(system);
  }

  /**
   * This is ordinarily called once per tick (e.g., every frame). It
   * updates all Systems, then destroys any Entities that were marked
   * for removal.
   */
  public update(): void {
    for (const [system, gameObjects] of this.systems.entries()) {
      system.update(gameObjects);
    }
  }

  private checkGO(gameObject: GameObject): void {
    for (const system of this.systems.keys()) {
      this.checkGOS(gameObject, system);
    }

    while (this.gameObjectToDestroy.length > 0) {
      const toDestroy = this.gameObjectToDestroy.pop();
      if (toDestroy !== undefined) this.destroyGameObject(toDestroy);
    }
  }

  private destroyGameObject(gameObject: GameObject): void {
    this.gameObjects.delete(gameObject);
    for (const gameObjects of this.systems.values()) {
      gameObjects.delete(gameObject);
    }
  }

  // Check if the gameObject should be added to this system watchlist
  private checkGOS(gameObject: GameObject, system: System): void {
    // On recupère les composent de l'objet
    const have = this.gameObjects.get(gameObject);

    // On recupère les composent requis (donc des Functions=type de composant)
    const need = system.gameComponentsRequired;
    if (have?.hasAll(need)) {
      // should be in system
      this.systems.get(system)?.add(gameObject);
    } else {
      // should not be in system
      this.systems.get(system)?.delete(gameObject);
    }
  }
}
