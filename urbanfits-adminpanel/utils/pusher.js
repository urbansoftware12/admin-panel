import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

const pusherServer = new PusherServer({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
});

const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

const presenceInstance = (user) => {
    const instance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        authEndpoint: `${process.env.NEXT_PUBLIC_HOST}/api/pusher/auth`,
        auth: {
            params: {
                user_id: user?._id,
                email: user?.email
            }
        }
    });
    return instance
}

export { pusherServer, pusherClient, presenceInstance }