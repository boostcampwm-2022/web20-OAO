export const todoStatusText = (todoUntil: string): string => {
  return isTodoImminence(todoUntil) ? '오늘까지 해야하는 일!' : '오늘 안해도 되는 일';
};

export const isTodoImminence = (todoUntil: string): boolean => {
  const todoDate = new Date(todoUntil);
  const today = new Date();
  return todoDate.getDate() === today.getDate() && todoDate.getMonth() === today.getMonth();
};

export const getTodoUntilText = (todoUntil: string): string => {
  return '마감일: '.concat(isTodoImminence(todoUntil) ? '오늘' : getFormattedDate(todoUntil));
};

const getFormattedDate = (todoUntil: string): string => {
  const regex = /(\d{4}-\d{2}-\d{2})/;
  const untilDate = new Date(todoUntil).toJSON().match(regex);
  return untilDate != null ? untilDate[0] : '';
};
