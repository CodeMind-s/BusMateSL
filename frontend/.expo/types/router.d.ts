/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/notification` | `/(tabs)/profile` | `/(tabs)/tickets` | `/(tabs)/track-bus` | `/_sitemap` | `/notification` | `/profile` | `/tickets` | `/track-bus`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
