import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});

const pusherClient = new PusherClient(process.env.PUSHER_KEY, {
    cluster: process.env.PUSHER_CLUSTER,
});

const presenceInstance = (user) => {
    const instance = new PusherClient(process.env.PUSHER_KEY, {
        cluster: process.env.PUSHER_CLUSTER,
        authEndpoint: `${process.env.HOST}/api/pusher/auth`,
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