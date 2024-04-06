import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
// import { fetchTask,createTask,deleteTask } from '@/utils/apis/tasks';
import { fetchMyProjects,createProject, deleteProject } from '@/utils/apis/projects';
export const useProject = () => {
    const queryClient = useQueryClient(); // Initialize useQueryClient

    const { data: project, isLoading, error, refetch } = useQuery( {
        queryKey: ['myProject'], 
        queryFn: fetchMyProjects,
        staleTime: 300000, // 5 minutes (adjust as needed)
        // cacheTime: 600000,

    });

 const {mutate:addProjectMutation, isPending:isAddingProject} = useMutation({
    mutationFn: createProject, 
        onSuccess: () => {
          queryClient.invalidateQueries(['myProject']);
        },
      
  });

//   const removeTodoMutation 
    const {mutate:removeProjectMutation, isPending:isRemovingProject} = useMutation({
    mutationFn: deleteProject, 
        onSuccess: () => {
          queryClient.invalidateQueries(['myProject']); // Invalidate the 'todos' query after adding a new todo
        },
      
  });

  const addTodo = async (newProject) => {
    await addProjectMutation(newProject);
  };

  const removeTodo = async (id:number) => {
    await removeProjectMutation(id);
  };

  return {
    project,
    isLoading,
    error,
    addTodo,
    removeTodo,
    isAddingProject,
    isRemovingProject
  };
};
