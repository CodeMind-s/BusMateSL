/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(routes)/highway_schedules` | `/(routes)/highway_schedules_details` | `/(routes)/intercity_schedules` | `/(routes)/intercity_schedules_details` | `/(routes)/onboarding` | `/(routes)/privatebus_schedules` | `/(routes)/privatebus_schedules_details` | `/(routes)/schedules` | `/(routes)/sltb_schedules` | `/(routes)/sltb_schedules_details` | `/(tabs)` | `/(tabs)/` | `/(tabs)/notification` | `/(tabs)/profile` | `/(tabs)/tickets` | `/(tabs)/track-bus` | `/_sitemap` | `/highway_schedules` | `/highway_schedules_details` | `/intercity_schedules` | `/intercity_schedules_details` | `/notification` | `/onboarding` | `/privatebus_schedules` | `/privatebus_schedules_details` | `/profile` | `/schedules` | `/sltb_schedules` | `/sltb_schedules_details` | `/tickets` | `/track-bus`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
