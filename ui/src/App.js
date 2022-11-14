import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';
const API_BASE_URL = "http://localhost:3001/api/v1";

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
 
  const updateSearch = async (e) => {
    setLoading(true);
    let key = e.target.value;
    let result = await axios(`http://localhost:3001/api/v1/${key}`); 
    console.log(result.data);
    setSearch(result.data);

  };


  if (loading) {
    return (
      <div className="bg-purple-600 min-h-screen">
        <div className="max-w-5xl mx-auto flex flex-col justify-center items-center p-10 ">
          <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Type your search..."
            className="border border-gray-500 w-full h-full rounded-md opacity-80 p-3"
            onChange={updateSearch}
          />

          <div className="flex justify-center gap-4 mt-7 w-full text-white">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-purple-600 min-h-screen ">
      <div className="max-w-5xl mx-auto flex flex-col justify-center items-center p-10">
        <input
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Type your search..."
          className="border border-gray-500 w-full h-full rounded-md opacity-80 p-3"
          onChange={updateSearch}
        />
        <div className="grid grid-cols-3 gap-4 mt-7 w-full ">
              {
          search.data.map((data, index) => {
            return (
              <div
                key={index}
                className="bg-gray-100 rounded-md shadow-md shadow-purple-800 break-words p-3"
              >
                <div className="text-lg font-semibold mb-2">{data.primaryText}</div>
                <div className="text-sm">{data.headline}</div>
                <div className="text-sm">{data.description}</div>
                <div className="text-sm">{data.imageUrl}</div>
                <div className="text-sm">{data.companies}</div>
                <div className="text-sm">{data.url}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
