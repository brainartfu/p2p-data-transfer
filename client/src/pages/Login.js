import React, {useState} from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	return (
		<main>
	      <div style={{marginTop: 20}}>
	        <div className="o-wrapper-l">
	            <div className="hero flex flex-column">

	                <div>
	                    <div className="actionText">Login</div>
	                </div>
	                <div className="callBox flex">
	                    <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input"/>
	                    <input type="text" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input"/>
	                    <button onClick={handleLogin} className="primaryButton">Search</button>
	                </div>
	                 
	            </div>
	        </div>
	        <div id="send-data" style={{padding: 10}}>
	        </div>    
	        <div id="receive-data" style={{padding: 10}}>
	        </div>      
	      </div>
	    </main> 
	)
}

export default Login