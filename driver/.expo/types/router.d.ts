/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(routes)/addAnnouncement` | `/(routes)/announcement` | `/(routes)/earning` | `/(routes)/login` | `/(routes)/register` | `/(routes)\forgotPassword\` | `/(tabs)` | `/(tabs)/` | `/(tabs)/bookings` | `/(tabs)/profile` | `/(tabs)/schedule` | `/(tabs)/track-bus` | `/..\screens\addAnnouncement\AddAnnouncement.screen` | `/..\screens\forgotPassword\ForgotPassword1.screen` | `/..\screens\forgotPassword\ForgotPassword2.screen` | `/..\screens\forgotPassword\ForgotPassword3.screen` | `/..\screens\forgotPassword\ForgotPassword4.screen` | `/_sitemap` | `/addAnnouncement` | `/announcement` | `/bookings` | `/earning` | `/login` | `/profile` | `/register` | `/schedule` | `/track-bus`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
