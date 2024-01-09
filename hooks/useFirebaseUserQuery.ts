import { useQuery } from 'react-query';
import firebase from 'firebase/compat/app';

type User = {
    id: string;
  }
  
  const QUERY_KEY = ['User'];
  
  const fetchUser = async (): Promise<User> => {
    const userId = await firebase.app().auth().currentUser?.uid;
    return { id: userId ?? "" };
  };
  
  export const useGetUser = () => {
    return useQuery<User, Error>(QUERY_KEY, () => fetchUser());
  };