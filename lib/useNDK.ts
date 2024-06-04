import { useStore } from '@/lib/store';

export const useNDK = () => {
  const ndkInstance = useStore(state => state.ndkInstance);

  return ndkInstance;
}
