import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/signup", form);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-80 space-y-4">
        <h1 className="text-xl font-bold">Signup</h1>
        <input className="border w-full p-2" placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input className="border w-full p-2" placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" className="border w-full p-2" placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button className="bg-black text-white w-full p-2">Signup</button>
      </form>
    </div>
  );
};
export default Signup;