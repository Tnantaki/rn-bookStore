import { SplashScreen } from 'expo-router';
import { useSession } from '../contexts/SessionContext';

export function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}