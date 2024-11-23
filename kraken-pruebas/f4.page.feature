Feature: Gestión de Pagina

  @user2 @web
  Scenario: MPA001 - El usuario debería poder crear y modificar una pagina
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When El usuario ingresa credenciales válidas
    And hace clic en el boton de ingreso
    When El usuario crea una pagina y la publica.
    Then El sistema debe mostrar un mensaje de éxito al crear la pagina.

    Given El usuario ha navegado al sitio, ha iniciado sesión y ha crea una pagina exitosamente.
    When El usuario modifica el título y el contenido de la pagina.
    Then El sistema debe mostrar un mensaje de éxito después de la modificación de la pagina.

    Given El usuario ha navegado al sitio, ha iniciado sesión y ha crea una pagina exitosamente.
    When El usuario selecciona una pagina
    And elimina la pagina
    Then El sistema debe mostrar un mensaje de éxito después de la elminación.

    Given El usuario ha navegado al sitio, ha iniciado sesión y ha crea una pagina exitosamente.
    When El usuario crea una pagina y la publica con datos invalidos
    Then El sistema debe mostrar un mensaje de error.

#Escenario 1: Revertir un post publicado a borrador
    Given El usuario ha navegado al sitio, ha iniciado sesión y ha creado un post exitosamente.
    When El usuario selecciona un post publicado y lo revierte a borrador.
    Then El sistema debe mostrar un mensaje de éxito al revertir el post a borrador.

#Escenario 2: Previsualizar un post antes de publicarlo
    Given El usuario ha navegado al sitio y está en la sección de creación de posts.
    When El usuario previsualiza un post con título y contenido.
    Then El sistema debe mostrar la previsualización del post.

#Escenario 3: Guardar un post como borrador
    Given El usuario ha navegado al sitio y está en la sección de creación de posts.
    When El usuario guarda un post con título y contenido como borrador.
    Then El sistema debe mostrar el post en la lista de borradores.