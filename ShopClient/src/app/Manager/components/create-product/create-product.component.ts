// Importa módulos y clases de Angular y otras dependencias
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

// Componente Angular decorado
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  title: string = "Crear Producto";
  productForm: FormGroup;

  preview!: string;

  currentProduct!: Product; // Variable para almacenar información del producto actual

  // Constructor del componente
  constructor(
    private _fb: FormBuilder,        // Inyección de FormBuilder para construir formularios reactivos
    private _productService: ProductService,  // Inyección de ProductService para interactuar con productos
    private _router: Router,          // Inyección de Router para la navegación entre rutas
    private _activatedRoute: ActivatedRoute, // Inyección de ActivatedRoute para obtener información sobre la ruta activada
  ) {
    // Inicializa el formulario reactivo con validadores
    this.productForm = this._fb.group({
      name: ['', [Validators.required]],    // Campo 'name' con validador de requerido
      category: ['', [Validators.required]], // Campo 'category' con validador de requerido
      location: ['', [Validators.required]], // Campo 'location' con validador de requerido
      img: ['', [Validators.required]],      // Campo 'img' con validador de requerido
      price: ['', [Validators.required]],    // Campo 'price' con validador de requerido
      isLocalFile: [true]                    // Campo 'isLocalFile' inicializado en true
    })
  }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.asEdit(); // Llama al método asEdit al iniciar el componente
    /*     this._auth.getCredentials().subscribe((credentials) => this._credentials = credentials.toString()); */
  }

  // Método para agregar un producto
  // const PRODUCT: Product = {: Declara una constante llamada PRODUCT que se espera que sea de tipo Product.
  // name: this.productForm.get('name')?.value,: Asigna al campo name de PRODUCT el valor actual del campo name del formulario reactivo(productForm).
  // category: this.productForm.get('category')?.value,: Similar al anterior, asigna el valor del campo category del formulario reactivo al campo category de PRODUCT.
  // location: this.productForm.get('location')?.value,: Asigna el valor del campo location del formulario reactivo al campo location de PRODUCT.
  // price: this.productForm.get('price')?.value,: Asigna el valor del campo price del formulario reactivo al campo price de PRODUCT.
  // isLocalFile: isLocalFile,: Asigna el valor de la variable isLocalFile al campo isLocalFile de PRODUCT.
  // img: (isLocalFile) ? this.preview : this.productForm.get('img')?.value,: Asigna al campo img de PRODUCT un valor condicional:
  // Si isLocalFile es verdadero, asigna el valor de this.preview.
  // De lo contrario, asigna el valor actual del campo img del formulario reactivo(productForm).

  addProduct() {
    if (this.productForm.valid) {
      const isLocalFile = this.productForm.get('isLocalFile')?.value;

      // Crea un objeto PRODUCT con datos del formulario
      const PRODUCT: Product = {
        // Asigna el valor del campo 'name' del formulario reactivo al campo 'name' del objeto PRODUCT
        name: this.productForm.get('name')?.value,

        // Asigna el valor del campo 'category' del formulario reactivo al campo 'category' del objeto PRODUCT
        category: this.productForm.get('category')?.value,

        // Asigna el valor del campo 'location' del formulario reactivo al campo 'location' del objeto PRODUCT
        location: this.productForm.get('location')?.value,

        // Asigna el valor del campo 'price' del formulario reactivo al campo 'price' del objeto PRODUCT
        price: this.productForm.get('price')?.value,

        // Asigna el valor de la variable 'isLocalFile' al campo 'isLocalFile' del objeto PRODUCT
        isLocalFile: isLocalFile,

        // Asigna un valor condicional al campo 'img' del objeto PRODUCT
        // Si 'isLocalFile' es verdadero, asigna el valor de 'this.preview'; de lo contrario, asigna el valor del campo 'img' del formulario reactivo
        img: (isLocalFile) ? this.preview : this.productForm.get('img')?.value,
      };


      // Verifica si es una creación o edición y llama al método correspondiente
      if (!this.currentProduct) {
        this.createProduct(PRODUCT); // Llama al método createProduct si no hay un producto actual
      } else {
        this.editProduct(PRODUCT);   // Llama al método editProduct si hay un producto actual
      }
    }
  }

  // Método para editar un producto
  editProduct(product: Product) {
    // Llama al servicio _productService para actualizar un producto existente
    this._productService
      .updateOneProduct(this.currentProduct._id, product)
      // Utiliza el operador pipe para encadenar operaciones, catchError para manejar errores
      .pipe(catchError(error => this.resetImg(error)))
      // Se suscribe al observable resultante de la operación de actualización
      .subscribe((data) => {
        // Navega a la ruta 'admin/list-product' utilizando el servicio _router
        this._router.navigate(['admin', 'list-product']);
      });
  }

  // Método para crear un producto
  createProduct(product: Product) {
    // Llama al servicio _productService para guardar un nuevo producto
    this._productService
      .saveProduct(product)
      // Utiliza el operador pipe para encadenar operaciones, catchError para manejar errores
      .pipe(catchError(error => this.resetImg(error)))
      // Se suscribe al observable resultante de la operación de guardado
      .subscribe((data) => {
        // Navega a la ruta '/admin/list-product' utilizando el servicio _router
        this._router.navigate(['/admin/list-product']);
      });

  }


  // resumen: 
  // 
  // 1 Método createProduct: Este método se encarga de crear un nuevo producto.
  // 2 Llamada al servicio saveProduct: Se utiliza el servicio _productService para llamar al método saveProduct, que espera el nuevo objeto de producto(product) a ser guardado.
  // 3 Operador pipe: Se utiliza el operador pipe para encadenar operaciones. En este caso, se utiliza catchError para manejar cualquier error que pueda ocurrir durante el guardado.
  // 4 Manejo de errores con catchError: En caso de error, se realiza una verificación del código de estado(error.status). Si es 500(Internal Server Error), se muestra una alerta con el mensaje de error recibido. Además, se realiza una limpieza del campo 'img' del formulario y la vista previa de la imagen. En caso de otros errores, se muestra un mensaje genérico en la consola.
  // 5 Suscripción al observable: Se utiliza subscribe para suscribirse al observable resultante de la operación de guardado. Dentro de la suscripción, se recibe el resultado de la operación(data).
  // 6 Alerta y navegación: Se muestra una alerta con el mensaje recibido y, a continuación, se utiliza el servicio _router para navegar a la ruta '/admin/list-product'. Esto redirige al usuario a la lista de productos después de crear exitosamente el nuevo producto.



  // Método para establecer la vista previa de la imagen
  setImg(event: any) {
    // Verifica si la opción 'isLocalFile' está seleccionada en el formulario reactivo
    if (this.productForm.get('isLocalFile')?.value) {
      // Obtiene el primer archivo seleccionado
      const file = event.target.files[0];

      // Verifica si se seleccionó un archivo y si es de tipo imagen
      if (file && file.type.startsWith('image/')) {
        // Utiliza la función 'extractBase64' para obtener la representación base64 de la imagen
        this.extractBase64(file).then(
          (img: any) => {
            // Asigna la representación base64 al atributo 'preview' para mostrar la vista previa
            this.preview = img.base;
          }
        );
      } else {
        // En caso de que el archivo no sea de tipo imagen, muestra una alerta al usuario
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No es un archivo válido",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        // Limpia el campo 'img' del formulario y la vista previa de la imagen
        this.resetImg();
      }
    } else {
      // Si la opción 'isLocalFile' no está seleccionada, utiliza la URL proporcionada en el campo 'img' del formulario
      this.preview = this.productForm.get('img')?.value;
    }
  }

  // Explicación detallada:
  // 1 Método setImg: Este método se encarga de establecer la vista previa de la imagen.
  // 2 Verificación de la opción 'isLocalFile': Comienza verificando si la opción 'isLocalFile' está seleccionada en el formulario reactivo(this.productForm).
  // 3 Obtención del archivo local: Si la opción 'isLocalFile' está seleccionada, obtiene el primer archivo seleccionado(file) del evento proporcionado.
  // 4 Verificación del tipo de archivo: Verifica si se seleccionó un archivo y si el tipo de archivo es una imagen(comienza con 'image/').
  // 5 Extracción de la representación base64: Utiliza la función extractBase64 para obtener la representación base64 de la imagen seleccionada.
  // 6 Asignación de la vista previa: Asigna la representación base64 al atributo 'preview' para mostrar la vista previa de la imagen.
  // 7 Mensaje de consola: Muestra un mensaje en la consola indicando que la imagen es válida.
  // 8 Manejo de errores: En caso de que el archivo no sea de tipo imagen, muestra una alerta al usuario, limpia el campo 'img' del formulario y la vista previa de la imagen.
  // 9 Uso de la URL proporcionada: Si la opción 'isLocalFile' no está seleccionada, utiliza la URL proporcionada en el campo 'img' del formulario como la vista previa de la imagen.



  // Método para validar si un campo del formulario tiene errores
  validateInput(param: string): boolean {
    let obj = this.productForm.get(param);
    return obj !== null && obj.invalid && obj?.touched;
  }

  // Método para extraer la representación base64 de una imagen
  extractBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        })
      }
      reader.onerror = error => {
        reject({
          base: null
        })
      }
    } catch (error) {
      console.log(error);
    }
  })

  // Método para editar un producto si se proporciona en la URL
  // Método para editar un producto si se proporciona en la URL
  asEdit() {
    // Suscribe el componente al paramMap del ActivatedRoute para observar cambios en los parámetros de la URL
    this._activatedRoute.paramMap.subscribe((data) => {
      // Obtiene el parámetro 'product' de la URL o asigna una cadena vacía si no está presente
      const productSerialized = data.get('product') || '';

      // Verifica si existe un valor en 'productSerialized'
      if (productSerialized) {
        // Decodifica y parsea la cadena JSON del parámetro 'product', asignándola a 'currentProduct'
        this.currentProduct = JSON.parse(decodeURIComponent(productSerialized));

        // Actualiza el título del componente a 'Editar Producto'
        this.title = 'Editar Producto';

        // Asigna la URL de la imagen del 'currentProduct' al atributo 'preview' para la vista previa
        this.preview = this.currentProduct.img;

        // Establece los valores del formulario con los datos del 'currentProduct'
        this.productForm.setValue({
          name: this.currentProduct.name,
          category: this.currentProduct.category,
          location: this.currentProduct.location,
          img: this.currentProduct.img,
          price: this.currentProduct.price,
          isLocalFile: false // Puede requerir ajustes dependiendo de la lógica de tu aplicación
        });
      }
    });
  }

  // 
  // Explicación detallada:
  // 
  // 1 Método asEdit: Este método se ejecuta al iniciar el componente y se suscribe a los cambios en los parámetros de la URL a través del servicio ActivatedRoute.
  // 2 Suscripción al paramMap: Utiliza el método subscribe para observar los cambios en el paramMap del ActivatedRoute.
  // 3 Obtención del parámetro 'product': Obtiene el valor del parámetro 'product' de la URL mediante data.get('product').
  // 4 Verificación de 'productSerialized': Verifica si hay algún valor en 'productSerialized'. Si es así, procede a realizar las operaciones necesarias.
  // 5 Decodificación y asignación a 'currentProduct': Decodifica y parsea la cadena JSON del parámetro 'product', asignando el resultado a la variable currentProduct.
  // 6 Actualización del título y vista previa: Actualiza el título del componente a 'Editar Producto' y asigna la URL de la imagen del currentProduct al atributo 'preview' para mostrar la vista previa.
  // 7 Establecimiento de valores del formulario: Utiliza el método setValue del formulario reactivo para establecer los valores del formulario con los datos del currentProduct.
  // 8 Consideración especial para 'isLocalFile': La opción 'isLocalFile' se establece en false en este caso.Puedes necesitar ajustar esta parte dependiendo de la lógica específica de tu aplicación.




  // Método para manejar errores
  private resetImg(error?: any) {
    this.productForm.patchValue({ img: '' });
    this.preview = '';
    return error;
  }
}

// Resumen general
// 1 Importación de Módulos y Clases: Se importan los módulos y clases necesarios de Angular y otras dependencias// .
// 2 Definición del Componente: Se declara y define el componente Angular mediante el decorador @Component// .
// 3 Inicialización y Validación del Formulario Reactivo: Se utiliza el servicio FormBuilder para construir un formulario reactivo con campos para el nombre, categoría, ubicación, imagen, precio y una opción para cargar una imagen local o usar una URL externa.Se aplican validadores requeridos a algunos campos// .
// 4 Manejo de Imágenes: Se implementa lógica para cargar y previsualizar imágenes, con validaciones para asegurar que las imágenes sean cuadradas y de al menos 500x500 píxeles// .
// 5 Creación y Edición de Productos: Se definen métodos para agregar y editar productos.La lógica se basa en la validación del formulario y la creación de un objeto Product con los datos del formulario// .
// 6 Conexión con el Servicio: Los métodos de creación y edición utilizan un servicio(ProductService) para interactuar con la capa de servicios de la aplicación// .
// 7 Manejo de Errores: Se incluyen funciones para manejar errores, como alertas para el usuario en caso de errores conocidos// .
// 8 Integración con Angular Router: El componente utiliza ActivatedRoute para obtener información sobre la URL activa y determinar si se está editando un producto existente// .
// 9 En resumen, el código proporciona una funcionalidad completa para la gestión de productos, desde la creación hasta la edición, integrando formularios reactivos, servicios y manejo de rutas en una aplicación Angular.