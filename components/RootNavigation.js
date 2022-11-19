import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function rootStackNavigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function rootStackNavigateBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
