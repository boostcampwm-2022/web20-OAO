import { Todo } from '..';

type TodoListTestCase = {
  input: Array<Todo>;
  output: Array<Todo>;
};

type PostponeTestCases = {
  extendDeadline: Array<Array<Todo>>;
  ignoreTemporally: Array<TodoListTestCase>;
  lowerImportance: Array<Array<Todo>>;
  ignoreForToday: Array<Array<Todo>>;
};

const postponeTestCases = {
  extendDeadline: [
    [
      {
        title: '팬들은 아티스트가 진행 중인 실시간 영상을 볼 수 있다. ',
        importance: 3,
        from: new Date('Wed Oct 05 1994 00:00:00 GMT+0900 (대한민국 표준시)'),
        until: new Date('Mon Nov 21 2022 07:43:00 GMT+0900 (대한민국 표준시)'),
        content: '',
        id: '06f75b58-9a6f-456e-9083-58d4416329ac',
        owner: '',
        prev: [],
        next: [],
      },
      {
        title: '팬들은 아티스트가 진행 중인 실시간 영상을 볼 수 있다. ',
        importance: 3,
        from: new Date('Wed Oct 05 1994 00:00:00 GMT+0900 (대한민국 표준시)'),
        until: new Date('Mon Nov 22 2022 07:43:00 GMT+0900 (대한민국 표준시)'),
        content: '',
        id: '06f75b58-9a6f-456e-9083-58d4416329ac',
        owner: '',
        prev: [],
        next: [],
      },
    ],
    [
      {
        title: '티켓 판매 날짜와 시간을 정할 수 있다. ',
        importance: 3,
        from: new Date('Wed Oct 05 1994 00:00:00 GMT+0900 (대한민국 표준시)'),
        until: new Date('Wed Nov 23 2022 03:25:00 GMT+0900 (대한민국 표준시)'),
        content: '',
        id: '722cbce8-94f3-4959-ad9e-9dc06b3b41c7',
        owner: '',
        prev: [],
        next: [],
      },
      {
        title: '티켓 판매 날짜와 시간을 정할 수 있다. ',
        importance: 3,
        from: new Date('Wed Oct 05 1994 00:00:00 GMT+0900 (대한민국 표준시)'),
        until: new Date('Wed Nov 24 2022 03:25:00 GMT+0900 (대한민국 표준시)'),
        content: '',
        id: '722cbce8-94f3-4959-ad9e-9dc06b3b41c7',
        owner: '',
        prev: [],
        next: [],
      },
    ],
    [
      {
        title: '사용자는 자신이 입력한 채팅을 같은 방에 있는 다른 사람들에게 전달 할 수 있다.',
        importance: 1,
        from: new Date('Wed Oct 05 1994 00:00:00 GMT+0900 (대한민국 표준시)'),
        until: new Date('Tue Nov 22 2022 05:13:00 GMT+0900 (대한민국 표준시)'),
        content: '',
        id: 'd7a22718-a869-47c9-9c00-703898ffd633',
        owner: '',
        prev: [],
        next: [],
      },
      {
        title: '사용자는 자신이 입력한 채팅을 같은 방에 있는 다른 사람들에게 전달 할 수 있다.',
        importance: 1,
        from: new Date('Wed Oct 05 1994 00:00:00 GMT+0900 (대한민국 표준시)'),
        until: new Date('Tue Nov 23 2022 05:13:00 GMT+0900 (대한민국 표준시)'),
        content: '',
        id: 'd7a22718-a869-47c9-9c00-703898ffd633',
        owner: '',
        prev: [],
        next: [],
      },
    ],
  ],
  ignoreTemporally: [],
  lowerImportance: [],
  ignoreForToday: [],
};

export default postponeTestCases;
