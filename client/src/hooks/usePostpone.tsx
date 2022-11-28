// import { useAtom } from 'jotai';
// import { todoList } from '@util/GlobalState';
// import { POSTPONE_METHODS } from '@';

// const usePostpone = (): any[] => {
//   const [todoListAtom, setTodoListAtom] = useAtom(todoList);

//   const setPostpone = (text: string, elasedTime: number): void => {
//     POSTPONE_METHODS[text as keyof typeof POSTPONE_METHODS](todoListAtom)
//       .then((data: TodoList) => {
//         data
//           .getActiveTodo()
//           .then((top) => {
//             if (top.id !== activeTodo.id) {
//               setTodoListAtom(data);
//               alert('완료!'); // toast
//             }
//           })
//           .catch((err) => {
//             console.error(err);
//           });
//       })
//       .catch((err) => {
//         throw new Error(err);
//       });
//   };

//   return [setDone];
// };

// export default usePostpone;
