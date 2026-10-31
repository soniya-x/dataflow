import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../api/postApi";
import UserCard from "../../components/user/UserCard";
const UserPage = () => {
    const navigate=useNavigate()

    const{data:users,isLoading,isError,error}=useGetUsersQuery()

    if(isLoading) return(
        <p className="p-8 text-center text-green-500">
            Loading..

        </p>
      
    )
    if (isError) {
    return (
      <p className="p-8 text-center text-red-500">
        {error?.data?.message || "Failed to load users!"}
      </p>
    );
  }
  

  return (
    <div className="mx-auto max-w-7xl p-6">

      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        All Users ({users?.length || 0})
      </h1>

      <p className="mb-8 text-slate-500">
        Manage and explore all registered users.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onAlbums={()=>navigate(`/users/${user.id}/albums`)}
            onTodos={()=>navigate(`/users/${user.id}/todos`)}
          />
        ))}
      </div>
     
    
    </div>
  )
}

export default UserPage