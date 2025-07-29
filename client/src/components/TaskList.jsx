import TaskCard from "./TaskCard";
function TaskList( { category, status }){
    const tasks = [
  {
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, and fruits',
    status: 'PENDING',
    category: 'shopping',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    title: 'Finish project report',
    description: 'Complete the final draft and submit',
    status: 'ONGOING',
    category: 'work',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    title: 'Call mom',
    description: 'Check in and chat about weekend plans',
    status: 'DONE',
    category: 'family',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    title: 'Gym workout',
    description: 'Leg day routine',
    status: 'PENDING',
    category: 'health',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    title: 'Read new book',
    description: 'Start readwejtbewbgjiewbjfsjdfjksdfjkdbjkgsbsk ing the novel received last week',
    status: 'FAILED',
    category: 'leisure',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
  {
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, and fruits',
    status: 'PENDING',
    category: 'shopping',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    title: 'Finish project report',
    description: 'Complete the final draft and submit',
    status: 'ONGOING',
    category: 'work',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    title: 'Call mom',
    description: 'Check in and chat about weekend plans',
    status: 'DONE',
    category: 'family',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    title: 'Gym workout',
    description: 'Leg day routine',
    status: 'PENDING',
    category: 'health',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
];

  const filteredTasks = tasks.filter((task) => {
    const matchCategory = category ? task.category === category : true;
    const matchStatus = status ? task.status === status : true;
    return matchCategory && matchStatus;
  });
    return (
    <div className="flex flex-wrap mt-10 gap-[5%] justify-start">
      {filteredTasks.map((task, index) => (
        <div
        key={index}
        className="w-full sm:w-[100%] lg:w-[30%] xl:w-[30%]"
        >
        <TaskCard task={task} />
        </div>
      ))
      }
    </div>
    );
}
export default TaskList;