import { useDispatch, useSelector } from 'react-redux';

// Redux hooks with pre-typed dispatch and selector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
