/* eslint-disable prefer-template */
import * as fs from 'fs';
// ts-node를 쓸 때 이는 자체 require가 있어서 typescript에서 js를 통해 esm이라고 확실히 명시해준다.
import { generateTodoListForUpdateTest, TestTodo, toTestTodo } from './type';

import * as testCase1 from './temp2.json';
import * as testCase2 from './temp7.json';
import * as testCase3 from './temp9.json';
import * as testCase4 from './temp-difficult0.json';
import * as testCase5 from './temp-difficult1.json';
import * as testCase6 from './temp-difficult4.json';

const makeDataSet = (nums: number) => {
  let i = 0;
  while (i < nums) {
    const data = generateTodoListForUpdateTest(26).map((el) => ({
      ...el,
      until: el.until.toString(),
      from: el.from.toString(),
    }));

    const string = data.reduce(
      (acc, el) =>
        acc +
        `${el.id}[${el.id}${el.state}]\n` +
        el.next.reduce((acc1, id) => acc1 + `${el.id}[${el.id}${el.state}]-->${id}\n`, ''),
      'graph TD\n',
    );

    fs.writeFileSync(`./temp-difficult${i}.json`, JSON.stringify({ data }), 'utf-8');
    fs.writeFileSync(`./temp-difficult${i}.txt`, string, 'utf-8');
    i += 1;
  }
};

const makeAgain = (testCase: any, suffix: string) => {
  const todoList: Array<TestTodo> = testCase.data.map((el: any) => toTestTodo(el));
  const string = todoList.reduce(
    (acc, el) =>
      acc +
      `${el.id}[${el.id}${el.state}]\n` +
      el.next.reduce((acc1, id) => acc1 + `${el.id}[${el.id}${el.state}]-->${id}\n`, ''),
    'graph TD\n',
  );

  console.log(string);
};

// makeAgain(testCase1, '2');
// makeAgain(testCase2, '7');
// makeAgain(testCase3, '9');
makeAgain(testCase4, 'd0');
makeAgain(testCase5, 'd1');
makeAgain(testCase6, 'd4');
