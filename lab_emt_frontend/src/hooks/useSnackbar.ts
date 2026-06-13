import { useContext } from 'react';
import SnackbarContext, { type SnackbarContextType } from '../contexts/snackbarContext';

const useSnackbar = () => useContext<SnackbarContextType>(SnackbarContext);

export default useSnackbar;