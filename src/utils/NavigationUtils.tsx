import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigatioNRef = createNavigationContainerRef();

export async function navigation(routeName: string, params?: object) {
  navigatioNRef.isReady();

  if (navigatioNRef.isReady()) {
    navigatioNRef.dispatch(CommonActions.navigate(routeName, params));
  }
}

export async function replace(routeName: string, params?: object) {
  navigatioNRef.isReady();

  if (navigatioNRef.isReady()) {
    navigatioNRef.dispatch(StackActions.replace(routeName, params));
  }
}

export async function resetAndNavigate(routeName: string) {
  navigatioNRef.isReady();

  if (navigatioNRef.isReady()) {
    navigatioNRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: routeName}],
      }),
    );
  }
}

export async function goBack() {
  navigatioNRef.isReady();
  if (navigatioNRef.isReady()) {
    navigatioNRef.dispatch(CommonActions.goBack());
  }
}

export async function push(routeName: string, params?: object) {
  navigatioNRef.isReady();
  if (navigatioNRef.isReady()) {
    navigatioNRef.dispatch(StackActions.push(routeName, params));
  }
}

export async function prepareNavigation() {
  navigatioNRef.isReady();
}
