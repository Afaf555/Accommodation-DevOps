import { useContext } from 'react';
import HostsContext, { type HostsContextType } from '../contexts/hostsContext';

const useHosts = () => useContext<HostsContextType>(HostsContext);

export default useHosts;