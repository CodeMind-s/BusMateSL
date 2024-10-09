/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(routes)/earning` | `/(routes)/login` | `/(tabs)` | `/(tabs)/` | `/(tabs)/bookings` | `/(tabs)/profile` | `/(tabs)/schedule` | `/(tabs)/track-bus` | `/_sitemap` | `/bookings` | `/earning` | `/login` | `/profile` | `/schedule` | `/track-bus`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
