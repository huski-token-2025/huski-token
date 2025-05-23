import { useCallback, useState } from 'react';

export default function Page() {
  const [goHome, setGoHome] = useState(false);

  const setHome = useCallback(
    (isHome) => {
      setGoHome(isHome);
    },
    [goHome],
  );
  return {
    goHome,
    setHome,
  };
}
