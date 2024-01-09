import { useGetUser } from "../hooks/useFirebaseUserQuery";
import useRealTimeQuery from "../hooks/useRealTimeQuery";
import Note from '../data/note'
import { QueryClient, QueryClientProvider } from "react-query";

export default function Note() {
    const { data: userId, isLoading: isUserLoading, isError: isUserError } = useGetUser();
    const { data, isLoading, error } = useRealTimeQuery<Note>('notes/' + userId);

    return (
        <div>Note: {data?.title}</div>
    )
}