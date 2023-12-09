import useSession from "@/hooks/useSession";

export const { authToken, admin } = useSession.getState()

const AuthHeader = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
}
export default AuthHeader