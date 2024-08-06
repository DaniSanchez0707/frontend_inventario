import instancia from "./axios.js";

export const LoginRequest = (usuario) => instancia.post('/login', usuario)