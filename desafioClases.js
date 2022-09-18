class Usuario {
    constructor(name, lastName, books, pets) {
        this.name = name;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }
    getFullName() {
        console.log(`Usuario: ${this.name} ${this.lastName}`);
    }
    addMascota(pet) {
        this.pets.push(pet);
    }
    countMascotas() {
        console.log(this.pets.length);
    }
    addBook(nm, aut) {
        this.books.push({ name: nombre, author: autor });
    }
    getBookNames() {
        let arr = [];

        for (let i = 0; i <= this.books.length - 1; i++) {
            arr.push(this.books[i].name);
        }
        console.log(arr);
    }
}

let usuario = new Usuario('Alexis', 'Moreno', [{ name: 'Los juegos del hambre', author: 'Suzanne Collins' }, { name: 'Harry Potter', author: 'J. K. Rowling' }], ['Wanda', 'Coli']);

console.log(usuario);
usuario.getFullName();
usuario.addMascota('Antonella');
console.log(usuario)
usuario.countMascotas();
usuario.addBook('El hombre que calculaba', 'Malba Tahan (Júlio César de Mello e Souza)')
console.log(usuario);
usuario.getBookNames();
    