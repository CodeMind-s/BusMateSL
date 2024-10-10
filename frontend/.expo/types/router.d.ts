/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(routes)/editProfile` | `/(routes)/highway_schedules` | `/(routes)/highway_schedules_details` | `/(routes)/intercity_schedules` | `/(routes)/intercity_schedules_details` | `/(routes)/login` | `/(routes)/notificationScreen` | `/(routes)/onboarding` | `/(routes)/privatebus_schedules` | `/(routes)/privatebus_schedules_details` | `/(routes)/register` | `/(routes)/schedules` | `/(routes)/sltb_schedules` | `/(routes)/sltb_schedules_details` | `/(routes)\tickets\ticket\` | `/(tabs)` | `/(tabs)/` | `/(tabs)/notification` | `/(tabs)/profile` | `/(tabs)/tickets` | `/(tabs)/track-bus` | `/..\screens\tickets\my-tickets.screen` | `/_sitemap` | `/editProfile` | `/highway_schedules` | `/highway_schedules_details` | `/intercity_schedules` | `/intercity_schedules_details` | `/login` | `/notification` | `/notificationScreen` | `/onboarding` | `/privatebus_schedules` | `/privatebus_schedules_details` | `/profile` | `/register` | `/schedules` | `/sltb_schedules` | `/sltb_schedules_details` | `/tickets` | `/track-bus`;
      DynamicRoutes: `/(routes)/tickets/bus-details/${Router.SingleRoutePart<T>}` | `/(routes)/tickets/bus-seating/${Router.SingleRoutePart<T>}` | `/(routes)/tickets/checkout/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}` | `/(routes)/tickets/confirmation/${Router.SingleRoutePart<T>}` | `/tickets/bus-details/${Router.SingleRoutePart<T>}` | `/tickets/bus-seating/${Router.SingleRoutePart<T>}` | `/tickets/checkout/${Router.SingleRoutePart<T>}/${Router.SingleRoutePart<T>}` | `/tickets/confirmation/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(routes)/tickets/bus-details/[id]` | `/(routes)/tickets/bus-seating/[id]` | `/(routes)/tickets/checkout/[id]/[seat]` | `/(routes)/tickets/confirmation/[id]` | `/tickets/bus-details/[id]` | `/tickets/bus-seating/[id]` | `/tickets/checkout/[id]/[seat]` | `/tickets/confirmation/[id]`;
    }
  }
}
