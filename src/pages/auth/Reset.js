import styles from "./auth.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import { MdPassword } from "react-icons/md";
import { toast } from "react-toastify";
import { useState } from "react";
import { resetPassword } from "../../services/authService";

const initialState = {
  password: "",
  password2: "",
};
const Reset = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    const userData = {
      password,
    };
    // console.log(resetToken);
    // console.log(userData);
    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="home">
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </section>
    </div>
  );
};

export default Reset;
