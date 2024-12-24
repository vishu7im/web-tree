import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function App() {

  const [users, setUser] = useState([])
  const [amount, setAmount] = useState(6);



  const fetchData = async () => {
    const response = await axios.get(`https://randomuser.me/api/?page=2&results=${amount}&seed=abc`)
    setUser(response.data?.results)
  }


  useEffect(() => {

    fetchData()
  }, [amount])


  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8">
      <h1 className="text-4xl font-extrabold text-white text-center mb-10">
        User Profiles
      </h1>

      {/* Input and Button */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <input
          type="number"
          min="1"
          className="border border-gray-700 bg-gray-800 rounded-md p-2 w-24 text-center text-white placeholder-gray-500 focus:ring focus:ring-purple-500 focus:outline-none"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button
          onClick={fetchData}
          className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:ring focus:ring-purple-500 transition-all duration-300"
        >
          Fetch Profiles
        </button>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300 border border-gray-700"
          >
            {/* Profile Picture */}
            <div className="relative">
              <img
                className="w-full h-60 object-cover rounded-t-xl"
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
              />
              <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {user.location.country}
              </span>
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {user.name.first} {user.name.last}
              </h2>
              <p className="text-sm text-purple-400 mb-4">
                <span className="font-semibold">City:</span> {user.location.city}
              </p>


              <div className=' rounded-xl p-4 bg-gray-800 flex items-center justify-between'>

                <div className="text-sm text-gray-300 space-y-2">
                  <p>
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {user.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Cell:</span> {user.cell}
                  </p>
                </div>

                {/* Address */}
                <div className="  ">
                  <h3 className="text-sm font-bold text-purple-400 mb-2">Address</h3>
                  <p className="text-sm text-gray-300">
                    {user.location.street.number} {user.location.street.name}
                  </p>
                  <p className="text-sm text-gray-300">
                    {user.location.city}, {user.location.state}
                  </p>
                  <p className="text-sm text-gray-300">{user.location.postcode}</p>
                </div>
              </div>

            </div>


          </div>
        ))}
      </div>
    </div>


  )
}
