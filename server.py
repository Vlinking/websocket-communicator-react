import asyncio
import websockets
import random


connected_users = set()


class AnonymousUser:
    """
    Class that stores a connection handle and a randomly generated string username.
    Because I can.
    """
    ANON_USERNAME_PREFIX = "Anon_"
    ANON_USERNAME_RANGE_LOW = 100000
    ANON_USERNAME_RANGE_HIGH = 1000000

    def __init__(self, connection):
        """
        Assign a random string username.
        """
        self.connection = connection
        self.username = self.ANON_USERNAME_PREFIX + str(random.randint(
            self.ANON_USERNAME_RANGE_LOW,
            self.ANON_USERNAME_RANGE_HIGH
        ))
        print("User {} connected to server.".format(self.username))

    def receive(self):
        """
        Facade pattern for connection receive.
        """
        return self.connection.recv()

    def send(self, sender, message):
        """
        Facade pattern for connection send.
        """
        return self.connection.send("{0}: {1}".format(sender.username, message))

    def disconnect(self):
        """
        Facade pattern for connection close.
        """
        print("User {} disconnected from server.".format(self.username))
        return self.connection.close()


async def consumer_handler(anon_user):
    """
    Asynchronous loop for receiving messages on this connection and sending to all *other* connections.
    The messages are sent from a single page application client.
    """
    global connected_users
    while True:
        try:
            message = await anon_user.receive()
            try:
                await asyncio.wait([user.send(anon_user, message) for user in connected_users if anon_user is not user])
            except ValueError:
                print("Empty coroutine set.")
        except websockets.exceptions.ConnectionClosed:
            anon_user.disconnect()
            break


async def register_handler(websocket, path):
    """
    Register user, wait for messages, finally unregister.
    Executes once so the inner asynchronous loop is what keeps connection alive.
    """
    global connected_users
    anon_user = AnonymousUser(websocket)
    connected_users.add(anon_user)
    try:
        await(consumer_handler(anon_user))
    finally:
        connected_users.remove(anon_user)


if __name__ == "__main__":
    # our main event loop
    start_server = websockets.serve(register_handler, '0.0.0.0', 8765)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()