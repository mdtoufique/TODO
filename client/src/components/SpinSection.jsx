import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { fetchTasks } from "../api";
import toast from "react-hot-toast";

const colors = [
  "#EE4040",
  "#F0CF50",
  "#815CD1",
  "#3DA5E0",
  "#34A24F",
  "#F9AA1F",
  "#EC3F3F",
  "#FF9000",
];

export default function SpinSection() {
  const [mustSpin, setMustSpin] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  
  // Load all tasks and extract categories

  useEffect(() => {
    
    async function loadTasks() {
      try {
        const allTasks = await fetchTasks();
        const filtered = allTasks.filter((t) => t.status !== "DONE");
    

        const allCats = Array.from(
          new Set(allTasks.map((t) => t.category).filter(Boolean))
        );
        setCategories(allCats);
      } catch (err) {
        toast.error("Failed to load spin tasks");
      }
    }
    loadTasks();
  }, []);

  useEffect(() => {
    
    async function loadTasks() {
      try {
        
        const allTasks = await fetchTasks(category);
        const filtered = allTasks.filter((t) => t.status !== "DONE");
        console.log("Fetched tasks:", allTasks);
console.log("Filtered (not DONE):", filtered);
        setTasks(filtered);
        

        
        
      } catch (err) {
        toast.error("Failed to load spin tasks");
      }
    }
    loadTasks();
  }, [category]);

  const data = tasks.map((task) => ({ option: task.title }));

  function handleSpin() {
     if (mustSpin || !tasks.length) return; 
    const index = Math.floor(Math.random() * tasks.length);
    setPrizeNumber(index);
    setMustSpin(true);
  }

  function onStopSpinning() {
    setMustSpin(false);
    setSelectedTask(tasks[prizeNumber]);
  }
  

  return (
    <div className="flex flex-col items-center gap-4">
      <select
        value={category}
        onChange={(e) => {
    if (!mustSpin) {
      setCategory(e.target.value);
      setSelectedTask(null);   // clear old selection immediately
      setPrizeNumber(0);       // reset prize number
    }
  }}
  disabled={mustSpin} 
        
        className="bg-white px-3 py-1 rounded shadow text-sm"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
          </option>
        ))}
      </select>

      {data.length > 0 ? (
  <Wheel
    mustStartSpinning={mustSpin}
    prizeNumber={prizeNumber}
    data={data}
    backgroundColors={colors}
    textColors={["#ffffff"]}
    onStopSpinning={onStopSpinning}
    fontSize={14}
    radiusLineColor="white"
    radiusLineWidth={1}
    outerBorderColor="black"
    outerBorderWidth={5}
    spinDuration={0.8}
  />
) : (
  <p className="text-gray-500 mt-4">Loading Tasks...</p>
)}

      <button
        onClick={handleSpin}
        disabled={mustSpin || tasks.length === 0}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
      >
        {mustSpin ? "Spinning..." : "SPIN NOW"}
      </button>

      {selectedTask && (
        <div className="text-center">
        
          <h4 className="font-bold text-gray-800 ">🎯 Selected Task: {selectedTask.title}</h4>
        </div>
      )}
    </div>
  );
}
