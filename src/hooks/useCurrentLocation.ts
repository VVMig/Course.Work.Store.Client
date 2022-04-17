import { useMemo } from 'react';

export const useCurrentLocation = (path?: string) => {
    const currentLocation = useMemo(() => window.location.pathname, []);

    return `${currentLocation}${window.location.search}${path}`;
};
