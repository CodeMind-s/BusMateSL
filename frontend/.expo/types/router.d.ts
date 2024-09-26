/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(routes)` | `/(routes)/highway_schedules` | `/(routes)/intercity_schedules` | `/(routes)/privatebus_schedules` | `/(routes)/schedules` | `/(routes)/sltb_schedules` | `/(tabs)` | `/(tabs)/` | `/(tabs)/notification` | `/(tabs)/profile` | `/(tabs)/tickets` | `/(tabs)/track-bus` | `/_sitemap` | `/highway_schedules` | `/intercity_schedules` | `/notification` | `/privatebus_schedules` | `/profile` | `/schedules` | `/sltb_schedules` | `/tickets` | `/track-bus`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
