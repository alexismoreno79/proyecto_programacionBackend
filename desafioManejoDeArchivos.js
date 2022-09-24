// Dentro de contenedorProductos.js
const fs = require("fs");

class Contenedor{
    constructor(nameFile){
        this.nameFile =nameFile;
    }

    // Se puede hacer de ésta forma
    // async save(product){
    // }
    save = async(product) => {
        try {
            // 1° leer si el archivo existe
            if(fs.existsSync(this.nameFile)){
                // 1.3° si existe el archivo
                const contenido = await fs.promises.readFile(this.nameFile, "utf8");
                if (contenido) {
                    const productos = JSON.parse(contenido);
                    // 1.4° verificar si el producto ya existe

                    // verificación de productos duplicados por el título
                    // const productExists = productos.some(item => item.title === product.title);
                    // pero la consigna no pide eso

                    // para agregar un nuevo producto
                    const newProduct = {
                        id: productos.length + 1 ,
                        ...product
                    }
                    productos.push(newProduct);
                    await fs.promises.writeFile(this.nameFile, JSON.stringify(productos, null, 2))
                } else {
                    // 1.5° Repetir 1.1° y 1.2°
                    // 1.2°
                    const newProduct = {
                    id: 1,
                    ...product
                    }
                    // 1.1° si no existe el archivo lo creamos
                    await fs.promises.writeFile(this.nameFile, JSON.stringify([newProduct], null, 2));
                }
            } else {
                // 1.2°
                const newProduct = {
                    id: 1,
                    ...product
                }
                // 1.1° si no existe el archivo lo creamos
                await fs.promises.writeFile(this.nameFile, JSON.stringify([newProduct], null, 2));
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    getById = async(id) => {
        try {
            if (fs.existsSync(this.nameFile)) {
                const contenido = await fs.promises.readFile(this.nameFile, "utf8");
                if (contenido) {
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item => item.id === id);
                    if (producto) {
                        return producto;
                    } else {
                        return "El producto no existe"
                    }
                } else {
                    return "El archivo está vacio"
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    getAll = async() => {
        const contenido = await fs.promises.readFile(this.nameFile, "utf8");
        const productos = JSON.parse(contenido);
        return productos
    }

    deleteById = async(id) => {
		try {
			const contenido = await fs.promises.readFile(this.nameFile, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				const newProductList = data.filter((item) => item.id !== id);
				await fs.promises.writeFile(
					this.nameFile,
					JSON.stringify(newProductList, null, 2)
				);
			} else {
				throw new Error('No se encontró ningún producto para borrar');
			}
		} catch (error) {
			console.log(error);
		}
	}

    deleteAll = async() => {
        try {
            await fs.promises.writeFile(this.nameFile, JSON.stringify([], null, 2))
        } catch (error) {
            console.log(error);
        }
    }
}

const listaProductos = new Contenedor("nombreArchivo.txt");
const producto1 = {
    title: "camisa",
    price: 300,
    thumbnail: "http://d3ugyf2ht6aenh.cloudfront.net/stores/103/133/products/camisa-silver-ridge-mu-l21-523936152c51ab6fa515131786953784-640-0.jpg"
}
const productoRepetido = {
    title: "camisa",
    price: 300,
    thumbnail: "http://d3ugyf2ht6aenh.cloudfront.net/stores/103/133/products/camisa-silver-ridge-mu-l21-523936152c51ab6fa515131786953784-640-0.jpg"
}
const producto2 = {
    title: "zapatos",
    price: 150,
    thumbnail: "https://img.lalr.co/cms/2017/12/05165632/Zapatos.jpg?size=xl"
}
const producto3 = {
    title: "sombrero",
    price: 100,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_785190-MLA31080554341_062019-W.jpg"
}

const crearProducto = async() => {
    await listaProductos.save(producto1);
    await listaProductos.save(producto2);
    await listaProductos.save(producto3);
    const resultadoId = await listaProductos.getById(15);
    console.log(resultadoId);
    const productos = await listaProductos.getAll();
    console.log(productos);
    const productosEliminandoId = await listaProductos.deleteById(1);
    console.log(productosEliminandoId);
    const productosEliminandoTodos = await listaProductos.deleteAll();
    console.log(productosEliminandoTodos);
}
crearProducto();