

const Chat = () => {
  return (
    <div className="flex">      
      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow p-4 h-full">
          <h2 className="text-xl font-semibold mb-4">Chat Messages</h2>
          <div className="h-5/6 overflow-y-auto border rounded-md p-3">
            {/* Messages would go here */}
            <p className="text-gray-500 text-center mt-20">Select a conversation to start chatting</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;