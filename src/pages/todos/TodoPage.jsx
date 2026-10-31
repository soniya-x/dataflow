
import { useParams, useNavigate } from "react-router-dom";
import { useGetTodosByUserIdQuery } from "../../api/postApi";
import Button from "../../components/post/Button";
function TodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosByUserIdQuery(id);

  if (isLoading) {
    return <p className="p-6 text-center">Loading todos...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-center text-red-500">
        Failed to load todos!
      </p>
    );
  }

  const completedTodos = todos?.filter(
    (todo) => todo.completed
  ).length || 0;

  const pendingTodos = todos?.filter(
    (todo) => !todo.completed
  ).length || 0;

  return (
    <div className="mx-auto max-w-7xl p-6">

      {/* Back Button */}
      <Button
        variant="cancel"
        onClick={() => navigate("/users")}
        className="mb-6"
      >
        ← Back to Users
      </Button>

      {/* Page Heading */}
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        User #{id} Todos
      </h1>

      <p className="mb-6 text-slate-500">
        Total Todos: {todos?.length || 0}
      </p>

      {/* Todo Summary */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">

        <div className="rounded-xl bg-slate-100 p-5">
          <h2 className="text-sm text-slate-500">
            Total Todos
          </h2>
          <p className="mt-2 text-2xl font-bold">
            {todos?.length || 0}
          </p>
        </div>

        <div className="rounded-xl bg-green-50 p-5">
          <h2 className="text-sm text-green-600">
            Completed
          </h2>
          <p className="mt-2 text-2xl font-bold text-green-700">
            {completedTodos}
          </p>
        </div>

        <div className="rounded-xl bg-orange-50 p-5">
          <h2 className="text-sm text-orange-600">
            Pending
          </h2>
          <p className="mt-2 text-2xl font-bold text-orange-700">
            {pendingTodos}
          </p>
        </div>

      </div>

      {/* Todos List */}
      <div className="space-y-4">

        {todos?.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div>
              <span className="text-sm font-semibold text-cyan-600">
                Todo #{todo.id}
              </span>

              <h2 className="mt-2 font-semibold text-slate-800">
                {todo.title}
              </h2>
            </div>

            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                todo.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </div>
        ))}

      </div>

      {todos?.length === 0 && (
        <p className="text-center text-slate-500">
          No todos found for this user.
        </p>
      )}

    </div>
  );
}

export default TodoPage;
