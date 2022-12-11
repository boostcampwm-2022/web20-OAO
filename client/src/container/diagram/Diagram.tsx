import { ReactElement, useEffect, useState, useRef, useCallback, memo, useMemo } from 'react';
import { useAtom } from 'jotai';
import { todoList } from '@util/GlobalState';
import styled from 'styled-components';
import { getDiagramData, getTodoBlockProps, getVerticeProps, TodoBlockProps, VertexProps } from '@util/diagram.util';
import { PRIMARY_COLORS } from '@util/Constants';
import TodoBlock from '@components/diagram/TodoBlock';
import TodoVertex from '@components/diagram/TodoVertex';
import PopUp from '@components/diagram/PopUp';

const { offWhite, green } = PRIMARY_COLORS;

const Wrapper = styled.div`
  position: relative;
  width: 0;
  height: 0;
  background-color: ${offWhite};
  transform: translate(var(--offsetX), var(--offsetY));
`;

const Detector = memo(styled.div`
  position: absolute;
  background-color: ${offWhite};
  width: 100%;
  height: 100%;
  background-color: transparent;
`);

const HorizontalBaseLine = memo(styled.div`
  position: absolute;
  height: 0;
  width: 100%;
  top: 40px;
  transform: translateY(var(--offsetY));
  border-top: 4px dashed ${green};
  opacity: 0.5;
`);

const VerticalBaseLine = memo(styled.div`
  position: absolute;
  height: 100%;
  width: 0;
  left: 110px;
  transform: translateX(var(--offsetX));
  border-left: 4px dashed ${green};
  opacity: 0.5;
`);

interface PopUpData {
  type: 'Todo' | 'Vertex' | 'None';
  x: number;
  y: number;
  id: string;
}

interface AnimationData<T> {
  aniState: string;
  props: T;
  timeout?: ReturnType<typeof setTimeout>;
}

function getMapWithAniState<T>(
  prev: Map<string, AnimationData<T>>,
  next: Map<string, T>,
  setter: React.Dispatch<React.SetStateAction<Map<string, AnimationData<T>>>>,
): Map<string, AnimationData<T>> {
  const result = new Map([...prev]);
  const prevMounted = new Map([...prev].filter((el) => el[1].aniState !== 'unmount'));

  const mountArr = [...next].filter((el) => !prevMounted.has(el[0]));
  mountArr.forEach((el) => {
    clearTimeout(prev.get(el[0])?.timeout);
    const timeout = setTimeout(() => {
      setter((prev) => {
        const newState = new Map([...prev]);
        const target = newState.get(el[0]);
        if (target !== undefined && target.aniState === 'mount')
          newState.set(el[0], { props: target.props, aniState: 'idle' });
        return newState;
      });
    }, 0);
    result.set(el[0], { aniState: 'mount', timeout, props: el[1] });
  });

  const updateArr = [...next].filter((el) => prevMounted.has(el[0]));
  updateArr.forEach((el) => {
    const target = prevMounted.get(el[0]);
    if (target !== undefined) result.set(el[0], { aniState: target.aniState, props: el[1] });
  });

  const unmountArr = [...prevMounted].filter((el) => !next.has(el[0]));
  unmountArr.forEach((el) => {
    clearTimeout(prev.get(el[0])?.timeout);
    const timeout = setTimeout(() => {
      setter((prev) => {
        const newState = new Map([...prev]);
        if (newState.get(el[0])?.aniState === 'unmount') newState.delete(el[0]);
        return newState;
      });
    }, 500);
    result.set(el[0], { aniState: 'unmount', timeout, props: el[1].props });
  });

  return result;
}

const TodoBlockWrapper = styled.div<{ aniState: string }>`
  opacity: ${(props) => (props.aniState === 'idle' ? 1 : 0)};
  transition: opacity 0.5s;
`;

const MemoTodoBlockWrapper = memo(TodoBlockWrapper);

const Diagram = ({ showDone }: { showDone: boolean }): ReactElement => {
  const [todoListAtom] = useAtom(todoList);
  const [diagramData, setDiagramData] = useState<Map<string, AnimationData<TodoBlockProps>>>(new Map());
  const [diagramVertice, setDiagramVertice] = useState<Map<string, AnimationData<VertexProps>>>(new Map());
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
  const [popUpData, setPopUpData] = useState<PopUpData>({ type: 'None', x: 0, y: 0, id: '' });
  const [isWheelDown, setIsWheelDown] = useState<boolean>(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDiagramData(todoListAtom, showDone)
      .then((value) => {
        setDiagramData((prev) => getMapWithAniState(prev, getTodoBlockProps(value), setDiagramData));
        setDiagramVertice((prev) => getMapWithAniState(prev, getVerticeProps(value), setDiagramVertice));
      })
      .catch((err) => {
        throw err;
      });
  }, [todoListAtom, showDone]);

  const diagramStyle = useMemo(
    () => ({
      '--offsetX': `${offset.x}px`,
      '--offsetY': `${offset.y}px`,
    }),
    [offset],
  );

  const horizontalLineStyle = useMemo(
    () => ({
      '--offsetY': `${offset.y}px`,
    }),
    [offset],
  );

  const verticalLineStyle = useMemo(
    () => ({
      '--offsetX': `${offset.x}px`,
    }),
    [offset],
  );

  const onWheelDown = (event: React.MouseEvent): void => {
    if (event.button === 1) {
      setIsWheelDown(true);
    }
  };

  const onWheelUp = (event: React.MouseEvent): void => {
    setIsWheelDown(false);
  };

  const onWheelLeave = (event: React.MouseEvent): void => {
    setIsWheelDown(false);
  };

  const onMouseMove = (event: React.MouseEvent): void => {
    if (isWheelDown) {
      setOffset((prev) => ({ x: prev.x + event.movementX, y: prev.y + event.movementY }));
    }
  };

  const getOnClick = useCallback((type: 'Todo' | 'Vertex' | 'None', id: string) => {
    return (event: React.MouseEvent): void => {
      setPopUpData({
        type,
        id,
        x: event.clientX - (domRef.current?.getBoundingClientRect().left as number),
        y: event.clientY - (domRef.current?.getBoundingClientRect().top as number),
      });
      event.stopPropagation();
    };
  }, []);

  return (
    <div
      onMouseDown={onWheelDown}
      onMouseUp={onWheelUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onWheelLeave}
      onClick={getOnClick('None', '')}
      style={{ cursor: isWheelDown ? 'grab' : 'auto' }}
    >
      <Detector />
      <HorizontalBaseLine style={horizontalLineStyle as React.CSSProperties} />
      <VerticalBaseLine style={verticalLineStyle as React.CSSProperties} />
      <Wrapper style={diagramStyle as React.CSSProperties} ref={domRef}>
        {[...diagramVertice].map((el) => {
          return (
            <MemoTodoBlockWrapper key={el[0]} aniState={el[1].aniState}>
              <TodoVertex {...el[1].props} getOnClick={getOnClick} />
            </MemoTodoBlockWrapper>
          );
        })}
        {[...diagramData].map((el) => {
          return (
            <MemoTodoBlockWrapper key={el[0]} aniState={el[1].aniState}>
              <TodoBlock {...el[1].props} getOnClick={getOnClick} />
            </MemoTodoBlockWrapper>
          );
        })}
        {popUpData.type !== 'None' && <PopUp {...popUpData} />}
      </Wrapper>
    </div>
  );
};

export default Diagram;
