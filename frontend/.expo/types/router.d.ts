/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drivertabs)` | `/(drivertabs)/` | `/(drivertabs)/bookings` | `/(drivertabs)/busroute` | `/(drivertabs)/profile` | `/(drivertabs)/schedules` | `/(routes)` | `/(routes)/highway_schedules` | `/(routes)/intercity_schedules` | `/(routes)/onboarding` | `/(routes)/privatebus_schedules` | `/(routes)/schedules` | `/(routes)/sltb_schedules` | `/(routes)/user_selection` | `/(tabs)` | `/(tabs)/` | `/(tabs)/notification` | `/(tabs)/profile` | `/(tabs)/tickets` | `/(tabs)/track-bus` | `/_sitemap` | `/bookings` | `/busroute` | `/highway_schedules` | `/intercity_schedules` | `/notification` | `/onboarding` | `/privatebus_schedules` | `/profile` | `/schedules` | `/sltb_schedules` | `/tickets` | `/track-bus` | `/user_selection`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
