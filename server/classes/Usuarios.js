class Usuarios {

    constructor() {
        this.personas = [];
    }

    addPersona(id, nombre, sala) {
        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona)
        return this.personas
    }

    getPersona(id) {
        let persona = this.personas.filter(p => p.id === id)[0]
        return persona
    }

    getPersonas() {
        return this.personas
    }

    getPersonaPorSala(sala) {
        let personaSala = this.personas.filter(p => p.sala === sala)
        return personaSala
    }

    deletePersona(id) {
        let personaEliminada = this.getPersona(id)
        this.personas = this.personas.filter(p => p.id !== id)
        return personaEliminada
    }

}

module.exports = {
    Usuarios
}