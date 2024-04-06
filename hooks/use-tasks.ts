import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
import { fetchTask,createTask,deleteTask } from '@/utils/apis/tasks';
export const useTask = () => {
    const queryClient = useQueryClient(); // Initialize useQueryClient

    const { data: task, isLoading, error, refetch } = useQuery( {
        queryKey: ['tasks'], 
        queryFn: fetchTask,
        staleTime: 300000, // 5 minutes (adjust as needed)
        // cacheTime: 600000,

    });

 const {mutate:addTaskMutation, isPending:isAddingTask} = useMutation({
    mutationFn: createTask, 
        onSuccess: () => {
          queryClient.invalidateQueries(['tasks']); // Invalidate the 'todos' query after adding a new todo
        },
      
  });

//   const removeTodoMutation 
    const {mutate:removeTaskMutation, isPending:isRemovingTask} = useMutation({
    mutationFn: deleteTask, 
        onSuccess: () => {
          queryClient.invalidateQueries(['tasks']); // Invalidate the 'todos' query after adding a new todo
        },
      
  });

  const addTodo = async (newTodo) => {
    await addTaskMutation(newTodo);
  };

  const removeTodo = async (id:number) => {
    await removeTaskMutation(id);
  };

  return {
    task,
    isLoading,
    error,
    addTodo,
    removeTodo,
    isAddingTask,
    isRemovingTask
  };
};
