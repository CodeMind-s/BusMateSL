/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(routes)` | `/(routes)/editProfile` | `/(routes)/highway_schedules` | `/(routes)/intercity_schedules` | `/(routes)/login` | `/(routes)/notificationScreen` | `/(routes)/onboarding` | `/(routes)/privatebus_schedules` | `/(routes)/register` | `/(routes)/schedules` | `/(routes)/sltb_schedules` | `/(tabs)` | `/(tabs)/` | `/(tabs)/notification` | `/(tabs)/profile` | `/(tabs)/tickets` | `/(tabs)/track-bus` | `/_sitemap` | `/editProfile` | `/highway_schedules` | `/intercity_schedules` | `/login` | `/notification` | `/notificationScreen` | `/onboarding` | `/privatebus_schedules` | `/profile` | `/register` | `/schedules` | `/sltb_schedules` | `/tickets` | `/track-bus`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
