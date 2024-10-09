/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(routes)/login` | `/(routes)\earning\` | `/(tabs)` | `/(tabs)/` | `/(tabs)/bookings` | `/(tabs)/profile` | `/(tabs)/schedule` | `/(tabs)/track-bus` | `/..\screens\earning\Earning.screen` | `/_sitemap` | `/bookings` | `/login` | `/profile` | `/schedule` | `/track-bus`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
