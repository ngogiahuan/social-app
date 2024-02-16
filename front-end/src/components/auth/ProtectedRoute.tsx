import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/redux/hook"

interface ProtectedRouteProps {
    element: React.ReactNode
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
    const sessionToken = sessionStorage.getItem("token")
    console.log(sessionToken)

    if (!sessionToken) {
        return <Navigate to="/login" />
    }
    return (
        <div>
            {element}
        </div>
    )
}

export default ProtectedRoute