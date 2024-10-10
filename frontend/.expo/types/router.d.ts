/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(routes)/editProfile` | `/(routes)/forgotPassword` | `/(routes)/highway_schedules` | `/(routes)/highway_schedules_details` | `/(routes)/intercity_schedules` | `/(routes)/intercity_schedules_details` | `/(routes)/login` | `/(routes)/notificationScreen` | `/(routes)/onboarding` | `/(routes)/privatebus_schedules` | `/(routes)/privatebus_schedules_details` | `/(routes)/register` | `/(routes)/schedules` | `/(routes)/sltb_schedules` | `/(routes)/sltb_schedules_details` | `/(tabs)` | `/(tabs)/` | `/(tabs)/notification` | `/(tabs)/profile` | `/(tabs)/tickets` | `/(tabs)/track-bus` | `/_sitemap` | `/editProfile` | `/forgotPassword` | `/highway_schedules` | `/highway_schedules_details` | `/intercity_schedules` | `/intercity_schedules_details` | `/login` | `/notification` | `/notificationScreen` | `/onboarding` | `/privatebus_schedules` | `/privatebus_schedules_details` | `/profile` | `/register` | `/schedules` | `/sltb_schedules` | `/sltb_schedules_details` | `/tickets` | `/track-bus`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
