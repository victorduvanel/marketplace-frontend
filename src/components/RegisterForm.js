const RegisterForm = ({
    handleSubmit,
    name,
    setName,
    email, 
    setEmail, 
    password, 
    setPassword,
}) => (
    <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group mb-3">
            <label className="form-label">Nom</label>
            <input
                type="text"
                className="form-control"
                placeholder="Entrez votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="form-group mb-3">
            <label className="form-label">Email</label>
            <input
                type="email"
                className="form-control"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group mb-3">
            <label className="form-label">Mot de passe</label>
            <input
                type="password"
                className="form-control"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button disabled={!name || !email || !password} className="btn btn-dark">Envoyer</button>
    </form>
)

export default RegisterForm;