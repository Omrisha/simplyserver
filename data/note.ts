export default interface Note {
    completed: boolean;
    createdTime: Date;
    dueTime: Date;
    priority: number;
    title: string;
    userId: string;
}