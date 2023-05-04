import LoginForm from "./LoginForm";
import Register from "./Register";

const Login = () => {
    
    return (
            <section id="form">{/*form*/}
                    <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-1">
                            <LoginForm/>
                        </div>
                        <div className="col-sm-1">
                        <h2 className="or">OR</h2>
                        </div>
                        <div className="col-sm-4">
                            <Register/>
                        </div>
                    </div>
                    </div>
            </section>
    );
};

export default Login;