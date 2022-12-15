import { PlainTodo } from '@todo/todo.type';
import { toast } from 'react-toastify';

export const todoStatusText = (todoUntil: string): string => {
  return isTodoImminence(todoUntil) ? '오늘까지 해야하는 일!' : '오늘 안해도 되는 일';
};

export const isTodoImminence = (todoUntil: string): boolean => {
  const todoDate = new Date(todoUntil);
  const today = new Date();
  return todoDate.getDate() === today.getDate() && todoDate.getMonth() === today.getMonth();
};

export const getTodoUntilText = (todoUntil: Date): string => {
  if (todoUntil === undefined || todoUntil === null) {
    return '';
  }

  return '마감일: '.concat(
    isTodoImminence(todoUntil.toString())
      ? `오늘 ${todoUntil.getHours()}시 ${todoUntil.getMinutes()}분`
      : getFormattedDate(todoUntil.toString()),
  );
};

const getFormattedDate = (todoUntil: string): string => {
  const regex = /(\d{4}-\d{2}-\d{2})/;
  const untilDate = new Date(todoUntil).toJSON().match(regex);
  return untilDate != null ? untilDate[0] : '';
};

export const isSameObject = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const getyyyymmddDateFormat = (date: Date, separator: string): string => {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return [date.getFullYear(), (mm > 9 ? '' : '0') + `${mm}`, (dd > 9 ? '' : '0') + `${dd}`].join(separator);
};

export const gethhmmFormat = (date: Date): string => {
  const hh = date.getHours();
  const mm = date.getMinutes();
  return [(hh > 9 ? '' : '0') + `${hh}`, (mm > 9 ? '' : '0') + `${mm}`].join(':');
};

export const getModalValues = (div: Element): any[] => {
  return [...div.querySelectorAll('textarea'), ...div.querySelectorAll('select'), ...div.querySelectorAll('input')];
};

export const getTodayDate = (): string => {
  const todayDate = new Date();
  return new Date(-todayDate.getTimezoneOffset() * 60000 + todayDate.getTime()).toISOString().slice(0, -8);
};

export const getDateTimeInputFormatString = (date: Date): string => {
  return new Date(-date.getTimezoneOffset() * 60000 + date.getTime()).toISOString().slice(0, -8);
};

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.success('복사 성공');
    },
    () => {
      toast.error('복사 실패');
    },
  );
};

export const isPlainTodo = (arg: any): arg is PlainTodo => {
  return arg.content !== undefined;
};

export const getElapsedTimeText = (time: number): string => {
  const hour = Math.floor(time / 60 / 60);
  const minute = Math.floor((time % 3600) / 60);
  const second = time % 60;

  return `${hour}h ${minute}m ${second}s`;
};
