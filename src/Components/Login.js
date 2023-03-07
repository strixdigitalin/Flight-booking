import React from "react";
const initialValues = { emailId: "", password: "" };

function Login() {
  const [formData, setFormData] = useState(initialValues);
  const handleSubmit = () => {};
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <input
        type="email"
        name="emailId"
        value={formData.emailId}
        placeholder="Enter Your E-mail"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange(e)}
      />
      <button onClick>Login</button>
    </div>
  );
}

export default Login;
