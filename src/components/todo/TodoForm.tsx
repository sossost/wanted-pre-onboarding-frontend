/** @jsxImportSource @emotion/react */

import { useRef, useState } from "react";
import { createTodo } from "../../api/todo";
import { toast } from "react-hot-toast";
import { addClientTodos } from "../../utils/clientSideTodoManage";
import { useRecoilState } from "recoil";
import { todoListState } from "../../store/recoilAtoms";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const TodoForm = () => {
  const todoRef = useRef<HTMLInputElement>(null);
  const [prevTodos, setNewTodos] = useRecoilState(todoListState);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const inputValue = todoRef.current!.value;

    if (!inputValue) {
      toast.error("할 일을 입력해주세요.");
      return;
    }

    try {
      // TODO: createTodo API 호출
      const newTodo = await createTodo(inputValue);

      // TODO: 클라이언트 상태 업데이트
      const updatedTodo = addClientTodos(prevTodos, newTodo);
      setNewTodos(updatedTodo);

      todoRef.current!.value = "";
      toast.success("할 일이 추가되었습니다.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      css={{
        display: "flex",
        alignItems: "end",
        gap: 12,
        width: "100%",
      }}
    >
      <Input
        label="할 일 작성하기"
        css={{
          width: "auto",
          flexGrow: 1,
        }}
      >
        <Input.TextFiled
          id="todo"
          data-testid="new-todo-input"
          placeholder="할 일을 입력해주세요."
          ref={todoRef}
        />
      </Input>
      <Button
        onClick={handleSubmit}
        type="submit"
        disabled={isLoading}
        css={{ width: "111px" }}
      >
        추가
      </Button>
    </form>
  );
};

export default TodoForm;