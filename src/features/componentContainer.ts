import type { Component, ComponentClass } from "./component";

/**
 * This custom container is so that calling code can provide the
 * Component *instance* when adding (e.g., add(new Position(...))), and
 * provide the Component *class* otherwise (e.g., get(Position),
 * has(Position), delete(Position)).
 *
 * We also use two different types to refer to the Component's class:
 * `Function` and `ComponentClass<T>`. We use `Function` in most cases
 * because it is simpler to write. We use `ComponentClass<T>` in the
 * `get()` method, when we want TypeScript to know the type of the
 * instance that is returned. Just think of these both as referring to
 * the same thing: the underlying class of the Component.
 *
 * You might notice a footgun here: code that gets this object can
 * directly modify the Components inside (with add(...) and delete(...)).
 * This would screw up our ECS bookkeeping of mapping Systems to
 * Entities! We'll fix this later by only returning callers a view onto
 * the Components that can't change them.
 */
export class ComponentContainer {
  private map = new Map<Function, Component>();

  public add(component: Component): void {
    // The first is the instance of the component, the second the component type.
    // Still unclear of the why we would need that
    this.map.set(component.constructor, component);
  }

  public get<T extends Component>(componentClass: ComponentClass<T>): T {
    return this.map.get(componentClass) as T;
  }

  public has(componentClass: Function): boolean {
    return this.map.has(componentClass);
  }

  public hasAll(componenClasses: Iterable<Function>): boolean {
    for (const componentClass of componenClasses) {
      if (!this.has(componentClass)) {
        return false;
      }
    }
    return true;
  }

  public delete(componentClass: Function): void {
    this.map.delete(componentClass);
  }
}
